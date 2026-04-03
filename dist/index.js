"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Test route
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
// ✅ Add API (important for your button)
app.post("/api/add", (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        // 👉 Yaha DB save logic bhi add kar sakte ho
        console.log("Received:", name);
        res.status(200).json({
            success: true,
            message: "Data added successfully",
            data: { name }
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// ✅ Port config
const PORT = process.env.PORT || 5000;
// ✅ Server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
