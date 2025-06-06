import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen, ArrowRight, Star } from 'lucide-react';

const ModuleCard = ({ module }) => {
  const getModuleGradient = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("introdução") || titleLower.includes("introduction")) {
      return "from-purple-500 to-blue-600";
    } else if (titleLower.includes("fundamentos") || titleLower.includes("foundation")) {
      return "from-pink-500 to-purple-600";
    } else if (titleLower.includes("criação") || titleLower.includes("creation") || titleLower.includes("prática")) {
      return "from-blue-500 to-cyan-500";
    } else if (titleLower.includes("estratégias") || titleLower.includes("strategies") || titleLower.includes("avançado")) {
      return "from-green-500 to-teal-500";
    } else if (titleLower.includes("banco") || titleLower.includes("database")) {
      return "from-indigo-500 to-purple-600";
    } else if (titleLower.includes("java")) {
      return "from-purple-500 to-indigo-600";
    } else {
      return "from-purple-500 to-blue-600";
    }
  };

  const lessonCount = module.lessons?.length || 0;
  const totalDuration = module.lessons?.reduce((acc, lesson) => {
    return acc + (lesson.duration_minutes || 0);
  }, 0) || 0;

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
  };

  return (
    <Link
      to={`/module/${module.id}`}
      className="group block bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Module Header with Enhanced Gradient */}
      <div className={`bg-gradient-to-br ${getModuleGradient(module.title)} p-6 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-semibold tracking-wide border border-white/10">
              MÓDULO {module.order_position || ''}
            </span>
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-colors border border-white/10">
              <PlayCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-white/90 transition-colors leading-tight">
            {module.title}
          </h3>
          
          <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>

      {/* Module Content */}
      <div className="p-6 space-y-4">
        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">{lessonCount} aulas</span>
          </div>
          {totalDuration > 0 && (
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{formatDuration(totalDuration)}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Progresso</span>
            <span className="text-gray-400">0%</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-0 group-hover:w-1/12 transition-all duration-500"></div>
          </div>
        </div>

        {/* Lessons Preview */}
        {module.lessons && module.lessons.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm flex items-center gap-2">
              <Star className="w-3 h-3 text-yellow-500" />
              Próximas aulas:
            </h4>
            <div className="space-y-2">
              {module.lessons.slice(0, 2).map((lesson, index) => (
                <div key={lesson.id} className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center font-semibold text-xs border border-blue-600/30">
                    {index + 1}
                  </div>
                  <span className="text-gray-300 line-clamp-1 flex-1">{lesson.title}</span>
                  {lesson.duration_minutes && (
                    <span className="text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                      {lesson.duration_minutes}min
                    </span>
                  )}
                </div>
              ))}
              {module.lessons.length > 2 && (
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="w-6 h-6 bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-700">
                    <span className="text-xs">+</span>
                  </div>
                  <span>+{module.lessons.length - 2} mais aulas</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors">
              <span>Começar módulo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full border border-green-500/30">
              GRATUITO
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;