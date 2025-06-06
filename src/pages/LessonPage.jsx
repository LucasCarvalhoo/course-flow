// src/pages/LessonPage.jsx
import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import VideoPlayer from '../components/lesson/VideoPlayer';
import LessonSummary from '../components/lesson/LessonSummary';
import ResourcesList from '../components/lesson/ResourcesList';
import DownloadsList from '../components/lesson/DownloadsList';
import FAQSection from '../components/lesson/FAQSection';
import CompleteButton from '../components/lesson/CompleteButton';
import { useLesson } from '../hooks/useLesson';

const LessonPage = ({ lessonId = 1 }) => {
  const { lesson, loading, error, completeLesson, playVideo } = useLesson(lessonId);

  const handleBack = () => {
    // Navegar de volta para a lista de módulos
    console.log('Navigating back to modules');
  };

  const handleComplete = () => {
    completeLesson();
    // Redirecionar para a próxima lição ou mostrar feedback
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando lição...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Erro ao carregar a lição: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-gray-400">Lição não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <Header 
          title={lesson.title}
          description={lesson.description}
          onBack={handleBack}
        />

        <VideoPlayer 
          title={lesson.videoTitle}
          subtitle={lesson.videoSubtitle}
          description={lesson.videoDescription}
          videoUrl={lesson.videoUrl}
          onPlay={playVideo}
        />

        <LessonSummary content={lesson.summary} />

        <ResourcesList resources={lesson.resources} />

        <DownloadsList downloads={lesson.downloads} />

        <FAQSection faqItems={lesson.faq} />

        <CompleteButton onComplete={handleComplete} />

        <Footer />
      </div>
    </div>
  );
};

export default LessonPage;