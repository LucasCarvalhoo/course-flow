import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import { SearchProvider } from './context/SearchProvider';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import ModulesPage from './pages/public/ModulesPage';
import ModulePage from './pages/public/ModulePage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminModules from './pages/admin/AdminModules';
import AdminLessons from './pages/admin/AdminLessons';
import ModuleForm from './pages/admin/ModuleForm';
import LessonForm from './pages/admin/LessonForm';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AdminProvider>
          <SearchProvider>
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
              <Route 
                path="/admin/modules/new" 
                element={
                  <AdminProtectedRoute>
                    <ModuleForm />
                  </AdminProtectedRoute>
                } 
              />
              <Route 
                path="/admin/modules/:id/edit" 
                element={
                  <AdminProtectedRoute>
                    <ModuleForm />
                  </AdminProtectedRoute>
                } 
              />
              <Route 
                path="/admin/lessons" 
                element={
                  <AdminProtectedRoute>
                    <AdminLessons />
                  </AdminProtectedRoute>
                } 
              />
              <Route 
                path="/admin/lessons/new" 
                element={
                  <AdminProtectedRoute>
                    <LessonForm />
                  </AdminProtectedRoute>
                } 
              />
              <Route 
                path="/admin/lessons/:id/edit" 
                element={
                  <AdminProtectedRoute>
                    <LessonForm />
                  </AdminProtectedRoute>
                } 
              />
            </Routes>
          </SearchProvider>
        </AdminProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;