import z from "zod";

export const MovieSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number().positive(),
    price: z.number().nonnegative().int()
});

export const createMovieSchema = MovieSchema.omit({id: true});

export const updateMovieSchema = createMovieSchema.partial();