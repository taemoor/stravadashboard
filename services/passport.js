const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // new User({ googleId: profile.id }).save()
    const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        // we already have record with this profile id
        return done(null, existingUser)
      }
        // its a new user, make a new record
      const user = await new User({ googleId: profile.id }).save()
      done(null, user)
  })
)
