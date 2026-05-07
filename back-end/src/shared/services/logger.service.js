export class LoggerService {
  constructor(provider) {
    this.provider = provider
  }

  buildLog({ level = 'info', message, context = {}, error = null }) {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...context,
      ...(error && {
        error: {
          message: error.message,
          stack: error.stack
        }
      })
    }
  }

  async log(log) {
    const model = this.buildLog(log)
    return this.provider.log(model)
  }

  info(message, context = {}) {
    return this.log({
      level: 'info',
      message,
      context
    })
  }

  warn(message, context = {}) {
    return this.log({
      level: 'warn',
      message,
      context
    })
  }

  error(message, error = null, context = {}) {
    return this.log({
      level: 'error',
      message,
      context,
      error
    })
  }

  debug(message, context = {}) {
    return this.log({
      level: 'debug',
      message,
      context
    })
  }
}