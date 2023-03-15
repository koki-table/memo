import type { User } from '@firebase/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState, FC } from 'react'

export type UseAuth = {
  user: User | null | undefined
}
const initialState: UseAuth = {
  user: undefined,
}
const AuthContext = createContext<UseAuth>(initialState)

type Props = { children: ReactNode }

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

const useAuthProvider = (): UseAuth => {
  const [user, setUser] = useState<UseAuth>(initialState)

  useEffect(() => {
    try {
      const auth = getAuth()
      return onAuthStateChanged(auth, (user) => {
        setUser({
          user,
        })
      })
    } catch (error) {
      setUser(initialState)
      throw error
    }
  }, [])

  return user
}
