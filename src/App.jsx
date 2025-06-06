import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'

// Páginas temporárias para testar
const Login = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl">Página de Login (em desenvolvimento)</h1>
  </div>
)

const Modules = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl">Página de Módulos (em desenvolvimento)</h1>
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
