import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import visitorsRouter from "./modules/visitors/visitors.route";
import employeesRouter from "./modules/employees/employees.route";

dotenv.config();

const app = express();

app.use(cors());
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