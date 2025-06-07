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

  // Buscar lição por ID (updated with better formatting)
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
      
      // Format the lesson data properly
      const formattedLesson = this.formatLessonData(data);
      return formattedLesson;
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
      
      return this.formatLessonData(data);
    } catch (error) {
      console.error('Erro ao buscar primeira lição:', error);
      throw error;
    }
  },

  // Format lesson data consistently
  formatLessonData(lessonData) {
    // Extract YouTube video ID if not already stored
    let videoId = lessonData.youtube_video_id;
    if (!videoId && lessonData.youtube_url) {
      videoId = this.extractYouTubeId(lessonData.youtube_url);
    }

    return {
      id: lessonData.id,
      title: lessonData.title,
      description: lessonData.description,
      summary: lessonData.description, // Usar description como summary
      videoUrl: lessonData.youtube_url,
      videoId: videoId,
      videoTitle: lessonData.title,
      videoSubtitle: lessonData.module_title || lessonData.module?.title || 'Módulo',
      videoDescription: lessonData.description,
      duration: lessonData.duration_minutes,
      moduleTitle: lessonData.module_title || lessonData.module?.title,
      moduleId: lessonData.module_id || lessonData.module?.id,
      orderPosition: lessonData.order_position,
      isActive: lessonData.is_active,
      createdAt: lessonData.created_at,
      updatedAt: lessonData.updated_at
    };
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
      return (data || []).map(lesson => this.formatLessonData(lesson));
    } catch (error) {
      console.error('Erro ao buscar lições do módulo:', error);
      throw error;
    }
  },

  // Buscar recursos de uma lição - ATUALIZADO
  async getLessonResources(lessonId) {
    try {
      if (!lessonId || !this.isValidUUID(lessonId)) {
        console.warn('ID da lição inválido para buscar recursos:', lessonId);
        return []; // Retorna array vazio se ID inválido
      }

      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_position');
      
      if (error) {
        console.error('Erro ao buscar recursos:', error);
        return []; // Retorna array vazio em caso de erro
      }
      
      console.log(`Encontrados ${data?.length || 0} recursos para a lição ${lessonId}`);
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

  // Extrair ID do YouTube da URL (improved)
  extractYouTubeId(url) {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/watch\?.*v=)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1].length === 11) {
        return match[1];
      }
    }
    
    return null;
  },

  // Gerar URL de embed do YouTube
  generateYouTubeEmbedUrl(videoId, autoplay = false) {
    if (!videoId) return null;
    const autoplayParam = autoplay ? '&autoplay=1' : '';
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${autoplayParam}`;
  },

  // Get YouTube thumbnail URL
  getYouTubeThumbnail(videoId, quality = 'maxresdefault') {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  },

  // Marcar lição como completada (enhanced)
  async markLessonComplete(lessonId, userId = null) {
    try {
      console.log(`Lição ${lessonId} marcada como completa`);
      
      // Here you could implement actual completion tracking
      // For example, storing in a user_lesson_progress table
      
      // Mock implementation for now
      return { 
        success: true, 
        lessonId,
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao marcar lição como completa:', error);
      throw error;
    }
  },

  // Get lesson navigation (next/previous)
  async getLessonNavigation(currentLessonId, moduleId) {
    try {
      if (!moduleId || !this.isValidUUID(moduleId)) {
        return { previous: null, next: null };
      }

      const { data, error } = await supabase
        .from('lessons')
        .select('id, title, order_position')
        .eq('module_id', moduleId)
        .eq('is_active', true)
        .order('order_position');
      
      if (error) throw error;
      
      const lessons = data || [];
      const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
      
      return {
        previous: currentIndex > 0 ? lessons[currentIndex - 1] : null,
        next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
        current: currentIndex >= 0 ? lessons[currentIndex] : null,
        total: lessons.length,
        position: currentIndex + 1
      };
    } catch (error) {
      console.error('Erro ao buscar navegação da lição:', error);
      return { previous: null, next: null };
    }
  },

  // Criar recurso para uma lição - NOVO
  async createResource(resourceData) {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([{
          ...resourceData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao criar recurso:', error);
      throw error;
    }
  },

  // Atualizar recurso - NOVO
  async updateResource(id, resourceData) {
    try {
      const { data, error } = await supabase
        .from('resources')
        .update(resourceData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar recurso:', error);
      throw error;
    }
  },

  // Deletar recurso - NOVO
  async deleteResource(id) {
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar recurso:', error);
      throw error;
    }
  }
};

// Funções administrativas (requer autenticação)
export const adminLessonService = {
  // Criar nova lição
  async createLesson(lessonData) {
    try {
      // Extract video ID if YouTube URL is provided
      if (lessonData.youtube_url && !lessonData.youtube_video_id) {
        lessonData.youtube_video_id = lessonService.extractYouTubeId(lessonData.youtube_url);
      }

      const { data, error } = await supabase
        .from('lessons')
        .insert([lessonData])
        .select()
        .single();
      
      if (error) throw error;
      return lessonService.formatLessonData(data);
    } catch (error) {
      console.error('Erro ao criar lição:', error);
      throw error;
    }
  },

  // Atualizar lição
  async updateLesson(id, lessonData) {
    try {
      // Extract video ID if YouTube URL is provided
      if (lessonData.youtube_url && !lessonData.youtube_video_id) {
        lessonData.youtube_video_id = lessonService.extractYouTubeId(lessonData.youtube_url);
      }

      const { data, error } = await supabase
        .from('lessons')
        .update(lessonData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return lessonService.formatLessonData(data);
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