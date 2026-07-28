import { Request, Response } from "express";
import { VisitorsService } from "./visitors.service";
import { visitorSchema } from "../../validation";

const service = new VisitorsService();

export const getVisitors = async (req: Request, res: Response): Promise<void> => {
  try {
    const mobile = req.query.mobile as string | undefined;
    const visitors = await service.getAll(mobile);
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
  }
};

export const createVisitor = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = visitorSchema.parse(req.body);
    const visitor = await service.create(validatedData);
    res.status(201).json(visitor);
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation (mobile number is unique in schema)
      res.status(400).json({ error: "A visitor with this mobile number is already checked in." });
      return;
    }
    res.status(400).json({ error: error.message || "Invalid request data" });
  }
};

export const updateVisitor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = visitorSchema.partial().parse(req.body);
    const visitor = await service.update(id, validatedData);
    res.json(visitor);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid request data" });
  }
};

export const deleteVisitor = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await service.delete(id);
    res.json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
  }
};