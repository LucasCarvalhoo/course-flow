// src/services/lessonService.js
import { supabase } from './supabase';

export const lessonService = {
  // Buscar todas as lições usando a view
  async getAllLessons() {
    try {
      const { data, error } = await supabase
        .from('lessons_with_module')
        .select('*')
        .order('order_position');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar lições:', error);
      throw error;
    }
  },

  // Buscar lição por ID (corrigido para usar a tabela diretamente)
  async getLessonById(id) {
    try {
      // Validar se é um UUID válido
      if (!id || !this.isValidUUID(id)) {
        throw new Error('ID da lição inválido');
      }

      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          module:modules(*)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Lição não encontrada');
        }
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar lição por ID:', error);
      throw error;
    }
  },

  // Buscar primeira lição disponível (para quando não há ID específico)
  async getFirstLesson() {
    try {
      const { data, error } = await supabase
        .from('lessons_with_module')
        .select('*')
        .order('order_position')
        .limit(1)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Nenhuma lição encontrada');
        }
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar primeira lição:', error);
      throw error;
    }
  },

  // Buscar lições por módulo
  async getLessonsByModule(moduleId) {
    try {
      if (!moduleId || !this.isValidUUID(moduleId)) {
        throw new Error('ID do módulo inválido');
      }

      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .eq('is_active', true)
        .order('order_position');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar lições do módulo:', error);
      throw error;
    }
  },

  // Buscar recursos de uma lição
  async getLessonResources(lessonId) {
    try {
      if (!lessonId || !this.isValidUUID(lessonId)) {
        return []; // Retorna array vazio se ID inválido
      }

      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_position');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar recursos da lição:', error);
      return []; // Retorna array vazio em caso de erro
    }
  },

  // Buscar módulos com contagem de lições
  async getModulesWithLessonCount() {
    try {
      const { data, error } = await supabase
        .from('modules_with_lesson_count')
        .select('*')
        .order('order_position');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar módulos:', error);
      throw error;
    }
  },

  // Validar UUID
  isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  },

  // Extrair ID do YouTube da URL
  extractYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  },

  // Gerar URL de embed do YouTube
  generateYouTubeEmbedUrl(videoId) {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  },

  // Marcar lição como completada (placeholder)
  async markLessonComplete(lessonId, userId = null) {
    console.log(`Lição ${lessonId} marcada como completa`);
    return { success: true };
  }
};

// Funções administrativas (requer autenticação)
export const adminLessonService = {
  // Criar nova lição
  async createLesson(lessonData) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .insert([lessonData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao criar lição:', error);
      throw error;
    }
  },

  // Atualizar lição
  async updateLesson(id, lessonData) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .update(lessonData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar lição:', error);
      throw error;
    }
  },

  // Deletar lição
  async deleteLesson(id) {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao deletar lição:', error);
      throw error;
    }
  },

  // Adicionar recurso à lição
  async addResource(resourceData) {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([resourceData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao adicionar recurso:', error);
      throw error;
    }
  },

  // Remover recurso
  async removeResource(id) {
    try {
      const { data, error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao remover recurso:', error);
      throw error;
    }
  }
};