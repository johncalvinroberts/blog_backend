const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 8000


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

require('./app/routes')(app, {})

app.listen(port, () => {
  console.log(`live on port ${port}`)
})
