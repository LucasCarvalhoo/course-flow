import { useState, useEffect } from 'react';
import { useAuth } from '../context/UserContext';
import { supabase } from '../services/supabase';
import { X, Camera, Check, AlertCircle } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    avatar_url: ''
  });
  
  // Estados para alteração de senha
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.user_metadata?.full_name || '',
        email: user.email || '',
        avatar_url: user.user_metadata?.avatar_url || ''
      });
    }
  }, [user]);

  // Reset mensagens após 3 segundos
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Atualizar perfil
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          avatar_url: formData.avatar_url
        }
      });

      if (updateError) throw updateError;

      // Se estiver alterando email
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email
        });
        if (emailError) throw emailError;
      }

      setSuccess(true);
      
      // Atualizar contexto se houver função updateProfile
      if (updateProfile) {
        updateProfile(formData);
      }
    } catch (err) {
      setError(err.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordSection(false);
    } catch (err) {
      setError(err.message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar tamanho do arquivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 5MB');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload para o storage do Supabase
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
      const { data: publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Atualizar avatar_url
      setFormData(prev => ({
        ...prev,
        avatar_url: publicUrl.publicUrl
      }));

      // Salvar automaticamente
      await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrl.publicUrl
        }
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Erro ao fazer upload da imagem');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-2xl border border-[#333333] animate-modal-enter">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#333333]">
            <h2 className="text-2xl font-semibold text-white">Perfil</h2>
            <button
              onClick={onClose}
              className="text-[#737373] hover:text-white transition-colors p-2 hover:bg-[#262626] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Avatar Section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-[#262626] border-4 border-[#333333]">
                  {formData.avatar_url ? (
                    <img 
                      src={formData.avatar_url} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-[#737373]">
                      {formData.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white hover:bg-[#f2f2f2] text-black p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                  <Camera className="w-5 h-5" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            {/* Messages */}
            {success && (
              <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <p className="text-green-400">Perfil atualizado com sucesso!</p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#262626] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#262626] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors"
                  placeholder="seu@email.com"
                />
                <p className="text-xs text-[#737373] mt-1">
                  Você receberá um email para confirmar a alteração
                </p>
              </div>

              {/* Botão de alterar senha */}
              {!showPasswordSection && (
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(true)}
                  className="text-sm text-[#737373] hover:text-white transition-colors"
                >
                  Alterar senha
                </button>
              )}

              {/* Save Button */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-[#e6e6e6] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-white hover:bg-[#f2f2f2] text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </div>
            </form>

            {/* Password Change Section */}
            {showPasswordSection && (
              <form onSubmit={handlePasswordSubmit} className="mt-8 pt-8 border-t border-[#333333] space-y-6">
                <h3 className="text-lg font-medium text-white mb-4">Alterar senha</h3>
                
                <div>
                  <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 bg-[#262626] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e6e6e6] mb-2">
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 bg-[#262626] border border-[#333333] rounded-lg text-white placeholder-[#737373] focus:outline-none focus:border-[#4d4d4d] transition-colors"
                    placeholder="Digite a senha novamente"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordSection(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                    }}
                    className="px-6 py-2.5 text-[#e6e6e6] hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-white hover:bg-[#f2f2f2] text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Alterando...' : 'Alterar senha'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
