import { Router } from "express";
import { reframe } from "../controllers/aiController";

const router: Router = Router();

router.post("/reframe", reframe);

export default router;
