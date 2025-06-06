import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import { Save, ArrowLeft, AlertCircle, BookOpen } from 'lucide-react';

const ModuleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order_position: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchModule();
    }
  }, [id, isEditing]);

  const fetchModule = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        description: data.description || '',
        order_position: data.order_position || ''
      });
    } catch (err) {
      setError('Erro ao carregar módulo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    try {
      const moduleData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        order_position: formData.order_position ? parseInt(formData.order_position) : null,
        updated_at: new Date().toISOString()
      };

      let result;
      if (isEditing) {
        result = await supabase
          .from('modules')
          .update(moduleData)
          .eq('id', id)
          .select()
          .single();
      } else {
        moduleData.created_at = new Date().toISOString();
        result = await supabase
          .from('modules')
          .insert([moduleData])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setSuccess(isEditing ? 'Módulo atualizado com sucesso!' : 'Módulo criado com sucesso!');
      
      // Redirect after success
      setTimeout(() => {
        navigate('/admin/modules');
      }, 1500);

    } catch (err) {
      setError('Erro ao salvar módulo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/modules');
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
            Voltar para módulos
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isEditing ? 'Editar Módulo' : 'Criar Novo Módulo'}
              </h1>
              <p className="text-[#cccccc]">
                {isEditing ? 'Atualize as informações do módulo' : 'Preencha os dados para criar um novo módulo'}
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
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Título do Módulo *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: Introdução ao JavaScript"
                  disabled={loading}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Descrição do Módulo
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Descreva o que os alunos aprenderão neste módulo..."
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
                  Define a ordem de exibição do módulo (opcional). Módulos sem ordem aparecerão por último.
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
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
                    {isEditing ? 'Atualizar Módulo' : 'Criar Módulo'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
            <h3 className="text-blue-400 font-medium mb-3">💡 Dicas para criar um bom módulo:</h3>
            <ul className="text-blue-300 text-sm space-y-2">
              <li>• Use títulos claros e descritivos</li>
              <li>• Mantenha a descrição focada no que será aprendido</li>
              <li>• Organize os módulos numa sequência lógica de aprendizado</li>
              <li>• Após criar o módulo, adicione as aulas correspondentes</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ModuleForm;