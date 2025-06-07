import React, { useState } from 'react';
import { Play, X, Maximize2, Volume2, Settings, ExternalLink } from 'lucide-react';

const VideoPlayer = ({ 
  title = "Título da Lição", 
  subtitle = "Módulo do Curso", 
  description = "Descrição da lição",
  videoUrl,
  videoId,
  onPlay 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    if (onPlay) {
      onPlay();
    }
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Gerar URL do embed do YouTube
  const getYouTubeEmbedUrl = (videoId) => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
  };

  // Se está reproduzindo e tem videoId, mostrar o iframe
  if (isPlaying && videoId) {
    return (
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'relative'}`}>
        <div className={`${isFullscreen ? 'w-full h-full' : 'bg-black rounded-xl aspect-video max-w-5xl mx-auto'} relative overflow-hidden border border-[#333333]`}>
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          
          {/* Video Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleFullscreen}
              className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
              title={isFullscreen ? "Sair do fullscreen" : "Fullscreen"}
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10"
              title="Fechar vídeo"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Video Info - Only show when not fullscreen */}
        {!isFullscreen && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-[#cccccc]">{subtitle}</p>
          </div>
        )}
      </div>
    );
  }

  // Tela de preview (antes de clicar play)
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl aspect-video max-w-5xl mx-auto relative overflow-hidden border border-[#333333] group">
        {/* Thumbnail do YouTube (opcional) */}
        {videoId && (
          <div className="absolute inset-0">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Se a imagem de alta qualidade falhar, usar a padrão
                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
        )}
        
        {/* Overlay gradiente quando não há thumbnail */}
        {!videoId && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-cyan-600/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.3),transparent_50%)]"></div>
          </div>
        )}
        
        {/* Conteúdo Principal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10">
            {/* Play Button */}
            <div className="mb-8">
              <button 
                onClick={handlePlay}
                disabled={!videoId}
                className="group/play w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 border border-white/20"
              >
                <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* Video Info */}
            <div className="text-white px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
              <p className="text-sm opacity-90 mb-2">{subtitle}</p>
              
              {!videoId && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 inline-block">
                  <p className="text-red-300 text-sm">Vídeo não disponível</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          {/* Left side - Video controls */}
          <div className="flex space-x-3">
            <div 
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer border border-white/10"
              title="Configurações"
            >
              <Settings className="text-white w-4 h-4" />
            </div>
            <div 
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer border border-white/10"
              title="Volume"
            >
              <Volume2 className="text-white w-4 h-4" />
            </div>
          </div>

          {/* Right side - External link */}
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-white text-sm border border-white/10"
              title="Abrir no YouTube"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">YouTube</span>
            </a>
          )}
        </div>

        {/* Duration indicator (se disponível) */}
        {videoId && (
          <div className="absolute top-6 right-6">
            <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs border border-white/10">
              HD
            </div>
          </div>
        )}

        {/* Progress indicator (fake para demonstração) */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-full h-1 bg-white/20">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-1/12 transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* Video Description Below */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-[#888888] mb-3">
          {videoId && (
            <div className="flex items-center gap-1">
              <Play className="w-3 h-3" />
              <span>Vídeo disponível</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Settings className="w-3 h-3" />
            <span>HD Quality</span>
          </div>
        </div>
        
        <p className="text-[#cccccc] text-sm max-w-2xl mx-auto leading-relaxed">
          Clique no botão play para começar a assistir esta aula. 
          O vídeo será reproduzido em alta qualidade diretamente aqui na plataforma.
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;