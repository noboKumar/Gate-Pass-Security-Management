import express from "express";
import {
  getVisitors,
  createVisitor,
  updateVisitor,
  deleteVisitor,
} from "./visitors.controller";

const router = express.Router();

router.get("/", getVisitors);
router.post("/", createVisitor);
router.put("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);

export default router;