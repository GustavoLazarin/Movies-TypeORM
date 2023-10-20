import { Movie } from "../entities";
import { IMoviesPaginationParams, IMoviesReturn, TCreateMovie, TUpdateMovie } from "../interfaces/movies.interface";
import { movieRepo } from "../repositories";
import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schema";

export const createMovieService = async (data: TCreateMovie) => {
    const movieBody = createMovieSchema.parse(data);
    const NewMovie: Movie = movieRepo.create(movieBody);

    await movieRepo.save(NewMovie);

    return NewMovie;
}

export const getAllMoviesService = async ({page, perPage, sort, order, prevPage, nextPage}: IMoviesPaginationParams) => {

    if (sort === "id") {
        order = "asc";
    }

    const [movies, count] = await movieRepo.findAndCount({
        take: perPage,
        skip:  page,
        order: {[sort]: order}
    });

    const response: IMoviesReturn = {
        prevPage: page <= 1 ? null: prevPage,
        nextPage: count - page <= perPage ? null : nextPage,
        count: count,
        data: movies
    }

    return response;
}

export const updateMovieService = async (movie: Movie, data: TUpdateMovie) => {
    const movieBody = updateMovieSchema.parse(data);

    const updatedMovie: Movie =  await movieRepo.save({...movie, ...movieBody});

    return updatedMovie;
}

export const deleteMovieService = async (movie: Movie) => {
    return await movieRepo.remove(movie);
}