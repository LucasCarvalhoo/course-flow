import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useModules } from '../../hooks/useModules';
import { supabase } from '../../services/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  BookOpen,
  PlayCircle,
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';

const AdminModules = () => {
  const { modules, loading, refetch } = useModules();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteModule = async (moduleId) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;

      await refetch();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Erro ao deletar módulo:', error);
      alert('Erro ao deletar módulo: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateOrder = async (moduleId, newOrder) => {
    try {
      const { error } = await supabase
        .from('modules')
        .update({ order_position: newOrder })
        .eq('id', moduleId);

      if (error) throw error;
      await refetch();
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
      alert('Erro ao atualizar ordem: ' + error.message);
    }
  };

  const stats = {
    totalModules: modules.length,
    totalLessons: modules.reduce((acc, module) => acc + (module.lessons?.length || 0), 0),
    orderedModules: modules.filter(m => m.order_position).length
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-[#2a2a2a] rounded w-1/4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-[#2a2a2a] rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Gerenciar Módulos
            </h1>
            <p className="text-[#cccccc]">
              Crie, edite e organize os módulos do seu curso.
            </p>
          </div>
          <Link
            to="/admin/modules/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4" />
            Novo Módulo
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              placeholder="Buscar módulos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.totalModules}</h3>
                <p className="text-[#666666]">Total de Módulos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.totalLessons}</h3>
                <p className="text-[#666666]">Total de Aulas</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <ArrowUpDown className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.orderedModules}</h3>
                <p className="text-[#666666]">Módulos Ordenados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] overflow-hidden">
          {filteredModules.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <>
                  <Search className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhum módulo encontrado</h3>
                  <p className="text-[#666666] mb-4">
                    Não encontramos módulos para "{searchTerm}".
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Limpar busca
                  </button>
                </>
              ) : (
                <>
                  <BookOpen className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhum módulo criado</h3>
                  <p className="text-[#666666] mb-6">
                    Comece criando seu primeiro módulo de curso.
                  </p>
                  <Link
                    to="/admin/modules/new"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Criar Primeiro Módulo
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredModules.map((module, index) => (
                <div
                  key={module.id}
                  className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333] hover:border-[#404040] hover:bg-[#242424] transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                          #{module.order_position || index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-white">
                          {module.title}
                        </h3>
                      </div>
                      
                      <p className="text-[#cccccc] mb-3 line-clamp-2">
                        {module.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-[#888888]">
                        <span className="flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" />
                          {module.lessons?.length || 0} aulas
                        </span>
                        <span>
                          Criado: {new Date(module.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {/* Order Controls */}
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          value={module.order_position || ''}
                          onChange={(e) => handleUpdateOrder(module.id, parseInt(e.target.value) || null)}
                          className="w-16 px-2 py-1 bg-[#2a2a2a] border border-[#404040] rounded text-white text-xs text-center focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder="Ord"
                          min="1"
                        />
                      </div>
                      
                      <Link
                        to={`/module/${module.id}`}
                        target="_blank"
                        className="p-2 text-[#666666] hover:text-blue-400 transition-colors rounded hover:bg-[#333333]"
                        title="Visualizar no site"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      
                      <Link
                        to={`/admin/modules/${module.id}/edit`}
                        className="p-2 text-[#666666] hover:text-green-400 transition-colors rounded hover:bg-[#333333]"
                        title="Editar módulo"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => setDeleteConfirm(module)}
                        className="p-2 text-[#666666] hover:text-red-400 transition-colors rounded hover:bg-[#333333]"
                        title="Deletar módulo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black/80" onClick={() => setDeleteConfirm(null)}></div>
              
              <div className="relative bg-[#2a2a2a] rounded-xl max-w-md w-full p-6 border border-[#333333]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Deletar Módulo</h3>
                    <p className="text-[#666666] text-sm">Esta ação não pode ser desfeita</p>
                  </div>
                </div>
                
                <p className="text-[#cccccc] mb-6">
                  Tem certeza que deseja deletar o módulo <strong>"{deleteConfirm.title}"</strong>? 
                  Todas as aulas associadas também serão removidas.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-[#404040] transition-colors"
                    disabled={isDeleting}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDeleteModule(deleteConfirm.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deletando...' : 'Deletar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminModules;