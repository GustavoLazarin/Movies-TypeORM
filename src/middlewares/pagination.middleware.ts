import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { IMoviesPaginationParams } from "../interfaces/movies.interface";

export const pagination = (req: Request, res: Response, next: NextFunction) => {

    const queryPage = Number(req.query.page);
    const queryPerPage = Number(req.query.perPage);

    const page = queryPage && queryPage > 1 ? queryPage : 1;
    const perPage = queryPerPage && queryPerPage > 0 && queryPerPage <= 5 ? queryPerPage : 5;
    
    const querySort = String(req.query.sort);
    const queryOrder = String(req.query.order);

    const sortOptions = ["price", "duration", "id"];
    const orderOptions = ["asc", "desc"];

    const sort = querySort && sortOptions.includes(querySort) ? querySort : "id";
    const order = queryOrder && orderOptions.includes(queryOrder) ? queryOrder : "asc";

    const baseUrl = `http://localhost:${process.env.PORT || 3000}/movies`;
    const prevPage = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
    const nextPage = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;


    const pagination: IMoviesPaginationParams = {
        page: perPage * (page - 1),
        perPage,
        sort,
        order,
        prevPage,
        nextPage
    }

    res.locals.pagination = pagination;

    return next();
};