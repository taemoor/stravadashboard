import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Link, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
// import MenuItem from './MenuItem'

const UserMenu = ({user, auth}) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar name={user.firstname} src={user.profile_medium} />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} href={'/stravaimport'}>Import Strava Activities</MenuItem>
        <MenuItem as={Link} href={'api/logout'}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(UserMenu)
