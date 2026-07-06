import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middlewares/admin/errorHandler.middleware";
import { globalRateLimitMiddleware } from "./middlewares/admin/rateLimit.middleware";
import helmet from "helmet";
import hpp from "hpp";

const app: Express = express();
// trust proxy để app biết request chạy qua proxy trước nên lấy ip của người dùng chứ không lấy của proxy
// app.set("trust proxy", true);
//sử dụng helmet để thêm bảo mật vào headers
app.use(helmet());
// cau hinh domain gui request
app.use(cors({
    origin: "http://localhost:3002",
    credentials: true
}));
//cấu hình ratelimit tổng
app.use(globalRateLimitMiddleware);
// cau hinh de doc dữ liệu json và cookie người dùng gửi lên
app.use(express.json({limit: "100kb"}));
app.use(cookieParser());
//sử dụng hpp để chuẩn hóa query
app.use(hpp());

clientRoutes(app);
adminRoutes(app);
// xử lí lỗi
app.use(errorHandlerMiddleware);

export default app;