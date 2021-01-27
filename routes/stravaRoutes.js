const got = require('got')
const mongoose = require('mongoose')
const getActivityModel = require('../models/Activity')
const utils = require('../utils')

module.exports = app => {
  app.get('/api/athlete/activities', async (req, res) => {
    console.log('/api/athlete/activities called')
    if (accessToken) {
      try {
        console.log('Access token: ', accessToken)
        let activities = []
        let srParams = {
          per_page: 200,
          page: 1
        }
        const Activity = getActivityModel(req.user.stravaId)
        const doesCollectionExist = await utils.doesCollectionExist(Activity, `activities.${req.user.stravaId}`)
        if (doesCollectionExist) {
          const latestActivity = await Activity.find().limit(1).sort({'start_date':-1})
          const sDate = latestActivity[0].start_date
          const latestActivityUTC = (new Date(latestActivity[0].start_date)).getTime()
          srParams['after'] = latestActivityUTC/1000
        }
        while (true) {
          const response = await got('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
              "Authorization": `Bearer ${accessToken}`
            },
            searchParams: srParams
          });
          const act = JSON.parse(response.body)
          activities.push(...act)
          if (act.length < 200){
            break
          }
          srParams.page += 1
        }
        Activity.insertMany(activities, function (err, docs) {
          if (err){
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to activities collection");
          }
        })
      } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
      }
    }
    res.send({})
  })
}
