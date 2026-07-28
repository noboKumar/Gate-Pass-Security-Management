"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVisitor = exports.updateVisitor = exports.createVisitor = exports.getVisitors = void 0;
const visitors_service_1 = require("./visitors.service");
const validation_1 = require("../../validation");
const service = new visitors_service_1.VisitorsService();
const getVisitors = async (req, res) => {
    try {
        const mobile = req.query.mobile;
        const visitors = await service.getAll(mobile);
        res.json(visitors);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
    }
};
exports.getVisitors = getVisitors;
const createVisitor = async (req, res) => {
    try {
        const validatedData = validation_1.visitorSchema.parse(req.body);
        const visitor = await service.create(validatedData);
        res.status(201).json(visitor);
    }
    catch (error) {
        if (error.code === "P2002") {
            // Prisma unique constraint violation (mobile number is unique in schema)
            res.status(400).json({ error: "A visitor with this mobile number is already checked in." });
            return;
        }
        res.status(400).json({ error: error.message || "Invalid request data" });
    }
};
exports.createVisitor = createVisitor;
const updateVisitor = async (req, res) => {
    try {
        const id = req.params.id;
        const validatedData = validation_1.visitorSchema.partial().parse(req.body);
        const visitor = await service.update(id, validatedData);
        res.json(visitor);
    }
    catch (error) {
        res.status(400).json({ error: error.message || "Invalid request data" });
    }
};
exports.updateVisitor = updateVisitor;
const deleteVisitor = async (req, res) => {
    try {
        const id = req.params.id;
        await service.delete(id);
        res.json({ message: "Visitor deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
    }
};
exports.deleteVisitor = deleteVisitor;
