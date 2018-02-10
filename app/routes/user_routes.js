const store = require('../store')

module.exports = function(app, db) {
  app.post('/users', (req, res) => {
    store
      .createUser({
        username: req.body.username,
        password: req.body.password
      })
      .then(() => res.sendStatus(200))
  })
}
