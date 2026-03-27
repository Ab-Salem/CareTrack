# CareTrack – Injury Tracking System

CareTrack is a full-stack web application for logging, managing, and tracking workplace injury reports. It supports two user roles with different permission levels and exposes a RESTful API for all core operations.

**Live demo:** [18.221.184.203](http://18.221.184.203)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Reference](#api-reference)
- [Role Permissions](#role-permissions)
- [Project Structure](#project-structure)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## Overview

CareTrack gives organizations a centralized, secure place to record and review workplace incidents. Administrators have full control over reports, while standard users can submit and view them. All actions require authentication via JSON Web Tokens (JWT).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Axios, CSS3 |
| Backend | Node.js, Express.js |
| Database | MySQL 8.0 |
| Auth | JWT, Bcrypt |
| DevOps | Git, Nodemon, dotenv |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MySQL](https://dev.mysql.com/downloads/) v8.0 or higher
- npm (bundled with Node.js)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Ab-Salem/caretrack.git
cd caretrack
```

**2. Configure the backend**

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and set the following values:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=injury_tracker
JWT_SECRET=your_secret_key
PORT=5000
```

**3. Initialize the database**

```bash
mysql -u root -p
source ../database/schema.sql
```

**4. Install frontend dependencies**

```bash
cd ../client
npm install
```

### Running the Application

Open two terminal windows and run the following:

```bash
# Terminal 1 – backend (http://localhost:5000)
cd server && npm run dev

# Terminal 2 – frontend (http://localhost:3000)
cd client && npm start
```

### Test Accounts

> **Note:** These credentials are for local development only. Change them before deploying to production.

| Username | Password | Role |
|----------|----------|------|
| `admin` | `password123` | Admin |
| `user` | `password123` | User |

---

## Authentication

CareTrack uses **JWT-based authentication**. All API endpoints except `/api/auth/login` require a valid token.

**How it works:**

1. The client sends credentials to `POST /api/auth/login`.
2. On success, the server returns a signed JWT valid for the session.
3. The client includes this token in the `Authorization` header of every subsequent request.

```
Authorization: Bearer <your_token>
```

Requests with a missing, malformed, or expired token return `401 Unauthorized`.

---

## API Reference

### Base URL

```
http://localhost:5000/api
```

### Error Responses

All endpoints return consistent error objects:

```json
{
  "error": "A human-readable description of the problem"
}
```

| Status Code | Meaning |
|-------------|---------|
| `400` | Bad request – missing or invalid fields |
| `401` | Unauthorized – token missing or invalid |
| `403` | Forbidden – valid token but insufficient role |
| `404` | Not found – resource does not exist |
| `500` | Internal server error |

---

### Authentication

#### POST /api/auth/login

Authenticates a user and returns a JWT.

**Request body**

```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response – 200 OK**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Response – 401 Unauthorized**

```json
{
  "error": "Invalid username or password"
}
```

---

### Injuries

#### GET /api/injuries

Returns all injury reports. Requires authentication.

**Headers**

```
Authorization: Bearer <token>
```

**Response – 200 OK**

```json
[
  {
    "id": 1,
    "title": "Slip and Fall",
    "description": "Employee slipped in cafeteria",
    "severity": 3,
    "created_at": "2026-01-15T10:30:00Z",
    "created_by": "user"
  }
]
```

---

#### POST /api/injuries

Creates a new injury report. Requires authentication.

**Headers**

```
Authorization: Bearer <token>
```

**Request body**

```json
{
  "title": "Slip and Fall",
  "description": "Employee slipped in cafeteria",
  "severity": 3
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Short label for the incident |
| `description` | string | Yes | Full description of what occurred |
| `severity` | integer | Yes | Severity rating from `1` (minor) to `5` (critical) |

**Response – 201 Created**

```json
{
  "id": 2,
  "title": "Slip and Fall",
  "description": "Employee slipped in cafeteria",
  "severity": 3,
  "created_at": "2026-03-27T14:22:00Z",
  "created_by": "user"
}
```

**Response – 400 Bad Request**

```json
{
  "error": "severity must be an integer between 1 and 5"
}
```

---

#### DELETE /api/injuries/:id

Deletes an injury report by ID. Requires Admin role.

**Headers**

```
Authorization: Bearer <token>
```

**Path parameter**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | The ID of the injury report to delete |

**Response – 200 OK**

```json
{
  "message": "Injury report 2 deleted successfully"
}
```

**Response – 403 Forbidden**

```json
{
  "error": "Admin role required to delete reports"
}
```

**Response – 404 Not Found**

```json
{
  "error": "Injury report not found"
}
```

---

## Role Permissions

| Action | User | Admin |
|--------|------|-------|
| Log in | Yes | Yes |
| View injury reports | Yes | Yes |
| Create injury report | Yes | Yes |
| Delete injury report | No | Yes |

---

## Project Structure

```
caretrack/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components (Login, AddInjury, InjuryList)
│       ├── services/       # Axios API layer
│       └── App.js
│
├── server/                 # Express backend
│   ├── config/             # Database connection
│   ├── middleware/         # JWT authentication middleware
│   ├── routes/             # Auth and injury route handlers
│   └── index.js            # Server entry point
│
├── database/
│   └── schema.sql          # MySQL schema
│
└── README.md
```

---

## Security

| Feature | Implementation |
|---------|---------------|
| Password hashing | Bcrypt with salt rounds |
| Authentication | JWT signed tokens |
| Authorization | Role-based middleware on protected routes |
| SQL injection prevention | Parameterized queries |
| Input validation | Server-side validation on all endpoints |
| Cross-origin control | CORS middleware configured per environment |

---

## Troubleshooting

**Database connection error**

Verify that MySQL is running and that the credentials in `server/.env` match your local setup.

```bash
mysql -u root -p
```

**Port 5000 already in use**

Change the `PORT` value in `server/.env` to an available port (e.g., `5001`) and restart the server.

**CORS errors in the browser**

Confirm that `cors()` middleware is initialized before route declarations in `server/index.js`.

**Token authentication fails**

Ensure the `JWT_SECRET` value in `.env` is identical for both the token-signing step (login) and the token-verification step (middleware). A mismatch causes all authenticated requests to fail.

---

## License

MIT License. See `LICENSE` for details.
