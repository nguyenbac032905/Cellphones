import pino from "pino";

const requestLogger = pino({
    level: "info",
});

export default requestLogger;