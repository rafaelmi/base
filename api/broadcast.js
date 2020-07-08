module.exports = ({ io }) => {
  const router = require('express').Router()

  /* router.post('/consultas/create', ({ body, session }) => {
    io.of('/historial').emit('pacientes', [ body ])
  }) */
  router.post('/', () => {}) // Finaliza el enrutamiento

  return router
}
