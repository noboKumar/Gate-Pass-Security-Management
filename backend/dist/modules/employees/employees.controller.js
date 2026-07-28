"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGatePass = exports.updateGatePass = exports.createGatePass = exports.getGatePasses = void 0;
const employees_service_1 = require("./employees.service");
const validation_1 = require("../../validation");
const service = new employees_service_1.EmployeesService();
const getGatePasses = async (_req, res) => {
    try {
        const passes = await service.getAll();
        res.json(passes);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
    }
};
exports.getGatePasses = getGatePasses;
const createGatePass = async (req, res) => {
    try {
        const validatedData = validation_1.employeeGatePassSchema.parse(req.body);
        const pass = await service.create(validatedData);
        res.status(201).json(pass);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request data" });
    }
};
exports.createGatePass = createGatePass;
const updateGatePass = async (req, res) => {
    try {
        const id = req.params.id;
        const validatedData = validation_1.employeeGatePassSchema.partial().parse(req.body);
        const pass = await service.update(id, validatedData);
        res.json(pass);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request data" });
    }
};
exports.updateGatePass = updateGatePass;
const deleteGatePass = async (req, res) => {
    try {
        const id = req.params.id;
        await service.delete(id);
        res.json({ message: "Gate pass deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
    }
};
exports.deleteGatePass = deleteGatePass;
