const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

// authenticate input against database
UserSchema.statics.authenticate = function (email, password) {
  return new Promise((resolve, reject) => {
    const execPromise = User.findOne({ email: email }).exec()
    const passPromise = execPromise.then(user => {
      if (!user) throw new Error('User not found')
      return bcrypt.compare(password, user.password)
    })
    Promise.all([execPromise, passPromise])
        .then(([user, result]) => {
          if (!result) throw new Error('Wrong credentials')
          resolve(user)
        })
        .catch(err => reject(err))
  })
}

// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

const User = mongoose.model('User', UserSchema)
module.exports = User
