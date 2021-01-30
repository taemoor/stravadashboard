/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ATHLETE, IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB } from '../actions/types'

export default function(state = {user: null, athleteActivitiesExist: false}, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_ATHLETE:
      const {user, athleteActivitiesExist} = action.payload
      return {user, athleteActivitiesExist} || false
    case IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB:
      return { ...state, athleteActivitiesExist: true }
    default:
      return state
  }
}
