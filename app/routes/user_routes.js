const User = require('../models/user')

module.exports = function (app, db) {
  app.post('/users', (req, res, next) => {
    const {email, username, password} = req.body
    if (email && username && password) {
      User.create({email, username, password})
        .then(user => {
          req.session.userId = user._id
          res.status(200).json(user)
        })
        .catch(err => {
          console.log('oit broike')
          return next(err)
        })
    } else {
      const err = new Error('All fields required.')
      err.status = 400
      return next(err)
    }
  })

  app.post('/login', (req, res, next) => {
    const {logEmail, logPassword} = req.body
    if (logEmail && logPassword) {
      User.authenticate(logEmail, logPassword)
        .then(user => {
          console.log('WOOOO')
          req.session.userId = user._id
          const data = {username: user.username, email: user.email}
          res.status(200).json(user)
        })
        .catch(err => {
          console.log(err)
          err.status = 401
          return next(err)
        })
    } else {
      const err = new Error('All fields required.')
      err.status = 400
      return next(err)
    }
  })

  app.get('/logout', (req, res, next) => {
    if (req.session) {
      req.session.destroy
      .then(() => console.log('logged out'))
      .catch(err => next(err))
    }
  })
}
