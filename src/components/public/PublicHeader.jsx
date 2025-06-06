import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // We'll implement search functionality later
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-[#1f1f1f] border-b border-[#333333] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/public/img/logo-gt.png" 
              alt="Geração Tech" 
              className="h-8 w-auto [filter:drop-shadow(0_0_6px_rgba(255,255,255,0.2))]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-[#cccccc] hover:text-white transition-colors text-sm font-medium"
            >
              Início
            </Link>
            <Link 
              to="/modules" 
              className="text-[#cccccc] hover:text-white transition-colors text-sm font-medium"
            >
              Cursos
            </Link>
            <a 
              href="#" 
              className="text-[#cccccc] hover:text-white transition-colors text-sm font-medium"
            >
              Comunidade
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar aulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#2a2a2a] border border-[#333333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors w-64"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
            </form>
          </div>

          {/* Admin Link */}
          <div className="hidden md:flex items-center">
            <Link
              to="/admin"
              className="text-[#666666] hover:text-white transition-colors text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#cccccc] hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#333333] py-4">
            <div className="space-y-4">
              <Link 
                to="/" 
                className="block text-[#cccccc] hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/modules" 
                className="block text-[#cccccc] hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
              <a 
                href="#" 
                className="block text-[#cccccc] hover:text-white transition-colors text-sm font-medium"
              >
                Comunidade
              </a>
              <Link
                to="/admin"
                className="block text-[#666666] hover:text-white transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mt-4">
                <input
                  type="text"
                  placeholder="Buscar aulas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#2a2a2a] border border-[#333333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors w-full"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;