import { Request, Response } from "express";
import { EmployeesService } from "./employees.service";
import { employeeGatePassSchema } from "../../validation";

const service = new EmployeesService();

export const getGatePasses = async (_req: Request, res: Response): Promise<void> => {
  try {
    const passes = await service.getAll();
    res.json(passes);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
  }
};

export const createGatePass = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = employeeGatePassSchema.parse(req.body);
    const pass = await service.create(validatedData);
    res.status(201).json(pass);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request data" });
  }
};

export const updateGatePass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = employeeGatePassSchema.partial().parse(req.body);
    const pass = await service.update(id, validatedData);
    res.json(pass);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Invalid request data" });
  }
};

export const deleteGatePass = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await service.delete(id);
    res.json({ message: "Gate pass deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Server error" });
  }
};
