// npm install winston
const winston = require('winston')

const env = process.env.NODE_ENV || '';

    //console.log(' +++ Logger Cargado +++ ');

    let logger = winston.createLogger({
        level: 'info',
        transports : [
            new winston.transports.Console({ level:'info' }),
            new winston.transports.File({ filename: 'logger/logs/warn.log', level:'warn' }),
            new winston.transports.File({ filename: 'logger/logs/error.log', level:'error' }),
        ]
     });

/* -------- testeo de winston ------- */
// logger.log('info', "log info");        // -> a consola
// logger.log('warn', "log warn");        // -> consola y warn.log
// logger.log('error', "log error");      // -> consola y error.log


module.exports = logger;