const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

require('./routes/authRoutes')(app)

app.get('/', (req, res) => {
    res.send({ Welcome: 'to Strava Dashboard Git 3' })
  }
)

const PORT = process.env.PORT || 5000
app.listen(PORT)
