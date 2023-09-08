import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppProvider } from '@/providers/AppProvider'
import { AppRoutes } from '@/routes'

const firebaseConfig = {
  apiKey: 'AIzaSyD3rYjNdY4MS7BReWpOtgELyYs2sWvUvIk',
  authDomain: 'memo-3c2c7.firebaseapp.com',
  projectId: 'memo-3c2c7',
  storageBucket: 'memo-3c2c7.appspot.com',
  messagingSenderId: '949415249297',
  appId: '1:949415249297:web:17b13da7843c86cdf68630',
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
