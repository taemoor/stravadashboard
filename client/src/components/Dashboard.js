import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Heading, Center } from "@chakra-ui/react"
import LineChart from './Chart/LineChart'
import './Chart/styles.css'
import { fetchProgression } from '../actions'

const Dashboard = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProgression())
  }, [dispatch])

  return (
    <div style={{ height: 500 }}>
      <Center>
        <Heading>Tracking Yearly Progression</Heading>
      </Center>
      {/* <LineChart data={yearly} /> */}
      {props.data && props.data.yearlyProgression && <LineChart data={props.data.yearlyProgression} />}
    </div>
  )
}

function mapStateToProps({ data }) {
  return { data }
}

export default connect(mapStateToProps)(Dashboard)
