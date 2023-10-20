import { NextFunction, Request, Response } from "express";
import { movieRepo } from "../repositories";
import { AppError } from "../errors/AppError.error";

export const verifyMovieName = async (req: Request, res: Response, next: NextFunction) => {

    if (req.body.name) {
        const foundMovie = await movieRepo.findOneBy({name: req.body.name});

        if (foundMovie) {
            throw new AppError("Movie already exists.", 409);
        }
    }

    return next();
};