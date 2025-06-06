import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true) // Inicia sempre no escuro

  useEffect(() => {
    // Aplicar classe ao body
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.body.style.backgroundColor = '#1a1a1a'
    } else {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = '#ffffff'
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  }
  return context
}
