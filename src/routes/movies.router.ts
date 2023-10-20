import { Router } from "express";
import { createMovieController, deleteMovieController, getMoviesController, updateMovieController } from "../controllers/movies.controller";
import { pagination } from "../middlewares/pagination.middleware";
import { verifyMovieName } from "../middlewares/verifyMovieName.middleware";
import { verifyMovieId } from "../middlewares/verifyMovieId.middleware";
import { bodyValidator } from "../middlewares/bodyValidator.middleware";
import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schema";

export const movieRouter = Router();

movieRouter.post("/", bodyValidator(createMovieSchema), verifyMovieName, createMovieController);
movieRouter.get("/", pagination, getMoviesController);

movieRouter.use("/:id", verifyMovieId);

movieRouter.patch("/:id", bodyValidator(updateMovieSchema), verifyMovieName, updateMovieController);
movieRouter.delete("/:id", deleteMovieController);