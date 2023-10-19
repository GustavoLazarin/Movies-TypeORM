import { z } from "zod";
import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schema";
import { Movie } from "../entities";

export type TCreateMovie = z.infer<typeof createMovieSchema>
export type TUpdateMovie = z.infer<typeof updateMovieSchema>

export interface IMoviesPaginationParams {
    page: number
    perPage: number,
    sort: string,
    order: string,
    prevPage: string | null,
    nextPage: string | null
}

export interface IMoviesReturn {
    prevPage: string | null
    nextPage: string | null
    count: number,
    data: Movie[]
}