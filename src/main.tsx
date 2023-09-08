import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppProvider } from '@/providers/AppProvider'
import { AppRoutes } from '@/routes'

const firebaseConfig = {
  apiKey: 'AIzaSyArqSPXTTvE0ucTyPLLJUds1k2Li5olMAY',
  authDomain: 'memo-develop.firebaseapp.com',
  projectId: 'memo-develop',
  storageBucket: 'memo-develop.appspot.com',
  messagingSenderId: '875918691543"',
  appId: '1:875918691543:web:c10c9302db9e81677c7492',
}

const app = initializeApp(firebaseConfig)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const storage = getStorage(app)

export const provider = new GoogleAuthProvider()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  </React.StrictMode>
)
