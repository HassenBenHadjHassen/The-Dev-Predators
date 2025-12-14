import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { DailyCheckInService } from "../services/DailyCheckInService";
import { UserService } from "../services/UserService";
import { AuthRequest } from "../middleware/auth";
import { TimelineService } from "../services/TimelineService";

export class DailyCheckInController extends BaseController {
    private dailyCheckInService: DailyCheckInService;
    private userService: UserService;

    constructor() {
        super();
        this.dailyCheckInService = new DailyCheckInService();
        this.userService = new UserService();
    }

    public create = async (
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

            const { age, intensity, intensityLevel, situation, goal, ...otherData } = req.body;

            // Update user age if provided
            if (age) {
                await this.userService.update(authReq.user.userId, { age: parseInt(age) });
            }

            const checkInData = {
                ...otherData,
                intensityLevel: intensityLevel || intensity,
                situation: situation ? [situation] : [],
                goal: goal ? [goal] : [],
                userId: authReq.user.userId,
            };

            const result = await this.dailyCheckInService.create(checkInData);

            // Create timeline event
            const timelineService = new TimelineService();
            await timelineService.createEvent({
                userId: authReq.user.userId,
                type: "CHECK_IN",
                title: "Daily Check-in",
                description: `Recorded mood: ${otherData.emotionalState}`,
                stressChange: -2, // Checking in reduces stress slightly
            });

            this.sendServiceResponse(res, result, 201);
        });
    };

    public findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        this.handleRequest(req, res, next, async () => {
            const result = await this.dailyCheckInService.findById(req.params.id);
            this.sendServiceResponse(res, result);
        });
    };

    public findAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        this.handleRequest(req, res, next, async () => {
            const result = await this.dailyCheckInService.findAll(req.query);
            this.sendServiceResponse(res, result);
        });
    };

    public update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        this.handleRequest(req, res, next, async () => {
            const result = await this.dailyCheckInService.update(req.params.id, req.body);
            this.sendServiceResponse(res, result);
        });
    };

    public delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        this.handleRequest(req, res, next, async () => {
            const result = await this.dailyCheckInService.delete(req.params.id);
            this.sendServiceResponse(res, result);
        });
    };
}
