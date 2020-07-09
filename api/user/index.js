const db = require('../connection')
const crypto = require('crypto')
const router = require('express').Router()

const table = db.get('authUsuarios')
const view = db.get('vAuthUsuarios')

function setPermisos(data) {
  const callback = (acc, permisos) => {
    Object.keys(permisos).forEach(key => {
      if (typeof(acc[key]) === 'object'){
        if (typeof(permisos[key]) === 'object'){
          callback(acc[key], permisos[key])
        }
      } else {
        acc[key] = permisos[key] || acc[key]
      }
    })
  }

  let perfiles = []
  const permisos = data.perfiles.reduce((acc, perfil) => {
    perfiles.push(perfil._id)
    callback(acc,perfil.permisos)
    return acc
  },{})

  Object.assign(data, { perfiles }, { permisos })
}

router.post('/login', ({ body, session }, res, next) => {
  let args = Object.create(body)
  if (session.username) throw 452
  args.password = crypto.createHash('sha256')
                        .update(args.password)
                        .digest('hex');
  view.findOne({_id: args.username,
                        password: args.password},
                      {castIds: false})
  .then(data => {
    if (!data) throw 401
    data.username = data._id
    data.usuario = data._id
    delete data._id
    delete data.password
    session.username = data.username
    session.usuario = data.usuario
    session.nombre = data.nombre
    session.tipo = data.tipo
    // session.allowedRooms = data.allowedRooms || []
    // data.sid = session.id

    setPermisos(data)
    Object.assign(session, { perfiles: data.perfiles }, { permisos: data.permisos })
    // res.json(response(200, data))
    next()
  }).catch(next)
})

router.post('/info', ({ body, session }, res, next) => {
  let args = Object.create(body)
  session.sid = args.sid
  if (!session.username) throw 403
  view.findOne({_id: session.username},
                      {castIds: false})
  .then(data => {
    if (!data) throw 500
    data.username = data._id;
    data.usuario = data._id;
    delete data._id;
    delete data.password;
    // data.sid = session.id
    setPermisos(data)
    res.locals.data = data
    next()
    // res.json(response(200, data))
  }).catch(next)
})

router.post('/logout', ({ body, session }, res, next) => {
  let args = Object.create(body)
  if (!session.username) throw 453
  session.destroy();
  next()
})

module.exports = router
