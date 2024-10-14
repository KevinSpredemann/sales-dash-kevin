import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/globalStyle.tsx'
import { AppThemeProvider } from './contexts/AppThemeContext.tsx'
import store from './redux/index.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <GlobalStyle />
        <App />
      </AppThemeProvider>
    </Provider>
  </StrictMode>
)
