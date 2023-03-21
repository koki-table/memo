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

import { useAuth } from '@/features/auth'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, signIn, isLoading } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { success } = await signIn(e)
    if (success) {
      navigate('/')
    }
  }

  return (
    <Container py={14}>
      <Heading>サインイン</Heading>
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
            ログイン
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}
