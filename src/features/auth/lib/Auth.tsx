import type { User } from '@firebase/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type UseAuth = {
  user: User | null | undefined
}
const initialState: UseAuth = {
  user: undefined,
}
const AuthContext = createContext<UseAuth>(initialState)

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
