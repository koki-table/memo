import { Spinner as ChakraSpinner, SpinnerProps as ChakraSpinnerProps, Box } from '@chakra-ui/react'
import { FC } from 'react'

// view
export type SpinnerProps = ChakraSpinnerProps & {
  variants?: 'full' | 'partial'
}

export const Spinner: FC<SpinnerProps> = (props) => {
  const { variants, ..._props } = props

  if (variants === 'full') {
    return (
      <Box w="100vw" h="100vh" display="grid" placeItems="center">
        <ChakraSpinner color="var(--primary-color-main)" {..._props} />
      </Box>
    )
  }

  if (variants === 'partial') {
    return (
      <Box
        w="100%"
        h="100%"
        display="grid"
        placeItems="center"
        position="absolute"
        inset="0"
        margin="auto"
        bg="var(--white)"
      >
        <ChakraSpinner color="var(--primary-color-main)" {..._props} />
      </Box>
    )
  }

  return <ChakraSpinner color="var(--primary-color-main)" {..._props} />
}
