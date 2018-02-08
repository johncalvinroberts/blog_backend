const knex = require('knex')(require('../knexfile'))

module.exports = {
  createPost ({ title, body }) {
    console.log(`Add post ${title} with body ${body}`)
    return knex('posts').insert({
      title,
      body
    })
  }
}
