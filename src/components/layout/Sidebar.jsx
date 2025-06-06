import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  User, 
  Search, 
  Settings, 
  Users, 
  BookOpen, 
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Star,
  Play
} from 'lucide-react';

const Sidebar = ({ modules = [], selectedModule, onModuleSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    modules: true,
    links: true,
    account: true
  });
  const navigate = useNavigate();

  const getModuleIcon = (index) => {
    const icons = ['📚', '⚡', '🎨', '📊', '🚀', '💡', '🔧', '🎯'];
    return icons[index % icons.length];
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const links = [
    { id: 1, name: 'Comunidade', icon: Users, href: '#', color: 'text-blue-400' },
    { id: 2, name: 'Mentoria', icon: MessageCircle, href: '#', color: 'text-green-400' },
    { id: 3, name: 'Recursos', icon: BookOpen, href: '#', color: 'text-purple-400' }
  ];

  const accountItems = [
    { id: 1, name: 'Perfil', icon: User, action: () => console.log('Profile') },
    { id: 2, name: 'Configurações', icon: Settings, action: () => console.log('Settings') },
    { id: 3, name: 'Sair', icon: LogOut, action: () => console.log('Logout'), color: 'text-red-400' }
  ];

  const SectionHeader = ({ title, isExpanded, onToggle, count }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-4 py-2 text-xs uppercase tracking-wider text-gray-500 hover:text-gray-400 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{title}</span>
        {count && (
          <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
            {count}
          </span>
        )}
      </div>
      {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
    </button>
  );

  return (
    <div className="w-72 bg-gray-950/90 backdrop-blur-md border-r border-gray-800/50 flex flex-col h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800/50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="/public/img/logo-gt.png" 
              alt="Geração Tech" 
              className="h-8 w-auto transition-all duration-200 group-hover:scale-105 [filter:drop-shadow(0_0_6px_rgba(59,130,246,0.3))]"
            />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Geração Tech</h1>
            <p className="text-xs text-blue-400 font-medium">2.0 Platform</p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar módulos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input pl-10 text-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Modules Section */}
        <div className="p-4">
          <SectionHeader 
            title="Módulos" 
            isExpanded={expandedSections.modules}
            onToggle={() => toggleSection('modules')}
            count={filteredModules.length}
          />
          
          {expandedSections.modules && (
            <div className="space-y-1 mt-2 animate-slide-up">
              {filteredModules.map((module, index) => (
                <div
                  key={module.id}
                  onClick={() => onModuleSelect?.(module)}
                  className={`sidebar-item group ${
                    selectedModule?.id === module.id ? 'active' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-lg">{getModuleIcon(index)}</div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium truncate block">
                        {module.title}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{module.lessons?.length || 0} aulas</span>
                        {module.lessons?.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Play className="w-3 h-3" />
                              <span>Em andamento</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
              
              {filteredModules.length === 0 && searchQuery && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  Nenhum módulo encontrado
                </div>
              )}
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="p-4">
          <SectionHeader 
            title="Links Úteis" 
            isExpanded={expandedSections.links}
            onToggle={() => toggleSection('links')}
          />
          
          {expandedSections.links && (
            <div className="space-y-1 mt-2 animate-slide-up">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="sidebar-item group"
                  >
                    <Icon className={`w-4 h-4 ${link.color}`} />
                    <span className="text-sm font-medium">{link.name}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Featured Section */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">Destaque</span>
            </div>
            <p className="text-xs text-gray-300 mb-3">
              Complete 3 módulos e ganhe um certificado!
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-1/3"></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">1 de 3 módulos</div>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="border-t border-gray-800/50 p-4">
        <SectionHeader 
          title="Conta" 
          isExpanded={expandedSections.account}
          onToggle={() => toggleSection('account')}
        />
        
        {expandedSections.account && (
          <div className="space-y-1 mt-2 animate-slide-up">
            {accountItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`sidebar-item w-full group ${item.color || ''}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;