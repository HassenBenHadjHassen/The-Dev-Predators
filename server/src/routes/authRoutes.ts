import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middleware/auth";

const router: Router = Router();
const userController = new UserController();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.get("/me", authenticateToken, userController.getMe);

// Admin only (example, unused for now)
// router.get("/", authenticateToken, requireRole(["admin"]), userController.findAll);

export default router;
