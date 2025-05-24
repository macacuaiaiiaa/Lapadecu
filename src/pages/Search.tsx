import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Loader } from 'lucide-react';
import { tmdbAPI } from '../services/api';
import { Movie, TVShow } from '../types';
import ContentCard from '../components/ContentCard';

type SearchResult = {
  id: number;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
};

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);
  
  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await tmdbAPI.searchMulti(searchTerm);
      
      // Filter out person results and other non-movie/tv results
      const filteredResults = response.data.results.filter(
        (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
      );
      
      setResults(filteredResults);
      
      if (filteredResults.length === 0) {
        setError('Nenhum resultado encontrado. Tente outro termo de busca.');
      }
    } catch (err) {
      console.error('Error searching:', err);
      setError('Ocorreu um erro ao buscar. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };
  
  // Convert SearchResult to Movie or TVShow type
  const convertResult = (result: SearchResult): Movie | TVShow => {
    if (result.media_type === 'movie') {
      return {
        id: result.id,
        title: result.title || '',
        overview: result.overview,
        poster_path: result.poster_path || '',
        backdrop_path: '', // We don't have this in search results
        release_date: result.release_date || '',
        vote_average: result.vote_average,
        genre_ids: result.genre_ids
      } as Movie;
    } else {
      return {
        id: result.id,
        name: result.name || '',
        overview: result.overview,
        poster_path: result.poster_path || '',
        backdrop_path: '', // We don't have this in search results
        first_air_date: result.first_air_date || '',
        vote_average: result.vote_average,
        genre_ids: result.genre_ids
      } as TVShow;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pesquisar</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar filmes, séries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-[#e50914] hover:bg-[#f6121d] text-white font-medium py-3 px-6 rounded-r-md transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>
      
      {searchParams.get('q') && (
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            Resultados para "{searchParams.get('q')}"
          </h2>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader className="w-12 h-12 text-[#e50914] animate-spin" />
        </div>
      ) : error ? (
        <div className="p-8 bg-gray-800/30 rounded-lg text-center">
          <p>{error}</p>
          <p className="mt-2 text-sm text-gray-400">
            Dicas: Verifique a ortografia ou tente termos mais genéricos.
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map(result => (
            <div key={`${result.media_type}-${result.id}`} className="flex justify-center">
              <ContentCard 
                item={convertResult(result)} 
                type={result.media_type}
              />
            </div>
          ))}
        </div>
      ) : searchParams.get('q') ? (
        <div className="p-8 bg-gray-800/30 rounded-lg text-center">
          <p>Nenhum resultado encontrado.</p>
          <p className="mt-2 text-sm text-gray-400">
            Dicas: Verifique a ortografia ou tente termos mais genéricos.
          </p>
        </div>
      ) : (
        <div className="p-8 glass-card text-center max-w-lg mx-auto">
          <SearchIcon className="w-12 h-12 text-[#e50914] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Busque seus filmes e séries favoritos</h3>
          <p className="text-gray-400">
            Digite um título, nome de ator ou gênero para encontrar o que você está procurando.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;