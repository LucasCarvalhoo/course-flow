import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import ResourceManager from '../../pages/admin/ResourceManager';
import { useModules } from '../../hooks/useModules';
import { Save, ArrowLeft, AlertCircle, PlayCircle, ExternalLink, Settings, Plus, Eye } from 'lucide-react';

const LessonForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { modules, loading: modulesLoading } = useModules();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_url: '',
    youtube_video_id: '',
    duration_minutes: '',
    module_id: '',
    order_position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResourceManager, setShowResourceManager] = useState(false);
  const [savedLessonId, setSavedLessonId] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchLesson();
      setSavedLessonId(id);
    }
  }, [id, isEditing]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        description: data.description || '',
        youtube_url: data.youtube_url || '',
        youtube_video_id: data.youtube_video_id || '',
        duration_minutes: data.duration_minutes || '',
        module_id: data.module_id || '',
        order_position: data.order_position || ''
      });
    } catch (err) {
      setError('Erro ao carregar aula: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url) => {
    if (!url) return '';

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newFormData = {
      ...formData,
      [name]: value
    };

    // Auto-extract YouTube ID when URL changes
    if (name === 'youtube_url') {
      const videoId = extractYouTubeId(value);
      newFormData.youtube_video_id = videoId;
    }

    setFormData(newFormData);

    // Clear messages when user types
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim()) {
      setError('O título é obrigatório');
      setLoading(false);
      return;
    }

    if (!formData.module_id) {
      setError('Selecione um módulo');
      setLoading(false);
      return;
    }

    if (formData.youtube_url && !formData.youtube_video_id) {
      setError('URL do YouTube inválida');
      setLoading(false);
      return;
    }

    try {
      const lessonData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        youtube_url: formData.youtube_url.trim(),
        youtube_video_id: formData.youtube_video_id,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
        module_id: formData.module_id,
        order_position: formData.order_position ? parseInt(formData.order_position) : null,
        updated_at: new Date().toISOString()
      };

      let result;
      if (isEditing) {
        result = await supabase
          .from('lessons')
          .update(lessonData)
          .eq('id', id)
          .select()
          .single();
      } else {
        lessonData.created_at = new Date().toISOString();
        result = await supabase
          .from('lessons')
          .insert([lessonData])
          .select()
          .single();

        // Set the saved lesson ID for resource management
        if (result.data) {
          setSavedLessonId(result.data.id);
        }
      }

      if (result.error) throw result.error;

      setSuccess(isEditing ? 'Aula atualizada com sucesso!' : 'Aula criada com sucesso!');

      // If creating new lesson, don't redirect immediately so user can add resources
      if (isEditing) {
        setTimeout(() => {
          navigate('/admin/lessons');
        }, 1500);
      }

    } catch (err) {
      setError('Erro ao salvar aula: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/lessons');
  };

  const previewYouTube = () => {
    if (formData.youtube_url) {
      window.open(formData.youtube_url, '_blank');
    }
  };

  const selectedModule = modules.find(m => m.id === formData.module_id);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header Compacto */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para aulas
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {isEditing ? 'Editar Aula' : 'Criar Nova Aula'}
                </h1>
                <p className="text-[#cccccc] text-sm">
                  {isEditing ? 'Atualize as informações da aula' : 'Preencha os dados para criar uma nova aula'}
                </p>
              </div>
            </div>

            {/* Preview button - se editando */}
            {isEditing && savedLessonId && (
              <Link
                to={`/lesson/${savedLessonId}`}
                target="_blank"
                className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-600/30"
              >
                <Eye className="w-4 h-4" />
                Visualizar
              </Link>
            )}
          </div>
        </div>

        {/* Layout em Grid - 2 colunas */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Formulário */}
          <div className="lg:col-span-2">
            {/* Messages */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <p className="text-red-400">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-green-400" />
                  <p className="text-green-400">{success}</p>
                </div>
              </div>
            )}

            {/* Form Principal */}
            <form onSubmit={handleSubmit} className="bg-[#2a2a2a] rounded-xl border border-[#333333] p-6">
              <div className="grid gap-6">
                {/* Grid 2 colunas para campos menores */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Module Selection */}
                  <div>
                    <label htmlFor="module_id" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                      Módulo *
                    </label>
                    <select
                      id="module_id"
                      name="module_id"
                      value={formData.module_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      disabled={loading || modulesLoading}
                      required
                    >
                      <option value="">Selecione um módulo</option>
                      {modules.map(module => (
                        <option key={module.id} value={module.id}>
                          {module.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order Position */}
                  <div>
                    <label htmlFor="order_position" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                      Ordem
                    </label>
                    <input
                      type="number"
                      id="order_position"
                      name="order_position"
                      value={formData.order_position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="1, 2, 3..."
                      min="1"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Title - Full width */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    Título da Aula *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: Variáveis e Tipos de Dados"
                    disabled={loading}
                    required
                  />
                </div>

                {/* Description com contador */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    Descrição da Aula
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      maxLength={350}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
                      placeholder="Descreva o conteúdo desta aula..."
                      disabled={loading}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-[#666666] bg-[#1a1a1a] px-2 py-1 rounded">
                      {formData.description.length}/350
                    </div>
                  </div>
                  {formData.description.length > 300 && (
                    <div className={`mt-2 text-xs flex items-center gap-1 ${formData.description.length >= 350
                        ? 'text-red-400'
                        : 'text-yellow-400'
                      }`}>
                      {formData.description.length >= 350 ? (
                        <>
                          <span>⚠️</span>
                          <span>Limite máximo atingido (350 caracteres)</span>
                        </>
                      ) : (
                        <>
                          <span>💡</span>
                          <span>Restam {350 - formData.description.length} caracteres</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* YouTube URL e Duration em grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="youtube_url" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                      URL do YouTube
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        id="youtube_url"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://www.youtube.com/watch?v=..."
                        disabled={loading}
                      />
                      {formData.youtube_url && (
                        <button
                          type="button"
                          onClick={previewYouTube}
                          className="px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors border border-red-600/30"
                          title="Abrir no YouTube"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {formData.youtube_video_id && (
                      <div className="mt-2 text-xs text-green-400">
                        ✓ ID detectado: {formData.youtube_video_id}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="duration_minutes" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                      Duração (min)
                    </label>
                    <input
                      type="number"
                      id="duration_minutes"
                      name="duration_minutes"
                      value={formData.duration_minutes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="15"
                      min="1"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-[#333333]">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-[#333333] text-white rounded-lg hover:bg-[#404040] transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {isEditing ? 'Atualizando...' : 'Criando...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {isEditing ? 'Atualizar Aula' : 'Criar Aula'}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Tips - Logo após o formulário na coluna principal */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mt-6">
              <h3 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Dicas para uma boa aula
              </h3>
              <ul className="text-green-300 text-sm space-y-2">
                <li>• Use títulos claros e descritivos</li>
                <li>• Mantenha a descrição entre 200-350 caracteres</li>
                <li>• Organize as aulas em sequência lógica</li>
                <li>• Teste o link do YouTube antes de salvar</li>
                <li>• Adicione recursos complementares após criar</li>
              </ul>
            </div>
          </div>

          {/* Sidebar - Informações e Ações */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                {savedLessonId && (
                  <button
                    onClick={() => setShowResourceManager(true)}
                    className="w-full flex items-center gap-3 bg-blue-600/20 text-blue-400 px-4 py-3 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Gerenciar Recursos</span>
                  </button>
                )}

                <Link
                  to="/admin/lessons/new"
                  className="w-full flex items-center gap-3 bg-green-600/20 text-green-400 px-4 py-3 rounded-lg hover:bg-green-600/30 transition-colors border border-green-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Aula</span>
                </Link>
              </div>
            </div>

            {/* Module Info (se selecionado) */}
            {selectedModule && (
              <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Informações do Módulo</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-[#666666] text-sm">Módulo selecionado:</span>
                    <p className="text-white font-medium">{selectedModule.title}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#cccccc]">Total de aulas:</span>
                    <span className="text-white text-sm">
                      {selectedModule.lessons?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#cccccc]">Ordem atual:</span>
                    <span className="text-white text-sm">
                      {selectedModule.order_position || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Preview do vídeo (se tiver URL) */}
            {formData.youtube_video_id && (
              <div className="bg-[#2a2a2a] rounded-xl border border-[#333333] p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Preview do Vídeo</h3>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${formData.youtube_video_id}/hqdefault.jpg`}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-xs text-[#888888] text-center">
                  ID: {formData.youtube_video_id}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resource Manager Modal */}
        {showResourceManager && savedLessonId && (
          <ResourceManager
            lessonId={savedLessonId}
            onClose={() => setShowResourceManager(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default LessonForm;