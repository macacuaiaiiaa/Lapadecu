import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Check, Star, Calendar, Clock, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { tmdbAPI, getImageUrl, getPlayerUrl } from '../services/api';
import { TVShow } from '../types';
import { useWatchlist } from '../context/WatchlistContext';
import VideoPlayer from '../components/VideoPlayer';
import ContentRow from '../components/ContentRow';

interface TVShowDetailsData extends TVShow {
  episode_run_time?: number[];
  genres?: { id: number; name: string }[];
  number_of_seasons?: number;
  seasons?: {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    poster_path: string | null;
  }[];
}

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  overview: string;
  still_path: string | null;
  air_date: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const TVShowDetails: React.FC = () => {
  const { id, season, episode } = useParams<{ id: string; season?: string; episode?: string }>();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  const [tvShow, setTVShow] = useState<TVShowDetailsData | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [similarShows, setSimilarShows] = useState<TVShow[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(
    season ? parseInt(season, 10) : 1
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(
    episode ? parseInt(episode, 10) : 1
  );
  
  useEffect(() => {
    const fetchTVShowDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Reset state when loading a new TV show
        setTVShow(null);
        setCast([]);
        setSimilarShows([]);
        setEpisodes([]);
        
        // Fetch TV show details, credits and similar shows
        const [showRes, creditsRes, similarRes] = await Promise.all([
          tmdbAPI.getTVShowDetails(Number(id)),
          tmdbAPI.getTVShowCredits(Number(id)),
          tmdbAPI.getSimilarTVShows(Number(id))
        ]);
        
        setTVShow(showRes.data);
        setCast(creditsRes.data.cast.slice(0, 10));
        setSimilarShows(similarRes.data.results);
        
        // Set initial season (if URL has season/episode, use those)
        const initialSeason = season ? parseInt(season, 10) : 1;
        setSelectedSeason(initialSeason);
        
        // Fetch season details for the initial season
        const seasonRes = await tmdbAPI.getTVShowSeasonDetails(Number(id), initialSeason);
        setEpisodes(seasonRes.data.episodes || []);
        
        // Set initial episode (if URL has episode, use that)
        if (episode) {
          setSelectedEpisode(parseInt(episode, 10));
          setIsPlaying(true);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching TV show details:', err);
        setError('Falha ao carregar os detalhes da série. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTVShowDetails();
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
  }, [id, season, episode]);
  
  const handleSeasonChange = async (seasonNumber: number) => {
    if (seasonNumber === selectedSeason) {
      setIsSeasonDropdownOpen(false);
      return;
    }
    
    try {
      setIsSeasonDropdownOpen(false);
      setIsLoading(true);
      
      // Fetch episodes for the selected season
      const seasonRes = await tmdbAPI.getTVShowSeasonDetails(Number(id), seasonNumber);
      setEpisodes(seasonRes.data.episodes || []);
      setSelectedSeason(seasonNumber);
      setSelectedEpisode(1); // Reset to first episode
      setIsPlaying(false);
    } catch (err) {
      console.error('Error fetching season details:', err);
      setError('Falha ao carregar os episódios. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleWatchlistToggle = () => {
    if (!tvShow) return;
    
    if (isInWatchlist(tvShow.id)) {
      removeFromWatchlist(tvShow.id);
    } else {
      addToWatchlist(tvShow.id, 'tv');
    }
  };
  
  const handlePlayEpisode = (episodeNumber: number) => {
    setSelectedEpisode(episodeNumber);
    setIsPlaying(true);
  };
  
  const formatRuntime = (minutes?: number[]) => {
    if (!minutes || !minutes.length) return 'N/A';
    const avgRuntime = Math.round(
      minutes.reduce((sum, time) => sum + time, 0) / minutes.length
    );
    return `${avgRuntime} min`;
  };
  
  if (isLoading && !tvShow) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 text-[#e50914] animate-spin mb-4" />
        <p className="text-white/80">Carregando detalhes da série...</p>
      </div>
    );
  }
  
  if (error || !tvShow) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="glass-card p-8 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#e50914]">Ops, algo deu errado!</h2>
          <p className="mb-6">{error || 'Série não encontrada.'}</p>
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
            src={getPlayerUrl.episode(tvShow.id, selectedSeason, selectedEpisode)} 
            title={`${tvShow.name} - T${selectedSeason}:E${selectedEpisode}`}
            onClose={() => setIsPlaying(false)}
          />
          
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setIsPlaying(false)}
              className="btn-secondary"
            >
              Voltar para Detalhes
            </button>
            
            <div className="text-lg font-medium">
              Assistindo: Temporada {selectedSeason}, Episódio {selectedEpisode}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Todos os Episódios</h3>
            <div className="grid gap-4">
              {episodes.map(ep => (
                <button
                  key={ep.id}
                  onClick={() => handlePlayEpisode(ep.episode_number)}
                  className={`flex flex-col md:flex-row items-start text-left p-4 rounded-lg transition-colors ${
                    ep.episode_number === selectedEpisode 
                      ? 'bg-[#e50914]/20 border border-[#e50914]/50' 
                      : 'bg-gray-800/50 hover:bg-gray-700/70'
                  }`}
                >
                  <div className="flex-shrink-0 w-full md:w-48 h-24 md:h-28 rounded overflow-hidden mb-3 md:mb-0 md:mr-4">
                    {ep.still_path ? (
                      <img 
                        src={getImageUrl(ep.still_path, 'w300')} 
                        alt={ep.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">
                        {ep.episode_number}. {ep.name}
                      </h4>
                      {ep.episode_number === selectedEpisode && (
                        <span className="text-[#e50914] text-sm">Assistindo</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{ep.overview || 'Sem descrição disponível.'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Backdrop */}
          <div 
            className="relative w-full h-[70vh] min-h-[500px] overflow-hidden"
            style={{ 
              backgroundImage: `url(${getImageUrl(tvShow.backdrop_path)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%'
            }}
          >
            <div className="hero-gradient"></div>
            
            {/* TV Show Info */}
            <div className="container mx-auto px-4 relative h-full flex items-end md:items-center pb-20">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                {/* Poster (shown only on MD and larger) */}
                <div className="hidden md:block mr-8 w-64 h-96 rounded-md overflow-hidden shadow-2xl">
                  <img 
                    src={getImageUrl(tvShow.poster_path, 'w500')} 
                    alt={tvShow.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Details */}
                <div className="max-w-2xl slide-up">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">{tvShow.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                    <span className="flex items-center bg-[#e50914] text-white px-2 py-1 rounded">
                      <Star className="w-4 h-4 mr-1" />
                      {Math.round(tvShow.vote_average * 10) / 10}/10
                    </span>
                    
                    <span className="flex items-center text-white/80">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(tvShow.first_air_date).getFullYear()}
                    </span>
                    
                    <span className="flex items-center text-white/80">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatRuntime(tvShow.episode_run_time)}
                    </span>
                    
                    {tvShow.number_of_seasons && (
                      <span className="text-white/80">
                        {tvShow.number_of_seasons} {tvShow.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tvShow.genres?.map(genre => (
                      <span 
                        key={genre.id}
                        className="px-3 py-1 rounded-full bg-gray-800 text-white/80 text-xs"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-white/80 mb-8 line-clamp-3 md:line-clamp-none">
                    {tvShow.overview}
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
                      {isInWatchlist(tvShow.id) ? (
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
          
          {/* Seasons & Episodes */}
          <div className="container mx-auto px-4 py-10">
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Episódios</h2>
                
                {/* Season Selector */}
                <div className="relative">
                  <button
                    className="flex items-center justify-between w-full md:w-64 p-3 bg-gray-800 rounded-md"
                    onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                  >
                    <span>Temporada {selectedSeason}</span>
                    {isSeasonDropdownOpen ? 
                      <ChevronUp className="w-5 h-5" /> : 
                      <ChevronDown className="w-5 h-5" />
                    }
                  </button>
                  
                  {isSeasonDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {tvShow.seasons?.filter(s => s.season_number > 0).map(season => (
                        <button
                          key={season.id}
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                            season.season_number === selectedSeason ? 'bg-gray-700' : ''
                          }`}
                          onClick={() => handleSeasonChange(season.season_number)}
                        >
                          Temporada {season.season_number} ({season.episode_count} episódios)
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {isLoading && episodes.length === 0 ? (
                <div className="flex justify-center py-10">
                  <Loader className="w-10 h-10 text-[#e50914] animate-spin" />
                </div>
              ) : episodes.length > 0 ? (
                <div className="grid gap-4">
                  {episodes.map(episode => (
                    <button
                      key={episode.id}
                      onClick={() => handlePlayEpisode(episode.episode_number)}
                      className="flex flex-col md:flex-row items-start text-left p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/70 transition-colors"
                    >
                      <div className="flex-shrink-0 w-full md:w-48 h-24 md:h-28 rounded overflow-hidden mb-3 md:mb-0 md:mr-4">
                        {episode.still_path ? (
                          <img 
                            src={getImageUrl(episode.still_path, 'w300')} 
                            alt={episode.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500">Sem imagem</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold">
                          {episode.episode_number}. {episode.name}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {episode.overview || 'Sem descrição disponível.'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-gray-800/30 rounded-lg text-center">
                  <p>Nenhum episódio disponível para esta temporada.</p>
                </div>
              )}
            </div>
            
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
            
            {/* Similar Shows */}
            {similarShows.length > 0 && (
              <ContentRow
                title="Séries Semelhantes"
                items={similarShows}
                type="tv"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TVShowDetails;