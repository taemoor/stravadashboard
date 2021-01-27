import React from 'react'
import { connect } from 'react-redux'
import { Heading, Link } from "@chakra-ui/react"

const Landing = (props) => {
  return (
    <div style={{ textAlign: 'center '}}>
      <Heading mb={'16px'}>Analyzing your data to help you improve!</Heading>
      {props.auth.user
      ? props.auth.athleteActivitiesExist
        ? 'Please click on the above tabs to view detailed analysis of your activities'
        : <Link href='/stravaimport'>Please import your Strava activties to continue</Link>
      : 'Please login to continue'
      }
    </div>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Landing)
