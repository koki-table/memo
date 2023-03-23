/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

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
    <Container py={14}>
      <Heading>アカウント登録</Heading>
      <chakra.form onSubmit={onSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
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
              <FormLabel>パスワード</FormLabel>
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={'submit'} isLoading={isLoading}>
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default RegisterForm
