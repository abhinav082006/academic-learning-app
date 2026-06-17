# Setup & Installation Guide

## Prerequisites
- Node.js v16+
- MongoDB v4.4+
- npm or yarn

## Backend Setup

### 1. Clone Repository
```bash
git clone https://github.com/abhinav082006/academic-learning-app.git
cd academic-learning-app
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```
Edit `.env` with your configuration.

### 4. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 5. Run Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

App opens on `http://localhost:3000`

## Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Deployment

### Backend (Heroku)
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Frontend (Vercel)
```bash
npm i -g vercel
vercel
```