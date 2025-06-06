// src/components/lesson/VideoPlayer.jsx
import React from 'react';
import { Play } from 'lucide-react';

const VideoPlayer = ({ 
  title = "Input", 
  subtitle = "A Complete...", 
  description = "Supports Loops, FormSpark, MailChimp, and GetWaitlist.",
  videoUrl,
  onPlay 
}) => {
  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 rounded-xl aspect-video max-w-4xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Main Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6">
              <button 
                onClick={onPlay}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors group"
              >
                <Play className="w-6 h-6 text-white ml-1 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-sm opacity-80 mb-1">{subtitle}</p>
              <p className="text-xs opacity-70 mb-4">{description}</p>
              <button className="bg-white text-black px-4 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
            <span className="text-white text-xs">👤</span>
          </div>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
            <span className="text-white text-xs">💬</span>
          </div>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
            <span className="text-white text-xs">📤</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;