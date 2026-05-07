import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

export class WinstonProvider {
  constructor() {
    const { combine, timestamp, errors, json, printf, colorize } =
      winston.format

    // 🔧 melhor prática (aceita dev, development, etc.)
    this.isDev = process.env.NODE_ENV !== 'production'

    const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
      return `${timestamp} [${level}]: ${stack || message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`
    })

    const transports = []

    // 🖥️ console sempre
    transports.push(
      new winston.transports.Console({
        format: this.isDev
          ? combine(colorize(), timestamp(), errors({ stack: true }), devFormat)
          : combine(timestamp(), json())
      })
    )

    // 🚀 arquivos só em produção
    if (!this.isDev) {
      transports.push(
        new DailyRotateFile({
          filename: '/var/log/ecommerce/app-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d'
        })
      )

      transports.push(
        new DailyRotateFile({
          filename: '/var/log/ecommerce/error-%DATE%.log',
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '30d'
        })
      )
    }

    this.logger = winston.createLogger({
      level: this.isDev ? 'debug' : 'info',
      format: combine(
        timestamp(),
        errors({ stack: true }),
        this.isDev ? devFormat : json()
      ),
      transports
    })
  }
  log(log) {
    const { level = 'info', message, ...meta } = log
    this.logger.log(level, message, meta)
  }

  // 👇 opcionais (mantém compatível com uso direto também)
  info(message, meta = {}) {
    this.logger.info(message, meta)
  }

  error(message, meta = {}) {
    this.logger.error(message, meta)
  }

  warn(message, meta = {}) {
    this.logger.warn(message, meta)
  }

  debug(message, meta = {}) {
    this.logger.debug(message, meta)
  }
}