import React, { useEffect, useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import { tmdbAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import { Movie, TVShow } from '../types';
import { BookmarkX, Loader } from 'lucide-react';

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [watchlistItems, setWatchlistItems] = useState<(Movie | TVShow)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      if (watchlist.length === 0) {
        setWatchlistItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        const promises = watchlist.map(item => {
          if (item.type === 'movie') {
            return tmdbAPI.getMovieDetails(item.id)
              .then(res => ({ ...res.data, type: 'movie' }));
          } else {
            return tmdbAPI.getTVShowDetails(item.id)
              .then(res => ({ ...res.data, type: 'tv' }));
          }
        });
        
        const results = await Promise.all(promises);
        setWatchlistItems(results);
        setError(null);
      } catch (err) {
        console.error('Error fetching watchlist items:', err);
        setError('Falha ao carregar os itens da sua lista. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWatchlistItems();
  }, [watchlist]);
  
  const handleClearWatchlist = () => {
    if (confirm('Tem certeza que deseja limpar toda a sua lista de favoritos?')) {
      watchlist.forEach(item => removeFromWatchlist(item.id));
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 text-[#e50914] animate-spin mb-4" />
        <p className="text-white/80">Carregando sua lista de favoritos...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Meus Favoritos</h1>
        
        {watchlistItems.length > 0 && (
          <button
            onClick={handleClearWatchlist}
            className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded-md transition-colors"
          >
            <BookmarkX className="w-4 h-4 mr-2" />
            Limpar Lista
          </button>
        )}
      </div>
      
      {error && (
        <div className="p-8 bg-gray-800/30 rounded-lg text-center">
          <p className="text-xl text-[#e50914] mb-2">Erro</p>
          <p>{error}</p>
        </div>
      )}
      
      {!error && watchlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="glass-card p-8 max-w-md">
            <BookmarkX className="w-16 h-16 text-[#e50914] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sua lista está vazia</h2>
            <p className="text-white/70 mb-6">
              Adicione filmes e séries aos seus favoritos para acompanhar o que você quer assistir.
            </p>
            <a href="/" className="btn-primary inline-block">
              Explorar Conteúdo
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watchlistItems.map((item) => (
            <div key={item.id} className="flex justify-center">
              <ContentCard 
                item={item} 
                type={'type' in item ? (item.type as 'movie' | 'tv') : 'movie'} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;