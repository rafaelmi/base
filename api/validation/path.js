const router = require('express').Router()

const paths = [
  '/admin/users/create',
  '/user/login',
  '/user/logout',
  '/user/info'
].forEach(path => {
  router.post(path, (req, res, next) => {
    next('router')
  })
})

router.use((req, res, next) => {
  next(404)
})

module.exports = router
