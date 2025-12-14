import { Request, Response, NextFunction } from "express";
import { reframeThought } from "../services/aiService";
import { TimelineService } from "../services/TimelineService";
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

    // Record timeline event
    try {
      // We need userId. Check if req has user from auth middleware.
      // Assuming middleware attaches user. If not, we might skip logging or need to ensure auth.
      const authReq = req as any;
      if (authReq.user && authReq.user.userId) {
        const timelineService = new TimelineService();
        await timelineService.createEvent({
          userId: authReq.user.userId,
          type: "AI_CHAT",
          title: "Mindful Reframe",
          description: "Reframed a negative thought",
          stressChange: -3, // Reframing reduces stress
        });
      }
    } catch (err) {
      console.error("Failed to log timeline event for AI", err);
      // Don't fail the request
    }

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
