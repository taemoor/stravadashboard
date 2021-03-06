const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/Athlete')
require('./models/Activity')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/stravaRoutes')(app)
require('./routes/stralyzerRoutes')(app)

app.use(function forceLiveDomain(req, res, next) {
  // Don't allow user to hit Heroku now that we have a domain
  var host = req.get('Host');
  if (host === 'http://stralyzer.com') {
    return res.redirect(301, 'https://www.stralyzer.com/' + req.originalUrl);
  }
  return next();
})

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets.
  // like our main.js file, or main.css file.
  app.use(express.static('client/build'))
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
