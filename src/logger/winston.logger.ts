import {createLogger, format, transports} from 'winston';

const {combine, timestamp, printf, errors} = format;

const customFormat = printf(({level, message, timestamp, stack}) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    format.colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    errors({stack: true}),
    customFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'error.log', level: 'error'}),
  ],
});
