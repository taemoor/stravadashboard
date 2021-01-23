const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const StravaStrategy = require('passport-strava-oauth2').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const Athlete = mongoose.model('athletes')

passport.serializeUser((athlete, done) => {
  console.log('athlete: ', athlete)
  done(null, athlete.id)
})

passport.deserializeUser((id, done) => {
  console.log('deserializeUser:', id)
  // done(null, id)
  Athlete.findById(id)
    .then((athlete) => {
      console.log('athlete:', athlete)
      done(null, athlete)
    })
})

passport.use(new StravaStrategy({
  clientID: keys.stravaClientID,
  clientSecret: keys.stravaClientSecret,
  callbackURL: '/auth/strava/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('profile: ', profile)
    // console.log('firstname: ', profile.firstname)
    // console.log('lastname: ', profile.lastname)
    // console.log('id: ', profile.id)
    const existingAthlete = await Athlete.findOne({ stravaId: profile.id })
      global.accessToken = accessToken
      if (existingAthlete) {
        // we already have record with this profile id
        console.log('existing athlete')
        return done(null, existingAthlete)
      }
        // its a new athlete, make a new record
      console.log('create new athlete')
      const athlete = await new Athlete({ stravaId: profile.id, displayName: profile.displayName }).save()
      done(null, athlete)
  })
)
