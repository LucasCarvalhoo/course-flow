// src/utils/testSupabase.js
import { supabase } from '../services/supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Testando conexão com Supabase...');
    
    // Teste 1: Verificar conexão básica
    const { data: healthCheck, error: healthError } = await supabase
      .from('modules')
      .select('count(*)')
      .limit(1);
    
    if (healthError) {
      console.error('❌ Erro na conexão:', healthError);
      return { success: false, error: healthError.message };
    }
    
    console.log('✅ Conexão estabelecida');
    
    // Teste 2: Verificar se existem módulos
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .limit(5);
    
    if (modulesError) {
      console.error('❌ Erro ao buscar módulos:', modulesError);
      return { success: false, error: modulesError.message };
    }
    
    console.log('📚 Módulos encontrados:', modules.length);
    console.log('Módulos:', modules);
    
    // Teste 3: Verificar se existem lições
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .limit(5);
    
    if (lessonsError) {
      console.error('❌ Erro ao buscar lições:', lessonsError);
      return { success: false, error: lessonsError.message };
    }
    
    console.log('🎬 Lições encontradas:', lessons.length);
    console.log('Lições:', lessons);
    
    // Teste 4: Verificar view
    const { data: lessonsWithModule, error: viewError } = await supabase
      .from('lessons_with_module')
      .select('*')
      .limit(3);
    
    if (viewError) {
      console.error('❌ Erro na view lessons_with_module:', viewError);
      return { success: false, error: viewError.message };
    }
    
    console.log('📋 View lessons_with_module:', lessonsWithModule.length);
    console.log('Dados da view:', lessonsWithModule);
    
    return { 
      success: true, 
      data: { 
        modules: modules.length, 
        lessons: lessons.length,
        lessonsWithModule: lessonsWithModule.length
      } 
    };
    
  } catch (error) {
    console.error('💥 Erro geral:', error);
    return { success: false, error: error.message };
  }
};

// Executar teste automaticamente (remover em produção)
if (import.meta.env.DEV) {
  testSupabaseConnection();
}