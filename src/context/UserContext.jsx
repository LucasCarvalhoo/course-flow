import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState(null)

  useEffect(() => {
    // Verificar se há um usuário logado
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          // Buscar o role do usuário na tabela admin
          const { data: userData } = await supabase
            .from('admin')
            .select('name')
            .eq('email', user.email)
            .single()
          
          // Se encontrou na tabela admin, é admin
          setRole(userData ? 'admin' : 'user')
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          const { data: userData } = await supabase
            .from('admin')
            .select('name')
            .eq('email', session.user.email)
            .single()
          
          setRole(userData ? 'admin' : 'user')
        } else {
          setUser(null)
          setRole(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setRole(null)
    }
    return { error }
  }

  const value = {
    user,
    role,
    loading,
    signIn,
    signOut,
    isAdmin: role === 'admin'
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de UserProvider')
  }
  return context
}
