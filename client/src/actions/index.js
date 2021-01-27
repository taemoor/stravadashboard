import axios from 'axios';
import {
  FETCH_ATHLETE,
  FETCH_BIKE_USAGE,
  IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB,
  FETCH_PROGRESSION
} from './types';

export const fetchAthlete = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_ATHLETE, payload: res.data })
}

export const importActivitiesFromStrava = (fetchAll = true) => async dispatch => {
  const res = await axios.get('/api/athlete/activities', { params: { fetchAll } })
  dispatch({ type: IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB, payload: res.data })
}

export const fetchProgression = (metric) => async dispatch => {
  const res = await axios.get('/api/stats/progression', { params: { metric } })
  dispatch({ type: FETCH_PROGRESSION, payload: res.data })
}

export const fetchBikeUsage = (metric) => async dispatch => {
  const res = await axios.get('/api/stats/bikeusage', { params: { metric } })
  dispatch({ type: FETCH_BIKE_USAGE, payload: res.data })
}
