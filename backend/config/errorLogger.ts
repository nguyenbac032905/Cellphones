import pino from "pino";
import path from "path";

const errorLogger = pino(
    {
        level: "error",
    },
    pino.destination({
        dest: path.join(__dirname, "../logs/error.log"),
        sync: true,
    })
);

export default errorLogger;