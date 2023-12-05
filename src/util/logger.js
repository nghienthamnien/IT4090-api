/* eslint-disable no-undef */
const { createLogger, format, transports, log } = require('winston');
const datefns = require('date-fns');
const path = require('path');
const fs = require('fs');
require('winston-daily-rotate-file');
const config = require('../config');

const dirLogPath = './logs';

Object.defineProperty(global, '__stack', {
    get: () => {
        // eslint-disable-next-line no-underscore-dangle
        const _prepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        Error.stackTraceLimit = 4;
        const err = new Error();
        const stack = err.stack.slice(3);
        Error.prepareStackTrace = _prepareStackTrace;
        return stack;
    },
});

const formatLocalTimezone = () =>
    datefns.format(Date.now(), 'yyyy/MM/dd HH:mm:ss');

if (!fs.existsSync(dirLogPath)) {
    fs.mkdirSync(dirLogPath);
}
const fileLogFormat = format.combine(
    format.splat(),
    format.align(),
    format.simple(),
    format.printf(
        (info) => `[${formatLocalTimezone()}]-[${info.level}]: ${info.message}`,
    ),
);

const consoleLogFormat = format.combine(
    format.colorize(),
    format.align(),
    format.splat(),
    format.simple(),
    format.printf(
        (info) => `[${formatLocalTimezone()}]-[${info.level}]:${info.message}`,
    ),
);

const transportInfo = new transports.DailyRotateFile({
    filename: path.join(dirLogPath, '/info.log'),
    maxsize: '20m',
    maxFiles: '14d',
    json: false,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    prepend: true,
});

const transportError = new transports.File({
    filename: path.join(dirLogPath, '/error.log'),
    maxsize: 30000000,
    maxFiles: 10,
    json: false,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: 'error',
    prepend: true,
});

const transportConsole = new transports.Console({
    json: false,
    format: consoleLogFormat,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true,
    level: config.logger.level,
});

const logger = createLogger({
    format: fileLogFormat,
    transports: [transportConsole, transportInfo, transportError],
    exitOnError: false,
});

const formatLogArguments = (args) => {
    let newArgs = args
        .map((element) => {
            if (element instanceof Error) {
                return `${element.name} - ${element.message} - ${element.stack}`;
            }
            if (typeof element === 'object') {
                return JSON.stringify(element);
            }
            return element;
        })
        .join(' - ');
    const currentFileName = __stack[0].getFileName();
    const regexFileName = currentFileName.split(config.projectName)[1];
    const currentLine = __stack[0].getLineNumber();
    newArgs = `${regexFileName}:${currentLine} - ${newArgs}`;
    return newArgs;
};

module.exports = {
    info: (...args) => logger.info(formatLogArguments(args)),
    debug: (...args) => logger.debug(formatLogArguments(args)),
    warn: (...args) => logger.warn(formatLogArguments(args)),
    error: (...args) => logger.error(formatLogArguments(args)),
    http: (...args) => logger.http(formatLogArguments(args)),
};
