import { Input as ChakraInput, Box, Image, Text, Flex } from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'

import { Button } from '@/components/Elements'

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

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'} m={'0 auto'}>
      <ChakraInput
        display={'none'}
        ref={inputRef}
        type={'file'}
        accept={'image/*'}
        onChange={onFileInputChange}
      />
      <Box mb="6">{fileImg && <Image src={fileImg} />}</Box>
      <Button variant={'primary'} onClick={onProfileButtonClick}>
        <Text>画像を選択</Text>
      </Button>
    </Flex>
  )
}
