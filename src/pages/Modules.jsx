import { useState, useEffect } from 'react'
import { useAuth } from '../context/UserContext'
import { useModules } from '../hooks/useModules'
import { useNavigate, useLocation } from 'react-router-dom'
import SidebarSearch from '../components/SidebarSearch'

const Modules = () => {
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { modules, loading, error } = useModules()
  const [selectedModule, setSelectedModule] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showSidebarContent, setShowSidebarContent] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false)

  // Verifica se veio do login para aplicar animações
  const fromLogin = location.state?.fromLogin

  useEffect(() => {
    if (fromLogin) {
      // Delay para mostrar conteúdo da sidebar
      const sidebarTimer = setTimeout(() => {
        setShowSidebarContent(true)
      }, 400)
      
      // Delay para mostrar conteúdo principal
      const mainTimer = setTimeout(() => {
        setShowMainContent(true)
      }, 600)
      
      return () => {
        clearTimeout(sidebarTimer)
        clearTimeout(mainTimer)
      }
    } else {
      // Se não veio do login, mostra tudo de uma vez
      setShowSidebarContent(true)
      setShowMainContent(true)
    }
  }, [fromLogin])

  // Auto-selecionar primeiro módulo
  useState(() => {
    if (modules.length > 0 && !selectedModule) {
      setSelectedModule(modules[0])
    }
  }, [modules])

  const handleModuleClick = (module) => {
    setSelectedModule(module)
  }

  const handleLessonClick = (lesson) => {
    window.open(lesson.youtube_url, '_blank')
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  // Ícones para diferentes tipos de módulos/aulas
  const getModuleIcon = (index) => {
    const icons = [
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        <polygon points="10,8 16,12 10,16" fill="currentColor"/>
      </svg>,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7h20L12 2zM2 17h20v2H2v-2zM4 9v6h16V9H4z"/>
      </svg>,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 11H7v9h2v-9zm4-4h-2v13h2V7zm4-4h-2v17h2V3z"/>
      </svg>
    ]
    return icons[index % icons.length]
  }

  const getLessonIcon = (index) => {
    const icons = [
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.5L8.5 9H15.5L12 2.5ZM12 21.5L15.5 15H8.5L12 21.5ZM2.5 12L9 8.5V15.5L2.5 12ZM21.5 12L15 15.5V8.5L21.5 12Z"/>
      </svg>,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
      </svg>,
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.82C6.16 17.4 9 12.3 17 10.5V8zM3.5 3.5L2 5l6.5 6.5C8.62 12.5 9.5 13.38 9.5 14.5S8.62 16.5 7.5 16.5 5.5 15.62 5.5 14.5c0-.22 0-.42.05-.61L3.5 11.84C3.18 12.71 3 13.64 3 14.5 3 16.43 4.57 18 6.5 18s3.5-1.57 3.5-3.5c0-1.04-.46-1.97-1.18-2.61L22 5.5l-1.5-1.5L3.5 3.5z"/>
      </svg>
    ]
    return icons[index % icons.length]
  }

  // Função para determinar o gradiente baseado no título do módulo
  const getModuleGradient = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('introdução') || titleLower.includes('introduction')) {
      return 'gradient-introduction'
    } else if (titleLower.includes('fundamentos') || titleLower.includes('foundation')) {
      return 'gradient-foundation'
    } else if (titleLower.includes('criação') || titleLower.includes('creation') || titleLower.includes('prática')) {
      return 'gradient-creation'
    } else if (titleLower.includes('estratégias') || titleLower.includes('strategies') || titleLower.includes('avançado')) {
      return 'gradient-strategies'
    } else {
      return 'gradient-introduction' // padrão
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen bg-[#1a1a1a] flex items-center justify-center">
        <p className="text-red-400 text-sm">Erro: {error}</p>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#1a1a1a] flex">
      
      {/* SIDEBAR */}
      <div className="sidebar flex flex-col relative">
        
        {/* Pesquisa expandida na sidebar */}
        <SidebarSearch 
          isOpen={showSearch} 
          onClose={() => setShowSearch(false)} 
        />
        
        {/* Conteúdo normal da sidebar */}
        <div className={`${showSearch ? 'hidden' : 'flex flex-col h-full'} ${showSidebarContent ? 'sidebar-entering' : 'opacity-0'}`}>
          
          {/* Logo CourseOS */}
          <div className="p-6 border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-white font-semibold">CourseOS</h1>
                <p className="text-[#666666] text-xs">Framer Template</p>
              </div>
            </div>
          </div>

          {/* Seção MODULAR */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="section-header">MODULAR</div>
            <div className="space-y-1">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedModule?.id === module.id 
                      ? 'bg-[#333333] text-white' 
                      : 'text-[#cccccc] hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                  onClick={() => handleModuleClick(module)}
                >
                  <div className="text-[#888888]">
                    {getModuleIcon(index)}
                  </div>
                  <span className="text-sm font-medium">{module.title}</span>
                </div>
              ))}
            </div>

            {/* Seção LINKS */}
            <div className="section-header mt-8">LINKS</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm">Community</span>
              </div>
              <div className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm">Coaching</span>
              </div>
              <div className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Mentors</span>
              </div>
            </div>

            {/* Seção ACCOUNT */}
            <div className="section-header mt-8">ACCOUNT</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white cursor-pointer transition-colors">
                <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Profile</span>
              </div>
              <div 
                className="flex items-center gap-3 p-3 text-[#cccccc] hover:text-white cursor-pointer transition-colors"
                onClick={handleSignOut}
              >
                <svg className="w-4 h-4 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">Logout</span>
              </div>
            </div>
          </div>

          {/* Search no bottom */}
          <div className="p-4 border-t border-[#333333]">
            <div 
              className="flex items-center gap-3 p-3 text-[#666666] cursor-pointer hover:text-white transition-colors"
              onClick={() => setShowSearch(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm">Search</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className={`flex-1 bg-[#1a1a1a] overflow-y-auto ${showMainContent ? 'main-content-entering' : 'opacity-0'}`}>
        
        {selectedModule ? (
          <div className="h-full">
            {/* Header com gradiente */}
            <div className={`header-gradient ${getModuleGradient(selectedModule.title)} p-12 text-center`}>
              <div className="max-w-4xl mx-auto">
                <div className="mb-2">
                  <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    TEMPLATE
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  CourseOS for Framer
                </h1>
                <p className="text-white/80 text-lg">
                  The Course Operating System is a Template that lets you host your online course directly in Framer and protect it with Outseta.
                </p>
              </div>
            </div>

            {/* Container de conteúdo */}
            <div className="px-8 py-8">
              {/* Seção do módulo */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-white">Modular</h2>
                  <span className="text-[#666666] text-sm font-medium tracking-wider">
                    {selectedModule.lessons?.length || 0} LESSONS
                  </span>
                </div>
              </div>

              {/* Título e descrição do módulo selecionado */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {selectedModule.title}
                </h3>
                <p className="text-[#888888]">
                  {selectedModule.description}
                </p>
              </div>

              {/* Lista de aulas */}
              {selectedModule.lessons && selectedModule.lessons.length > 0 ? (
                <div className="space-y-3">
                  {selectedModule.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="lesson-card p-6 cursor-pointer group"
                      onClick={() => handleLessonClick(lesson)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 bg-[#404040] rounded-lg flex items-center justify-center text-[#888888]">
                            {getLessonIcon(index)}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">
                              Lesson {index + 1}
                            </h4>
                            <div className="flex items-center gap-2 text-[#666666] text-sm">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                              </svg>
                              6:30
                            </div>
                          </div>
                        </div>

                        <button className="start-button">
                          Start
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#666666]">Nenhuma aula cadastrada ainda</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-white text-xl mb-2">Selecione um módulo</h2>
              <p className="text-[#666666]">Escolha um módulo na barra lateral</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modules
