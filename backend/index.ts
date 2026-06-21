import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";

const app: Express = express();
const port = Number(process.env.PORT);

app.use(cors({
    origin: "http://localhost:3002"
}));

app.use(express.json());

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})