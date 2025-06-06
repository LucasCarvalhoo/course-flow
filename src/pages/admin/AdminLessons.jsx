import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabase } from '../../services/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  PlayCircle,
  Clock,
  ExternalLink,
  AlertCircle,
  Filter
} from 'lucide-react';

const AdminLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch lessons with module info
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select(`
          *,
          module:modules(title)
        `)
        .order('created_at', { ascending: false });

      if (lessonsError) throw lessonsError;

      // Fetch modules for filter
      const { data: modulesData, error: modulesError } = await supabase
        .from('modules')
        .select('*')
        .order('title');

      if (modulesError) throw modulesError;

      setLessons(lessonsData || []);
      setModules(modulesData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.module?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesModule = !filterModule || lesson.module_id === filterModule;
    
    return matchesSearch && matchesModule;
  });

  const handleDeleteLesson = async (lessonId) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;

      await fetchData();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Erro ao deletar aula:', error);
      alert('Erro ao deletar aula: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateOrder = async (lessonId, newOrder) => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update({ order_position: newOrder })
        .eq('id', lessonId);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
      alert('Erro ao atualizar ordem: ' + error.message);
    }
  };

  const stats = {
    totalLessons: lessons.length,
    totalDuration: lessons.reduce((acc, lesson) => acc + (lesson.duration_minutes || 0), 0),
    withVideos: lessons.filter(lesson => lesson.youtube_url).length
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
              Gerenciar Aulas
            </h1>
            <p className="text-[#cccccc]">
              Crie, edite e organize as aulas dos seus módulos.
            </p>
          </div>
          <Link
            to="/admin/lessons/new"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4" />
            Nova Aula
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              placeholder="Buscar aulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#333333] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#737373]" />
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="bg-[#2a2a2a] border border-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">Todos os módulos</option>
              {modules.map(module => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}min
                </h3>
                <p className="text-[#666666]">Duração Total</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{stats.withVideos}</h3>
                <p className="text-[#666666]">Com Vídeos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] overflow-hidden">
          {filteredLessons.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm || filterModule ? (
                <>
                  <Search className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhuma aula encontrada</h3>
                  <p className="text-[#666666] mb-4">
                    Não encontramos aulas com os filtros aplicados.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterModule('');
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Limpar filtros
                  </button>
                </>
              ) : (
                <>
                  <PlayCircle className="w-12 h-12 text-[#666666] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Nenhuma aula criada</h3>
                  <p className="text-[#666666] mb-6">
                    Comece criando sua primeira aula.
                  </p>
                  <Link
                    to="/admin/lessons/new"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Criar Primeira Aula
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#333333]">
              {filteredLessons.map((lesson, index) => (
                <div key={lesson.id} className="p-6 hover:bg-[#333333] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                          #{lesson.order_position || index + 1}
                        </span>
                        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                          {lesson.module?.title || 'Sem módulo'}
                        </span>
                        <h3 className="text-lg font-semibold text-white">
                          {lesson.title}
                        </h3>
                      </div>
                      
                      <p className="text-[#cccccc] mb-3 line-clamp-2">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-[#888888]">
                        {lesson.duration_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration_minutes} min
                          </span>
                        )}
                        {lesson.youtube_url && (
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            YouTube
                          </span>
                        )}
                        <span>
                          Criada: {new Date(lesson.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {/* Order Controls */}
                      <div className="flex flex-col gap-1">
                        <input
                          type="number"
                          value={lesson.order_position || ''}
                          onChange={(e) => handleUpdateOrder(lesson.id, parseInt(e.target.value) || null)}
                          className="w-16 px-2 py-1 bg-[#1a1a1a] border border-[#333333] rounded text-white text-xs text-center"
                          placeholder="Ord"
                          min="1"
                        />
                      </div>
                      
                      {lesson.youtube_url && (
                        <a
                          href={lesson.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[#666666] hover:text-red-400 transition-colors"
                          title="Assistir no YouTube"
                        >
                          <PlayCircle className="w-4 h-4" />
                        </a>
                      )}
                      
                      <Link
                        to={`/admin/lessons/${lesson.id}/edit`}
                        className="p-2 text-[#666666] hover:text-green-400 transition-colors"
                        title="Editar aula"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => setDeleteConfirm(lesson)}
                        className="p-2 text-[#666666] hover:text-red-400 transition-colors"
                        title="Deletar aula"
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
                    <h3 className="text-lg font-semibold text-white">Deletar Aula</h3>
                    <p className="text-[#666666] text-sm">Esta ação não pode ser desfeita</p>
                  </div>
                </div>
                
                <p className="text-[#cccccc] mb-6">
                  Tem certeza que deseja deletar a aula <strong>"{deleteConfirm.title}"</strong>?
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
                    onClick={() => handleDeleteLesson(deleteConfirm.id)}
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

export default AdminLessons;