const mongoose = require('mongoose')
const { Schema } = mongoose

const athleteSchema = new Schema(
  {
    stravaId: String,
    username: String,
    displayName: String,
    resource_state: Number,
    firstname: String,
    lastname: String,
    city: String,
    state: String,
    country: String,
    sex: String,
    premium: Boolean,
    summit: Boolean,
    created_at: Date,
    updated_at: Date,
    badge_type_id: Number,
    profile_medium: String,
    profile: String,
    friend: Schema.Types.Mixed,
    follower: Schema.Types.Mixed
  }
)

mongoose.model('athletes', athleteSchema)
