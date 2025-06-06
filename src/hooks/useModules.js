import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export const useModules = () => {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchModules = async () => {
    try {
      setLoading(true)
      // Buscar módulos com suas aulas
      const { data, error } = await supabase
        .from('modules')
        .select(`
          *,
          lessons(*)
        `)
        .order('order_position')

      if (error) throw error
      setModules(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchModules()
  }, [])

  return {
    modules,
    loading,
    error,
    refetch: fetchModules
  }
}
