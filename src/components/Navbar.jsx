import React from 'react';

export default function Navbar({ phoneNumber = "244900000000" }) {
  const handleQuickContact = () => {
    const text = encodeURIComponent("Olá, Essência Lux! 🌟 Gostaria de tirar algumas dúvidas.");
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-luxDark/85 backdrop-blur-md border-b border-luxGold/20 transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo com Identidade Visual */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative flex items-center justify-center animate-fadeInLogo">
            <div className="absolute -inset-1 bg-luxGold/20 rounded-full blur-sm"></div>
            
            <img 
              src="/logo.png" 
              alt="Essência Lux Logo" 
              width={38}
              height={38}
              className="relative w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full border border-luxGold/40 shadow-lg hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-wide text-white leading-none">
              Essência <span className="text-luxGold">Lux</span>
            </span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">
              Catálogo Exclusivo
            </span>
          </div>
        </div>

        {/* Ações Rápidas do Cabeçalho */}
        <div className="flex items-center gap-2">
          {/* Botão de Contacto Rápido WhatsApp */}
          <button
            onClick={handleQuickContact}
            className="flex items-center gap-1.5 bg-emerald-600/15 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95"
            aria-label="Atendimento WhatsApp"
          >
            {/* Ícone MessageCircle em SVG Nativo */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="d7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <span className="hidden sm:inline">Atendimento</span>
          </button>

          {/* Ícone Sacola em SVG Nativo */}
          <div className="p-2 text-luxGold bg-luxGold/10 rounded-full border border-luxGold/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>

      </div>
    </header>
  );
}