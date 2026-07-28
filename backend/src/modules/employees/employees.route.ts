import express from "express";
import {
  getGatePasses,
  createGatePass,
  updateGatePass,
  deleteGatePass,
} from "./employees.controller";

const router = express.Router();

router.get("/", getGatePasses);
router.post("/", createGatePass);
router.put("/:id", updateGatePass);
router.delete("/:id", deleteGatePass);

export default router;
