import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import { useWatchlist } from '../context/WatchlistContext';
import { Movie, TVShow } from '../types';

interface HeroSectionProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
}

const HeroSection: React.FC<HeroSectionProps> = ({ item, type }) => {
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  
  // Handle "movie" or "tv" properties
  const title = 'title' in item ? item.title : item.name;
  const id = item.id;
  
  const handleWatchlistToggle = () => {
    if (isInWatchlist(id)) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id, type);
    }
  };
  
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${getImageUrl(item.backdrop_path)})`,
          backgroundPosition: 'center 20%'
        }}
      >
        <div className="hero-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex items-end pb-20">
        <div className="max-w-2xl slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          
          <div className="flex items-center mb-4 text-sm">
            <span className="bg-[#e50914] text-white px-2 py-1 rounded mr-3">
              {Math.round(item.vote_average * 10) / 10}/10
            </span>
            <span className="mr-3">
              {'release_date' in item 
                ? new Date(item.release_date).getFullYear() 
                : new Date(item.first_air_date).getFullYear()}
            </span>
          </div>
          
          <p className="text-white/80 mb-8 line-clamp-3 md:line-clamp-none">
            {item.overview}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Link 
              to={type === 'movie' ? `/filme/${id}` : `/serie/${id}`}
              className="btn-primary"
            >
              <Play className="w-5 h-5 mr-2" />
              Assistir Agora
            </Link>
            
            <button 
              onClick={handleWatchlistToggle}
              className="btn-secondary"
            >
              {isInWatchlist(id) ? (
                <>
                  <span className="text-[#e50914]">✓</span>
                  <span className="ml-2">Na Lista</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar à Lista
                </>
              )}
            </button>
            
            <Link 
              to={type === 'movie' ? `/filme/${id}` : `/serie/${id}`}
              className="btn-secondary"
            >
              <Info className="w-5 h-5 mr-2" />
              Mais Detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;