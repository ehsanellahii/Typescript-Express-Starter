import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

const format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss:ms'
    }),
    winston.format.colorize({level: true}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: `${process.env.LOG_DIR || 'logs'}/${process.env.ALL_LOG_FILE || 'all.log'}`
    }),
    new winston.transports.File({
        filename: `${process.env.LOG_DIR || 'logs'}/${process.env.ERROR_LOG_FILE || 'error.log'}`,
        level: 'errors'
    })
]

const level = () => {
    const env = process.env.ENVIRONMENT || "development";
    return env === "development" ? "debug" : "warn";
}

winston.addColors(colors);

const Logger = winston.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: transports
});

export default Logger;