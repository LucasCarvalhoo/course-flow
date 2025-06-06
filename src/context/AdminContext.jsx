import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    checkAdminSession();
  }, []);

  const checkAdminSession = () => {
    const adminData = localStorage.getItem('admin_session');
    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);
        setAdmin(parsed);
      } catch (error) {
        localStorage.removeItem('admin_session');
      }
    }
    setLoading(false);
  };

  const loginAdmin = async (email, password) => {
    try {
      setLoading(true);
      
      // For now, we'll use a simple hardcoded admin check
      // In production, you'd want to use Supabase auth or a proper admin table
      if (email === 'admin@geracaotech.com' && password === 'admin123') {
        const adminData = {
          id: 1,
          email: email,
          name: 'Administrator',
          loginTime: new Date().toISOString()
        };
        
        setAdmin(adminData);
        localStorage.setItem('admin_session', JSON.stringify(adminData));
        return { success: true };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
  };

  const value = {
    admin,
    loading,
    loginAdmin,
    logoutAdmin,
    isAdmin: !!admin
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};