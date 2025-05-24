import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Tv, Search, BookmarkPlus, Home, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fechar menu mobile quando a rota muda
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pesquisa?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="w-8 h-8 text-[#e50914]" />
          <span className="text-white font-bold text-xl md:text-2xl">CineStream</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" icon={<Home className="w-5 h-5" />} label="Início" />
          <NavLink to="/filmes" icon={<Film className="w-5 h-5" />} label="Filmes" />
          <NavLink to="/series" icon={<Tv className="w-5 h-5" />} label="Séries" />
          <NavLink to="/favoritos" icon={<BookmarkPlus className="w-5 h-5" />} label="Favoritos" />
        </nav>

        {/* Search Form - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar filmes e séries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800/70 text-white px-4 py-2 pl-10 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="ml-2 p-2 rounded-full bg-[#e50914] text-white"
            aria-label="Buscar"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/95 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 py-8">
          {/* Search Form - Mobile */}
          <form onSubmit={handleSearch} className="w-full px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar filmes e séries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white px-4 py-3 pl-10 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#e50914]/50"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="mt-2 w-full p-3 rounded-full bg-[#e50914] text-white font-medium"
            >
              Buscar
            </button>
          </form>
          
          <MobileNavLink to="/" icon={<Home className="w-6 h-6" />} label="Início" />
          <MobileNavLink to="/filmes" icon={<Film className="w-6 h-6" />} label="Filmes" />
          <MobileNavLink to="/series" icon={<Tv className="w-6 h-6" />} label="Séries" />
          <MobileNavLink to="/favoritos" icon={<BookmarkPlus className="w-6 h-6" />} label="Favoritos" />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 hover:text-[#e50914] ${
        isActive ? 'text-[#e50914]' : 'text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`flex flex-col items-center space-y-2 transition-colors duration-200 hover:text-[#e50914] ${
        isActive ? 'text-[#e50914]' : 'text-white'
      }`}
    >
      {icon}
      <span className="text-lg">{label}</span>
    </Link>
  );
};

export default Header;