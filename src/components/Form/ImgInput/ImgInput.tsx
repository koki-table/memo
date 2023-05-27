import { Input as ChakraInput, Box, Image, Flex, Button as ChakraButton } from '@chakra-ui/react'
import { FC, memo, useRef } from 'react'

import gyoza from '@/assets/gyoza.png'

import { ImgInputProps } from './types'

export const ImgInput: FC<ImgInputProps> = memo(({ registration, onChange, fileImg, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null!)

  const onProfileButtonClick = () => {
    // useRef<HTMLInputElement>のcurrent要素を呼び出し、ファイル選択画面を表示
    inputRef.current.click()
  }

  const size = window.innerWidth - 32

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} m={'0 auto'}>
      <ChakraInput
        display={'none'}
        type={'file'}
        accept={'image/*'}
        {...registration}
        onChange={onChange}
        ref={inputRef}
        {...props}
      />
      <Box
        w={size}
        h={size}
        position={'relative'}
        borderRadius={'md'}
        border={'1px solid var(--line-color-light)'}
        p={'6'}
      >
        {fileImg ? (
          <Image src={fileImg} w={size - 32} position={'absolute'} inset={0} m={'auto'} />
        ) : null}
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
})

ImgInput.displayName = 'ImgInput'
