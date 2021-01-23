/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ATHLETE } from '../actions/types'

export default function(state = null, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_ATHLETE:
      return action.payload || false
    default:
      return state
  }
}
