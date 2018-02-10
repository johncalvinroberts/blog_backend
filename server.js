const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const port = 8000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// connect to MongoDB
mongoose.connect('mongodb://localhost/blog_backend')
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected to db')
})

app.use(session({
  secret: 'somethingspecial',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

require('./app/routes')(app, {})

app.listen(port, () => {
  console.log(`live on port ${port}`)
})
