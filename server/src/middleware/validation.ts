// Request validation middleware
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiResponse } from "../types";

export const validateRequest = (schema: {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    // Validate request body
    if (schema.body) {
      const { error } = schema.body.validate(req.body);
      if (error) {
        errors.push(
          `Body: ${error.details.map((detail) => detail.message).join(", ")}`
        );
      }
    }

    // Validate request params
    if (schema.params) {
      const { error } = schema.params.validate(req.params);
      if (error) {
        errors.push(
          `Params: ${error.details.map((detail) => detail.message).join(", ")}`
        );
      }
    }

    // Validate request query
    if (schema.query) {
      const { error } = schema.query.validate(req.query);
      if (error) {
        errors.push(
          `Query: ${error.details.map((detail) => detail.message).join(", ")}`
        );
      }
    }

    if (errors.length > 0) {
      const response: ApiResponse = {
        success: false,
        error: `Validation failed: ${errors.join("; ")}`,
        statusCode: 400,
      };
      res.status(400).json(response);
      return;
    }

    next();
  };
};

// Common validation schemas
export const commonSchemas = {
  id: Joi.object({
    id: Joi.string().required().min(1),
  }),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
  }),
};
