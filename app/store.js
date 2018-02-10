const knex = require('knex')(require('../knexfile'))

module.exports = {
  createUser ({ username, password }) {
    console.log(`Add user ${username} with password ${password}`)
    return knex('users').insert({
      username,
      password
    })
  },
  createPost ({ title, body }) {
    console.log(`Add post ${title}`)
    return knex('posts').insert({
      title,
      body
    })
  },
  fetchPost (slug) {
    return knex('posts').where('slug', slug)
  }
}
