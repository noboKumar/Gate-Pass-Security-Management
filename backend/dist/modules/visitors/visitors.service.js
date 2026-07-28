"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorsService = void 0;
const prisma_1 = require("../../lib/prisma");
class VisitorsService {
    async getAll(mobile) {
        if (mobile) {
            return prisma_1.prisma.visitor.findMany({
                where: {
                    mobile: {
                        contains: mobile,
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }
        return prisma_1.prisma.visitor.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.visitor.create({
            data,
        });
    }
    async update(id, data) {
        return prisma_1.prisma.visitor.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.prisma.visitor.delete({
            where: { id },
        });
    }
}
exports.VisitorsService = VisitorsService;
