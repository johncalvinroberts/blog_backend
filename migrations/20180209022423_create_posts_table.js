exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function (t) {
    t.increments('id').primary()
    t.string('title').notNullable()
    t.string('body').notNullable()
    t.timestamps(false, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
