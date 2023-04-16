/* eslint-disable @typescript-eslint/no-misused-promises */
import { Center, chakra, FormControl, FormLabel, VStack, Input, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Heading, Button } from '@/components/Elements'
import { useAuth } from '@/features/auth'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, signIn } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { success } = await signIn(e)
    if (success) {
      navigate('/')
    }
  }

  return (
    <VStack
      py={14}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['80%', '400px']}
      margin="0 auto"
      padding={5}
      minH="100vh"
    >
      <Heading variant={'h3'}>ログイン</Heading>
      <h1>Vite + React ({import.meta.env.MODE})</h1>
      <chakra.form onSubmit={onSubmit} w="100%">
        <VStack spacing={5} mt="6">
          <FormControl>
            <FormLabel fontSize="xs">メールアドレス</FormLabel>
            <Input
              type={'email'}
              name={'email'}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xs">パスワード</FormLabel>
            <Input
              type={'password'}
              name={'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </FormControl>
        </VStack>
        <Center mt="10">
          <Button type={'submit'} variant="primary">
            <Text fontSize={'sm'} fontWeight="700">
              ログイン
            </Text>
          </Button>
        </Center>
      </chakra.form>
    </VStack>
  )
}
