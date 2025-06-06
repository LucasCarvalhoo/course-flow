import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import PublicLayout from '../components/public/PublicLayout';
import { PlayCircle, Clock, ArrowLeft, ExternalLink, BookOpen } from 'lucide-react';

const ModulePage = () => {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModule();
  }, [id]);

  const fetchModule = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modules')
        .select(`
          *,
          lessons(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Sort lessons by order_position
      if (data.lessons) {
        data.lessons.sort((a, b) => (a.order_position || 0) - (b.order_position || 0));
      }
      
      setModule(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getModuleGradient = (title) => {
    const titleLower = title?.toLowerCase() || '';
    if (titleLower.includes("introdução") || titleLower.includes("introduction")) {
      return "from-purple-500 to-blue-500";
    } else if (titleLower.includes("fundamentos") || titleLower.includes("foundation")) {
      return "from-pink-500 to-red-500";
    } else if (titleLower.includes("criação") || titleLower.includes("creation") || titleLower.includes("prática")) {
      return "from-blue-500 to-cyan-500";
    } else if (titleLower.includes("estratégias") || titleLower.includes("strategies") || titleLower.includes("avançado")) {
      return "from-green-500 to-teal-500";
    } else {
      return "from-purple-500 to-blue-500";
    }
  };

  const handleLessonClick = (lesson) => {
    if (lesson.youtube_url) {
      window.open(lesson.youtube_url, '_blank');
    }
  };

  const totalDuration = module?.lessons?.reduce((acc, lesson) => {
    return acc + (lesson.duration_minutes || 0);
  }, 0) || 0;

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-[#2a2a2a] rounded-xl"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-[#2a2a2a] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Módulo não encontrado</h1>
            <p className="text-[#cccccc] mb-6">{error}</p>
            <Link 
              to="/modules"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar para Módulos
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!module) {
    return (
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Módulo não encontrado</h1>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/modules"
            className="inline-flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para módulos
          </Link>
        </div>

        {/* Module Header */}
        <div className={`bg-gradient-to-br ${getModuleGradient(module.title)} rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                MÓDULO
              </span>
              <div className="flex items-center gap-2 text-white/80">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{module.lessons?.length || 0} aulas</span>
              </div>
              {totalDuration > 0 && (
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{Math.floor(totalDuration / 60)}h {totalDuration % 60}min</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {module.title}
            </h1>
            
            {module.description && (
              <p className="text-xl text-white/90 max-w-3xl">
                {module.description}
              </p>
            )}
          </div>
        </div>

        {/* Module Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Aulas do Módulo</h2>
              <p className="text-[#cccccc]">
                Clique em uma aula para começar a assistir no YouTube.
              </p>
            </div>

            {module.lessons && module.lessons.length > 0 ? (
              <div className="space-y-4">
                {module.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className="bg-[#2a2a2a] rounded-xl p-6 hover:bg-[#333333] transition-all cursor-pointer group border border-transparent hover:border-[#444444]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {lesson.title}
                        </h3>
                        
                        {lesson.description && (
                          <p className="text-[#cccccc] text-sm mb-3 line-clamp-2">
                            {lesson.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-[#888888]">
                          {lesson.duration_minutes && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration_minutes} min</span>
                            </div>
                          )}
                          {lesson.youtube_url && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" />
                              <span>YouTube</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <PlayCircle className="w-8 h-8 text-[#666666] group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#2a2a2a] rounded-xl">
                <BookOpen className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Nenhuma aula disponível
                </h3>
                <p className="text-[#cccccc]">
                  Este módulo ainda não possui aulas cadastradas.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <div className="bg-[#2a2a2a] rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">
                Informações do Módulo
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-[#333333]">
                  <span className="text-[#cccccc]">Total de aulas:</span>
                  <span className="text-white font-medium">{module.lessons?.length || 0}</span>
                </div>
                
                {totalDuration > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-[#333333]">
                    <span className="text-[#cccccc]">Duração total:</span>
                    <span className="text-white font-medium">
                      {Math.floor(totalDuration / 60)}h {totalDuration % 60}min
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2 border-b border-[#333333]">
                  <span className="text-[#cccccc]">Nível:</span>
                  <span className="text-white font-medium">Iniciante</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#cccccc]">Preço:</span>
                  <span className="text-green-400 font-medium">Gratuito</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/modules"
                  className="w-full bg-[#333333] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#404040] transition-colors text-center block"
                >
                  Ver Outros Módulos
                </Link>
                
                <a
                  href="#"
                  className="w-full border border-[#333333] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors text-center block"
                >
                  Baixar Materiais
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ModulePage;