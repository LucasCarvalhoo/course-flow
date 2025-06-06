import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import SearchModal from '../SearchModal'; // Fixed import path

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
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
              <button
                onClick={handleSearchClick}
                className="flex items-center gap-3 bg-[#2a2a2a] border border-[#333333] rounded-lg px-4 py-2 text-[#737373] hover:border-[#4d4d4d] transition-colors w-64"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Buscar aulas...</span>
              </button>
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
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={handleSearchClick}
                className="text-[#cccccc] hover:text-white p-2"
              >
                <Search className="w-5 h-5" />
              </button>
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