import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import {ThemeProvider} from './components/theme-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </ThemeProvider>
  </StrictMode>,
)
