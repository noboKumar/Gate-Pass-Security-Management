"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const prisma_1 = require("../../lib/prisma");
class EmployeesService {
    async getAll() {
        return prisma_1.prisma.employeeGatePass.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.employeeGatePass.create({
            data,
        });
    }
    async update(id, data) {
        return prisma_1.prisma.employeeGatePass.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.prisma.employeeGatePass.delete({
            where: { id },
        });
    }
}
exports.EmployeesService = EmployeesService;
