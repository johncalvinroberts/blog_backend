const Post = require('../models/post')

module.exports = function (app, db) {
  app.post('/posts', (req, res, next) => {
    const {title} = req.body
    console.log(title)
    const slug = title.split(' ')
                      .map(word => {
                        return word.replace(/[^A-Za-z0-9]/g, '').split('').map(letter => letter.toLowerCase()).join('')
                      })
                      .join('-')
    Post.create({title, slug})
      .then(post => res.status(200).json(post))
      .catch(err => next(err))
  })
  app.put('/posts', (req, res, next) => {

  })
}
