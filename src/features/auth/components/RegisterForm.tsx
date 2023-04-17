/* eslint-disable @typescript-eslint/no-misused-promises */
import { Center, chakra, VStack, FormControl, FormLabel, Input, Text, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Heading, Button } from '@/components/Elements'
import { useAuth } from '@/features/auth/'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { signUp, isLoading, email, setEmail, password, setPassword } = useAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { success } = await signUp(e)
    if (success) {
      navigate('/auth/login')
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
      spacing={5}
    >
      <Heading variant={'h4'}>アカウント新規登録</Heading>
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
          <Button type={'submit'} isLoading={isLoading} variant="primary">
            <Text fontSize={'sm'} fontWeight="700">
              新規登録
            </Text>
          </Button>
        </Center>
      </chakra.form>
      <Box>
        <Text
          as={'a'}
          fontSize={'sm'}
          borderBottom={'solid 1px var(--text-color-link)'}
          letterSpacing={'2.3'}
          onClick={() => {
            navigate('/auth/login')
          }}
        >
          ログインはこちら
        </Text>
      </Box>
    </VStack>
  )
}

export default RegisterForm
