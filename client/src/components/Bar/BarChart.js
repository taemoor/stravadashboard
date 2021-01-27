import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import uniq from 'lodash/uniq'
import remove from 'lodash/remove'

// const data = [
//   { bike: 'norco', '2021': 13000, '2020': 5000, '2019': 13000, '2018': 5000 },
//   { bike: 'specialized', '2021': 16500, '2020': 4000, '2019': 13000, '2018': 5000 },
//   { bike: 'rocky', '2021': 14250, '2020': 3000, '2019': 13000, '2018': 5000 },
//   { bike: 'tandem', '2021': 19000, '2020': 5000, '2019': 13000, '2018': 5000 }
// ]

const getKeys = (data) => {
  let keysArray = []
  data.forEach(d => {
    keysArray = [...keysArray, ...Object.keys(d)]
  })
  const uniqKeys = uniq(keysArray)

  const keys = remove(uniqKeys, function (k) {
    return !isNaN(k)
  })
  return keys.sort()
}

const getYAxisLabel = labelYAxis => {
  if (labelYAxis.includes('Time')) {
    return labelYAxis + ' (hours)'
  } else if (labelYAxis.includes('Distance')) {
    return labelYAxis + ' (kms)'
  } else if (labelYAxis.includes('Elevation')) {
    return labelYAxis + ' (meters)'
  } else {
    return labelYAxis
  }
}

const BarChart = (props) => (
  <ResponsiveBar
    data={props.data}
    width={1000}
    margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
    keys={getKeys(props.data)}
    indexBy="name"
    axisBottom={{
      legend: 'Bikes',
      legendOffset: 36
    }}
    axisLeft={{
      legend: getYAxisLabel(props.labelYAxis),
      legendOffset: -60
    }}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 6,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 16,
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
)

export default BarChart
