module.exports = (io) => {
  const router = require('express').Router()

  /* router.post('/consultas/create', ({ body, session }) => {
    io.of('/historial').emit('pacientes', [ body ])
  }) */
  router.use((req, res, next) => {
    // console.log('broo¿a')
    next()
  })

  return router
}
