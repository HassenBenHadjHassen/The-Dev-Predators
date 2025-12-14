import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { TimelineService } from "../services/TimelineService";
import { AuthRequest } from "../middleware/auth";
import Joi from "joi";

const gameEventSchema = Joi.object({
    type: Joi.string().valid("WIN", "LOSS").required(),
    level: Joi.number().required(),
});

export class GameController extends BaseController {
    private timelineService: TimelineService;

    constructor() {
        super();
        this.timelineService = new TimelineService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.sendError(res, "Method not implemented", 501);
    };
    public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.sendError(res, "Method not implemented", 501);
    };
    public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.sendError(res, "Method not implemented", 501);
    };
    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.sendError(res, "Method not implemented", 501);
    };
    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.sendError(res, "Method not implemented", 501);
    };

    public recordEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        this.handleRequest(req, res, next, async () => {
            const authReq = req as AuthRequest;
            if (!authReq.user) {
                this.sendError(res, "Not authenticated", 401);
                return;
            }

            const { error, value } = gameEventSchema.validate(req.body);
            if (error) {
                this.sendError(res, "Invalid input: " + error.details[0].message, 400);
                return;
            }

            const { type, level } = value;
            let stressChange = 0;
            let title = "";
            let description = "";

            if (type === "WIN") {
                stressChange = -5; // Big relief
                title = `Victory! Level ${level}`;
                description = "Completed a color therapy session successfully.";
            } else if (type === "LOSS") {
                stressChange = 2; // Slight frustration
                title = `Challenge on Level ${level}`;
                description = "Faced a challenge in color therapy.";
            }

            await this.timelineService.createEvent({
                userId: authReq.user.userId,
                type: `GAME_${type}`,
                title,
                description,
                stressChange,
            });

            this.sendServiceResponse(res, { success: true, message: "Game event recorded" });
        });
    };
}
