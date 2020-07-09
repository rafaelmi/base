const router = require('express').Router()

const paths = [
  '/users'
].forEach(path => {
  router.use(path, require('.' + path))
})

module.exports = router
