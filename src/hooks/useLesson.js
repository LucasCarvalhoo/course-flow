// src/hooks/useLesson.js
import { useState, useEffect } from 'react';
import { lessonService } from '../services/lessonService';

export const useLesson = (lessonId = null) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resources, setResources] = useState([]);
  const [navigation, setNavigation] = useState({ previous: null, next: null });

  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let lessonData;
      
      // Se não há lessonId, buscar a primeira lição
      if (!lessonId) {
        lessonData = await lessonService.getFirstLesson();
      } else {
        // Verificar se é um UUID válido
        if (!lessonService.isValidUUID(lessonId)) {
          throw new Error('ID da lição inválido');
        }
        lessonData = await lessonService.getLessonById(lessonId);
      }

      // Buscar recursos da lição
      let lessonResources = [];
      if (lessonData && lessonData.id) {
        lessonResources = await lessonService.getLessonResources(lessonData.id);
      }

      // Buscar navegação (próxima/anterior)
      let lessonNavigation = { previous: null, next: null };
      if (lessonData && lessonData.moduleId) {
        lessonNavigation = await lessonService.getLessonNavigation(
          lessonData.id, 
          lessonData.moduleId
        );
      }
      
      // Formatar dados para o componente
      const formattedLesson = {
        ...lessonData,
        // Separate resources by type
        resources: lessonResources.filter(r => r.type === 'link') || [],
        downloads: lessonResources.filter(r => r.type === 'download') || [],
        // FAQ pode ser implementado futuramente
        faq: []
      };
      
      setLesson(formattedLesson);
      setResources(lessonResources);
      setNavigation(lessonNavigation);
    } catch (err) {
      console.error('Erro ao carregar lição:', err);
      setError(err.message || 'Erro ao carregar lição');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const completeLesson = async () => {
    try {
      if (lesson?.id) {
        const result = await lessonService.markLessonComplete(lesson.id);
        console.log('Lição concluída:', result);
        
        // You could update local state here to reflect completion
        // setLesson(prev => ({ ...prev, completed: true }));
        
        return result;
      }
    } catch (err) {
      console.error('Erro ao completar lição:', err);
      setError(err.message || 'Erro ao completar lição');
      throw err;
    }
  };

  const playVideo = () => {
    if (lesson?.videoUrl) {
      console.log('Reproduzindo vídeo:', lesson.videoUrl);
      // Aqui você pode adicionar lógica adicional, como analytics
      
      // Track video play event
      if (window.gtag) {
        window.gtag('event', 'video_play', {
          video_title: lesson.title,
          video_url: lesson.videoUrl,
          lesson_id: lesson.id
        });
      }
    }
  };

  const navigateToLesson = (targetLessonId) => {
    if (targetLessonId && targetLessonId !== lessonId) {
      // This would typically be handled by React Router
      // For now, we'll just trigger a reload with the new lesson ID
      window.location.href = `/lesson/${targetLessonId}`;
    }
  };

  const goToNextLesson = () => {
    if (navigation.next) {
      navigateToLesson(navigation.next.id);
    }
  };

  const goToPreviousLesson = () => {
    if (navigation.previous) {
      navigateToLesson(navigation.previous.id);
    }
  };

  const refetch = () => {
    fetchLesson();
  };

  // Enhanced return object with more functionality
  return {
    // Core data
    lesson,
    resources,
    navigation,
    
    // State
    loading,
    error,
    
    // Actions
    completeLesson,
    playVideo,
    goToNextLesson,
    goToPreviousLesson,
    refetch,
    
    // Helper computed values
    hasVideo: !!(lesson?.videoId || lesson?.videoUrl),
    hasResources: resources.length > 0,
    hasNavigation: !!(navigation.previous || navigation.next),
    isCompleted: false, // This would come from user progress data
    
    // Progress information
    progress: navigation.position && navigation.total ? {
      current: navigation.position,
      total: navigation.total,
      percentage: Math.round((navigation.position / navigation.total) * 100)
    } : null
  };
};