import React from 'react'
import { HStack, useRadioGroup } from '@chakra-ui/react'
import RadioCard from './RadioCard'

export default function Example(props) {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "metric",
    defaultValue: props.defaultValue,
    onChange: props.onChange,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {props.options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
