const mongoose = require('mongoose')
const getActivityModel = require('../models/Activity')
// const Activity = mongoose.model('activities')

const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

const currentYear = new Date().getFullYear()
const currentDayofYear = dayOfYear(new Date())

const getYearStructure = year => {
  const yearStructure = { 'id': year, 'cumulative': 0, data: []}
  for(let i = 1; i < 367; i++) {
    yearStructure.data.push({"x": i, "y":  0})
  }
  return yearStructure
}

const roundValues = (arr) => {
  for (let obj of arr) {
    for (const key in obj) {
      if (key !== 'name' && key !== 'id') {
        obj[key] = Math.round(obj[key])
      }
    }
  }
  return arr
}

module.exports = app => {
  app.get('/api/stats/progression', async (req, res) => {
    console.log('/api/stats/progression called')
      try {
        let yearlyProgressions = []
        const Activity = getActivityModel(req.user.stravaId)
        const activities = await Activity.find()

        activities.reverse().map(activity => {
          const startDate = new Date(activity.start_date)
          const startDay = dayOfYear(startDate)
          const startYear = startDate.getFullYear()
          let metric = activity[req.query.metric]
          if (req.query.metric.includes('time')) {
            metric = metric / 3600
          } else if (req.query.metric.includes('distance')) {
            metric = metric / 1000
          }

          const year = yearlyProgressions.find(year => year.id === startYear)
          if (year && year.data) {
            data = year.data
            data[startDay] = {"x": startDay, "y":  year.cumulative + metric}
            year.cumulative += metric
            for(let i = startDay+1; i < 367; i++) {
              data[i] = {"x": i, "y":  year.cumulative}
            }
          } else {
            const yearObj = getYearStructure(startYear)
            for(let i = startDay; i < 367; i++) {
              yearObj.data[i] = {"x": i, "y":  metric}
            }
            yearObj.cumulative = metric
            yearlyProgressions.push(yearObj)
          }
        })
        const curYear = yearlyProgressions.find(year => year.id === currentYear)
        if (curYear) {
          curYear.data = curYear.data.slice(0, currentDayofYear+1)
        }

        res.send(yearlyProgressions)

      } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
      }
  }),
  app.get('/api/stats/bikeusage', async (req, res) => {
    console.log('/api/stats/bikeusage called')
    try {
      let bikeUsage = (req.user.bikes.length && req.user.bikes.map(bike => ({name: bike.name, id: bike.id}))) || []
      const Activity = getActivityModel(req.user.stravaId)
      const activities = await Activity.find()

      activities.reverse().map(activity => {
        const startDate = new Date(activity.start_date)
        const startYear = startDate.getFullYear()
        let metric = activity[req.query.metric]
        if (req.query.metric.includes('time')) {
          metric = metric / 3600
        } else if (req.query.metric.includes('distance')) {
          metric = metric / 1000
        }

        const gearId = activity.gear_id
        if (!gearId) {
          return null
        }
        const bike = bikeUsage.find(bike => bike.id === gearId )
        if (!bike) {
          return null
        }
        bike[startYear] ? bike[startYear] += metric : bike[startYear] = metric
      })

      res.send(roundValues(bikeUsage))
    } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
    }
  })
}
