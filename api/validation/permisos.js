const router = require('express').Router()

const public = {
  user: {
    info: true,
    logout: true,
    login: true
  }
}

router.use(({url, session}, res, next) => {
  let path = url.split('/')
  path.shift()
  if (path.reduce((acc, cur) => {
      return ((typeof acc) === 'object') && acc[cur]
    }, Object.assign({}, session.permisos, public))
  ) next()
  else next(403)
})

module.exports = router
