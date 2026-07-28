# 🔒 Gate Pass Security Management — Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

A robust, type-safe RESTful API for managing visitor check-ins and employee gate passes at secured premises.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)

---

## 🌐 Overview

The backend service powers the Gate Pass Security Management system. It provides a fully validated RESTful API built with **Express 5** and **TypeScript**, backed by a **PostgreSQL** database managed via **Prisma ORM**. All incoming request payloads are validated with **Zod** schemas before reaching the service layer, ensuring data integrity and type safety throughout.

**Key Capabilities:**
- Register, track, and check-out visitors in real-time
- Issue, approve, and manage employee gate passes with status workflows
- Health check endpoint for uptime monitoring and DB connectivity verification
- CORS-enabled for seamless frontend integration

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **TypeScript** | ^7.0.2 | Statically typed language |
| **Express** | ^5.2.1 | HTTP web framework |
| **Prisma** | ^7.9.1 | ORM & database migrations |
| **@prisma/adapter-pg** | ^7.9.1 | PostgreSQL adapter for Prisma |
| **pg** | ^8.22.0 | Native PostgreSQL client |
| **Zod** | ^4.4.3 | Schema validation |
| **cors** | ^2.8.6 | Cross-Origin Resource Sharing |
| **dotenv** | ^17.4.2 | Environment variable management |
| **tsx** | ^4.23.1 | TypeScript execution & watch mode |

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── migrations/          # Auto-generated database migration files
│   └── schema.prisma        # Prisma data model & datasource config
├── src/
│   ├── lib/
│   │   └── prisma.ts        # Prisma client singleton instance
│   ├── modules/
│   │   ├── employees/       # Employee gate pass module
│   │   │   ├── employees.controller.ts
│   │   │   ├── employees.route.ts
│   │   │   └── employees.service.ts
│   │   └── visitors/        # Visitor management module
│   │       ├── visitors.controller.ts
│   │       ├── visitors.route.ts
│   │       └── visitors.service.ts
│   ├── types/               # Shared TypeScript type definitions
│   ├── utils/               # Utility helper functions
│   ├── validation/          # Zod validation schemas
│   ├── app.ts               # Express app configuration
│   └── index.ts             # Server entry point & startup
├── .env                     # Local environment variables (not committed)
├── .env.example             # Environment variable template
├── prisma.config.ts         # Prisma configuration file
├── tsconfig.json            # TypeScript compiler options
└── package.json
```

---

## 🗄 Database Schema

The database uses **PostgreSQL** with two primary models:

### `Visitor`
Tracks all individuals who enter the premises.

| Field | Type | Description |
|---|---|---|
| `id` | `String (cuid)` | Unique identifier |
| `name` | `String` | Visitor's full name |
| `mobile` | `String` | Contact number |
| `company` | `String?` | Visitor's company (optional) |
| `purpose` | `String` | Reason for visit |
| `personToMeet` | `String` | Host employee name |
| `checkIn` | `DateTime` | Check-in timestamp (auto) |
| `checkOut` | `DateTime?` | Check-out timestamp (nullable) |
| `createdAt` | `DateTime` | Record creation time (auto) |

### `EmployeeGatePass`
Manages gate pass requests issued to employees.

| Field | Type | Description |
|---|---|---|
| `id` | `String (cuid)` | Unique identifier |
| `employeeName` | `String` | Employee's full name |
| `department` | `String` | Employee's department |
| `reason` | `String` | Reason for exit |
| `exitTime` | `DateTime?` | Authorized exit time (nullable) |
| `status` | `GatePassStatus` | Workflow status |
| `createdAt` | `DateTime` | Record creation time (auto) |

### `GatePassStatus` Enum

```
PENDING   → Gate pass submitted, awaiting approval
APPROVED  → Gate pass approved by security
RETURNED  → Employee has returned to premises
```

---

## 📡 API Reference

Base URL: `http://localhost:5000`

### Health Check

```
GET /health
```
Returns the server status and database connectivity.

**Response:**
```json
{
  "status": "OK",
  "database": "CONNECTED",
  "timestamp": "2026-07-29T00:00:00.000Z"
}
```

---

### Visitors — `/api/visitors`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/visitors` | Retrieve all visitors (filter by `?mobile=`) |
| `POST` | `/api/visitors` | Register a new visitor check-in |
| `PUT` | `/api/visitors/:id` | Update visitor record (e.g., check-out) |
| `DELETE` | `/api/visitors/:id` | Remove a visitor record |

**POST Body Example:**
```json
{
  "name": "John Smith",
  "mobile": "01712345678",
  "company": "Acme Corp",
  "purpose": "Job Interview",
  "personToMeet": "Mr. Hasan"
}
```

---

### Employee Gate Passes — `/api/gate-passes`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/gate-passes` | Retrieve all gate passes |
| `POST` | `/api/gate-passes` | Issue a new employee gate pass |
| `PUT` | `/api/gate-passes/:id` | Update gate pass (status, exit time) |
| `DELETE` | `/api/gate-passes/:id` | Delete a gate pass record |

**POST Body Example:**
```json
{
  "employeeName": "Rahim Uddin",
  "department": "Engineering",
  "reason": "Site visit",
  "exitTime": "2026-07-29T14:00:00.000Z"
}
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- npm v9 or higher

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials (see [Environment Variables](#-environment-variables)).

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

The API will be available at **`http://localhost:5000`**.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure the following:

```env
# Database Connection URL (PostgreSQL)
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/gate_pass_db?schema=public"

# Server Port
PORT=5000
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | ✅ Yes | — | PostgreSQL connection string |
| `PORT` | ❌ No | `5000` | Port for the Express server |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to JavaScript (`dist/`) |
| `npm start` | Run the compiled production build |

---

## 🔐 Security Notes

- Never commit your `.env` file — it is listed in `.gitignore`
- All API inputs are validated via Zod schemas before database interaction
- Duplicate mobile number check-ins are rejected with a `400` error
- CORS is enabled globally; restrict allowed origins in production

---

<div align="center">

Built with ❤️ using **Express**, **Prisma**, and **TypeScript**

</div>
