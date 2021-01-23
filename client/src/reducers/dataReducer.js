/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PROGRESSION } from '../actions/types'

export default function(state = null, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_PROGRESSION:
      return (action.payload && { yearlyProgression: action.payload }) || null
    default:
      return state
  }
}
