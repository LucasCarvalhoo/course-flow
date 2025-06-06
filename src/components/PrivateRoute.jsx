import { useAuth } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
