"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visitors_controller_1 = require("./visitors.controller");
const router = express_1.default.Router();
router.get("/", visitors_controller_1.getVisitors);
router.post("/", visitors_controller_1.createVisitor);
router.put("/:id", visitors_controller_1.updateVisitor);
router.delete("/:id", visitors_controller_1.deleteVisitor);
exports.default = router;
