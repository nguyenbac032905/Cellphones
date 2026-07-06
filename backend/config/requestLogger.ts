import pino from "pino";
import path from "path";

const requestLogger = pino(
    {
        level: "info",
    },
    pino.destination({
        dest: path.join(__dirname, "../logs/request.log"),
        sync: true,
    })
);

export default requestLogger;