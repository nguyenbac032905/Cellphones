import pino from "pino";

const errorLogger = pino({
    level: "error",
});

export default errorLogger;