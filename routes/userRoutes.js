import express from "express";
import { getMe, updateUser, deleteUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
