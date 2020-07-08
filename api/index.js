const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const redis = require('redis')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const response = require('./response')
const broadcast = require('./broadcast')


let RedisStore = require('connect-redis')(session)
const store = new RedisStore({ client: redis.createClient() })

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())
app.use(session({
    store: store,
    secret: '73b8fb0e0903297535a2b2f308d0fe41',
    resave: false,
    saveUninitialized: true
  })
)

function checkPermission({url, session}, res, next) {
  const public = {
    user: {
      info: true,
      logout: true,
      login: true
    }
  }
  let path = url.split('/')
  path.shift()
  if (path.reduce((acc, cur) => {
      return ((typeof acc) === 'object') && acc[cur]
    }, Object.assign({}, session.permisos, public))
  ) next()
  else next(403)
}

function errorPhase(err, req, res, next) {
  const code = (typeof(err) === 'number') ? err : 500
  res.status(code)
  res.json(response(code, err, err.stack))
}

app.use('/', (req, res, next) => {
  res.json(response(200))
  next()
})

app.use('/', broadcast({ io }))
app.use('/', errorPhase)

io.on('connection', (socket) => {})
// io.of('/consultas').on('connection', (socket) => {})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`listening on ${port}`)
})
