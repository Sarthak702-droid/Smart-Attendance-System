// VEYRA Chrome Extension - Service Worker
import { GestureDetector } from '../src/gesture-detector.js';

let sessionId = null;
let wsConnection = null;
let gestureDetector = null;
let isRecording = false;

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('🚀 VEYRA Extension installed');
  initializeStorage();
});

// Initialize storage
async function initializeStorage() {
  await chrome.storage.local.set({
    isActive: false,
    sessionId: null,
    userId: null,
    settings: {
      enableGestures: true,
      enableAttendance: true,
      sensitivity: 'medium',
    },
  });
}

// Message handler for popup and content script communication
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'START_SESSION':
      startSession(message.data);
      break;
    case 'END_SESSION':
      endSession();
      break;
    case 'GESTURE_DETECTED':
      handleGestureDetection(message.data);
      break;
    case 'GET_STATUS':
      sendResponse({ sessionId, isRecording });
      break;
    default:
      console.warn('Unknown message type:', message.type);
  }
  return true;
});

// Start a new session
async function startSession(sessionData) {
  try {
    sessionId = sessionData.sessionId;
    isRecording = true;
    
    // Initialize gesture detector
    gestureDetector = new GestureDetector();
    await gestureDetector.initialize();
    
    // Connect to WebSocket
    connectWebSocket(sessionData.roomId);
    
    // Update storage
    await chrome.storage.local.set({ sessionId, isActive: true });
    
    // Notify popup
    chrome.runtime.sendMessage({ 
      type: 'SESSION_STARTED', 
      data: { sessionId } 
    });
    
    console.log('✅ Session started:', sessionId);
  } catch (error) {
    console.error('Error starting session:', error);
  }
}

// End current session
async function endSession() {
  try {
    isRecording = false;
    sessionId = null;
    
    // Close WebSocket
    if (wsConnection) {
      wsConnection.close();
      wsConnection = null;
    }
    
    // Cleanup gesture detector
    if (gestureDetector) {
      gestureDetector.dispose();
      gestureDetector = null;
    }
    
    // Update storage
    await chrome.storage.local.set({ sessionId: null, isActive: false });
    
    // Notify popup
    chrome.runtime.sendMessage({ type: 'SESSION_ENDED' });
    
    console.log('👋 Session ended');
  } catch (error) {
    console.error('Error ending session:', error);
  }
}

// Connect to WebSocket server
function connectWebSocket(roomId) {
  const wsUrl = `ws://localhost:8000/ws/${roomId}`;
  wsConnection = new WebSocket(wsUrl);
  
  wsConnection.onopen = () => {
    console.log('🔌 WebSocket connected');
    sendMessage({ type: 'connected', roomId });
  };
  
  wsConnection.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleMessage(data);
  };
  
  wsConnection.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  wsConnection.onclose = () => {
    console.log('WebSocket closed');
  };
}

// Send message through WebSocket
function sendMessage(data) {
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
    wsConnection.send(JSON.stringify(data));
  }
}

// Handle incoming WebSocket messages
function handleMessage(data) {
  switch (data.type) {
    case 'attendance_update':
      updateAttendance(data.payload);
      break;
    case 'engagement_update':
      updateEngagement(data.payload);
      break;
    case 'gesture_acknowledged':
      acknowledgeGesture(data.payload);
      break;
    default:
      console.log('Received message:', data);
  }
}

// Handle gesture detection from content script
async function handleGestureDetection(gestureData) {
  if (!isRecording || !sessionId) return;
  
  try {
    // Send gesture to backend
    const response = await fetch('http://localhost:8000/api/v1/gestures/detect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        ...gestureData,
      }),
    });
    
    const result = await response.json();
    
    // Broadcast to WebSocket
    sendMessage({
      type: 'gesture_detected',
      payload: result,
    });
  } catch (error) {
    console.error('Error handling gesture:', error);
  }
}

// Update attendance in UI
function updateAttendance(data) {
  chrome.runtime.sendMessage({
    type: 'ATTENDANCE_UPDATE',
    data,
  });
}

// Update engagement metrics in UI
function updateEngagement(data) {
  chrome.runtime.sendMessage({
    type: 'ENGAGEMENT_UPDATE',
    data,
  });
}

// Acknowledge gesture
function acknowledgeGesture(data) {
  chrome.runtime.sendMessage({
    type: 'GESTURE_ACKNOWLEDGED',
    data,
  });
}

// Periodic health check
setInterval(async () => {
  if (isRecording && sessionId) {
    try {
      const response = await fetch('http://localhost:8000/health');
      if (!response.ok) {
        console.warn('Backend health check failed');
      }
    } catch (error) {
      console.error('Health check error:', error);
    }
  }
}, 30000);

console.log('✅ VEYRA Service Worker ready');
