import { z } from "zod";

export const visitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(11, "Mobile is required"),
  company: z.string().optional(),
  purpose: z.string().min(1, "Purpose is required"),
  personToMeet: z.string().min(1, "Person to meet is required"),
  checkOut: z.coerce.date().optional(),
});

// Create
export const createVisitorSchema = z.object({
  body: visitorSchema,
});

// Update
export const updateVisitorSchema = z.object({
  body: visitorSchema.partial(),
});

export const employeeGatePassSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  department: z.string().min(1, "Department is required"),
  reason: z.string().min(1, "Reason is required"),
  exitTime: z.coerce.date().optional(),
  status: z.enum(["PENDING", "APPROVED", "RETURNED"]).optional(),
});

// Create
export const createGatePassSchema = z.object({
  body: employeeGatePassSchema,
});

// Update
export const updateGatePassSchema = z.object({
  body: employeeGatePassSchema.partial(),
});
