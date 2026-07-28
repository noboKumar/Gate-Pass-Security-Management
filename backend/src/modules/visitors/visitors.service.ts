import { prisma } from "../../lib/prisma";

export class VisitorsService {
  async getAll(mobile?: string) {
    if (mobile) {
      return prisma.visitor.findMany({
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
    return prisma.visitor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: {
    name: string;
    mobile: string;
    company?: string;
    purpose: string;
    personToMeet: string;
  }) {
    return prisma.visitor.create({
      data,
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      mobile?: string;
      company?: string | null;
      purpose?: string;
      personToMeet?: string;
      checkOut?: Date | null;
    }
  ) {
    return prisma.visitor.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.visitor.delete({
      where: { id },
    });
  }
}
