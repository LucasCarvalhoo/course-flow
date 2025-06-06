import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import { useModules } from '../../hooks/useModules';
import { Save, ArrowLeft, AlertCircle, PlayCircle, ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    if (isEditing) {
      fetchLesson();
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
      }

      if (result.error) throw result.error;

      setSuccess(isEditing ? 'Aula atualizada com sucesso!' : 'Aula criada com sucesso!');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/admin/lessons');
      }, 1500);

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

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-[#cccccc] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para aulas
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEditing ? 'Editar Aula' : 'Criar Nova Aula'}
              </h1>
              <p className="text-[#cccccc]">
                {isEditing ? 'Atualize as informações da aula' : 'Preencha os dados para criar uma nova aula'}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#2a2a2a] rounded-xl border border-[#333333] p-8">
            <div className="space-y-6">
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

              {/* Title */}
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

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Descrição da Aula
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Descreva o conteúdo desta aula..."
                  disabled={loading}
                />
              </div>

              {/* YouTube URL */}
              <div>
                <label htmlFor="youtube_url" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  URL do YouTube
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    id="youtube_url"
                    name="youtube_url"
                    value={formData.youtube_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://www.youtube.com/watch?v=..."
                    disabled={loading}
                  />
                  {formData.youtube_video_id && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓ ID do vídeo detectado:</span>
                      <code className="bg-[#1a1a1a] px-2 py-1 rounded text-[#cccccc]">
                        {formData.youtube_video_id}
                      </code>
                      <button
                        type="button"
                        onClick={previewYouTube}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration_minutes" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  id="duration_minutes"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: 15"
                  min="1"
                  disabled={loading}
                />
              </div>

              {/* Order Position */}
              <div>
                <label htmlFor="order_position" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Posição na Ordem
                </label>
                <input
                  type="number"
                  id="order_position"
                  name="order_position"
                  value={formData.order_position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: 1, 2, 3..."
                  min="1"
                  disabled={loading}
                />
                <p className="text-[#666666] text-sm mt-1">
                  Define a ordem desta aula dentro do módulo (opcional).
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-[#333333]">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-[#333333] text-white rounded-lg hover:bg-[#404040] transition-colors disabled:opacity-50"
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

          {/* Help Section */}
          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-green-400 font-medium mb-3">💡 Dicas para URLs do YouTube:</h3>
            <ul className="text-green-300 text-sm space-y-2">
              <li>• Formatos aceitos: youtube.com/watch?v=ID, youtu.be/ID</li>
              <li>• O ID do vídeo será extraído automaticamente</li>
              <li>• Certifique-se de que o vídeo é público ou não listado</li>
              <li>• Teste o link antes de salvar</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LessonForm;