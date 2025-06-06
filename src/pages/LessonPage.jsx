// src/pages/LessonPage.jsx
import React, { useState } from 'react';
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

const LessonPage = ({ lessonId = null }) => {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const { lesson, loading, error, completeLesson, playVideo, refetch } = useLesson(lessonId);

  const handleBack = () => {
    // Navegar de volta para a lista de módulos
    console.log('Navigating back to modules');
  };

  const handleComplete = () => {
    completeLesson();
    // Redirecionar para a próxima lição ou mostrar feedback
  };

  const handleModuleSelect = (moduleId) => {
    setActiveModuleId(moduleId);
    // Implementar navegação para primeira lição do módulo
    console.log('Módulo selecionado:', moduleId);
  };

  const handleRetry = () => {
    refetch();
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
            onClick={handleRetry}
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
        <div className="text-center">
          <p className="text-gray-400 mb-4">Lição não encontrada</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161616] text-white flex">
      <Sidebar 
        onModuleSelect={handleModuleSelect}
        activeModuleId={activeModuleId}
      />
     
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4">
        <Header
          title={lesson.title}
          onBack={handleBack}
        />

        <VideoPlayer
          title={lesson.videoTitle}
          subtitle={lesson.videoSubtitle}
          description={lesson.videoDescription}
          videoUrl={lesson.videoUrl}
          videoId={lesson.videoId}
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