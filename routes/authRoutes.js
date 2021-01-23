const passport = require('passport')

module.exports = (app) => {
  app.get('/auth/strava', passport.authenticate('strava', { scope: ['activity:read_all'] }))

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

  app.get('/api/current_user', (req, res) => {
    console.log('/api/current_user req: ', req)
    res.send(req.user)
  })
}
