import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- SUBCOMPONENTE: Carrossel 3D Coverflow Compacto ---
function Smooth3DSlideshow({
  slides = [
    {
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
      title: "Perfumes Exclusivos",
    },
    {
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
      title: "Velas Aromáticas",
    },
    {
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80",
      title: "Difusores de Luxo",
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
        {/* Etiqueta / Descrição Superior */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxGold/10 border border-luxGold/30 text-luxGold text-[11px] font-semibold tracking-wider uppercase">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
          </svg>
          Essência Lux • Coleção 2026
        </div>

        {/* Título Principal */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
          Sinta a <span className="text-luxGold">Sofisticação</span> em Cada Aroma
        </h1>

        {/* Carrossel 3D Coverflow Compacto */}
        <div className="my-2">
          <Smooth3DSlideshow />
        </div>

        {/* Descrição Curta */}
        <p className="text-xs text-gray-300 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
          Catálogo exclusivo de perfumaria fina e essências marcantes para o seu bem-estar.
        </p>

        {/* Botão de Scroll Rápido ao Catálogo */}
        <div className="pt-1">
          <button
            onClick={scrollToCatalog}
            className="inline-flex items-center gap-1.5 bg-luxGold text-luxDark font-bold px-5 py-2 rounded-xl text-xs shadow-lg hover:bg-yellow-400 transition-all active:scale-95"
          >
            <span>Ver Produtos</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}