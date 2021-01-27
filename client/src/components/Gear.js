import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Heading, Center, Box } from '@chakra-ui/react'
import { fetchBikeUsage } from '../actions'
import BarChart from './Bar/BarChart'
import RadioGroup from './Radio/RadioGroup'
import { metrics } from '../constants'

const Gear = (props) => {
  const [metric, setMetric] = useState(Object.keys(metrics)[0])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBikeUsage(metrics[metric]))
  }, [dispatch, metric])

  const handleRadioChanged = value => {
    setMetric(value)
  }

  return (
      <Center>
        <div style={{ height: 500 }}>
          <Center><Heading>Bike Usage</Heading></Center>
          <Center>
          <Box mt={8}>
            <RadioGroup
              options={Object.keys(metrics)}
              onChange={handleRadioChanged}
              defaultValue={metric}
            />
          </Box>
        </Center>

          {props.data && props.data.bikeUsage &&
          <BarChart data={props.data.bikeUsage} labelYAxis={metric} />}
        </div>
      </Center>
  )
}

function mapStateToProps(data) {
  return data
}

export default connect(mapStateToProps)(Gear)
