import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '../store/store.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { Toaster } from "react-hot-toast";

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
