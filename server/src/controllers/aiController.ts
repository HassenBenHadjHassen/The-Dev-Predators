import { Request, Response, NextFunction } from "express";
import { reframeThought } from "../services/aiService";
import Joi from "joi";

const reframeSchema = Joi.object({
  thought: Joi.string().required().min(5).max(1000),
});

export const reframe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = reframeSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: "Invalid input",
        error: error.details[0].message,
      });
      return;
    }

    const { thought } = value;
    const result = await reframeThought(thought);

    res.status(200).json({
      success: true,
      data: {
        originalThought: thought,
        reframedThought: result.reframedThought,
        reasoning: result.reasoning,
      },
    });
  } catch (error) {
    next(error);
  }
};
