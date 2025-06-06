import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchProvider'; // Fixed import path
import { Search, X, PlayCircle, BookOpen, Clock, ExternalLink } from 'lucide-react';

const SearchModal = ({ isOpen, onClose }) => {
  const { searchResults, isSearching, searchQuery, setSearchQuery, clearSearch } = useSearch();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  const handleClear = () => {
    setInputValue('');
    clearSearch();
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setInputValue('');
    clearSearch();
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-[10vh]">
        <div className="relative bg-[#1f1f1f] rounded-xl shadow-2xl w-full max-w-2xl border border-[#333333] overflow-hidden">
          
          {/* Search Input */}
          <div className="flex items-center gap-4 p-6 border-b border-[#333333]">
            <Search className="w-6 h-6 text-[#666666]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar módulos e aulas..."
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white text-lg placeholder-[#666666] focus:outline-none"
            />
            {inputValue && (
              <button
                onClick={handleClear}
                className="text-[#666666] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-[#666666] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-[#cccccc]">Buscando...</span>
              </div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Nenhum resultado encontrado</h3>
                <p className="text-[#666666]">
                  Não encontramos nada para "{searchQuery}". Tente outros termos.
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {/* Group by type */}
                {searchResults.filter(r => r.type === 'module').length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs uppercase tracking-wide text-[#666666] px-6 py-2 font-semibold">
                      MÓDULOS
                    </h3>
                    <div className="space-y-1">
                      {searchResults
                        .filter(result => result.type === 'module')
                        .map(result => (
                          <Link
                            key={`module-${result.id}`}
                            to={result.url}
                            onClick={handleResultClick}
                            className="flex items-center gap-4 px-6 py-3 hover:bg-[#2a2a2a] transition-colors group"
                          >
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                {result.title}
                              </h4>
                              <p className="text-[#666666] text-sm line-clamp-1">
                                {result.description}
                              </p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#888888]">
                                <span>{result.lessonCount} aulas</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                {searchResults.filter(r => r.type === 'lesson').length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-[#666666] px-6 py-2 font-semibold">
                      AULAS
                    </h3>
                    <div className="space-y-1">
                      {searchResults
                        .filter(result => result.type === 'lesson')
                        .map(result => (
                          <a
                            key={`lesson-${result.id}`}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleResultClick}
                            className="flex items-center gap-4 px-6 py-3 hover:bg-[#2a2a2a] transition-colors group"
                          >
                            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                              <PlayCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium group-hover:text-green-400 transition-colors">
                                {result.title}
                              </h4>
                              <p className="text-[#666666] text-sm line-clamp-1">
                                {result.description}
                              </p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#888888]">
                                {result.moduleTitle && <span>{result.moduleTitle}</span>}
                                {result.duration && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {result.duration} min
                                  </span>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#666666] group-hover:text-green-400 transition-colors" />
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !searchQuery ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Buscar Conteúdo</h3>
                <p className="text-[#666666]">
                  Digite acima para encontrar módulos e aulas.
                </p>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          {searchResults.length > 0 && (
            <div className="border-t border-[#333333] px-6 py-3">
              <p className="text-xs text-[#666666]">
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;