const Post = require('../models/post')
const slugify = require('../utils/slugify')

module.exports = function (app, db) {
  app.post('/posts', (req, res, next) => {
    // need to authorize session id to the author
    Post.create({})
      .then(post => res.status(200).json(post))
      .catch(err => next(err))
  })

  app.put('/posts/:id', (req, res, next) => {
    // need to authorize session id to the author
    const post = req.params.id
    const {body, title, imgUrl, slug, subtitle, tags} = req.body
    const params = {body, title, imgUrl, slug, subtitle, tags}
    if (title) params.slug = slugify(title)
    if (tags) params.tags = JSON.parse(tags)
    Object.keys(params).map(field => {
      if (!params[field]) {
        delete params[field]
      }
    })
    Post.findByIdAndUpdate(post, params, {new: true})
      .then(post => res.status(200).json(post))
      .catch(err => next(err))
  })

  app.delete('/posts/:id', (req, res, next) => {
    // need to authorize session id to the author
    const id = req.params.id
    Post.findByIdAndRemove(id)
      .then(post => {
        res.status(200).json({})
      })
      .catch(err => next(err))
  })

  // get post
  app.get('/posts/:slug', (req, res, next) => {
    const slug = req.params.slug
    const post = Post.findBySlug(slug)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => next(err))
  })

  // get list of posts
  app.get('/posts', (req, res, next) => {
    const params = req.query
    Post.getList(params)
      .then(posts => res.status(200).json(posts))
      .catch(err => next(err))
  })
}
