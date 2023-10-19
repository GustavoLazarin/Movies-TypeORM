import "express-async-errors";
import express, { Application, json } from "express";
import { router } from "./routes/index.router";
import { handleError } from "./middlewares/handleError.middleware";

export const app: Application = express();

app.use(json());

app.use("/", router);

app.use(handleError);

export default app;