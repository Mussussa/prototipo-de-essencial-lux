import React from 'react';

export default function ProductCard({ product, onSelectProduct }) {
  return (
    <div className="bg-luxGray/50 border border-luxGold/15 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-luxGold/40 transition-all duration-300 group">
      
      {/* Imagem + Badge */}
      <div className="relative aspect-square bg-black/40 overflow-hidden">
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-luxGold text-luxDark text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Detalhes do Produto */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-luxGold/80 font-medium">
            {product.category}
          </span>
          <h3 className="font-bold text-sm text-white leading-snug line-clamp-1 mt-0.5">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block">Preço</span>
            <span className="font-extrabold text-sm text-luxGold">{product.price}</span>
          </div>

          {/* Botão de Encomendar */}
          <button
            onClick={() => onSelectProduct(product)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
          >
            {/* Ícone WhatsApp SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="d7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <span>Pedir</span>
          </button>
        </div>
      </div>

    </div>
  );
}