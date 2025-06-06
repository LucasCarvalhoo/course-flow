// src/hooks/useModules.js
import { useState, useEffect } from 'react';
import { lessonService } from '../services/lessonService';

export const useModules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModules = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const modulesData = await lessonService.getModulesWithLessonCount();
      
      // Formatar dados para o componente
      const formattedModules = modulesData.map((module, index) => ({
        id: module.id,
        name: module.title,
        icon: getModuleIcon(module.order_position || index + 1),
        active: false, // Será definido dinamicamente
        lessonCount: module.lesson_count || 0,
        description: module.description,
        orderPosition: module.order_position
      }));
      
      setModules(formattedModules);
    } catch (err) {
      console.error('Erro ao carregar módulos:', err);
      setError(err.message || 'Erro ao carregar módulos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const getModuleIcon = (position) => {
    const icons = {
      1: '✓',
      2: '⚡',
      3: '🎨',
      4: '📊',
      5: '🚀',
      6: '💡',
      7: '📚',
      8: '🎯'
    };
    return icons[position] || '📖';
  };

  const setActiveModule = (moduleId) => {
    setModules(prev => 
      prev.map(module => ({
        ...module,
        active: module.id === moduleId
      }))
    );
  };

  const refetch = () => {
    fetchModules();
  };

  return {
    modules,
    loading,
    error,
    setActiveModule,
    refetch
  };
};