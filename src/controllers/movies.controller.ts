import { Request, Response } from "express";
import { createMovieService, deleteMovieService, getAllMoviesService, updateMovieService } from "../services/movies.services";

export const createMovieController = async (req: Request, res: Response) => {
    const newMovie = await createMovieService(res.locals.validatedBody);

    return res.status(201).json(newMovie);
}

export const getMoviesController = async (req: Request, res: Response) => {
    const allMovies = await getAllMoviesService(res.locals.pagination);

    return res.status(200).json(allMovies);
}

export const updateMovieController = async (req: Request, res: Response) => {
    const updatedMovie = await updateMovieService(res.locals.movie, res.locals.validatedBody);

    return res.status(200).json(updatedMovie);
}

export const deleteMovieController = async (req: Request, res: Response) => {
    await deleteMovieService(res.locals.movie);

    return res.status(204).json();
}