/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_PROGRESSION,
  FETCH_BIKE_USAGE,
  IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB,
  STRAVA_DATA_LOADING } from '../actions/types'

export default function(state = { stravaDataLoading: false }, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_PROGRESSION:
      return (action.payload && { yearlyProgression: action.payload }) || null
    case FETCH_BIKE_USAGE:
      return (action.payload && { bikeUsage: action.payload }) || null
    case IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB:
      return (action.payload && { stravaDataLoading: false }) || null
    case STRAVA_DATA_LOADING:
      return (action.payload && { stravaDataLoading: action.payload }) || null
    default:
      return state
  }
}
