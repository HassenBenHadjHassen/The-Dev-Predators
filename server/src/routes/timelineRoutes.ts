import { Router } from "express";
import { TimelineController } from "../controllers/TimelineController";
import { requireAuth } from "../middleware/auth";

const router = Router();
const timelineController = new TimelineController();

router.post("/create", requireAuth, timelineController.create);
router.get("/", requireAuth, timelineController.getTimeline);

export default router;
