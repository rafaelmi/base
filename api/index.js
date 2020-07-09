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

app.use(require('./validation'))

const paths = [
  '/admin',
  '/user'
].forEach(path => {
  app.use(path, require('.' + path))
})

app.use(require('./broadcast')(io))

app.use((req, res, next) => {
  res.json(response(res.locals.code || 200, res.locals.data))
})

app.use(require('./error'))

io.on('connection', (socket) => {})
// io.of('/consultas').on('connection', (socket) => {})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`listening on ${port}`)
})
