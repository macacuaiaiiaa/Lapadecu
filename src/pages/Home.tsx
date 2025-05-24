import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import { tmdbAPI } from '../services/api';
import { Movie, TVShow } from '../types';
import { Film, Tv, Loader } from 'lucide-react';

const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [featuredContent, setFeaturedContent] = useState<Movie | TVShow | null>(null);
  const [featuredType, setFeaturedType] = useState<'movie' | 'tv'>('movie');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch trending content
        const [moviesRes, tvShowsRes, popularMoviesRes, popularTVRes] = await Promise.all([
          tmdbAPI.getTrendingMovies(),
          tmdbAPI.getTrendingTVShows(),
          tmdbAPI.getPopularMovies(),
          tmdbAPI.getPopularTVShows()
        ]);

        setTrendingMovies(moviesRes.data.results);
        setTrendingTVShows(tvShowsRes.data.results);
        setPopularMovies(popularMoviesRes.data.results);
        setPopularTVShows(popularTVRes.data.results);
        
        // Randomly select featured content (70% chance for a movie, 30% for TV show)
        const isFeaturedMovie = Math.random() < 0.7;
        
        if (isFeaturedMovie && moviesRes.data.results.length) {
          // Get one of the top 5 trending movies
          const randomIndex = Math.floor(Math.random() * Math.min(5, moviesRes.data.results.length));
          setFeaturedContent(moviesRes.data.results[randomIndex]);
          setFeaturedType('movie');
        } else if (tvShowsRes.data.results.length) {
          // Get one of the top 5 trending TV shows
          const randomIndex = Math.floor(Math.random() * Math.min(5, tvShowsRes.data.results.length));
          setFeaturedContent(tvShowsRes.data.results[randomIndex]);
          setFeaturedType('tv');
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError('Falha ao carregar os dados. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 text-[#e50914] animate-spin mb-4" />
        <p className="text-white/80">Carregando os melhores filmes e séries para você...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="glass-card p-8 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#e50914]">Ops, algo deu errado!</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Hero Section */}
      {featuredContent && (
        <HeroSection item={featuredContent} type={featuredType} />
      )}

      {/* Content Rows */}
      <div className="mt-8">
        {trendingMovies.length > 0 && (
          <ContentRow
            title="Filmes em Alta"
            items={trendingMovies}
            type="movie"
          />
        )}
        
        {trendingTVShows.length > 0 && (
          <ContentRow
            title="Séries em Alta"
            items={trendingTVShows}
            type="tv"
          />
        )}
        
        {popularMovies.length > 0 && (
          <ContentRow
            title="Filmes Populares"
            items={popularMovies}
            type="movie"
          />
        )}
        
        {popularTVShows.length > 0 && (
          <ContentRow
            title="Séries Populares"
            items={popularTVShows}
            type="tv"
          />
        )}
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6">Explore por Categoria</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <CategoryCard icon={<Film className="w-6 h-6" />} label="Ação" link="/filmes?genero=28" />
          <CategoryCard icon={<Film className="w-6 h-6" />} label="Comédia" link="/filmes?genero=35" />
          <CategoryCard icon={<Film className="w-6 h-6" />} label="Drama" link="/filmes?genero=18" />
          <CategoryCard icon={<Film className="w-6 h-6" />} label="Terror" link="/filmes?genero=27" />
          <CategoryCard icon={<Tv className="w-6 h-6" />} label="Sci-Fi & Fantasy" link="/series?genero=10765" />
          <CategoryCard icon={<Tv className="w-6 h-6" />} label="Crime" link="/series?genero=80" />
        </div>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  label: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, label, link }) => (
  <a
    href={link}
    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors text-center"
  >
    <div className="p-3 rounded-full bg-[#e50914]/20 mb-3">
      {icon}
    </div>
    <span>{label}</span>
  </a>
);

export default Home;