import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Modules from './pages/Modules'

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
