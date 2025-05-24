import axios from 'axios';

// Substitua com sua chave de API do TMDB
const API_KEY = '9856bd9bc9ba68efde5136029fde69d5';
const BASE_URL = 'https://api.themoviedb.org/3';

// Configurações padrão para todas as requisições
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

// Funções para buscar filmes e séries da API do TMDB
export const tmdbAPI = {
  // Filmes
  getTrendingMovies: () => api.get('/trending/movie/week'),
  getPopularMovies: () => api.get('/movie/popular'),
  getMovieDetails: (id: number) => api.get(`/movie/${id}`),
  getMovieCredits: (id: number) => api.get(`/movie/${id}/credits`),
  getSimilarMovies: (id: number) => api.get(`/movie/${id}/similar`),
  getMovieVideos: (id: number) => api.get(`/movie/${id}/videos`),
  
  // Séries
  getTrendingTVShows: () => api.get('/trending/tv/week'),
  getPopularTVShows: () => api.get('/tv/popular'),
  getTVShowDetails: (id: number) => api.get(`/tv/${id}`),
  getTVShowCredits: (id: number) => api.get(`/tv/${id}/credits`),
  getSimilarTVShows: (id: number) => api.get(`/tv/${id}/similar`),
  getTVShowSeasonDetails: (id: number, season: number) => 
    api.get(`/tv/${id}/season/${season}`),
  getTVShowVideos: (id: number) => api.get(`/tv/${id}/videos`),
  
  // Pesquisa
  searchMulti: (query: string) => 
    api.get('/search/multi', { params: { query } }),
  searchMovies: (query: string) => 
    api.get('/search/movie', { params: { query } }),
  searchTVShows: (query: string) => 
    api.get('/search/tv', { params: { query } }),
  
  // Gêneros
  getMovieGenres: () => api.get('/genre/movie/list'),
  getTVGenres: () => api.get('/genre/tv/list'),
  
  // Descobrir
  discoverMovies: (params = {}) => 
    api.get('/discover/movie', { params }),
  discoverTVShows: (params = {}) => 
    api.get('/discover/tv', { params }),
};

// Funções para construir URLs de imagens
export const getImageUrl = (path: string | null, size = 'original') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=Sem+Imagem';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Funções para construir URLs de reprodução
export const getPlayerUrl = {
  movie: (id: number) => `https://embedder.net/e/movie?tmdb=${id}`,
  episode: (id: number, season: number, episode: number) => 
    `https://embedder.net/e/${id}/${season}/${episode}`,
};

export default api;