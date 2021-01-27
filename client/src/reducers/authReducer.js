/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ATHLETE } from '../actions/types'

export default function(state = {user: null, athleteActivitiesExist: false}, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_ATHLETE:
      const {user, athleteActivitiesExist} = action.payload
      return {user, athleteActivitiesExist} || false
    default:
      return state
  }
}
