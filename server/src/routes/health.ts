import { Request, Response, NextFunction } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.json({ status: 'ok' });
};
