# Crowdfunding Server

Production-ready Express.js backend for a full-stack Crowdfunding Platform.

## Tech Stack

| Technology       | Purpose                          |
| ---------------- | -------------------------------- |
| **Express.js**   | HTTP framework                   |
| **Node.js**      | Runtime                          |
| **MongoDB**      | Database (official driver)       |
| **Better Auth**  | Authentication (Email + Google)  |
| **dotenv**       | Environment variable management  |
| **cors**         | Cross-Origin Resource Sharing    |
| **cookie-parser**| Cookie parsing middleware         |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a cloud URI
- Google OAuth credentials (optional, for social login)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd crowdfunding-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Configuration

Edit `.env` with your actual values:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://localhost:27017/crowdfunding

BETTER_AUTH_SECRET=your-secure-random-secret
BETTER_AUTH_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FRONTEND_URL=http://localhost:3000

LOG_LEVEL=debug
```

### Running the Server

```bash
# Development (with auto-reload via nodemon)
npm run dev

# Production
npm start
```

### Health Check

Once running, verify the server is healthy:

```
GET http://localhost:5000/api/v1/health
```

## Project Structure

```
src/
├── config/            # Environment, CORS, and app configuration
├── db/                # MongoDB connection module
├── auth/              # Better Auth setup (Email + Google OAuth)
├── middleware/         # Express middleware (auth, RBAC, validation, errors)
├── controllers/       # HTTP request handlers
├── services/          # Business logic layer
├── routes/            # Express route definitions
├── models/            # MongoDB collection accessors and indexes
├── validators/        # Request validation functions
├── utils/             # Shared utilities (logger, ApiError, response helpers)
├── lib/               # Third-party integration wrappers
├── constants/         # Application-wide constants
├── helpers/           # Generic helper functions
├── app.js             # Express app assembly (middleware + routes)
└── server.js          # Server bootstrap (DB connect + listen)
```

## API Endpoints

### Available Now

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| `GET`  | `/api/v1/health`    | Server health check     |
| `ALL`  | `/api/auth/*`       | Better Auth endpoints   |

### Route Modules (Scaffolded)

| Module          | Base Path                 |
| --------------- | ------------------------- |
| Authentication  | `/api/v1/auth`            |
| Users           | `/api/v1/users`           |
| Campaigns       | `/api/v1/campaigns`       |
| Contributions   | `/api/v1/contributions`   |
| Withdrawals     | `/api/v1/withdrawals`     |
| Payments        | `/api/v1/payments`        |
| Notifications   | `/api/v1/notifications`   |
| Reports         | `/api/v1/reports`         |
| Admin           | `/api/v1/admin`           |

## Architecture Patterns

- **Layered Architecture**: Routes → Controllers → Services → Models
- **Centralized Error Handling**: All errors flow through a single error handler
- **Consistent API Responses**: All endpoints return `{ success, statusCode, message, data }`
- **Custom ApiError Class**: Throwable errors with HTTP status codes
- **Async Handler Wrapper**: Eliminates try/catch boilerplate in controllers
- **Environment Isolation**: All env access goes through `src/config/env.js`
- **Request Validation**: Generic middleware factory for pluggable validators
- **Role-Based Access Control**: `authenticate` + `authorize(ROLE)` middleware chain
- **Structured Logging**: JSON in production, human-readable in development

## Scripts

| Script        | Command          | Description                        |
| ------------- | ---------------- | ---------------------------------- |
| `dev`         | `npm run dev`    | Start with nodemon (auto-reload)   |
| `start`       | `npm start`      | Start in production mode           |
| `test`        | `npm test`       | Run tests (not yet configured)     |

## License

ISC
