import { useState, useEffect } from 'react'

const SidebarSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      // Focus no input quando abrir
      setTimeout(() => {
        const input = document.querySelector('.search-input-sidebar')
        if (input) input.focus()
      }, 100)
    }
  }, [isOpen])

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="search-in-sidebar">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Pesquisar</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="intro"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input-sidebar"
        />
      </div>
      
      {query && (
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">Resultados para: "{query}"</p>
          <div className="space-y-1">
            <div className="p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
              Resultado de exemplo 1
            </div>
            <div className="p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
              Resultado de exemplo 2
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SidebarSearch
