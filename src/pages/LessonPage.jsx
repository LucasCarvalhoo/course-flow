import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../components/public/PublicLayout';
import VideoPlayer from '../components/lesson/VideoPlayer';
import LessonSummary from '../components/lesson/LessonSummary';
import ResourcesList from '../components/lesson/ResourcesList';
import DownloadsList from '../components/lesson/DownloadsList';
import FAQSection from '../components/lesson/FAQSection';
import CompleteButton from '../components/lesson/CompleteButton';
import { useLesson } from '../hooks/useLesson';
import { ChevronLeft, BookOpen, Clock, PlayCircle } from 'lucide-react';

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lesson, loading, error, navigation, progress, completeLesson, playVideo } = useLesson(id);

  const handleBack = () => {
    if (lesson?.moduleId) {
      navigate(`/module/${lesson.moduleId}`);
    } else {
      navigate('/modules');
    }
  };

  const handleComplete = () => {
    completeLesson();
    // Show success feedback or redirect
    // For now, we'll just go back to the module
    setTimeout(() => {
      handleBack();
    }, 1000);
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-[#cccccc]">Carregando lição...</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Erro ao carregar a lição: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!lesson) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Lição não encontrada</h1>
            <Link
              to="/modules"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors text-white"
            >
              Voltar para Módulos
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Voltar para {lesson.moduleTitle || 'Módulos'}</span>
          </button>
        </div>

        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-blue-600/30">
              AULA
            </span>
            {lesson.moduleTitle && (
              <div className="flex items-center gap-2 text-[#888888]">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{lesson.moduleTitle}</span>
              </div>
            )}
            {lesson.duration && (
              <div className="flex items-center gap-2 text-[#888888]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{lesson.duration} min</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lesson.title}
          </h1>
          
          {lesson.description && (
            <p className="text-xl text-[#cccccc] max-w-3xl leading-relaxed">
              {lesson.description}
            </p>
          )}
        </div>

        {/* Video Player */}
        {lesson.videoId && (
          <div className="mb-8">
            <VideoPlayer 
              title={lesson.videoTitle || lesson.title}
              subtitle={lesson.videoSubtitle || lesson.moduleTitle}
              description={lesson.videoDescription || lesson.description}
              videoId={lesson.videoId}
              videoUrl={lesson.videoUrl}
              onPlay={playVideo}
            />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lesson Summary */}
            {lesson.summary && (
              <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] overflow-hidden">
                <LessonSummary content={lesson.summary} />
              </div>
            )}

            {/* Navigation between lessons */}
            {(navigation.previous || navigation.next) && (
              <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
                <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
                <div className="flex justify-between items-center">
                  {navigation.previous ? (
                    <Link
                      to={`/lesson/${navigation.previous.id}`}
                      className="flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <div>
                        <div className="text-xs text-[#888888]">Anterior</div>
                        <div className="text-sm">{navigation.previous.title}</div>
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  
                  {navigation.next && (
                    <Link
                      to={`/lesson/${navigation.next.id}`}
                      className="flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors text-right"
                    >
                      <div>
                        <div className="text-xs text-[#888888]">Próxima</div>
                        <div className="text-sm">{navigation.next.title}</div>
                      </div>
                      <ChevronLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] overflow-hidden">
                <ResourcesList resources={lesson.resources} />
              </div>
            )}

            {/* Downloads */}
            {lesson.downloads && lesson.downloads.length > 0 && (
              <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] overflow-hidden">
                <DownloadsList downloads={lesson.downloads} />
              </div>
            )}

            {/* FAQ */}
            {lesson.faq && lesson.faq.length > 0 && (
              <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] overflow-hidden">
                <FAQSection faqItems={lesson.faq} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333] sticky top-24 space-y-6">
              {/* Lesson Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Informações da Aula
                </h3>
                
                <div className="space-y-3">
                  {lesson.duration && (
                    <div className="flex justify-between items-center py-2 border-b border-[#333333]">
                      <span className="text-[#cccccc]">Duração:</span>
                      <span className="text-white font-medium">{lesson.duration} min</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 border-b border-[#333333]">
                    <span className="text-[#cccccc]">Nível:</span>
                    <span className="text-white font-medium">Iniciante</span>
                  </div>
                  
                  {lesson.moduleTitle && (
                    <div className="flex justify-between items-center py-2 border-b border-[#333333]">
                      <span className="text-[#cccccc]">Módulo:</span>
                      <span className="text-white font-medium">{lesson.moduleTitle}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#cccccc]">Status:</span>
                    <span className="text-yellow-400 font-medium">Em andamento</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <CompleteButton 
                  onComplete={handleComplete}
                  text="Marcar como Concluída"
                  
                />
                
                {lesson.videoUrl && (
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#333333] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#404040] transition-colors text-center block"
                  >
                    Abrir no YouTube
                  </a>
                )}
                
                <button
                  onClick={handleBack}
                  className="w-full border border-[#333333] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors text-center"
                >
                  Voltar ao Módulo
                </button>
              </div>

              {/* Progress Indicator */}
              <div>
                <h4 className="text-white font-medium mb-3">Progresso do Módulo</h4>
                {progress ? (
                  <>
                    <div className="w-full bg-[#333333] rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#888888] mt-2">
                      <span>{progress.percentage}% completo</span>
                      <span>{progress.current} de {progress.total} aulas</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full bg-[#333333] rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-1/3 transition-all duration-500"></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#888888] mt-2">
                      <span>Em andamento</span>
                      <span>Aula atual</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LessonPage;