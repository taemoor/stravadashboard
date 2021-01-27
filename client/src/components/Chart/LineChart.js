import React from 'react'
import { ResponsiveLine } from '@nivo/line'
// import data from './data';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
const LineChart = (props) => (
  <ResponsiveLine
    data={props.data}
    width={1200}
    margin={{
      top: 50,
      right: 110,
      bottom: 50,
      left: 60
    }}
    xScale={{
      type: 'linear'
    }}
    yScale={{
      type: 'linear',
      stacked: false,
      min: 'auto',
      max: 'auto'
    }}
    xFormat={(x) => {
      var date = new Date(new Date().getFullYear(), 0); // initialize a date in `year-01-01`
      var xDate = new Date(date.setDate(x))
      return `${months[xDate.getMonth()]} ${xDate.getDate()}`
    }}
    yFormat={(y) => {
      if (props.labelYAxis.includes('Time')) {
        return `${Math.floor(y)}h ${Math.floor((y-Math.floor(y))*60)}m`
      } else if (props.labelYAxis.includes('Distance')) {
        return `${y.toFixed(2)} kms`
      } else if (props.labelYAxis.includes('Elevation')) {
        return `${y.toFixed(2)} meters`
      } else {
        return y
      }
    }}
    minY="auto"
    maxY="auto"
    stacked={false}
    curve="cardinal"
    colors={{ scheme: 'paired' }}
    enablePoints={false}
    lineWidth={1}
    isInteractive={true}
    useMesh={true}
    enableGridX={false}
    axisBottom={{
      orient: 'bottom',
      tickSize: 1,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Day of the Year',
      legendOffset: 36
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: props.labelYAxis,
      legendOffset: -50
    }}
    dotSize={2}
    dotColor="inherit:darker(0.3)"
    dotBorderWidth={2}
    dotBorderColor="#ffffff"
    enableDotLabel={true}
    dotLabel="y"
    dotLabelYOffset={-12}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
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
);

export default LineChart;
