import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

const ModuleCard = ({ module }) => {
  const getModuleGradient = (title) => {
    const titleLower = title.toLowerCase();
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

  const lessonCount = module.lessons?.length || 0;
  const totalDuration = module.lessons?.reduce((acc, lesson) => {
    return acc + (lesson.duration_minutes || 0);
  }, 0) || 0;

  return (
    <Link
      to={`/module/${module.id}`}
      className="group block bg-[#2a2a2a] rounded-xl overflow-hidden hover:bg-[#333333] transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Module Header with Gradient */}
      <div className={`bg-gradient-to-br ${getModuleGradient(module.title)} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
              MÓDULO
            </span>
            <PlayCircle className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {module.title}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2">
            {module.description}
          </p>
        </div>
      </div>

      {/* Module Content */}
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-[#cccccc] mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{lessonCount} aulas</span>
          </div>
          {totalDuration > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}min</span>
            </div>
          )}
        </div>

        {/* Lessons Preview */}
        {module.lessons && module.lessons.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="text-white font-medium text-sm">Próximas aulas:</h4>
            <div className="space-y-1">
              {module.lessons.slice(0, 3).map((lesson, index) => (
                <div key={lesson.id} className="text-[#888888] text-xs flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="line-clamp-1">{lesson.title}</span>
                </div>
              ))}
              {module.lessons.length > 3 && (
                <div className="text-[#666666] text-xs flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#666666] rounded-full"></div>
                  <span>+{module.lessons.length - 3} mais aulas</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:text-blue-300 transition-colors">
          <span>Começar módulo</span>
          <PlayCircle className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;