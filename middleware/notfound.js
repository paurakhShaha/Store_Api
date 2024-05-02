
const notFound = (req, res, next) => {
  return res.status(404).json({ message: `Not Found - ${req.originalUrl}` })
}

module.exports = notFound;