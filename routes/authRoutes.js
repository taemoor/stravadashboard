const passport = require('passport')
const mongoose = require('mongoose')
const getActivityModel = require('../models/Activity')
const utils = require('../utils')

module.exports = (app) => {
  app.get('/auth/strava', passport.authenticate('strava', { scope: "profile:read_all,activity:read_all" }))

  app.get(
    '/auth/strava/callback',
    passport.authenticate('strava'),
    (req, res) => {
      res.redirect('/')
    }
  )

  app.get('/api/logout', (req, res) => {
    // passport attaches logout function to the req object
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', async (req, res) => {
    console.log('/api/current_user called')
    let athleteActivitiesExist = false
    if (req.user) {
      const Activity = getActivityModel(req.user.stravaId)
      athleteActivitiesExist = await utils.doesCollectionExist(Activity, `activities.${req.user.stravaId}`)
      res.send({user: req.user, athleteActivitiesExist})
    } else {
      res.send({user: req.user, athleteActivitiesExist})
    }
  })
}
