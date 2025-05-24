import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import MovieDetails from './pages/MovieDetails';
import TVShowDetails from './pages/TVShowDetails';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <WatchlistProvider>
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
          <Header />
          <main className="flex-grow pt-16 md:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/filmes" element={<Movies />} />
              <Route path="/series" element={<TVShows />} />
              <Route path="/filme/:id" element={<MovieDetails />} />
              <Route path="/serie/:id" element={<TVShowDetails />} />
              <Route path="/serie/:id/temporada/:season/episodio/:episode" element={<TVShowDetails />} />
              <Route path="/pesquisa" element={<Search />} />
              <Route path="/favoritos" element={<Watchlist />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/privacidade" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WatchlistProvider>
    </Router>
  );
}

export default App;