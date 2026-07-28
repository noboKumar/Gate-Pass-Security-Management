import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { prisma } from "./lib/prisma";
import visitorsRouter from "./modules/visitors/visitors.route";
import employeesRouter from "./modules/employees/employees.route";

dotenv.config();

const app = express();

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : "";

const allowedOrigins = [
  "http://localhost:3000",
  "https://gate-pass-management-system-drab.vercel.app",
  clientUrl,
].filter(Boolean);

// parsers
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      
      const cleanOrigin = origin.replace(/\/$/, "");
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/visitors", visitorsRouter);
app.use("/api/gate-passes", employeesRouter);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "OK",
      database: "CONNECTED",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
    });
  }
});

app.get("/api", (_req, res) => {
  res.json({
    message: "Gate Pass Security Management API",
  });
});

export default app;
