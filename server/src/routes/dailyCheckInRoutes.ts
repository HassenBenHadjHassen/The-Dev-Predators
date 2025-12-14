import { Router } from "express";
import { DailyCheckInController } from "../controllers/DailyCheckInController";
import { requireAuth as authMiddleware } from "../middleware/auth";


const router = Router();
const dailyCheckInController = new DailyCheckInController();

router.post("/", authMiddleware, dailyCheckInController.create);

export default router;
