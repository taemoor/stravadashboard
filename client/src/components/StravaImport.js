import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Heading } from '@chakra-ui/react'
import ChModal from './Modal/ChModal'
import { importActivitiesFromStrava } from '../actions'
import { STRAVA_DATA_LOADING } from '../actions/types'



const StravaImport = ({data, auth}) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const dispatch = useDispatch()

  const onClickDialogOpen = () => {
    console.log('onClickDialogOpen')
    setIsImportDialogOpen(true)
  }

  const onClickDialogClose = () => {
    console.log('onClickDialogClose')
    setIsImportDialogOpen(false)
  }

  const onClickBegin = () => {
    console.log('onClickBegin')
    dispatch({ type: STRAVA_DATA_LOADING, payload: true })
    dispatch(importActivitiesFromStrava(true))
  }

  return (
    <div style={{ textAlign: 'center '}}>
      <Heading mb={'16px'}>Import Activities from Strava</Heading>
      <ChModal
      isOpen={isImportDialogOpen}
      showProgress={data.stravaDataLoading}
      onClickBegin={onClickBegin}
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
