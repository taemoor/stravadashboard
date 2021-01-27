import React from "react"
import { connect } from 'react-redux'
import { Box, Stack } from "@chakra-ui/react"
import MenuItem from './MenuItem'
import UserMenu from './UserMenu'

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
        {props.user && props.athleteActivitiesExist &&
          <>
            <MenuItem to="/gear">Gear</MenuItem>
            <MenuItem to="/dashboard">Progression</MenuItem>
          </>
        }
        {
          props.user
          ? <UserMenu user={props.user} />
          : <MenuItem to="/auth/strava">Login</MenuItem>
        }
      </Stack>
    </Box>
  )
}

function mapStateToProps({ auth }) {
  return { user: auth.user, athleteActivitiesExist: auth.athleteActivitiesExist }
}

export default connect(mapStateToProps)(MenuLinks)
