const response = require('./response')

module.exports = (err, req, res, next) => {
  let code = (typeof(err) === 'number') ? err : 500
  if (err.name === 'MongoError') {
    if (err.code === 11000) {
      code = 460
      delete err.stack
    }
  }
  if (typeof(err) === 'number') err = null
  res.status(code)
  res.json(response(code, err, err && err.stack))
}
