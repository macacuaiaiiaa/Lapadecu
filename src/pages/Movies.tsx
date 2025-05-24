import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbAPI } from '../services/api';
import { Movie, Genre } from '../types';
import ContentCard from '../components/ContentCard';
import { Filter, Loader } from 'lucide-react';

const Movies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const genreParam = searchParams.get('genero');
  const yearParam = searchParams.get('ano');
  const sortParam = searchParams.get('ordenar') || 'popularity.desc';
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbAPI.getMovieGenres();
        setGenres(response.data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    
    fetchGenres();
  }, []);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        
        const params: Record<string, any> = {
          page: currentPage,
          sort_by: sortParam,
        };
        
        if (genreParam) {
          params.with_genres = genreParam;
        }
        
        if (yearParam) {
          params.primary_release_year = yearParam;
        }
        
        const response = await tmdbAPI.discoverMovies(params);
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // API limits to 500 pages max
        setError(null);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Falha ao carregar os filmes. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
    // Scroll to top when filters change
    window.scrollTo(0, 0);
  }, [genreParam, yearParam, sortParam, currentPage]);
  
  const handleGenreChange = (genreId: string) => {
    searchParams.set('genero', genreId);
    setSearchParams(searchParams);
    setCurrentPage(1);
  };
  
  const handleYearChange = (year: string) => {
    if (year) {
      searchParams.set('ano', year);
    } else {
      searchParams.delete('ano');
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };
  
  const handleSortChange = (sort: string) => {
    searchParams.set('ordenar', sort);
    setSearchParams(searchParams);
    setCurrentPage(1);
  };
  
  const getActiveGenreName = () => {
    if (!genreParam) return 'Todos os Gêneros';
    const genre = genres.find(g => g.id.toString() === genreParam);
    return genre ? genre.name : 'Gênero Desconhecido';
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 70 }, 
    (_, i) => (currentYear - i).toString()
  );
  
  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularidade (Maior)' },
    { value: 'popularity.asc', label: 'Popularidade (Menor)' },
    { value: 'vote_average.desc', label: 'Avaliação (Maior)' },
    { value: 'vote_average.asc', label: 'Avaliação (Menor)' },
    { value: 'primary_release_date.desc', label: 'Lançamento (Recente)' },
    { value: 'primary_release_date.asc', label: 'Lançamento (Antigo)' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Filmes</h1>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center md:hidden mb-4 p-2 bg-gray-800 rounded-md"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </button>
        
        {/* Desktop Filters */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <select
              value={genreParam || ''}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="bg-gray-800 text-white py-2 px-4 pr-8 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
            >
              <option value="">Todos os Gêneros</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={yearParam || ''}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-gray-800 text-white py-2 px-4 pr-8 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
            >
              <option value="">Todos os Anos</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>
          
          <div className="relative">
            <select
              value={sortParam}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-800 text-white py-2 px-4 pr-8 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden bg-gray-800/80 p-4 rounded-lg mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gênero</label>
            <select
              value={genreParam || ''}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="w-full bg-gray-700 text-white py-2 px-3 rounded-md"
            >
              <option value="">Todos os Gêneros</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Ano</label>
            <select
              value={yearParam || ''}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full bg-gray-700 text-white py-2 px-3 rounded-md"
            >
              <option value="">Todos os Anos</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Ordenar Por</label>
            <select
              value={sortParam}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full bg-gray-700 text-white py-2 px-3 rounded-md"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {/* Active Filters Display */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">
          {getActiveGenreName()}
          {yearParam && ` (${yearParam})`}
        </h2>
        <div className="text-sm text-gray-400">
          Ordenado por: {sortOptions.find(o => o.value === sortParam)?.label}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader className="w-12 h-12 text-[#e50914] animate-spin" />
        </div>
      ) : error ? (
        <div className="p-8 bg-gray-800/30 rounded-lg text-center">
          <p className="text-xl text-[#e50914] mb-2">Erro</p>
          <p>{error}</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map(movie => (
              <div key={movie.id} className="flex justify-center">
                <ContentCard item={movie} type="movie" />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <div className="flex flex-wrap justify-center gap-2">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
                  >
                    Anterior
                  </button>
                )}
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-[#e50914] text-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700"
                  >
                    Próxima
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-8 bg-gray-800/30 rounded-lg text-center">
          <p>Nenhum filme encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
};

// Helper icon component
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default Movies;