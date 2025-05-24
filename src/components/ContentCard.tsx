import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Check } from 'lucide-react';
import { getImageUrl } from '../services/api';
import { useWatchlist } from '../context/WatchlistContext';
import { Movie, TVShow } from '../types';

interface ContentCardProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
}

const ContentCard: React.FC<ContentCardProps> = ({ item, type }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  // Handle "movie" or "tv" properties
  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
  const id = item.id;
  
  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist(id)) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(id, type);
    }
  };
  
  return (
    <Link 
      to={type === 'movie' ? `/filme/${id}` : `/serie/${id}`}
      className="movie-card min-w-[180px] w-[180px] md:min-w-[200px] md:w-[200px] snap-start"
    >
      <div className="aspect-[2/3] rounded-md overflow-hidden bg-gray-800">
        <img 
          src={getImageUrl(item.poster_path, 'w500')} 
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="overlay">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <div className="flex space-x-1">
            <button
              onClick={handleWatchlistToggle}
              className="p-1 rounded-full bg-gray-800/80 hover:bg-gray-700"
              aria-label={isInWatchlist(id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              {isInWatchlist(id) ? (
                <Check className="w-4 h-4 text-[#e50914]" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-white/70">
          <span>{new Date(releaseDate).getFullYear()}</span>
          <span>{Math.round(item.vote_average * 10) / 10}/10</span>
        </div>
        
        <div className="mt-2">
          <button className="w-full py-1 text-xs flex items-center justify-center bg-[#e50914] hover:bg-[#f6121d] rounded-md transition-colors">
            <Play className="w-3 h-3 mr-1" />
            Assistir
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;