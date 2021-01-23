import React from "react"
import { Box, Text } from "@chakra-ui/react"

export default function Logo(props) {
  return (
    <Box to="/" {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Stralyzer
      </Text>
    </Box>
  )
}