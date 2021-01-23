const mongoose = require('mongoose')
const { Schema } = mongoose

const Activities = {}

function DynamicActivitySchema(suffix){
  const activitySchema = new Schema({
    resource_state: Number,
    athlete: {
      id: Number,
      resource_state: Number,
    },
    name: String,
    distance: Number,
    moving_time: Number,
    elapsed_time: Number,
    total_elevation_gain: Number,
    type: String,
    workout_type: Number,
    id: Number,
    external_id: String,
    upload_id: Number,
    start_date: Date,
    start_date_local: Date,
    timezone: String,
    utc_offset: Number,
    start_latlng: {
      type: [
        Number
      ]
    },
    end_latlng: {
      type: [
        Number
      ]
    },
    location_city: String,
    location_state: String,
    location_country: String,
    start_latitude: Number,
    start_longitude: Number,
    achievement_count: Number,
    kudos_count: Number,
    comment_count: Number,
    athlete_count: Number,
    photo_count: Number,
    map: {
      id: {
        type: String,
      },
      summary_polyline: {
        type: String,
      },
      resource_state: {
        type: Number,
      }
    },
    trainer: Boolean,
    commute: Boolean,
    manual: Boolean,
    private: Boolean,
    visibility: String,
    flagged: Boolean,
    gear_id: String,
    from_accepted_tag: Boolean,
    upload_id_str: String,
    average_speed: Number,
    max_speed: Number,
    average_watts: Number,
    kilojoules: Number,
    device_watts: Boolean,
    has_heartrate: Boolean,
    heartrate_opt_out: Boolean,
    display_hide_heartrate_option: Boolean,
    elev_high: Number,
    elev_low: Number,
    pr_count: Number,
    total_photo_count: Number,
    has_kudoed: Boolean,
    suffer_score: Number
  })
  return mongoose.model('activities.' + suffix, activitySchema)
}

function getActivityModel(suffix) {
  if (!Activities[suffix]) {
    Activities[suffix] =  new DynamicActivitySchema(suffix)
  }
  return Activities[suffix]
}

module.exports = getActivityModel
