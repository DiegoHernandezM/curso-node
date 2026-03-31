import winston, { format } from 'winston';

const { combine, timestamp, json } = format;


<<<<<<< HEAD
export const logger = winston.createLogger({
=======
const logger = winston.createLogger({
>>>>>>> ef102d61333903922f9c72ae22cf36bbcebbb9f6
  level: 'info',
  format: combine(
    timestamp(),
    json(),
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));

export const buildLogger = (service: string ) => {

  return {
    log: (message: string) => {
      logger.log('info', {message, service});
    },
    error: (message: string ) => {
      logger.error('error', {
        message, 
        service,
      });
    }
  }


}
