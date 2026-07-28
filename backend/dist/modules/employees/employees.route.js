"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_controller_1 = require("./employees.controller");
const router = express_1.default.Router();
router.get("/", employees_controller_1.getGatePasses);
router.post("/", employees_controller_1.createGatePass);
router.put("/:id", employees_controller_1.updateGatePass);
router.delete("/:id", employees_controller_1.deleteGatePass);
exports.default = router;
