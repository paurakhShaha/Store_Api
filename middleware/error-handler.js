const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ message: err.message })
}

module.exports = errorHandlerMiddleware;