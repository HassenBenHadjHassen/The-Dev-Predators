import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { DailyCheckInService } from "../services/DailyCheckInService";
import { AuthRequest } from "../middleware/auth";

export class DailyCheckInController extends BaseController {
    private dailyCheckInService: DailyCheckInService;

    constructor() {
        super();
        this.dailyCheckInService = new DailyCheckInService();
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

            const checkInData = {
                ...req.body,
                userId: authReq.user.userId,
            };

            const result = await this.dailyCheckInService.create(checkInData);
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
