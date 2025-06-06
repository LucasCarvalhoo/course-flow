import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchContent = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const searchTerm = query.toLowerCase().trim();

      // Search modules
      const { data: modules, error: modulesError } = await supabase
        .from('modules')
        .select('*, lessons(*)')
        .or(`title.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);

      if (modulesError) throw modulesError;

      // Search lessons
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select(`
          *,
          module:modules(title)
        `)
        .or(`title.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);

      if (lessonsError) throw lessonsError;

      const results = [
        ...modules.map(module => ({
          type: 'module',
          id: module.id,
          title: module.title,
          description: module.description,
          lessonCount: module.lessons?.length || 0,
          url: `/module/${module.id}`
        })),
        ...lessons.map(lesson => ({
          type: 'lesson',
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          moduleTitle: lesson.module?.title,
          duration: lesson.duration_minutes,
          youtubeUrl: lesson.youtube_url,
          url: lesson.youtube_url
        }))
      ];

      setSearchResults(results);
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchContent(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const value = {
    searchResults,
    isSearching,
    searchQuery,
    setSearchQuery,
    clearSearch,
    searchContent
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};