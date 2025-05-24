import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import { Movie, TVShow } from '../types';

interface ContentRowProps {
  title: string;
  items: (Movie | TVShow)[];
  type: 'movie' | 'tv';
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, type }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className="py-4 md:py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
        
        <div className="relative group">
          {/* Scroll Left Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-5"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Content Row */}
          <div 
            ref={rowRef}
            className="content-carousel"
          >
            {items.map(item => (
              <ContentCard 
                key={item.id} 
                item={item} 
                type={type}
              />
            ))}
          </div>
          
          {/* Scroll Right Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-5"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentRow;