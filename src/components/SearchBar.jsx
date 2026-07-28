import React from 'react';
import { CATEGORIES } from '../data/products';

export default function SearchBar({ search, setSearch, selectedCategory, setSelectedCategory }) {
  return (
    <div className="space-y-4 mb-6">
      {/* Campo de Pesquisa */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar produto..."
          className="w-full bg-luxGray/80 border border-luxGold/20 focus:border-luxGold rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all shadow-inner"
        />
        {/* Ícone de Lupa em SVG Nativo */}
        <svg 
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>

      {/* Categorias Deslizantes (Mobile Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar snap-x">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`snap-start whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-luxGold text-luxDark font-bold shadow-md scale-105'
                  : 'bg-luxGray/60 text-gray-300 border border-white/5 hover:border-luxGold/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}