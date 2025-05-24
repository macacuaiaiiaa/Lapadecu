import React, { useState, useEffect } from 'react';
import { X, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
      setIsFullscreen(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // Here you would typically also set the iframe's muted state,
    // but this depends on the embedded player's API
  };
  
  return (
    <div className="video-player-container">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      
      <div className="video-controls">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMute}
              className="text-white hover:text-[#e50914] transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <span className="text-sm text-white/80">{title}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-[#e50914] transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            
            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:text-[#e50914] transition-colors"
                aria-label="Close player"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;