// VEYRA - Gesture Detection Module using MediaPipe Hands

export class GestureDetector {
  constructor() {
    this.hands = null;
    this.camera = null;
    this.isInitialized = false;
    this.onGestureDetected = null;
  }

  async initialize() {
    try {
      // Load MediaPipe Hands
      const { Hands } = await import('@mediapipe/hands');
      const { Camera } = await import('@mediapipe/camera_utils');
      
      this.hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      this.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      this.hands.onResults(this.onResults.bind(this));

      this.isInitialized = true;
      console.log('✅ Gesture detector initialized');
    } catch (error) {
      console.error('Error initializing gesture detector:', error);
      throw error;
    }
  }

  async startCamera(videoElement) {
    if (!this.isInitialized) {
      throw new Error('Gesture detector not initialized');
    }

    try {
      this.camera = new Camera(videoElement, {
        onFrame: async () => {
          await this.hands.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });

      await this.camera.start();
      console.log('📷 Camera started');
    } catch (error) {
      console.error('Error starting camera:', error);
      throw error;
    }
  }

  onResults(results) {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      return;
    }

    const gestures = [];

    for (const landmarks of results.multiHandLandmarks) {
      const gesture = this.classifyGesture(landmarks);
      if (gesture) {
        gestures.push(gesture);
        
        // Notify callback
        if (this.onGestureDetected) {
          this.onGestureDetected(gesture);
        }
      }
    }

    if (gestures.length > 0) {
      chrome.runtime.sendMessage({
        type: 'GESTURE_DETECTED',
        data: { gestures, timestamp: Date.now() },
      });
    }
  }

  classifyGesture(landmarks) {
    // Classify hand gesture based on landmarks
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    
    const thumbIP = landmarks[3];
    const indexPIP = landmarks[6];
    const middlePIP = landmarks[10];
    const ringPIP = landmarks[14];
    const pinkyPIP = landmarks[18];

    // Check for raised hand (all fingers extended upward)
    if (this.isHandRaised(landmarks)) {
      return { type: 'hand_raise', confidence: 0.9 };
    }

    // Check for thumbs up
    if (this.isThumbsUp(landmarks)) {
      return { type: 'thumbs_up', confidence: 0.9 };
    }

    // Check for thumbs down
    if (this.isThumbsDown(landmarks)) {
      return { type: 'thumbs_down', confidence: 0.9 };
    }

    // Check for OK sign
    if (this.isOKSign(landmarks)) {
      return { type: 'ok', confidence: 0.9 };
    }

    return null;
  }

  isHandRaised(landmarks) {
    // Check if all fingertips are above their respective PIP joints
    const fingertips = [8, 12, 16, 20];
    const pipJoints = [6, 10, 14, 18];
    
    let raisedCount = 0;
    for (let i = 0; i < fingertips.length; i++) {
      if (landmarks[fingertips[i]].y < landpipJoints[i]].y) {
        raisedCount++;
      }
    }
    
    return raisedCount >= 3;
  }

  isThumbsUp(landmarks) {
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const indexMCP = landmarks[5];
    
    // Thumb tip should be above thumb IP and other fingers curled
    return thumbTip.y < thumbIP.y && thumbTip.y < indexMCP.y;
  }

  isThumbsDown(landmarks) {
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const indexMCP = landmarks[5];
    
    // Thumb tip should be below thumb IP
    return thumbTip.y > thumbIP.y;
  }

  isOKSign(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    
    // Distance between thumb tip and index tip should be small
    const distance = Math.sqrt(
      Math.pow(thumbTip.x - indexTip.x, 2) +
      Math.pow(thumbTip.y - indexTip.y, 2)
    );
    
    return distance < 0.05;
  }

  dispose() {
    if (this.camera) {
      this.camera.stop();
      this.camera = null;
    }
    if (this.hands) {
      this.hands.close();
      this.hands = null;
    }
    this.isInitialized = false;
    console.log('🧹 Gesture detector disposed');
  }
}
