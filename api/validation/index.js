const router = require('express').Router()

router.use(require('./path'))
router.use(require('./permisos'))
router.use(require('./syntax'))

module.exports = router
