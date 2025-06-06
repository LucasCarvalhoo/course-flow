import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Modules from './pages/Modules';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/modules"
            element={
              <ProtectedRoute>
                <Modules />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/modules" replace />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
