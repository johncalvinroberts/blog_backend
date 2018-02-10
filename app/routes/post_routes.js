const store = require('../store')

module.exports = function(app, db) {
  app.post('/posts', (req, res) => {
    store
      .createPost({
        title: req.body.title
      })
      .then(() => res.sendStatus(200))
  })
  app.put('/posts', (req, res) => {
    store
      .editPost({
        title: req.body.title,
        body: req.body.body
      })
      .then(() => res.sendStatus(200))
  })
}
