import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middleware/auth";

const router: Router = Router();
const userController = new UserController();

// Protected routes
router.put("/update", authenticateToken, userController.update);

export default router;
