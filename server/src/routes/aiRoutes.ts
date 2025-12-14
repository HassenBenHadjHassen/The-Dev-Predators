import { Router } from "express";
import { reframe } from "../controllers/aiController";
import { requireAuth } from "../middleware/auth";

const router: Router = Router();

router.post("/reframe", requireAuth, reframe);

export default router;
