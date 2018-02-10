const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true
  },
  body: {
    type: String,
    unique: false,
    required: false
  },
  slug: {
    type: String,
    unique: true,
    required: false
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
