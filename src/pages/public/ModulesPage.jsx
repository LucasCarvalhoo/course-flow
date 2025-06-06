import React, { useState } from 'react';
import { useModules } from '../../hooks/useModules';
import PublicLayout from '../../components/public/PublicLayout';
import ModuleCard from '../../components/public/ModuleCard';
import { Search, Filter } from 'lucide-react';

const ModulesPage = () => {
  const { modules, loading, error } = useModules();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('order'); // order, title, lessons

  // Filter and sort modules
  const filteredModules = modules
    .filter(module => 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'lessons':
          return (b.lessons?.length || 0) - (a.lessons?.length || 0);
        case 'order':
        default:
          return (a.order_position || 0) - (b.order_position || 0);
      }
    });

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-[#2a2a2a] rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-[#2a2a2a] rounded-xl"></div>
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
            <h1 className="text-2xl font-bold text-white mb-4">Erro ao carregar módulos</h1>
            <p className="text-[#cccccc]">{error}</p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Todos os Cursos
          </h1>
          <p className="text-xl text-[#cccccc] max-w-2xl">
            Explore todos os nossos módulos de ensino e comece a aprender no seu próprio ritmo.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              placeholder="Buscar módulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#737373]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#2a2a2a] border border-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4d4d4d] transition-colors"
            >
              <option value="order">Ordem do curso</option>
              <option value="title">Nome (A-Z)</option>
              <option value="lessons">Mais aulas</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#cccccc]">
            {filteredModules.length} {filteredModules.length === 1 ? 'módulo encontrado' : 'módulos encontrados'}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>

        {/* Modules Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum módulo encontrado
            </h3>
            <p className="text-[#cccccc] mb-6">
              {searchTerm 
                ? `Não encontramos módulos para "${searchTerm}". Tente outros termos de busca.`
                : 'Não há módulos disponíveis no momento.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Limpar busca
              </button>
            )}
          </div>
        )}

        {/* CTA Section */}
        {filteredModules.length > 0 && (
          <div className="mt-16 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para começar?
            </h3>
            <p className="text-[#cccccc] mb-6 max-w-2xl mx-auto">
              Escolha um módulo acima e comece sua jornada de aprendizado. 
              Todos os cursos são 100% gratuitos e acessíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Junte-se à Comunidade
              </a>
              <a
                href="#"
                className="border border-[#333333] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a2a2a] transition-colors"
              >
                Ver Materiais Extras
              </a>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default ModulesPage;