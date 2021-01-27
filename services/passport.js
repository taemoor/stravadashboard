const passport = require('passport')
const got = require('got')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const StravaStrategy = require('passport-strava-oauth2').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const Athlete = mongoose.model('athletes')

passport.serializeUser((athlete, done) => {
  // console.log('athlete: ', athlete)
  done(null, athlete.id)
})

passport.deserializeUser((id, done) => {
  // console.log('deserializeUser:', id)
  // done(null, id)
  try {
    Athlete.findById(id)
    .then((athlete) => {
      // console.log('athlete:', athlete)
      done(null, athlete)
    })
    .catch(err => console.log(err))
  } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
  }
})

passport.use(new StravaStrategy({
  clientID: keys.stravaClientID,
  clientSecret: keys.stravaClientSecret,
  callbackURL: '/auth/strava/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log('profile: ', profile)
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

      const response = await got('https://www.strava.com/api/v3/athlete', {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      let ath = JSON.parse(response.body)
      ath['stravaId'] = ath.id
      delete ath.id
      const athlete = await new Athlete(ath).save()
        // its a new athlete, make a new record
      // console.log('create new athlete')
      // const athlete = await new Athlete({ stravaId: profile.id, displayName: profile.displayName }).save()
      done(null, athlete)
  })
)
