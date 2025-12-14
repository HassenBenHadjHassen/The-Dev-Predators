import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { TimelineService } from "../services/TimelineService";
import { AuthRequest } from "../middleware/auth";

export class TimelineController extends BaseController {
    private timelineService: TimelineService;

    constructor() {
        super();
        this.timelineService = new TimelineService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        this.handleRequest(req, res, next, async () => {
            const authReq = req as AuthRequest;
            if (!authReq.user) {
                this.sendError(res, "Not authenticated", 401);
                return;
            }

            const { title, description, type, stressChange } = req.body;

            if (!title || !type) {
                this.sendError(res, "Title and type are required");
                return;
            }

            const event = await this.timelineService.createEvent({
                userId: authReq.user.userId,
                type,
                title,
                description: description || "",
                stressChange: stressChange || 0,
            });

            this.sendSuccess(res, event, "Event created successfully", 201);
        });
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

    public getTimeline = async (
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

            const timeline = await this.timelineService.getUserTimeline(authReq.user.userId);
            const stressLevel = await this.timelineService.getUserStressLevel(authReq.user.userId);

            this.sendSuccess(res, { timeline, stressLevel });
        });
    };
}
