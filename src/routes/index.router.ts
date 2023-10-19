import { Router } from "express";
import { movieRouter } from "./movies.router";

export const router = Router();

router.use("/movies", movieRouter);