# VEYRA — AI-Powered Classroom Intelligence Platform

A production-ready, AI-powered SaaS platform for real-time classroom intelligence and engagement analytics.

## 🚀 Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- GSAP
- shadcn/ui
- Three.js / React Three Fiber
- Lucide Icons

### Backend
- FastAPI
- Python
- WebSockets
- Async architecture
- Event-driven microservices

### Database & Auth
- Supabase PostgreSQL
- Supabase Auth
- Redis

### AI/ML Stack
- MediaPipe
- YOLOv8
- OpenCV
- InsightFace
- DeepFace
- ONNX Runtime

### Infrastructure
- Docker
- Kubernetes
- RabbitMQ
- NGINX
- GitHub Actions CI/CD

## 🏗️ System Architecture

```
Teacher Starts Session
        ↓
Chrome Extension Captures Classroom Data
        ↓
API Gateway
        ↓
RabbitMQ Event Queue
        ↓
AI Processing Services
        ↓
Database Storage
        ↓
WebSocket Real-Time Updates
        ↓
Teacher/Admin Dashboards
```

## 📁 Project Structure

```
veyra/
├── frontend/              # Next.js 15 application
│   ├── app/              # App Router pages
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and helpers
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   └── public/          # Static assets
│
├── backend/              # FastAPI backend
│   ├── app/             # Main application
│   ├── core/            # Core configuration
│   ├── services/        # Business logic
│   ├── models/          # Database models
│   ├── routers/         # API routes
│   └── utils/           # Utility functions
│
├── ai-services/          # AI/ML microservices
│   ├── attendance/      # Face recognition attendance
│   ├── gesture/         # Gesture recognition
│   ├── emotion/         # Emotion detection
│   ├── engagement/      # Engagement scoring
│   └── pipeline/        # AI processing pipeline
│
├── infrastructure/       # DevOps & deployment
│   ├── docker/          # Docker configurations
│   ├── k8s/             # Kubernetes manifests
│   └── nginx/           # NGINX configuration
│
└── chrome-extension/     # Chrome extension
    ├── src/             # Source code
    ├── content/         # Content scripts
    ├── background/      # Background scripts
    └── popup/           # Popup UI
```

## 🎯 Features

### AI Attendance
- Face recognition-based automatic attendance
- Real-time presence tracking
- Attendance analytics and reports

### Gesture Recognition
- Hand raise detection
- Thumbs up/down
- Agree/disagree reactions
- Confusion gestures

### Engagement Analytics
- Attention score tracking
- Emotion detection
- Participation metrics
- Classroom mood analysis

### Real-Time Monitoring
- Live dashboard updates via WebSockets
- Instant notifications
- Session streaming

### AI-Generated Insights
- Session summaries
- Student risk detection
- Teaching recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd veyra
```

2. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env.local
```

3. **Setup Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. **Setup AI Services**
```bash
cd ai-services
pip install -r requirements.txt
```

5. **Start Development Servers**
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 3 - AI Services
cd ai-services
python pipeline/main.py
```

6. **Docker Deployment**
```bash
docker-compose up -d
```

## 📊 Dashboards

### Student Dashboard
- Attendance tracking
- Gesture interaction panel
- AI learning insights
- Session history
- Personal analytics

### Teacher Dashboard
- Real-time attendance
- Engagement analytics
- Gesture monitoring
- Live classroom insights
- AI reports generation

### Admin Dashboard
- User management
- Institution management
- Analytics overview
- Subscription management
- System monitoring

## 🔐 Security

- JWT authentication
- Role-based access control (RBAC)
- Row-level security (RLS)
- Encrypted communication
- Rate limiting
- Protected WebSockets

## 📈 Performance

- Low-latency AI inference
- Async processing
- Redis caching
- Lazy loading
- Optimized database queries

## 🌐 API Documentation

Once the backend is running, visit:
```
http://localhost:8000/docs
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

---

Built with ❤️ by the VEYRA Team
