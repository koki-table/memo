import { Image as ChakraImage, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import { FC } from 'react'

import { IconType, iconPath } from '@/components/Elements/Icon/types'

export type IconProps = Omit<ChakraImageProps, 'src, type'> & {
  type: IconType
}
export const Icon: FC<IconProps> = (props) => {
  const { alt = '', type, ..._props } = props

  return (
    <ChakraImage
      display="inline-block"
      decoding="async"
      src={`${location.origin}${iconPath}/${type}.svg`}
      alt={alt}
      {..._props}
    />
  )
}
