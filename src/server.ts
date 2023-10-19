import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./data-source";
import { app } from "./app";

AppDataSource.initialize().then(() => {
    console.log("Database connected");

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    })
})