import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "any.required": "Password is required",
    }),

  displayName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.min": "Display name must be at least 2 characters",
      "string.max": "Display name cannot exceed 50 characters",
      "any.required": "Display name is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "any.required": "Password is required",
    }),
});

const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });

      return;
    }

    req.body = value;

    next();
  };

export {
  registerSchema,
  loginSchema,
  validate,
};