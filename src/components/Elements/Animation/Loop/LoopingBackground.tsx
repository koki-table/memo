import { Box, keyframes } from '@chakra-ui/react'
import { FC, memo } from 'react'

export type LoopingBackgroundProps = {
  source: string
  w: string | number
  h: string | number
  animationDuration?: string
  backgroundPosition?: string
}

export const LoopingBackground: FC<LoopingBackgroundProps> = memo(
  ({ source, w, h, animationDuration = '180s', backgroundPosition = '-6300px 0' }) => {
    const loop = keyframes`
    from { background-position: 0 0; }
  to { background-position: ${backgroundPosition}; }
  `
    return (
      <Box
        backgroundImage={source}
        w={w}
        h={h}
        backgroundPosition="0 0"
        backgroundSize={'auto 100%'}
        backgroundRepeat={'repeat-x'}
        animation={`${loop} ${animationDuration} linear infinite`}
      />
    )
  }
)

LoopingBackground.displayName = 'LoopingBackground'
