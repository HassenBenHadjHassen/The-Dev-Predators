import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { DailyLogService } from "../services/DailyLogService";

export class DailyLogController extends BaseController {
    private dailyLogService: DailyLogService;

    constructor() {
        super();
        this.dailyLogService = new DailyLogService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { content } = req.body;
            const authReq = req as any; // Assuming auth middleware attaches user

            if (!content) {
                this.sendError(res, "Content is required");
                return;
            }

            if (!authReq.user || !authReq.user.userId) {
                this.sendError(res, "Unauthorized", 401);
                return;
            }

            const log = await this.dailyLogService.createLog(authReq.user.userId, content);

            this.sendSuccess(res, log, "Log entry created successfully", 201);
        } catch (error) {
            next(error);
        }
    };

    public getLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authReq = req as any;
            if (!authReq.user || !authReq.user.userId) {
                this.sendError(res, "Unauthorized", 401);
                return;
            }

            const logs = await this.dailyLogService.getUserLogs(authReq.user.userId);
            this.sendSuccess(res, logs);
        } catch (error) {
            next(error);
        }
    };

    // Implement abstract methods
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
}
