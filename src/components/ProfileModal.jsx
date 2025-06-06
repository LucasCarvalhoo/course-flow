import { useState } from 'react'
import { useAuth } from '../context/UserContext'

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  if (!isOpen) return null

  const tabs = [
    { id: 'profile', label: 'Perfil' },
    { id: 'account', label: 'Conta' },
    { id: 'plan', label: 'Plano' }
  ]

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className="modal-content rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar do modal */}
          <div className="w-48 theme-bg-secondary border-r theme-border p-6">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'theme-text-secondary hover:theme-text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo do modal */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold theme-text-primary">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <button
                onClick={onClose}
                className="p-2 theme-text-muted hover:theme-text-primary rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Conteúdo das abas */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Upload de foto */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Carregar foto do perfil
                    </button>
                  </div>
                  <p className="text-xs theme-text-muted">Máximo de 2 MB, png ou jpg</p>
                </div>

                {/* Campos do perfil */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 theme-bg-secondary theme-border border rounded-lg theme-text-primary"
                      placeholder="Seu nome"
                    />
                    <button className="text-blue-600 text-sm mt-1 hover:underline">Alterar nome</button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">Email</label>
                    <p className="theme-text-secondary text-sm mb-1">{user?.email}</p>
                    <button className="text-blue-600 text-sm hover:underline">Alterar email</button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium theme-text-primary mb-2">Senha</label>
                    <button className="text-blue-600 text-sm hover:underline">Alterar senha</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium theme-text-primary mb-4">Endereço</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-2">Endereço de cobrança</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 theme-bg-secondary theme-border border rounded-lg theme-text-primary"
                        placeholder="Seu endereço"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-2">Mailing address</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 theme-bg-secondary theme-border border rounded-lg theme-text-primary"
                        placeholder="Endereço de correspondência"
                      />
                    </div>
                    <button className="text-blue-600 text-sm hover:underline">Alterar endereço</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-6">
                <div className="p-4 theme-bg-secondary rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium theme-text-primary">Test CourseOS</h4>
                    <span className="text-sm theme-text-secondary">Free</span>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">Alterar plano</button>
                </div>
                <div>
                  <button className="text-red-600 text-sm hover:underline">Cancelar assinatura</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
