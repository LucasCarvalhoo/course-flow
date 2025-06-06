// src/hooks/useLesson.js
import { useState, useEffect } from 'react';

export const useLesson = (lessonId) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - substituir pela integração com Supabase
  const mockLessonData = {
    id: 1,
    title: "Lesson 1",
    description: "Welcome to this lesson on creating a website template. In this short lesson, we will explore the key steps involved in designing a website template.",
    summary: "In this short lesson, we will explore the key steps involved in designing a website template. From defining the purpose and audience to planning the layout, styling, and coding, you'll learn how to create a visually appealing and functional foundation for your website. Let's dive in and unlock the world of website template creation!",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoTitle: "Input",
    videoSubtitle: "A Complete...",
    videoDescription: "Supports Loops, FormSpark, MailChimp, and GetWaitlist.",
    resources: [
      { id: 1, title: 'Link Name', type: 'link', url: 'https://example.com' },
      { id: 2, title: 'Link Name', type: 'link', url: 'https://example.com' }
    ],
    downloads: [
      { id: 1, title: 'File Name', type: 'file', url: '/downloads/file1.pdf' },
      { id: 2, title: 'File Name', type: 'file', url: '/downloads/file2.pdf' }
    ],
    faq: [
      {
        id: 1,
        title: 'Accordion Title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.'
      },
      {
        id: 2,
        title: 'Accordion Title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.'
      }
    ]
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Aqui você faria a chamada real para o Supabase
        // const { data, error } = await supabase
        //   .from('lessons')
        //   .select(`
        //     *,
        //     module:modules(*),
        //     resources(*),
        //     faq(*)
        //   `)
        //   .eq('id', lessonId)
        //   .single();
        
        setLesson(mockLessonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  const completeLesson = async () => {
    try {
      // Lógica para marcar lição como completa
      console.log('Lesson completed:', lessonId);
      
      // Aqui você faria a chamada para o Supabase para salvar o progresso
      // await supabase
      //   .from('user_progress')
      //   .upsert({
      //     lesson_id: lessonId,
      //     completed: true,
      //     completed_at: new Date().toISOString()
      //   });
      
    } catch (err) {
      setError(err.message);
    }
  };

  const playVideo = () => {
    // Lógica para reproduzir vídeo
    console.log('Playing video:', lesson?.videoUrl);
  };

  return {
    lesson,
    loading,
    error,
    completeLesson,
    playVideo,
    refetch: () => fetchLesson()
  };
};