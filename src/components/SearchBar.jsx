import React, { useState } from 'react';

export default function SearchBar({ 
  search, 
  setSearch, 
  selectedCategory, 
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  categories = ['Todos'],
  products = []
}) {
  const [categorySearch, setCategorySearch] = useState('');

  // 1. Filtra as categorias com base na busca interna
  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // 2. Extrai subcategorias únicas pertencentes apenas à categoria selecionada
  const availableSubcategories = selectedCategory === 'Todos'
    ? []
    : Array.from(
        new Set(
          products
            .filter((p) => p.category === selectedCategory && p.subcategory)
            .map((p) => p.subcategory)
        )
      );

  // Manipula a troca de categoria e reseta a subcategoria para "Todos"
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (setSelectedSubcategory) {
      setSelectedSubcategory('Todos');
    }
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Campo de Pesquisa Geral de Produtos */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar produto..."
          className="w-full bg-luxGray/80 border border-luxGold/20 focus:border-luxGold rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all shadow-inner"
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

        {/* Botão para limpar busca geral */}
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold bg-white/10 w-5 h-5 rounded-full flex items-center justify-center transition-all"
            title="Limpar pesquisa"
          >
            ✕
          </button>
        )}
      </div>

      {/* SEÇÃO DE CATEGORIAS */}
      <div className="space-y-3 bg-luxGray/30 border border-luxGold/10 p-3.5 rounded-2xl backdrop-blur-sm shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-luxGold uppercase">
              Categorias
            </span>
            <span className="bg-luxGold/15 text-luxGold text-[10px] px-2 py-0.5 rounded-full border border-luxGold/20 font-bold">
              {categories.length}
            </span>
          </div>
          
          {/* Sub-busca rápida para filtrar muitas categorias */}
          {categories.length > 5 && (
            <div className="relative w-36 sm:w-48">
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Filtrar categorias..."
                className="w-full bg-luxDark/80 border border-luxGold/20 focus:border-luxGold rounded-lg py-1 pl-7 pr-6 text-[11px] text-white placeholder-gray-500 outline-none transition-all"
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
              {categorySearch && (
                <button
                  onClick={() => setCategorySearch('')}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px]"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Lista de Categorias Principal */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar snap-x">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`snap-start whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 active:scale-95 ${
                    isActive
                      ? 'bg-luxGold text-luxDark font-bold shadow-md scale-105 border border-luxGold'
                      : 'bg-luxGray/70 text-gray-300 border border-white/5 hover:border-luxGold/30 hover:text-white'
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

        {/* SEÇÃO DE SUBCATEGORIAS DINÂMICAS */}
        {selectedCategory !== 'Todos' && availableSubcategories.length > 0 && (
          <div className="pt-2.5 border-t border-white/10 space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase font-medium">
              <span className="text-luxGold">└</span>
              <span>Subcategorias em <strong className="text-white">{selectedCategory}</strong>:</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar snap-x">
              {/* Botão 'Todas' dentro da subcategoria */}
              <button
                onClick={() => setSelectedSubcategory('Todos')}
                className={`snap-start whitespace-nowrap px-3 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 active:scale-95 ${
                  selectedSubcategory === 'Todos'
                    ? 'bg-luxGold/20 border border-luxGold text-luxGold font-bold'
                    : 'bg-white/5 text-gray-400 border border-white/5 hover:text-gray-200'
                }`}
              >
                Todas
              </button>

              {availableSubcategories.map((sub) => {
                const isSubActive = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`snap-start whitespace-nowrap px-3 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 active:scale-95 ${
                      isSubActive
                        ? 'bg-luxGold text-luxDark font-bold shadow-sm'
                        : 'bg-white/5 text-gray-300 border border-white/10 hover:border-luxGold/30 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}