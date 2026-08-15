import React, { useState, useEffect } from 'react';

export default function SplashIntro({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Inicia o fade-out após 3.2 segundos
    const timer = setTimeout(() => {
      setIsFading(true);
      // Remove do DOM após a transição acabar
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 600);
      return () => clearTimeout(removeTimer);
    }, 5200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxDark px-4 text-center transition-opacity duration-600 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Luz de Fundo com Brilho Dourado Pulsante */}
      <div className="absolute w-80 h-80 bg-luxGold/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-sm space-y-5">
        
        {/* --- ILUSTRAÇÃO ANIMADA ESTILO VÍDEO (Nativa com Tailwind/CSS) --- */}
        <div className="relative mx-auto w-28 h-28 rounded-3xl bg-gradient-to-br from-luxGold/20 via-luxDark to-luxGold/10 border border-luxGold/40 flex items-center justify-center shadow-2xl overflow-hidden group">
          
          {/* Efeito de radar / brilho rotativo de fundo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxGold/30 via-transparent to-transparent animate-spin" style={{ animationDuration: '8s' }} />

          {/* Camião / Entrega a mover-se horizontalmente estilo vídeo */}
          <div className="relative flex items-center justify-center animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="absolute -top-6 text-[10px] bg-luxGold text-luxDark font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
              CHIMOIO
            </div>
            <span className="text-4xl transform hover:scale-110 transition-transform">
              🚚💨
            </span>
          </div>

          {/* Linha da estrada animada na base */}
          <div className="absolute bottom-2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-luxGold to-transparent animate-pulse" />
        </div>

        {/* Nome da Marca */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">
            Essência <span className="text-luxGold">Lux</span>
          </h1>
          <p className="text-[11px] text-luxGold tracking-wider uppercase font-semibold">
            🇲🇿 Chimoio • Moçambique
          </p>
        </div>

        {/* Mensagem de Demonstração e Instalação */}
        <div className="bg-luxGray/50 border border-white/10 rounded-2xl p-4 shadow-xl space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-luxGold text-xs font-bold">
            <span>📦</span>
            <span>Compre & Nós Entregamos</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Entregamos diretamente na sua casa em Chimoio. <span className="text-white font-semibold">Precisa de ajuda para instalar algo?</span> É só avisar!
          </p>
        </div>

        {/* Botão de Saltar / Entrar */}
        <button
          onClick={() => {
            setIsFading(true);
            setTimeout(() => {
              setIsVisible(false);
              if (onFinish) onFinish();
            }, 400);
          }}
          className="text-[11px] text-gray-400 hover:text-luxGold transition-colors underline pt-2 font-medium"
        >
          Entrar no Catálogo ➔
        </button>
      </div>
    </div>
  );
}