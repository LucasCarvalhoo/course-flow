import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'

// Página temporária de módulos
const Modules = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-2xl font-light text-gray-900">Página de Módulos</h1>
      <p className="text-gray-600 mt-2">Em desenvolvimento</p>
    </div>
  </div>
)

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/modules"
            element={
              <PrivateRoute>
                <Modules />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/modules" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
