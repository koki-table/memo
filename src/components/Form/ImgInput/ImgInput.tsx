import { Input as ChakraInput, Box, Image, Flex, Button as ChakraButton } from '@chakra-ui/react'
import { FC, useRef } from 'react'

import gyoza from '@/assets/gyoza.png'

import { ImgInputProps } from './types'

export const ImgInput: FC<ImgInputProps> = ({ registration, onChange, fileImg }) => {
  const inputRef = useRef<HTMLInputElement>(null!)

  const onProfileButtonClick = () => {
    // useRef<HTMLInputElement>のcurrent要素を呼び出し、ファイル選択画面を表示
    inputRef.current.click()
  }

  const viewWidth = window.innerWidth - 32

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} m={'0 auto'}>
      <ChakraInput
        display={'none'}
        type={'file'}
        accept={'image/*'}
        {...registration}
        onChange={onChange}
        ref={inputRef}
      />
      <Box
        w={'100%'}
        position={'relative'}
        borderRadius={fileImg && 'md'}
        border={fileImg && '1px solid var(--line-color-light)'}
        p={fileImg && '6'}
      >
        {fileImg && <Image src={fileImg} w={viewWidth} />}
        {!fileImg && <Box minW={viewWidth} minH={viewWidth} />}
        <ChakraButton
          position={'absolute'}
          top={0}
          left={0}
          w={'100%'}
          h={'100%'}
          onClick={onProfileButtonClick}
          opacity={fileImg ? 0 : 1}
          border={'1px solid var(--line-color-light)'}
          background={'var(--white)'}
        >
          {!fileImg && <Image src={gyoza} />}
        </ChakraButton>
      </Box>
    </Flex>
  )
}
