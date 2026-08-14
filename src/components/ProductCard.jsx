import React, { useState } from 'react';

export default function ProductCard({ product, onSelectProduct }) {
  // Estado para controlar a visualização da imagem ampliada
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div className="bg-luxGray/50 border border-luxGold/15 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-luxGold/40 transition-all duration-300 group">
        
        {/* Imagem + Badge (Clicável para ver maior) */}
        <div 
          onClick={() => setIsPreviewOpen(true)}
          className="relative aspect-square bg-black/40 overflow-hidden cursor-pointer group/img"
          title="Clique para ver imagem ampliada"
        >
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-luxGold text-luxDark text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow">
              {product.badge}
            </span>
          )}

          {/* Dica visual ao passar o mouse por cima */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 flex items-center justify-center">
            <span className="bg-black/70 text-white text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1 font-medium shadow-lg border border-white/10">
              🔍 Ver foto
            </span>
          </div>

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Detalhes do Produto */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-luxGold/80 font-medium">
              {product.category}
            </span>

            {/* Nome do produto: Permite até 2 linhas e quebra palavras grandes */}
            <h3 className="font-bold text-sm text-white leading-snug break-words line-clamp-2 mt-0.5">
              {product.name}
            </h3>

            <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-gray-400 block">Preço</span>
              <span className="font-extrabold text-sm text-luxGold">{product.price}</span>
            </div>

            {/* Botão de Encomendar */}
            <button
              onClick={() => onSelectProduct(product)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md shrink-0"
            >
              {/* Ícone WhatsApp SVG */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <span>Pedir</span>
            </button>
          </div>
        </div>

      </div>

      {/* 🔍 MODAL DE VISUALIZAÇÃO AMPLIADA DA IMAGEM */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsPreviewOpen(false)} // Fecha ao clicar no fundo escura
        >
          <div 
            className="relative max-w-md w-full bg-luxDark border border-luxGold/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()} // Impede de fechar se clicar no cartão
          >
            {/* Botão Fechar (X) */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-black/90 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all border border-white/10"
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* Imagem Ampliada */}
            <div className="w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Detalhes no Rodapé do Modal */}
            <div className="p-4 bg-luxGray/90 flex items-center justify-between border-t border-white/10 gap-2">
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-bold text-xs sm:text-sm leading-snug truncate">
                  {product.name}
                </h4>
                <p className="text-luxGold font-extrabold text-sm mt-0.5">{product.price}</p>
              </div>

              <button
                onClick={() => {
                  setIsPreviewOpen(false);
                  onSelectProduct(product);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
              >
                <span>Pedir no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}