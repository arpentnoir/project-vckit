import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import VerifierLayout from './VerifierLayout'
import { ThemeProvider } from '../context/ThemeProvider'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ChatProvider } from '../context/ChatProvider'
import { VeramoWeb3Provider } from '../context/web3/VeramoWeb3Provider'
import { useAuth0 } from "@auth0/auth0-react"
import Loading from '../components/Loading'
import { Auth0ProviderWithNavigate } from '../auth0-provider-with-navigate'

import "./App.css"

declare global {
  interface Window {
    BASE_URL: string
  }
}

const App = () => {
  const queryClient = new QueryClient()
  const mode = process.env.REACT_APP_MODE;
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {
          <VeramoWeb3Provider>
            <ChatProvider>
              <BrowserRouter>
                <Auth0ProviderWithNavigate>
                  { mode === 'verifier' ? <VerifierLayout /> : <Layout /> }
                </Auth0ProviderWithNavigate>
              </BrowserRouter>
            </ChatProvider>
          </VeramoWeb3Provider>
        }
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
