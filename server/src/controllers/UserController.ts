import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { UserService } from "../services/UserService";
import { AuthRequest } from "../middleware/auth";

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  // Auth specific methods
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.register(req.body);
      this.sendServiceResponse(res, result, 201);
    });
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.login(req.body);
      this.sendServiceResponse(res, result);
    });
  };

  public getMe = async (
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
      const result = await this.userService.findById(authReq.user.userId);
      this.sendServiceResponse(res, result);
    });
  };

  // BaseController implementation
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.create(req.body);
      this.sendServiceResponse(res, result, 201);
    });
  };

  public findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.findById(req.params.id);
      this.sendServiceResponse(res, result);
    });
  };

  public findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.findAll(req.query);
      this.sendServiceResponse(res, result);
    });
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.update(req.params.id, req.body);
      this.sendServiceResponse(res, result);
    });
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.handleRequest(req, res, next, async () => {
      const result = await this.userService.delete(req.params.id);
      this.sendServiceResponse(res, result);
    });
  };
}
