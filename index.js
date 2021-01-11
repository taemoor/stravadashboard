const express = require('express')
const passport = require('passport')
require('./services/passport')

const app = express()

require('./routes/authRoutes')(app)

app.get('/', (req, res) => {
    res.send({ Welcome: 'to Strava Dashboard' })
  }
)

const PORT = process.env.PORT || 5000
app.listen(PORT)
