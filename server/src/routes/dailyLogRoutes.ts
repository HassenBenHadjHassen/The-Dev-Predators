import { Router } from "express";
import { DailyLogController } from "../controllers/DailyLogController";
import { requireAuth } from "../middleware/auth";

const router = Router();
const dailyLogController = new DailyLogController();

router.post("/create", requireAuth, dailyLogController.create);
router.get("/", requireAuth, dailyLogController.getLogs);

export default router;
