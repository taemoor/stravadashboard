const got = require('got')
const mongoose = require('mongoose')
const getActivityModel = require('../models/Activity')

// const Activity = mongoose.model('activities')

module.exports = app => {
  app.get('/api/athlete/activities', async (req, res) => {
    console.log('/api/athlete/activities called')
      try {
        console.log('Access token: ', accessToken)
        let activitiesPage = 1
        let activities = []
        while (true) {
          const response = await got('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            },
            searchParams: {
              per_page: 200,
              page: activitiesPage
            }
          });
          const act = JSON.parse(response.body)
          activities.push(...act)
          if (act.length < 200){
            break
          }
          activitiesPage++
        }
        const Activity = getActivityModel(req.user.stravaId)
        Activity.insertMany(activities, function (err, docs) {
          if (err){
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to activities collection");
          }
        })
        res.send({})
      } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
      }
  })
}
