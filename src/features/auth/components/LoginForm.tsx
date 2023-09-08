/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Center,
  chakra,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Text,
  HStack,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

import bgFood from '@/assets/bgFood.png'
import { Heading, Button } from '@/components/Elements'
import { useAuth } from '@/features/auth'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { success } = await signIn(e)
    if (success) {
      navigate('/')
    }
  }

  const onGoogleSignIn = async () => {
    const { success } = await signInWithGoogle()
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
      maxW={['100%', '400px']}
      margin="0 auto"
      padding={5}
      minH="100vh"
      spacing={7}
      backgroundImage={`url(${bgFood})`}
    >
      {/* <Heading variant={'h4'}>ログイン</Heading> */}
      {/* <chakra.form onSubmit={onSubmit} w="100%">
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
      </chakra.form> */}

      <Center mt="10">
        <Button variant="roundTransparent" onClick={onGoogleSignIn}>
          <HStack>
            <FcGoogle size={24} />
            <Text fontSize={'sm'} fontWeight="700">
              Googleログイン
            </Text>
          </HStack>
        </Button>
      </Center>
      {/* <VStack spacing={2} textAlign={'center'}>
        <Text
          as={'a'}
          fontSize={'sm'}
          borderBottom={'solid 1px var(--text-color-link)'}
          letterSpacing={'2.3'}
          onClick={() => {
            navigate('/auth/register')
          }}
        >
          アカウント登録はこちら
        </Text>
        <Text fontSize={'xs'}>※初回はアカウント登録が必要です</Text>
      </VStack> */}
    </VStack>
  )
}
