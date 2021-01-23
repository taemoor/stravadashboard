import React from "react"
import { connect } from 'react-redux'
import { Box, Stack } from "@chakra-ui/react"
import MenuItem from './MenuItem'

const MenuLinks = (props) => {
  return (
    <Box
      display={{ base: props.isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/dashboard">Dashboard</MenuItem>
        <MenuItem to="/api/athlete/activities">Import Strava Activities</MenuItem>
        {
          props.auth
          ? <MenuItem to="/api/logout">Logout</MenuItem>
          : <MenuItem to="/auth/strava">Login</MenuItem>
        }

      </Stack>
    </Box>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(MenuLinks)
