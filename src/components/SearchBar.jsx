import React, { useState } from 'react';

export default function SearchBar({ 
  search, 
  setSearch, 
  selectedCategory, 
  setSelectedCategory,
  categories = ['Todos'] // Recebe as categorias dinâmicas
}) {
  const [categorySearch, setCategorySearch] = useState('');

  // Filtra as categorias com base no que o usuário digitar na busca de categorias
  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Campo de Pesquisa Geral de Produtos */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar produto..."
          className="w-full bg-luxGray/80 border border-luxGold/20 focus:border-luxGold rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all shadow-inner"
        />
        {/* Ícone de Lupa */}
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

      {/* SEÇÃO DE CATEGORIAS PARA DEZENAS DE OPÇÕES */}
      <div className="space-y-2 bg-luxGray/30 border border-luxGold/10 p-3 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider text-luxGold uppercase">
            Categorias ({categories.length})
          </span>
          
          {/* Sub-busca rápida para filtrar dezenas de categorias */}
          {categories.length > 6 && (
            <div className="relative w-36 sm:w-48">
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Filtrar categorias..."
                className="w-full bg-luxDark/80 border border-luxGold/20 focus:border-luxGold rounded-lg py-1 pl-7 pr-2 text-[11px] text-white placeholder-gray-500 outline-none transition-all"
              />
              <svg 
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
          )}
        </div>

        {/* Categorias Deslizantes Otimizadas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar snap-x">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`snap-start whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                    isActive
                      ? 'bg-luxGold text-luxDark font-bold shadow-md scale-105'
                      : 'bg-luxGray/70 text-gray-300 border border-white/5 hover:border-luxGold/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })
          ) : (
            <span className="text-xs text-gray-400 py-1 px-2 italic">
              Nenhuma categoria encontrada
            </span>
          )}
        </div>
      </div>
    </div>
  );
}