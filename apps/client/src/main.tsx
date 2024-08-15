import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/_shared/ThemeProvider.tsx'
import './index.css'
import './playground.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
)
