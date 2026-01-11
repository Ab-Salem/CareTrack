# CareTrack - Injury Tracking System

A full-stack web application for managing and tracking workplace injury reports with role-based access control.

![CareTrack](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Overview

CareTrack is a comprehensive injury tracking system that allows organizations to:
- Log and manage injury reports
- Track injury severity and details
- Implement role-based access control (Admin vs User)
- Maintain a secure, centralized database of incidents

## Features

- **User Authentication**: Secure JWT-based login system
- **Role-Based Access Control (RBAC)**:
  - **Users**: Can create and view injury reports
  - **Admins**: Full access including delete capabilities
- **Injury Management**: Create, view, and delete injury reports
- **Real-time Updates**: Dynamic UI that reflects changes immediately
- **Responsive Design**: Mobile-friendly interface
- **RESTful API**: Clean, well-documented API endpoints

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 for styling
- Local Storage for session management

### Backend
- Node.js
- Express.js
- MySQL Database
- JWT for authentication
- Bcrypt for password hashing

### DevOps & Tools
- Git & GitHub for version control
- Nodemon for development
- dotenv for environment configuration

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://dev.mysql.com/downloads/) (v8.0 or higher)
- [Git](https://git-scm.com/)
- npm (comes with Node.js)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/caretrack.git
cd caretrack
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=injury_tracker
# JWT_SECRET=your_secret_key
# PORT=5000
```

### 3. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the schema
source ../database/schema.sql

# Or manually create the database
CREATE DATABASE injury_tracker;
USE injury_tracker;
# Then paste the contents of schema.sql
```

### 4. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Application will open at `http://localhost:3000`

### Production Build

```bash
cd client
npm run build
```

## Default Users

The application comes with two test accounts:

| Username | Password | Role |
|----------|----------|------|
| admin | password123 | Admin |
| user | password123 | User |

**⚠️ Change these credentials in production!**

## API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Login to the system
```json
Request:
{
  "username": "admin",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

### Injury Endpoints

#### GET /api/injuries
Get all injury reports (requires authentication)
```bash
Headers: Authorization: Bearer {token}
```

#### POST /api/injuries
Create a new injury report (requires authentication)
```json
Request:
{
  "title": "Slip and Fall",
  "description": "Employee slipped in cafeteria",
  "severity": 3
}
```

#### DELETE /api/injuries/:id
Delete an injury report (admin only)
```bash
Headers: Authorization: Bearer {token}
```

## Project Structure

```
caretrack/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.js
│   │   │   ├── AddInjury.js
│   │   │   └── InjuryList.js
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── server/                # Express backend
│   ├── config/
│   │   └── database.js   # DB connection
│   ├── middleware/
│   │   └── auth.js       # JWT middleware
│   ├── routes/
│   │   ├── auth.js       # Auth routes
│   │   └── injuries.js   # Injury routes
│   ├── .env              # Environment variables
│   ├── index.js          # Server entry point
│   └── package.json
│
├── database/
│   └── schema.sql        # Database schema
│
├── .gitignore
└── README.md
```

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **RBAC**: Role-based permission system
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Controlled cross-origin requests

## Testing

### Manual Testing Workflow

1. **Test Authentication**:
   - Login with user account
   - Login with admin account
   - Test invalid credentials

2. **Test User Functions**:
   - Create injury reports
   - View all reports
   - Verify delete button is hidden

3. **Test Admin Functions**:
   - Login as admin
   - Delete injury reports
   - Verify RBAC enforcement

### API Testing with Postman

Import the following collection or test manually:

```bash
# Health check
GET http://localhost:5000/api/health

# Login
POST http://localhost:5000/api/auth/login
Body: {"username": "admin", "password": "password123"}

# Get injuries (use token from login)
GET http://localhost:5000/api/injuries
Headers: Authorization: Bearer {your_token}
```

## Troubleshooting

### Common Issues

**Issue**: Database connection error
```
Solution: Check .env file credentials and ensure MySQL is running
mysql -u root -p
```

**Issue**: Port 5000 already in use
```
Solution: Change PORT in server/.env to another port (e.g., 5001)
```

**Issue**: CORS errors
```
Solution: Ensure cors() middleware is enabled in server/index.js
```

**Issue**: Token authentication fails
```
Solution: Check JWT_SECRET matches between login and verification
```

## Future Enhancements

- [ ] Docker containerization
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Cloud deployment (AWS/Azure)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Message Guidelines
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes

## License

This project is licensed under the MIT License - see the LICENSE file for details.

