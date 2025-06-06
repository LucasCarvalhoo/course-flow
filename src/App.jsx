import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import Modules from './pages/Modules'; // We'll convert this to ModulesPage later

// Admin Pages (we'll create these in Phase 3)
// import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* PUBLIC ROUTES - No authentication required */}
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<Modules />} />
          {/* We'll add these in Phase 3:
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          */}
          
          {/* ADMIN ROUTES - We'll add these in Phase 3 */}
          {/* <Route path="/admin" element={<AdminLogin />} /> */}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;