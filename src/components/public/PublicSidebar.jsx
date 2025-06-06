import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModules } from '../../hooks/useModules';
import { PlayCircle, BookOpen, Users, Settings } from 'lucide-react';

const PublicSidebar = () => {
  const { modules, loading } = useModules();
  const location = useLocation();

  const getModuleIcon = (index) => {
    const icons = [
      <PlayCircle className="w-4 h-4" />,
      <BookOpen className="w-4 h-4" />,
      <Users className="w-4 h-4" />,
      <Settings className="w-4 h-4" />,
    ];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="w-64 bg-[#1f1f1f] border-r border-[#333333] p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-[#2a2a2a] rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-[#1f1f1f] border-r border-[#333333] h-screen sticky top-16 overflow-y-auto">
      <div className="p-4">
        {/* Modules Section */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wide text-[#666666] mb-3 font-semibold">
            MÓDULOS
          </h3>
          <div className="space-y-1">
            {modules.map((module, index) => (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${
                  location.pathname === `/module/${module.id}`
                    ? 'bg-[#333333] text-white'
                    : 'text-[#cccccc] hover:text-white hover:bg-[#2a2a2a]'
                }`}
              >
                <div className="text-[#888888] group-hover:text-[#cccccc]">
                  {getModuleIcon(index)}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{module.title}</span>
                  {module.lessons && (
                    <div className="text-xs text-[#666666] mt-1">
                      {module.lessons.length} aulas
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wide text-[#666666] mb-3 font-semibold">
            LINKS RÁPIDOS
          </h3>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 text-[#888888]" />
              <span className="text-sm">Comunidade</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#888888]" />
              <span className="text-sm">Materiais</span>
            </a>
          </div>
        </div>

        {/* Admin Section */}
        <div>
          <h3 className="text-xs uppercase tracking-wide text-[#666666] mb-3 font-semibold">
            ADMIN
          </h3>
          <div className="space-y-1">
            <Link
              to="/admin"
              className="flex items-center gap-3 p-3 text-[#666666] hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Painel Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSidebar;