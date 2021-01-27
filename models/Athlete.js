const mongoose = require('mongoose')
const { Schema } = mongoose

const athleteSchema = new Schema(
{
  stravaId: String,
  username: String,
  resource_state: Number,
  firstname: String,
  lastname: String,
  city: String,
  state: String,
  country: String,
  sex: String,
  premium: Boolean,
  created_at: Date,
  updated_at: Date,
  badge_type_id: Number,
  profile_medium: String,
  profile: String,
  friend: Schema.Types.Mixed,
  follower: Schema.Types.Mixed,
  follower_count: Number,
  friend_count: Number,
  mutual_friend_count: Number,
  athlete_type: Number,
  date_preference: String,
  measurement_preference: String,
  clubs: Array,
  ftp: Schema.Types.Mixed,
  weight: Number,
  bikes: [{
      id: String,
      primary: Boolean,
      name: String,
      resource_state: Number,
      distance: Number,
  }],
  shoes: [{
    id: String,
    primary: Boolean,
    name: String,
    resource_state: Number,
    distance: Number,
  }]
}
)

// {
//   id: String,
//   username: String,
//   resource_state: Number,
//   firstname: String,
//   lastname: String,
//   city: String,
//   state: String,
//   country: String,
//   sex: String,
//   premium: Boolean,
//   created_at: Date,
//   updated_at: Date,
//   badge_type_id: Number,
//   profile_medium: String,
//   profile: String,
//   friend: Schema.Types.Mixed,
//   follower: Schema.Types.Mixed,
//   follower_count: Number,
//   friend_count: Number,
//   mutual_friend_count: Number,
//   athlete_type: Number,
//   date_preference: String,
//   measurement_preference: String,
//   clubs: Array,
//   ftp: Schema.Types.Mixed,
//   weight: Number,
//   bikes: [{
//       id: Number,
//       primary: Boolean,
//       name: String,
//       resource_state: Number,
//       distance: Number,
//   }],
//   shoes: [{
//     id: Number,
//     primary: Boolean,
//     name: String,
//     resource_state: Number,
//     distance: Number,
//   }]
// }

mongoose.model('athletes', athleteSchema)
