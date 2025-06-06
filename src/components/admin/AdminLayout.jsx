import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  Home, 
  BookOpen, 
  PlayCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield,
  ExternalLink
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { admin, logoutAdmin } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin');
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: Home,
      description: 'Visão geral do sistema'
    },
    {
      name: 'Módulos',
      href: '/admin/modules',
      icon: BookOpen,
      description: 'Gerenciar módulos de curso'
    },
    {
      name: 'Aulas',
      href: '/admin/lessons',
      icon: PlayCircle,
      description: 'Gerenciar aulas e vídeos'
    },
    {
      name: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
      description: 'Configurações do sistema'
    }
  ];

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#1f1f1f] border-r border-[#333333] transform transition-transform lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-[#cccccc]">Geração Tech</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentPath(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group
                      ${isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-[#cccccc] hover:text-white hover:bg-[#2a2a2a]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-wide text-[#666666] mb-3 font-semibold px-4">
                AÇÕES RÁPIDAS
              </h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-2 text-[#cccccc] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Ver Site Público</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Admin Info & Logout */}
          <div className="p-4 border-t border-[#333333]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {admin?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm">{admin?.name}</div>
                <div className="text-[#666666] text-xs truncate">{admin?.email}</div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-[#cccccc] hover:text-white hover:bg-red-600/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-[#1f1f1f] border-b border-[#333333] px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#cccccc] hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-white">
                  {navigationItems.find(item => isCurrentPath(item.href))?.name || 'Admin Panel'}
                </h1>
                <p className="text-sm text-[#cccccc]">
                  {navigationItems.find(item => isCurrentPath(item.href))?.description || 'Painel administrativo'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Site
              </Link>
              
              <div className="text-right">
                <div className="text-white font-medium text-sm">{admin?.name}</div>
                <div className="text-[#666666] text-xs">Administrador</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;