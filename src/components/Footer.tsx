import React from 'react';
import { Film, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 text-white/80 py-12 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8 text-[#e50914]" />
              <span className="text-white font-bold text-xl">CineStream</span>
            </Link>
            <p className="text-sm mb-4">
              A sua plataforma de streaming para assistir aos melhores filmes e séries. Assista onde e quando quiser.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-medium text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/filmes" className="text-white/60 hover:text-white transition-colors">Filmes</Link></li>
              <li><Link to="/series" className="text-white/60 hover:text-white transition-colors">Séries</Link></li>
              <li><Link to="/favoritos" className="text-white/60 hover:text-white transition-colors">Favoritos</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-medium text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li><Link to="/filmes?genero=28" className="text-white/60 hover:text-white transition-colors">Ação</Link></li>
              <li><Link to="/filmes?genero=35" className="text-white/60 hover:text-white transition-colors">Comédia</Link></li>
              <li><Link to="/filmes?genero=18" className="text-white/60 hover:text-white transition-colors">Drama</Link></li>
              <li><Link to="/series?genero=10765" className="text-white/60 hover:text-white transition-colors">Sci-Fi & Fantasy</Link></li>
              <li><Link to="/filmes?genero=27" className="text-white/60 hover:text-white transition-colors">Terror</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white font-medium text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Perguntas frequentes</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Termos de uso</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Política de privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()} CineStream. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Dados fornecidos pela API do TMDb. Este produto utiliza a API do TMDb, mas não é endossado ou certificado pelo TMDb.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;