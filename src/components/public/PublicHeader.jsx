import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Home, BookOpen, Users } from 'lucide-react';
import SearchModal from '../SearchModal';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Cursos', href: '/modules', icon: BookOpen },
    { name: 'Comunidade', href: '#', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="bg-black/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="./img/logo-gt.png" 
                  alt="Geração Tech" 
                  className="h-8 w-auto transition-all duration-200 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive(item.href)
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button - Desktop */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-2.5 text-gray-400 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-200 w-64 group"
              >
                <Search className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm">Buscar aulas...</span>
              </button>

              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Admin Link */}
              <Link
                to="/admin"
                className="hidden sm:flex items-center px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors rounded-lg"
              >
                Admin
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800/50 py-4">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive(item.href)
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="border-t border-gray-800/50 pt-4 mt-4">
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 transition-colors text-sm rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Painel Admin
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default PublicHeader;