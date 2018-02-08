
const store = require('../store')

module.exports = function(app, db) {
  app.post('/posts', (req, res) => {
    store
      .createPost({
        title: req.body.title,
        body: req.body.body
      })
      .then(() => res.sendStatus(200))
  })
}
