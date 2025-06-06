import { useState, useEffect } from 'react'

const ExpandedSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="search-expanded flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input-expanded outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {query && (
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Buscar por: "{query}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpandedSearch
