import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Plus, Check, Star, Calendar, Clock, Loader } from 'lucide-react';
import { tmdbAPI, getImageUrl, getPlayerUrl } from '../services/api';
import { Movie } from '../types';
import { useWatchlist } from '../context/WatchlistContext';
import VideoPlayer from '../components/VideoPlayer';
import ContentRow from '../components/ContentRow';

interface MovieDetailsData extends Movie {
  runtime?: number;
  genres?: { id: number; name: string }[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Crew {
  id: number;
  name: string;
  job: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  const [movie, setMovie] = useState<MovieDetailsData | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Reset state when loading a new movie
        setMovie(null);
        setCast([]);
        setCrew([]);
        setSimilarMovies([]);
        setIsPlaying(false);
        
        // Fetch movie details, credits and similar movies
        const [movieRes, creditsRes, similarRes] = await Promise.all([
          tmdbAPI.getMovieDetails(Number(id)),
          tmdbAPI.getMovieCredits(Number(id)),
          tmdbAPI.getSimilarMovies(Number(id))
        ]);
        
        setMovie(movieRes.data);
        setCast(creditsRes.data.cast.slice(0, 10));
        setCrew(creditsRes.data.crew.filter(person => 
          ['Director', 'Producer', 'Screenplay'].includes(person.job)
        ).slice(0, 5));
        setSimilarMovies(similarRes.data.results);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Falha ao carregar os detalhes do filme. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleWatchlistToggle = () => {
    if (!movie) return;
    
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id, 'movie');
    }
  };
  
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 text-[#e50914] animate-spin mb-4" />
        <p className="text-white/80">Carregando detalhes do filme...</p>
      </div>
    );
  }
  
  if (error || !movie) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="glass-card p-8 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#e50914]">Ops, algo deu errado!</h2>
          <p className="mb-6">{error || 'Filme não encontrado.'}</p>
          <a href="/" className="btn-primary">
            Voltar para Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {isPlaying ? (
        <div className="container mx-auto px-4 py-6">
          <VideoPlayer 
            src={getPlayerUrl.movie(movie.id)} 
            title={movie.title}
            onClose={() => setIsPlaying(false)}
          />
          
          <button
            onClick={() => setIsPlaying(false)}
            className="mt-4 btn-secondary"
          >
            Voltar para Detalhes
          </button>
        </div>
      ) : (
        <>
          {/* Backdrop */}
          <div 
            className="relative w-full h-[70vh] min-h-[500px] overflow-hidden"
            style={{ 
              backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%'
            }}
          >
            <div className="hero-gradient"></div>
            
            {/* Movie Info */}
            <div className="container mx-auto px-4 relative h-full flex items-end md:items-center pb-20">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                {/* Poster (shown only on MD and larger) */}
                <div className="hidden md:block mr-8 w-64 h-96 rounded-md overflow-hidden shadow-2xl">
                  <img 
                    src={getImageUrl(movie.poster_path, 'w500')} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Details */}
                <div className="max-w-2xl slide-up">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">{movie.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                    <span className="flex items-center bg-[#e50914] text-white px-2 py-1 rounded">
                      <Star className="w-4 h-4 mr-1" />
                      {Math.round(movie.vote_average * 10) / 10}/10
                    </span>
                    
                    <span className="flex items-center text-white/80">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                    
                    <span className="flex items-center text-white/80">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatRuntime(movie.runtime)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres?.map(genre => (
                      <span 
                        key={genre.id}
                        className="px-3 py-1 rounded-full bg-gray-800 text-white/80 text-xs"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-white/80 mb-8 line-clamp-3 md:line-clamp-none">
                    {movie.overview}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="btn-primary"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Assistir Agora
                    </button>
                    
                    <button 
                      onClick={handleWatchlistToggle}
                      className="btn-secondary"
                    >
                      {isInWatchlist(movie.id) ? (
                        <>
                          <Check className="w-5 h-5 mr-2 text-[#e50914]" />
                          Na Lista
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Adicionar à Lista
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="container mx-auto px-4 py-10">
            {/* Cast Section */}
            {cast.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Elenco Principal</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="bg-gray-800/50 rounded-lg overflow-hidden">
                      {person.profile_path ? (
                        <img 
                          src={getImageUrl(person.profile_path, 'w185')} 
                          alt={person.name}
                          className="w-full aspect-[2/3] object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500">Sem foto</span>
                        </div>
                      )}
                      <div className="p-3">
                        <h3 className="font-medium text-sm">{person.name}</h3>
                        <p className="text-xs text-gray-400">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Crew Section */}
            {crew.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Equipe Técnica</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {crew.map(person => (
                    <div key={`${person.id}-${person.job}`} className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-sm text-gray-400">{person.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Similar Movies */}
            {similarMovies.length > 0 && (
              <ContentRow
                title="Filmes Semelhantes"
                items={similarMovies}
                type="movie"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;