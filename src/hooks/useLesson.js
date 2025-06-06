// src/hooks/useLesson.js
import { useState, useEffect } from 'react';
import { lessonService } from '../services/lessonService';

export const useLesson = (lessonId = null) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let lessonData;
      let resources = [];
      
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
      if (lessonData && lessonData.id) {
        resources = await lessonService.getLessonResources(lessonData.id);
      }
      
      // Formatar dados para o componente
      const formattedLesson = {
        id: lessonData.id,
        title: lessonData.title,
        description: lessonData.description,
        summary: lessonData.description, // Usar description como summary
        videoUrl: lessonData.youtube_url,
        videoId: lessonData.youtube_video_id,
        videoTitle: lessonData.title,
        videoSubtitle: lessonData.module_title || lessonData.module?.title || 'Módulo',
        videoDescription: lessonData.description,
        duration: lessonData.duration_minutes,
        moduleTitle: lessonData.module_title || lessonData.module?.title,
        moduleId: lessonData.module_id || lessonData.module?.id,
        orderPosition: lessonData.order_position,
        resources: resources.filter(r => r.type === 'link') || [],
        downloads: resources.filter(r => r.type === 'download') || [],
        // FAQ pode ser implementado futuramente
        faq: []
      };
      
      setLesson(formattedLesson);
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
        await lessonService.markLessonComplete(lesson.id);
        console.log('Lição concluída:', lesson.id);
      }
    } catch (err) {
      console.error('Erro ao completar lição:', err);
      setError(err.message || 'Erro ao completar lição');
    }
  };

  const playVideo = () => {
    if (lesson?.videoUrl) {
      console.log('Reproduzindo vídeo:', lesson.videoUrl);
      // Aqui você pode adicionar lógica adicional, como analytics
    }
  };

  const refetch = () => {
    fetchLesson();
  };

  return {
    lesson,
    loading,
    error,
    completeLesson,
    playVideo,
    refetch
  };
};