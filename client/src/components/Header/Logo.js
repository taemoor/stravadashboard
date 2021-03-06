import React from "react"
import { Box, Text, Link } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Box as={Link} href='/' {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Stralyzer
      </Text>
    </Box>
  )
}