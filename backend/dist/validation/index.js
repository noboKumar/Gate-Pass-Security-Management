"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGatePassSchema = exports.createGatePassSchema = exports.employeeGatePassSchema = exports.updateVisitorSchema = exports.createVisitorSchema = exports.visitorSchema = void 0;
const zod_1 = require("zod");
exports.visitorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    mobile: zod_1.z.string().min(11, "Mobile is required"),
    company: zod_1.z.string().optional(),
    purpose: zod_1.z.string().min(1, "Purpose is required"),
    personToMeet: zod_1.z.string().min(1, "Person to meet is required"),
    checkOut: zod_1.z.coerce.date().optional(),
});
// Create
exports.createVisitorSchema = zod_1.z.object({
    body: exports.visitorSchema,
});
// Update
exports.updateVisitorSchema = zod_1.z.object({
    body: exports.visitorSchema.partial(),
});
exports.employeeGatePassSchema = zod_1.z.object({
    employeeName: zod_1.z.string().min(1, "Employee name is required"),
    department: zod_1.z.string().min(1, "Department is required"),
    reason: zod_1.z.string().min(1, "Reason is required"),
    exitTime: zod_1.z.coerce.date().optional(),
    status: zod_1.z.enum(["PENDING", "APPROVED", "RETURNED"]).optional(),
});
// Create
exports.createGatePassSchema = zod_1.z.object({
    body: exports.employeeGatePassSchema,
});
// Update
exports.updateGatePassSchema = zod_1.z.object({
    body: exports.employeeGatePassSchema.partial(),
});
