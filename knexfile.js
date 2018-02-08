module.exports = {
  client: 'mysql',
  connection: {
    user: 'root',
    database: 'blog_backend_dev'
  }
}
// database: process.env.NODE_ENV === 'development' ? 'blog_backend_dev' : 'blog_backend_production'
