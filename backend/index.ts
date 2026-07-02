import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import database from "./config/database";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middlewares/admin/errorHandler.middleware";
database();

const app: Express = express();
const port = Number(process.env.PORT);

app.use(cors({
    origin: "http://localhost:3002",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

clientRoutes(app);
adminRoutes(app);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})