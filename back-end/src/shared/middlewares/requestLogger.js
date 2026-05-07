import { MakeLoggerComposition } from '../composition/logger.compositon.js'

const logger = MakeLoggerComposition()

export function RequestLogger(req, res, next) {
  const start = Date.now()

  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  })

  res.on('finish', () => {
    const duration = Date.now() - start

    logger.info('Request finished', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    })
  })

  next()
}