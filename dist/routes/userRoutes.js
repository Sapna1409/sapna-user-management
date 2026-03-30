"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController"); // ⚠️ yahi correct path hai
const router = (0, express_1.Router)();
// ✅ CREATE
router.post("/users", userController_1.createUser);
// ✅ GET ALL
router.get("/users", userController_1.getUsers);
// ✅ UPDATE
router.put("/users/:id", userController_1.updateUser);
// ✅ DELETE
router.delete("/users/:id", userController_1.deleteUser);
exports.default = router;
