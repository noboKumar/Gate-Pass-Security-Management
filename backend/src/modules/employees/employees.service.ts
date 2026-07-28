import { prisma } from "../../lib/prisma";
import { GatePassStatus } from "@prisma/client";

export class EmployeesService {
  async getAll() {
    return prisma.employeeGatePass.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: {
    employeeName: string;
    department: string;
    reason: string;
  }) {
    return prisma.employeeGatePass.create({
      data,
    });
  }

  async update(
    id: string,
    data: {
      employeeName?: string;
      department?: string;
      reason?: string;
      exitTime?: Date | null;
      status?: GatePassStatus;
    }
  ) {
    return prisma.employeeGatePass.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.employeeGatePass.delete({
      where: { id },
    });
  }
}
