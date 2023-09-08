import { useToast } from '@chakra-ui/react'
import type { User } from '@firebase/auth'
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from '@firebase/auth'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  FC,
  FormEvent,
  useCallback,
} from 'react'

import { provider } from '@/main'

export type AuthResponse = {
  success: boolean
  message: string
}

export type UseAuth = {
  user: User | null | undefined
  isLoading: boolean
  signUp: (e: FormEvent<HTMLFormElement>) => Promise<AuthResponse>
  signIn: (e: FormEvent<HTMLFormElement>) => Promise<AuthResponse>
  signOut: () => Promise<AuthResponse>
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  signInWithGoogle: () => Promise<{
    success: boolean
    message: string
  }>
}

const authContext = createContext<UseAuth | undefined>(undefined)

type Props = { children: ReactNode }

export const useAuth = () => {
  const context = useContext(authContext)

  if (context === undefined) {
    throw new Error('useAuthがAuthProvider内で利用されていません')
  }
  return context
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const auth = useAuthProvider()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useAuthProvider = (): UseAuth => {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    try {
      const auth = getAuth()
      return onAuthStateChanged(auth, (user) => {
        setUser(user)
      })
    } catch (error) {
      console.log('error', error)

      setUser(null)
      // throw error
    }
  }, [])

  const signUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setIsLoading(true)
      e.preventDefault()
      try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredential.user)
        setEmail('')
        setPassword('')
        toast({
          title: '確認メールを送信しました。',
          status: 'success',
          position: 'top',
        })
        return { success: true, message: '' }
      } catch (e) {
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
        if (e instanceof FirebaseError) {
          console.log(e)
        }
        return { success: false, message: 'エラーが発生しました' }
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, toast]
  )

  const signIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setIsLoading(true)
      e.preventDefault()
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
        setEmail('')
        setPassword('')
        toast({
          title: 'ログインしました。',
          status: 'success',
          position: 'top',
        })
        return { success: true, message: '' }
        // TODO: ログイン後のページに遷移の処理を書く
      } catch (e) {
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
        if (e instanceof FirebaseError) {
          console.log(e)
        }
        return { success: false, message: 'エラーが発生しました' }
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, toast]
  )

  const signOut = useCallback(async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await firebaseSignOut(auth)
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      })
      return { success: true, message: '' }
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
      return { success: false, message: 'エラーが発生しました' }
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signInWithPopup(auth, provider)
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      })
      return { success: true, message: '' }
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      if (e instanceof FirebaseError) {
        console.log(e)
      }
      return { success: false, message: 'エラーが発生しました' }
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  return {
    user,
    isLoading,
    email,
    password,
    setEmail,
    setPassword,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
  }
}
