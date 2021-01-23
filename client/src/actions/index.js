import axios from 'axios';
import { FETCH_ATHLETE, IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB, FETCH_PROGRESSION } from './types';

export const fetchAthlete = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_ATHLETE, payload: res.data })
}


export const importActivitiesFromStrava = () => async dispatch => {
  const res = await axios.get('/api/surveys')
  dispatch({ type: IMPORT_ACTIVITIES_FROM_STRAVA_TO_DB, payload: res.data })
}

export const fetchProgression = () => async dispatch => {
  const res = await axios.get('/api/stats/progression')
  dispatch({ type: FETCH_PROGRESSION, payload: res.data })
}
