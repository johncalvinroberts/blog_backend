const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: false,
    trim: true
  },
  body: {
    type: String,
    unique: false,
    required: false
  },
  slug: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: {slug: {$type: 'string'}}
    }
  },
  imgUrl: String,
  tags: [String]
}, {
  timestamps: true
})

PostSchema.statics.findBySlug = function (slug) {
  return new Promise((resolve, reject) => {
    Post.findOne({slug: slug})
      .then(post => resolve(post))
      .catch(err => reject(err))
  })
}

PostSchema.statics.getList = function (params) {
  return new Promise((resolve, reject) => {
    const skipAmt = params.page ? (params.page * 10) - 10 : 0
    const tags = params.tags ? params.tags.split(',') : null
    const query = Post.find()
    if (tags) query.where('tags').all(tags)
    query
      .skip(skipAmt)
      .limit(10)
      .sort('-createdAt')
      .select(['slug', 'title', 'createdAt', 'imgUrl'])
      .then(posts => resolve(posts))
      .catch(err => reject(err))
  })
}

const Post = mongoose.model('Post', PostSchema)
module.exports = Post
