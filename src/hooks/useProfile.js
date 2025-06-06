// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/UserContext';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar perfil do usuário
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Primeiro tenta buscar o perfil na tabela profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Se não encontrou perfil, usa dados do auth
      if (!profileData) {
        setProfile({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          created_at: user.created_at
        });
      } else {
        setProfile(profileData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);

      // Atualizar metadados do usuário no auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: updates.full_name,
          avatar_url: updates.avatar_url
        }
      });

      if (authError) throw authError;

      // Tentar atualizar na tabela profiles também
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: updates.email || user.email,
          full_name: updates.full_name,
          avatar_url: updates.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error updating profile table:', profileError);
      }

      // Atualizar estado local
      setProfile(prev => ({
        ...prev,
        ...updates
      }));

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      setLoading(true);
      setError(null);

      // Validar arquivo
      if (!file) {
        throw new Error('Nenhum arquivo selecionado');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('O arquivo deve ter no máximo 5MB');
      }

      // Deletar avatar anterior se existir
      if (profile?.avatar_url) {
        const oldFileName = profile.avatar_url.split('/').pop();
        await supabase.storage
          .from('avatars')
          .remove([oldFileName]);
      }

      // Upload do novo arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Atualizar perfil com nova URL
      await updateProfile({ avatar_url: publicUrl });

      return { success: true, url: publicUrl };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const changeEmail = async (newEmail) => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) throw error;

      return { success: true, message: 'Verifique seu email para confirmar a alteração' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    changePassword,
    changeEmail,
    refreshProfile: loadProfile
  };
};
