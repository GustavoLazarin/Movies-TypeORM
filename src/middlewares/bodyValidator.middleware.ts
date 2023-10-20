import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const bodyValidator = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const body = schema.parse(req.body);

    res.locals.validatedBody = body;

    return next();
};
