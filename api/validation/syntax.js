const router = require('express').Router()

router.use(({body, session}, res, next) => {
  next()
})

module.exports = router
