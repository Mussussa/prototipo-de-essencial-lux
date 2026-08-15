import React, { useState } from "react";

export default function Navbar({ 
  phoneNumber = "258858573868", 
  callPhoneNumber = "258877305740",
  cartItems = [], // Array de produtos no carrinho
  onRemoveFromCart // Função para remover do carrinho
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleQuickContact = () => {
    const cleanWhatsapp = phoneNumber.replace(/\D/g, '');
    const text = encodeURIComponent("Olá, Essência Lux! 🌟 Gostaria de tirar algumas dúvidas.");
    window.location.href = `https://wa.me/${cleanWhatsapp}?text=${text}`;
  };

  const handleCall = () => {
    const cleanCallNum = callPhoneNumber.replace(/\D/g, '');
    window.location.href = `tel:+${cleanCallNum}`;
  };

  // Função para limpar o texto do preço (ex: "1.500,00 MT") e transformar em número (1500)
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Remove "MT", espaços, converte vírgula para ponto e remove pontos de milhares
    const cleanStr = priceStr.toString().replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanStr) || 0;
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + parsePrice(item.price), 0);

  // Envia todo o carrinho para o WhatsApp
  const handleCheckoutCart = () => {
    const cleanWhatsapp = phoneNumber.replace(/\D/g, '');
    let text = "Olá, Essência Lux! 🌟 Gostaria de encomendar os seguintes itens do meu carrinho:\n\n";
    
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* - ${item.price}\n`;
      text += `(ID: ${item.id})\n\n`;
    });

    // Formatador básico para Moçambique, ajuste conforme a sua moeda
    const formattedTotal = new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(cartTotal);
    
    text += `*TOTAL ESTIMADO:* ${formattedTotal}`;
    window.location.href = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-luxDark/85 backdrop-blur-md border-b border-luxGold/20 transition-all">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative flex items-center justify-center animate-fadeInLogo">
              <div className="absolute -inset-1 bg-luxGold/20 rounded-full blur-sm"></div>
              <img
                src="/logo.jpeg"
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

          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={handleCall} className="p-2 text-luxGold bg-luxGold/10 hover:bg-luxGold/20 rounded-full border border-luxGold/20 transition-all active:scale-95 flex items-center justify-center" aria-label="Ligar para Atendimento">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </button>

            <button onClick={handleQuickContact} className="hidden sm:flex items-center gap-1.5 bg-emerald-600/15 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
              <span>WhatsApp</span>
            </button>

            {/* Ícone da Sacola COM LÓGICA DE BADGE */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-luxGold bg-luxGold/10 hover:bg-luxGold/20 rounded-full border border-luxGold/20 transition-all active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {/* Contador do Carrinho */}
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MODAL DO CARRINHO */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-luxDark h-full shadow-2xl flex flex-col animate-slideInRight border-l border-luxGold/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho do Carrinho */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-luxGray/50">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                🛒 Seu Carrinho
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white p-1">
                ✕
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3 bg-luxGray/30 p-3 rounded-xl border border-white/5 relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-black" />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium line-clamp-2 leading-snug">{item.name}</h4>
                      <p className="text-luxGold font-bold text-sm mt-1">{item.price}</p>
                    </div>
                    {/* Botão Remover */}
                    <button 
                      onClick={() => onRemoveFromCart(index)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remover"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé do Carrinho (Total e Botão WhatsApp) */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-luxGray/80 border-t border-luxGold/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300 text-sm">Total Estimado:</span>
                  <span className="text-luxGold font-extrabold text-xl">
                    {new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={handleCheckoutCart}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                  Finalizar no WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}