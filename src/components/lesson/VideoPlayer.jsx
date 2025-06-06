// src/components/lesson/VideoPlayer.jsx
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const VideoPlayer = ({ 
  title = "Título da Lição", 
  subtitle = "Módulo do Curso", 
  description = "Descrição da lição",
  videoUrl,
  videoId,
  onPlay 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    if (onPlay) {
      onPlay();
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  // Gerar URL do embed do YouTube
  const getYouTubeEmbedUrl = (videoId) => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
  };

  // Se está reproduzindo e tem videoId, mostrar o iframe
  if (isPlaying && videoId) {
    return (
      <div className="p-6">
        <div className="bg-black rounded-xl aspect-video max-w-4xl relative overflow-hidden">
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          
          {/* Botão para fechar o vídeo */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Info do vídeo */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
    );
  }

  // Tela de preview (antes de clicar play)
  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 rounded-xl aspect-video max-w-4xl relative overflow-hidden">
        {/* Thumbnail do YouTube (opcional) */}
        {videoId && (
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Se a imagem de alta qualidade falhar, usar a padrão
              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Conteúdo Principal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6">
              <button 
                onClick={handlePlay}
                disabled={!videoId}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
              >
                <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-sm opacity-80 mb-1">{subtitle}</p>
              <p className="text-xs opacity-70 mb-4 max-w-md mx-auto">{description}</p>
              {!videoId && (
                <p className="text-red-300 text-sm bg-red-900/50 px-3 py-1 rounded">
                  Vídeo não disponível
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Controles Inferiores */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <div 
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            title="Informações do vídeo"
          >
            <span className="text-white text-xs">ℹ️</span>
          </div>
          <div 
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            title="Compartilhar"
          >
            <span className="text-white text-xs">📤</span>
          </div>
          <div 
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            title="Favoritar"
          >
            <span className="text-white text-xs">❤️</span>
          </div>
        </div>

        {/* Indicador de duração (se disponível) */}
        {videoId && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
              Vídeo disponível
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;