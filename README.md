# 🔒 Gate Pass Security Management System

<div align="center">

![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Full_Stack-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

**A full-stack web application for managing visitor check-ins and employee gate passes at secured facilities.**

[Frontend Docs](./frontend/README.md) · [Backend Docs](./backend/README.md) · [Report a Bug](https://github.com/noboKumar/Gate-Pass-Security-Management/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [API Overview](#-api-overview)
- [Features](#-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 About the Project

The **Gate Pass Security Management System** is a full-stack application designed to digitize and streamline physical security operations at the entrance of a facility, office, or institution.

Security personnel can:
- **Register visitors** as they arrive, capturing their identity, purpose, and host contact
- **Track check-in and check-out times** to maintain accurate entry logs
- **Issue gate passes** to employees who need to leave the premises
- **Manage gate pass workflows** through status transitions: `PENDING` → `APPROVED` → `RETURNED`
- **Search and filter** visitor records in real-time by mobile number

This eliminates paper-based logbooks, reduces errors, and provides an auditable digital trail of all gate activity.

---

## 🏗 Architecture

The project follows a **monorepo structure** with a clear separation between the client and server:

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│          Next.js 16 (React 19 + TypeScript)             │
│          Tailwind CSS · shadcn/ui · Zod                 │
│                  localhost:3000                         │
└────────────────────┬────────────────────────────────────┘
                     │  HTTP REST API (JSON)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                       Server                            │
│         Express 5 (Node.js + TypeScript)                │
│              Zod Validation · CORS                      │
│                  localhost:5000                         │
└────────────────────┬────────────────────────────────────┘
                     │  Prisma ORM
                     ▼
┌─────────────────────────────────────────────────────────┐
│                     Database                            │
│                PostgreSQL (v14+)                        │
│         Models: Visitor · EmployeeGatePass              │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Role |
|---|---|
| Next.js 16 (App Router) | React framework, SSR, routing |
| React 19 | UI component model |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| shadcn/ui | Accessible UI primitives |
| Zod | Client-side form validation |
| Lucide React | Icon set |

### Backend
| Technology | Role |
|---|---|
| Express 5 | HTTP server & routing |
| TypeScript | Type safety |
| Prisma ORM | Database schema, migrations, queries |
| PostgreSQL | Relational database |
| Zod | Request body validation |
| CORS | Cross-Origin Resource Sharing |
| dotenv | Environment configuration |

---

## 📁 Repository Structure

```
Gate-Pass-Security-Management/
│
├── backend/                 # Express + Prisma REST API
│   ├── prisma/
│   │   ├── migrations/      # Database migration history
│   │   └── schema.prisma    # Data models & database config
│   ├── src/
│   │   ├── lib/             # Prisma client singleton
│   │   ├── modules/
│   │   │   ├── employees/   # Gate pass CRUD (controller, service, routes)
│   │   │   └── visitors/    # Visitor CRUD (controller, service, routes)
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Helper utilities
│   │   ├── validation/      # Zod validation schemas
│   │   └── index.ts         # Server entry point
│   ├── .env.example
│   └── README.md            # ← Backend documentation
│
├── frontend/                # Next.js App Router web client
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/   # Operations dashboard page
│   │   │   ├── login/       # Login page
│   │   │   └── page.tsx     # Public landing page
│   │   ├── components/ui/   # Reusable UI components
│   │   ├── lib/             # Shared utilities
│   │   └── section/         # Page section components (Navbar, Hero, Footer)
│   ├── .env.example
│   └── README.md            # ← Frontend documentation
│
└── README.md                # ← You are here (root overview)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/noboKumar/Gate-Pass-Security-Management.git
cd Gate-Pass-Security-Management
```

---

### Step 2 — Set Up the Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start the API server
npm run dev
```

> The API will be running at **`http://localhost:5000`**

---

### Step 3 — Set Up the Frontend

Open a **new terminal tab/window**:

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Ensure NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

> The application will be available at **`http://localhost:3000`**

---

## 📡 API Overview

| Resource | Base Endpoint | Description |
|---|---|---|
| Health Check | `GET /health` | Server & DB status |
| Visitors | `/api/visitors` | Visitor CRUD operations |
| Gate Passes | `/api/gate-passes` | Employee gate pass CRUD |

For full API documentation, including request/response bodies, see the **[Backend README](./backend/README.md)**.

---

## ✨ Features

### Visitor Management
- ✅ Register new visitors with full details (name, mobile, company, purpose, host)
- ✅ Search visitors by mobile number in real-time
- ✅ Record check-in timestamp automatically on registration
- ✅ Update check-out time when visitor exits
- ✅ Delete visitor records from the log

### Employee Gate Pass Management
- ✅ Issue gate passes with employee name, department, reason, and exit time
- ✅ Three-stage status workflow: `PENDING` → `APPROVED` → `RETURNED`
- ✅ Update and delete gate pass records
- ✅ Full record history for accountability

### System & Infrastructure
- ✅ Full TypeScript coverage across both frontend and backend
- ✅ Zod schema validation on both client and server
- ✅ Prisma ORM with versioned database migrations
- ✅ Health check endpoint with DB connectivity status
- ✅ CORS-configured for local and deployed environments
- ✅ Environment-based configuration via `.env` files

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please ensure your code follows the existing TypeScript conventions and that all API changes are reflected in the documentation.

---

<div align="center">

Made with ❤️ · **Gate Pass Security Management System**

</div>
