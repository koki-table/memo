import { Input as ChakraInput, Box, Image, Flex, Button as ChakraButton } from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'

import gyoza from '@/assets/gyoza.png'

export const ImgInput: FC = () => {
  const [fileImg, setFileImg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null!)

  // 追加
  const onProfileButtonClick = () => {
    // useRef<HTMLInputElement>のcurrent要素を呼び出し、ファイル選択画面を表示
    inputRef.current.click()
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const fileObject = e.target.files[0]
    setFileImg(window.URL.createObjectURL(fileObject))
  }

  const viewWidth = window.innerWidth - 32

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} m={'0 auto'}>
      <ChakraInput
        display={'none'}
        ref={inputRef}
        type={'file'}
        accept={'image/*'}
        onChange={onFileInputChange}
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
        >
          {!fileImg && <Image src={gyoza} />}
          {!fileImg && (
            <Box
              position={'absolute'}
              minH={'20px'}
              minW={'100px'}
              bottom={'90px'}
              left={'50%'}
              transform={'translate(-50%,0)'}
              background={'var(--white)'}
            />
          )}
        </ChakraButton>
      </Box>
    </Flex>
  )
}
