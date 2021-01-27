import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Heading, Center, Box } from "@chakra-ui/react"
import LineChart from './Chart/LineChart'
import './Chart/styles.css'
import { fetchProgression } from '../actions'
import RadioGroup from './Radio/RadioGroup'
import { metrics } from '../constants'

const Progression = (props) => {
  const [metric, setMetric] = useState(Object.keys(metrics)[0])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProgression(metrics[metric]))
  }, [dispatch, metric])

  const handleRadioChanged = value => {
    setMetric(value)
  }

  return (
    <Center>
      <div style={{ height: 500 }}>
        <Center><Heading>Tracking Yearly Progression</Heading></Center>
        <Center>
          <Box mt={8}>
            <RadioGroup
              options={Object.keys(metrics)}
              onChange={handleRadioChanged}
              defaultValue={metric}
            />
          </Box>
        </Center>
        {props.data && props.data.yearlyProgression
        && <LineChart data={props.data.yearlyProgression} labelYAxis={metric} />}
      </div>
    </Center>
  )
}

function mapStateToProps({ data }) {
  return { data }
}

export default connect(mapStateToProps)(Progression)
