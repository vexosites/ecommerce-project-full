export default function errorHandler(err, req, res, next) {
  const status = err.status || 500

  console.log('error', err)

  return res.status(status).json({
    message: err.message || 'Internal server error'
  })
}