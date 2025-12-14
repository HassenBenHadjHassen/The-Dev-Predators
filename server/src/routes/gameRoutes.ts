import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router();
const gameController = new GameController();

router.post("/event", gameController.recordEvent);

export default router;
