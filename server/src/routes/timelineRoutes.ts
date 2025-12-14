import { Router } from "express";
import { TimelineController } from "../controllers/TimelineController";

const router = Router();
const timelineController = new TimelineController();

router.get("/", timelineController.getTimeline);

export default router;
