import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Heading } from '@chakra-ui/react'
import ChModal from './Modal/ChModal'
import { importActivitiesFromStrava } from '../actions'
import { STRAVA_DATA_LOADING } from '../actions/types'
import { useHistory } from "react-router-dom"


const StravaImport = ({data, auth}) => {
  let history = useHistory()
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const dispatch = useDispatch()

  const onClickDialogOpen = () => {
    console.log('onClickDialogOpen')
    dispatch({ type: STRAVA_DATA_LOADING, payload: true })
    dispatch(importActivitiesFromStrava(true))
    setIsImportDialogOpen(true)
  }

  const onClickDialogClose = () => {
    console.log('onClickDialogClose')
    history.push("/")
    setIsImportDialogOpen(false)
  }


  return (
    <div style={{ textAlign: 'center '}}>
      <Heading mb={'16px'}>Import Activities from Strava</Heading>
      <ChModal
      isOpen={isImportDialogOpen}
      showProgress={data.stravaDataLoading}
      userActivitiesImported={auth.athleteActivitiesExist}
      onClickDialogClose={onClickDialogClose}
      onClickDialogOpen={onClickDialogOpen}>Import Activities</ChModal>
    </div>
  )
}

function mapStateToProps({ data, auth }) {
  return { data, auth }
}

export default connect(mapStateToProps)(StravaImport)
