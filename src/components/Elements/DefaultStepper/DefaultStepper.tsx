import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

export type DefaultStepperProps = {
  activeStep: number
  stepLength: number
}
export const DefaultStepper: FC<DefaultStepperProps> = (props) => {
  const { activeStep = 1, stepLength } = props

  const stepPointStyle = (step: number) => {
    const baseStyle = {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      w: '14px',
      h: '14px',
      transition: '1.3s cubic-bezier(0.22,1,0.36,1)',
      borderRadius: '50%',
    }

    if (step === 0)
      return {
        display: 'none',
      }
    if (step <= activeStep)
      return {
        ...baseStyle,
        bgColor: 'var(--primary-color-heavy)',
        border: '1px solid var(--primary-color-heavy)',
      }
    return {
      ...baseStyle,
      bgColor: 'var(--white)',
      border: '1px solid var(--primary-color-main)',
    }
  }

  const Step = (index: number) => {
    return <Box key={index} position="relative" _before={stepPointStyle(index)}></Box>
  }

  const stepsFactory = () => {
    const steps = []
    for (let i = 0; i < stepLength; i++) {
      steps.push(Step(i))
    }
    return steps
  }

  return (
    <Flex
      justifyContent="space-between"
      position="relative"
      _before={{
        content: '""',
        bgColor: 'var(--line-color-main)',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        height: '6px',
        width: '100%',
        zIndex: -1,
        borderRadius: '8px',
      }}
    >
      <Box
        width={`${(activeStep / (stepLength - 1)) * 100}%`}
        bgColor="var(--primary-color-main)"
        position="absolute"
        top="50%"
        left="0"
        transform="translateY(-50%)"
        height="6px"
        zIndex="-1"
        transition="1.2s cubic-bezier(0.22,1,0.36,1)"
        borderRadius="8px"
      />
      {stepsFactory()}
    </Flex>
  )
}
