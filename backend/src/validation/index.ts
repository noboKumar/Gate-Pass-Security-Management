import { z } from "zod";

export const visitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(11, "Mobile is required"),
  company: z.string().optional(),
  purpose: z.string().min(1, "Purpose is required"),
  personToMeet: z.string().min(1, "Person to meet is required"),
  checkOut: z.date().optional(),
});

export const employeeGatePassSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  department: z.string().min(1, "Department is required"),
  reason: z.string().min(1, "Reason is required"),
  exitTime: z.string().min(1, "Exit time is required"),
  returnTime: z.string().optional(),
  status: z.enum(["PENDING", "APPROVED", "RETURNED"]).optional(),
});
