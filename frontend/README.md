# 🖥️ Gate Pass Security Management — Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A modern, responsive web application for real-time security management at the gate — built with Next.js App Router.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Features](#-pages--features)
- [Components](#-components)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)

---

## 🌐 Overview

The frontend is a **Next.js 16** application built with the **App Router**, providing a fast, server-rendered UI for security personnel to manage visitor check-ins and employee gate passes.

The interface communicates directly with the backend REST API and features a clean, professional layout with a responsive navigation bar, a public-facing landing page, and a protected dashboard for operations management.

**Key Capabilities:**
- Real-time visitor registration and check-in/check-out tracking
- Employee gate pass issuance and status management (`PENDING` → `APPROVED` → `RETURNED`)
- Searchable visitor log filtered by mobile number
- Responsive layout supporting desktop and mobile viewports
- Zod-powered client-side form validation

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.12 | React framework with App Router & SSR |
| **React** | 19.2.4 | UI component library |
| **TypeScript** | ^5 | Static type checking |
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **shadcn/ui** | ^4.16.0 | Accessible, headless UI primitives |
| **@base-ui/react** | ^1.6.0 | Unstyled accessible component library |
| **Lucide React** | ^1.27.0 | Icon library |
| **Zod** | ^4.4.3 | Client-side schema validation |
| **clsx** | ^2.1.1 | Conditional class name utility |
| **tailwind-merge** | ^3.6.0 | Tailwind class conflict resolution |
| **tw-animate-css** | ^1.4.0 | Animation utilities for Tailwind |

---

## 📁 Project Structure

```
frontend/
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── dashboard/
│   │   │   └── page.tsx     # Main operations dashboard
│   │   ├── login/           # Login / authentication page
│   │   ├── LayoutWrapper.tsx # Client-side layout wrapper
│   │   ├── globals.css      # Global styles & Tailwind directives
│   │   ├── layout.tsx       # Root layout with font & metadata
│   │   └── page.tsx         # Landing / home page
│   ├── components/
│   │   └── ui/
│   │       └── button.tsx   # Reusable Button component (shadcn)
│   ├── lib/
│   │   └── utils.ts         # Utility helpers (cn, etc.)
│   └── section/
│       ├── NavBar.tsx       # Top navigation bar
│       ├── Hero.tsx         # Landing page hero section
│       └── Footer.tsx       # Site footer
├── .env                     # Local environment variables (not committed)
├── .env.example             # Environment variable template
├── components.json          # shadcn/ui component configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript compiler options
└── package.json
```

---

## 📄 Pages & Features

### `/` — Landing Page
The public-facing entry point of the application.
- Hero section with branding and call-to-action
- Navigation bar with site-wide links
- Footer with project information

### `/login` — Login Page
Authentication gateway for security personnel.
- Credential form for access to the operations dashboard

### `/dashboard` — Operations Dashboard _(Protected)_
The core interface for day-to-day security operations.

**Visitor Management Tab:**
- View all active and historical visitor records
- Register a new visitor with full details (name, mobile, company, purpose, host)
- Search visitors by mobile number
- Update check-out time
- Delete a visitor record

**Employee Gate Pass Tab:**
- View all issued gate passes with current status badges
- Issue a new gate pass for an employee (name, department, reason, exit time)
- Update gate pass status: `PENDING` → `APPROVED` → `RETURNED`
- Delete a gate pass record

---

## 🧩 Components

### Layout Components

| Component | Location | Description |
|---|---|---|
| `NavBar` | `src/section/NavBar.tsx` | Responsive top navigation bar |
| `Hero` | `src/section/Hero.tsx` | Landing page hero section |
| `Footer` | `src/section/Footer.tsx` | Site-wide footer |
| `LayoutWrapper` | `src/app/LayoutWrapper.tsx` | Client-side layout logic wrapper |

### UI Primitives

| Component | Location | Description |
|---|---|---|
| `Button` | `src/components/ui/button.tsx` | Variant-aware button (shadcn/ui) |

### Utilities

| Utility | Location | Description |
|---|---|---|
| `cn()` | `src/lib/utils.ts` | Merges Tailwind class names safely |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- Backend API running at `http://localhost:5000` (see [Backend README](../backend/README.md))

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your backend API URL (see [Environment Variables](#-environment-variables)).

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at **`http://localhost:3000`**.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | — | Base URL for the backend REST API |

> **Note:** All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser bundle. Do not store secrets in these variables.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js development server with hot-reload |
| `npm run build` | Build the optimized production bundle |
| `npm start` | Start the production server (requires `build` first) |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔐 Security Notes

- The `.env` file is excluded from version control via `.gitignore`
- Client-side forms use Zod for input validation before any API calls
- Ensure `NEXT_PUBLIC_API_URL` is set correctly per environment (development vs. production)

---

<div align="center">

Built with ❤️ using **Next.js**, **React 19**, and **Tailwind CSS**

</div>
