const router = require('express').Router()
const db = require('../connection')
const crypto = require('crypto')

const table = db.get('authUsuarios')
const view = db.get('vAuthUsuarios')

router.post('/create', ({ body }, res, next) => {
  let args = Object.create(body)
  args._id = args.username;
  delete args.username;
  args.fechaCreacion = new Date();
  args.estado = 'Activo';
  args.password = crypto.createHash('sha256')
                        .update(args.password)
                        .digest('hex');
  table.insert(args, {castIds: false})
  .then(data => {
    next()
  }).catch(next)
})

module.exports = router
