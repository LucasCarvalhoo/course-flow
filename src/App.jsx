import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import ModulesPage from './pages/public/ModulesPage';
import ModulePage from './pages/public/ModulePage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminModules from './pages/admin/AdminModules';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AdminProvider>
          <Routes>
            {/* PUBLIC ROUTES - No authentication required */}
            <Route path="/" element={<HomePage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/module/:id" element={<ModulePage />} />
            
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/modules" 
              element={
                <AdminProtectedRoute>
                  <AdminModules />
                </AdminProtectedRoute>
              } 
            />
            {/* We'll add more admin routes in the next steps:
            <Route path="/admin/modules/new" element={<AdminProtectedRoute><ModuleForm /></AdminProtectedRoute>} />
            <Route path="/admin/modules/:id/edit" element={<AdminProtectedRoute><ModuleForm /></AdminProtectedRoute>} />
            <Route path="/admin/lessons" element={<AdminProtectedRoute><AdminLessons /></AdminProtectedRoute>} />
            */}
          </Routes>
        </AdminProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;