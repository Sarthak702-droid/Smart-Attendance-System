import cv2
import mediapipe as mp
import numpy as np
from typing import Dict, List, Optional
import asyncio


class FaceRecognitionService:
    """AI service for face recognition and attendance tracking"""
    
    def __init__(self):
        self.mp_face_detection = mp.solutions.face_detection
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_detector = self.mp_face_detection.FaceDetection(
            model_selection=1, min_detection_confidence=0.5
        )
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=50,
            refine_landmarks=True,
            min_detection_confidence=0.5,
        )
        self.known_faces: Dict[str, np.ndarray] = {}
    
    async def register_face(self, student_id: str, image_data: np.ndarray) -> bool:
        """Register a student's face for recognition"""
        try:
            results = self.face_detector.process(image_data)
            if results.detections:
                # Extract face embedding (simplified - use proper embedding in production)
                face_encoding = self._extract_face_embedding(image_data, results.detections[0])
                self.known_faces[student_id] = face_encoding
                return True
            return False
        except Exception as e:
            print(f"Error registering face: {e}")
            return False
    
    async def recognize_faces(self, image_data: np.ndarray) -> List[Dict]:
        """Recognize faces in an image and return attendance data"""
        try:
            results = self.face_detector.process(image_data)
            recognized_students = []
            
            if results.detections:
                for detection in results.detections:
                    student_id, confidence = self._match_face(image_data, detection)
                    if student_id:
                        recognized_students.append({
                            "student_id": student_id,
                            "confidence": float(confidence),
                            "status": "present",
                        })
            
            return recognized_students
        except Exception as e:
            print(f"Error recognizing faces: {e}")
            return []
    
    def _extract_face_embedding(self, image: np.ndarray, detection) -> np.ndarray:
        """Extract face embedding from detection"""
        # Simplified implementation - use proper face embedding model in production
        bbox = detection.location_data.relative_bounding_box
        h, w, _ = image.shape
        
        x1 = int(bbox.xmin * w)
        y1 = int(bbox.ymin * h)
        x2 = int((bbox.xmin + bbox.width) * w)
        y2 = int((bbox.ymin + bbox.height) * h)
        
        face_roi = image[y1:y2, x1:x2]
        face_roi = cv2.resize(face_roi, (128, 128))
        
        # Simple histogram-based embedding (replace with proper model)
        embedding = np.histogram(face_roi, bins=256)[0].astype(np.float32)
        embedding = embedding / (np.linalg.norm(embedding) + 1e-7)
        
        return embedding
    
    def _match_face(self, image: np.ndarray, detection) -> tuple:
        """Match detected face against known faces"""
        embedding = self._extract_face_embedding(image, detection)
        
        best_match = None
        best_similarity = 0.0
        
        for student_id, known_embedding in self.known_faces.items():
            similarity = np.dot(embedding, known_embedding)
            if similarity > best_similarity and similarity > 0.6:
                best_similarity = similarity
                best_match = student_id
        
        return (best_match, best_similarity) if best_match else (None, 0.0)
    
    async def get_attention_metrics(self, image_data: np.ndarray) -> Dict:
        """Get attention metrics from face mesh analysis"""
        try:
            results = self.face_mesh.process(image_data)
            attention_scores = []
            
            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    # Calculate eye aspect ratio and head pose
                    attention_score = self._calculate_attention_score(face_landmarks)
                    attention_scores.append(attention_score)
            
            return {
                "average_attention": np.mean(attention_scores) if attention_scores else 0.0,
                "face_count": len(results.multi_face_landmarks) if results.multi_face_landmarks else 0,
            }
        except Exception as e:
            print(f"Error getting attention metrics: {e}")
            return {"average_attention": 0.0, "face_count": 0}
    
    def _calculate_attention_score(self, landmarks) -> float:
        """Calculate attention score from facial landmarks"""
        # Simplified implementation - use proper head pose estimation
        return 0.85  # Placeholder


class GestureRecognitionService:
    """AI service for gesture recognition"""
    
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=50,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5,
        )
    
    async def detect_gestures(self, image_data: np.ndarray) -> List[Dict]:
        """Detect gestures in an image"""
        try:
            results = self.hands.process(image_data)
            gestures = []
            
            if results.multi_hand_landmarks:
                for hand_idx, hand_landmarks in enumerate(results.multi_hand_landmarks):
                    gesture_type = self._classify_gesture(hand_landmarks)
                    if gesture_type:
                        gestures.append({
                            "hand_index": hand_idx,
                            "gesture_type": gesture_type,
                            "confidence": 0.9,
                        })
            
            return gestures
        except Exception as e:
            print(f"Error detecting gestures: {e}")
            return []
    
    def _classify_gesture(self, landmarks) -> Optional[str]:
        """Classify gesture from hand landmarks"""
        # Simplified gesture classification
        # In production, use proper ML model or more sophisticated logic
        
        # Check for raised hand (fingers extended upward)
        if self._is_hand_raised(landmarks):
            return "hand_raise"
        
        # Check for thumbs up
        if self._is_thumbs_up(landmarks):
            return "thumbs_up"
        
        # Check for thumbs down
        if self._is_thumbs_down(landmarks):
            return "thumbs_down"
        
        return None
    
    def _is_hand_raised(self, landmarks) -> bool:
        """Check if hand is raised"""
        # Simplified check - implement proper logic
        return False
    
    def _is_thumbs_up(self, landmarks) -> bool:
        """Check for thumbs up gesture"""
        return False
    
    def _is_thumbs_down(self, landmarks) -> bool:
        """Check for thumbs down gesture"""
        return False


# Singleton instances
face_recognition_service = FaceRecognitionService()
gesture_recognition_service = GestureRecognitionService()
