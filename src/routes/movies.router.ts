import { Router } from "express";
import { createMovieController, deleteMovieController, getMoviesController, updateMovieController } from "../controllers/movies.controller";
import { pagination } from "../middlewares/pagination.middleware";
import { verifyMovieName } from "../middlewares/verifyMovieName.middleware";
import { verifyMovieId } from "../middlewares/verifyMovieId.middleware";

export const movieRouter = Router();

movieRouter.post("/", verifyMovieName, createMovieController);
movieRouter.get("/", pagination, getMoviesController);

movieRouter.use("/:id", verifyMovieId);

movieRouter.patch("/:id", verifyMovieName, updateMovieController);
movieRouter.delete("/:id", deleteMovieController);