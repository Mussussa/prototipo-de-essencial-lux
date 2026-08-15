import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- SUBCOMPONENTE: Carrossel 3D Coverflow Compacto (5 Imagens Multissetorial) ---
function Smooth3DSlideshow({
  slides = [
    {
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
      title: "Variedades & Tendências",
    },
    {
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
      title: "Smartwatches & Eletrónicos",
    },
    {
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
      title: "Cosméticos & Cuidados",
    },
    {
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
      title: "Acessórios de Luxo",
    },
    {
      image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=600&q=80",
      title: "Utilidades & Novidades",
    },
  ],
  cardWidth = 240,
  cardHeight = 150,
  tilt = 15,
  gap = 6,
  autoplay = true,
  delay = 3,
}) {
  const [active, setActive] = useState(0);
  const n = slides.length;
  const lockRef = useRef(false);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 600);
  }, []);

  const step = useCallback(
    (dir) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  useEffect(() => {
    if (!autoplay || n < 2) return;
    const interval = window.setInterval(() => step(1), delay * 1000);
    return () => window.clearInterval(interval);
  }, [autoplay, delay, n, step]);

  const PERSPECTIVE = 1000;
  const MAX_VISIBLE = 2;
  const DEPTH = 180;

  return (
    <div
      aria-label="Carrossel de Destaques"
      tabIndex={0}
      className="relative w-full flex items-center justify-center overflow-hidden py-2 select-none outline-none"
      style={{ perspective: `${PERSPECTIVE}px` }}
    >
      <div
        className="relative"
        style={{
          width: cardWidth,
          height: cardHeight,
          transformStyle: 'preserve-3d',
        }}
      >
        {slides.map((slide, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;

          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.65, 1 - ax * 0.18);
          const tx = rel * (gap * 22);
          const tz = -ax * DEPTH;
          const ry = -rel * tilt;

          return (
            <div
              key={i}
              onClick={() => {
                if (!isActive && !lockRef.current) {
                  lock();
                  setActive(i);
                }
              }}
              className="absolute left-1/2 top-1/2 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-luxGold/30"
              style={{
                width: cardWidth,
                height: cardHeight,
                transformStyle: 'preserve-3d',
                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`,
                opacity: visible ? (isActive ? 1 : 0.6) : 0,
                pointerEvents: visible ? 'auto' : 'none',
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Overlay de gradiente com o título */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3">
                <span className="text-white font-bold text-xs sm:text-sm tracking-wide text-shadow">
                  {slide.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL HERO ---
export default function Hero() {
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-4 pb-6 px-4 bg-luxDark text-center border-b border-luxGold/10 overflow-hidden">
      {/* Luz Dourada Sutil de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-36 bg-luxGold/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl mx-auto space-y-3">
        {/* Banner Animado de Entrega em Chimoio */}
        <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxGold/15 border border-luxGold/40 text-luxGold text-[11px] font-semibold tracking-wider uppercase shadow-lg animate-pulse">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxGold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-luxGold"></span>
          </span>
          <span className="text-sm">🇲🇿</span>
          <span>Entregas Rápidas em Chimoio • 📦 ➔ 📍</span>
        </div>

        {/* Título Principal Focado em Variedades */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
          Tudo o que Você Precisa com <span className="text-luxGold">Qualidade e Praticidade</span>
        </h1>

        {/* Carrossel 3D Coverflow com 5 Imagens */}
        <div className="my-2">
          <Smooth3DSlideshow />
        </div>

        {/* Proposta de Valor / Atendimento */}
        <p className="text-xs text-gray-300 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
          Explore o nosso catálogo diversificado. Escolha os seus produtos favoritos e finalize o pedido de forma simples e direta pelo WhatsApp.
        </p>

        {/* Badges de Benefícios */}
        <div className="grid grid-cols-2 gap-2 pt-1 max-w-xs mx-auto text-[11px] text-gray-200">
          <div className="bg-luxGray/40 border border-white/5 rounded-xl p-2 flex items-center justify-center gap-1.5 shadow-inner">
            <span className="text-luxGold text-sm">🛍️</span>
            <span className="font-medium">Produtos Variados</span>
          </div>
          <div className="bg-luxGray/40 border border-white/5 rounded-xl p-2 flex items-center justify-center gap-1.5 shadow-inner">
            <span className="text-luxGold text-sm">💬</span>
            <span className="font-medium">Atendimento via WhatsApp</span>
          </div>
        </div>

        {/* Botão de Scroll Rápido ao Catálogo */}
        <div className="pt-2">
          <button
            onClick={scrollToCatalog}
            className="inline-flex items-center gap-1.5 bg-luxGold text-luxDark font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg hover:bg-yellow-400 transition-all active:scale-95"
          >
            <span>Explorar Catálogo Agora</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}