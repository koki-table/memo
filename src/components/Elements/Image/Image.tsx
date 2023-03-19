import { Image as ChakraImage, ImageProps as ChakraImageProps } from '@chakra-ui/react'
import { FC } from 'react'

/**
 * TODO:
 * - react-svgなどの使用を検討する
 */
export type ImageProps = ChakraImageProps
export const Image: FC<ImageProps> = (props) => {
  const { src, alt = '', ..._props } = props

  return <ChakraImage decoding="async" src={src} alt={alt} {..._props} />
}
