// src/components/admin/ResourceManager.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Plus, Edit, Trash2, ExternalLink, FileDown, AlertCircle, X } from 'lucide-react';

const ResourceManager = ({ lessonId, onClose }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'link'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (lessonId) {
      fetchResources();
    }
  }, [lessonId]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_position');

      if (error) throw error;
      setResources(data || []);
    } catch (err) {
      console.error('Erro ao buscar recursos:', err);
      setError('Erro ao carregar recursos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const resourceData = {
        ...formData,
        lesson_id: lessonId,
        order_position: editingResource ? editingResource.order_position : resources.length + 1
      };

      let result;
      if (editingResource) {
        result = await supabase
          .from('resources')
          .update(resourceData)
          .eq('id', editingResource.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('resources')
          .insert([resourceData])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      await fetchResources();
      resetForm();
    } catch (err) {
      setError('Erro ao salvar recurso: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      url: resource.url,
      type: resource.type
    });
    setShowForm(true);
  };

  const handleDelete = async (resourceId) => {
    if (!confirm('Tem certeza que deseja excluir este recurso?')) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId);

      if (error) throw error;
      await fetchResources();
    } catch (err) {
      setError('Erro ao excluir recurso: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', url: '', type: 'link' });
    setEditingResource(null);
    setShowForm(false);
    setError('');
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'download':
        return <FileDown className="w-4 h-4 text-green-400" />;
      case 'link':
      case 'external':
      default:
        return <ExternalLink className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/80" onClick={onClose}></div>
        
        <div className="relative bg-[#2a2a2a] rounded-xl max-w-2xl w-full p-6 border border-[#333333] max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Gerenciar Recursos</h2>
            <button
              onClick={onClose}
              className="text-[#666666] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Add Resource Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full mb-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Recurso
            </button>
          )}

          {/* Resource Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">
                {editingResource ? 'Editar Recurso' : 'Novo Recurso'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    Título do Recurso *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: Documentação Oficial do Java"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    URL do Recurso *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    Tipo de Recurso *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="link">Link/Recurso (aparece em Resources)</option>
                    <option value="external">Link Externo (aparece em Resources)</option>
                    <option value="download">Download (aparece em Downloads)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-[#404040] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : editingResource ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          )}

          {/* Resources List */}
          <div>
            <h3 className="text-white font-medium mb-4">Recursos Cadastrados</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-[#cccccc] text-sm">Carregando recursos...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8 text-[#666666]">
                <p>Nenhum recurso cadastrado para esta lição.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{resource.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-[#888888]">
                          <span className="capitalize">{resource.type}</span>
                          <span>•</span>
                          <span className="truncate">{resource.url}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#666666] hover:text-blue-400 transition-colors"
                        title="Abrir link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleEdit(resource)}
                        className="p-2 text-[#666666] hover:text-green-400 transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(resource.id)}
                        className="p-2 text-[#666666] hover:text-red-400 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">💡 Dicas:</h4>
            <ul className="text-blue-300 text-sm space-y-1">
              <li>• <strong>Link/Recurso:</strong> Links úteis que aparecerão na seção "Resources"</li>
              <li>• <strong>Download:</strong> Arquivos para download que aparecerão na seção "Downloads"</li>
              <li>• Use URLs diretas para arquivos PDF, ZIP, etc. para downloads</li>
              <li>• Os recursos aparecerão na ordem que foram criados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManager;