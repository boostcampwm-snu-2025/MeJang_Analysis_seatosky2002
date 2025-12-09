# MeJang Price Backend

FastAPI backend for MeJang Price stock portfolio application.

## Features

- User authentication (register/login)
- JWT token-based authorization
- PostgreSQL database with SQLAlchemy ORM
- RESTful API design

## Tech Stack

- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT Authentication
- Pydantic

## Setup

### 1. Create virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mejang_db
SECRET_KEY=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:5173
```

### 4. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (requires authentication)

### Health Check

- `GET /` - Root endpoint
- `GET /health` - Health check

## API Documentation

FastAPI provides automatic interactive API documentation:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
