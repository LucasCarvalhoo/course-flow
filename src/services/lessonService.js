// src/services/lessonService.js
import { supabase } from './supabase';

export const lessonService = {
  // Buscar todas as lições
  async getAllLessons() {
    const { data, error } = await supabase
      .from('lessons_with_module')
      .select('*')
      .order('order_position');
    
    if (error) throw error;
    return data;
  },

  // Buscar lição por ID
  async getLessonById(id) {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        module:modules(*),
        resources(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Buscar lições por módulo
  async getLessonsByModule(moduleId) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .eq('is_active', true)
      .order('order_position');
    
    if (error) throw error;
    return data;
  },

  // Buscar recursos de uma lição
  async getLessonResources(lessonId) {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_position');
    
    if (error) throw error;
    return data;
  },

  // Marcar lição como completada (se você adicionar sistema de progresso)
  async markLessonComplete(lessonId, userId = null) {
    // Esta funcionalidade requer uma tabela de progresso do usuário
    // Por enquanto, apenas log
    console.log(`Lesson ${lessonId} marked as complete`);
    return { success: true };
  },

  // Extrair ID do YouTube da URL
  extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  },

  // Gerar URL de embed do YouTube
  generateYouTubeEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  },

  // Buscar módulos com contagem de lições
  async getModulesWithLessonCount() {
    const { data, error } = await supabase
      .from('modules_with_lesson_count')
      .select('*')
      .order('order_position');
    
    if (error) throw error;
    return data;
  }
};

// Funções administrativas (requer autenticação)
export const adminLessonService = {
  // Criar nova lição
  async createLesson(lessonData) {
    const { data, error } = await supabase
      .from('lessons')
      .insert([lessonData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar lição
  async updateLesson(id, lessonData) {
    const { data, error } = await supabase
      .from('lessons')
      .update(lessonData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar lição
  async deleteLesson(id) {
    const { data, error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return data;
  },

  // Adicionar recurso à lição
  async addResource(resourceData) {
    const { data, error } = await supabase
      .from('resources')
      .insert([resourceData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Remover recurso
  async removeResource(id) {
    const { data, error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }
};