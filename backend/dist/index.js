"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./lib/prisma");
const visitors_route_1 = __importDefault(require("./modules/visitors/visitors.route"));
const employees_route_1 = __importDefault(require("./modules/employees/employees.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Register API Routes
app.use('/api/visitors', visitors_route_1.default);
app.use('/api/gate-passes', employees_route_1.default);
// Health Check Endpoint
app.get('/health', async (_req, res) => {
    try {
        // Test database connection
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            status: 'OK',
            database: 'CONNECTED',
            timestamp: new Date()
        });
    }
    catch (error) {
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
