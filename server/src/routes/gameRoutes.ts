import { Router } from "express";
import { GameController } from "../controllers/GameController";
import { requireAuth } from "../middleware/auth";

const router = Router();
const gameController = new GameController();

router.post("/event", requireAuth, gameController.recordEvent);

export default router;
