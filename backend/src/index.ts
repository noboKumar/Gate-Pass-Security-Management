import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';
import visitorsRouter from './modules/visitors/visitors.route';
import employeesRouter from './modules/employees/employees.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/visitors', visitorsRouter);
app.use('/api/gate-passes', employeesRouter);

// Health Check Endpoint
app.get('/health', async (_req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'OK',
      database: 'CONNECTED',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'DISCONNECTED',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    });
  }
});

// Root API Endpoint
app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to the Gate Pass Security Management API' });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
