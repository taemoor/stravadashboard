import React from 'react'
import NavBarContainer from './NavBarContainer'
import Logo from './Logo'
import MenuToggle from './MenuToggle'
import MenuLinks from './MenuLinks'

const Header = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  )
}

export default Header