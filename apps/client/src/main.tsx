import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './playground.ts'
import { ThemeProvider } from './components/_shared'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
)
