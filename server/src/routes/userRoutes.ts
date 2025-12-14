import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middleware/auth";

const router: Router = Router();
const userController = new UserController();

// Public routes
router.put("/update", userController.update);

export default router;
