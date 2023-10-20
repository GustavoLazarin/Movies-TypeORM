import { NextFunction, Request, Response } from "express";
import { movieRepo } from "../repositories";
import { AppError } from "../errors/AppError.error";

export const verifyMovieId = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const foundMovie = await movieRepo.findOneBy({id: id});

    if (!foundMovie) {
        throw new AppError("Movie not found", 404);
    }

    res.locals.movie = foundMovie;

    return next();
};