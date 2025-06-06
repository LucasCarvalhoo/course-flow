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
  ExternalLink,
  ChevronRight,
  Bell,
  Search,
  User
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
      description: 'Visão geral do sistema',
      badge: null
    },
    {
      name: 'Módulos',
      href: '/admin/modules',
      icon: BookOpen,
      description: 'Gerenciar módulos de curso',
      badge: null
    },
    {
      name: 'Aulas',
      href: '/admin/lessons',
      icon: PlayCircle,
      description: 'Gerenciar aulas e vídeos',
      badge: 'Novo'
    },
    {
      name: 'Configurações',
      href: '/admin/settings',
      icon: Settings,
      description: 'Configurações do sistema',
      badge: null
    }
  ];

  const isCurrentPath = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const currentItem = navigationItems.find(item => isCurrentPath(item.href));

  const quickActions = [
    { label: 'Novo Módulo', href: '/admin/modules/new' },
    { label: 'Nova Aula', href: '/admin/lessons/new' },
    { label: 'Ver Site', href: '/', external: true }
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-gray-900/95 backdrop-blur-md border-r border-gray-800 transform transition-transform lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">Administrador</h1>
                <p className="text-xs text-gray-400">Geração Tech 2.0</p>
              </div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isCurrentPath(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative
                    ${isActive 
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs opacity-75 truncate">{item.description}</div>
                  </div>
                  {item.badge && (
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>
                  )}
                </Link>
              );
            })}

            {/* Quick Actions */}
            <div className="pt-6">
              <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-3 px-4 font-semibold">
                Ações Rápidas
              </h3>
              <div className="space-y-1">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    target={action.external ? "_blank" : undefined}
                    className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all text-sm group"
                  >
                    <span>{action.label}</span>
                    {action.external ? (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* System Status */}
          <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-800/50 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Sistema</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Última atualização: há 2 min
              </div>
            </div>
          </div>

          {/* Admin Info & Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm truncate">{admin?.name}</div>
                <div className="text-gray-400 text-xs truncate">{admin?.email}</div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-red-600/20 rounded-xl transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-white">
                  {currentItem?.name || 'Admin Panel'}
                </h1>
                <p className="text-sm text-gray-400">
                  {currentItem?.description || 'Painel administrativo'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              {/* View Site */}
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Site
              </Link>
              
              
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;