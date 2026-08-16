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
      text += `(Imagem: ${item.image})\n\n kkkkkkkkkk`;
    });

    const formattedTotal = new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(cartTotal);
    
    text += `*TOTAL ESTIMADO:* ${formattedTotal}`;
    window.location.href = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-luxDark/90 backdrop-blur-md border-b border-luxGold/30 transition-all shadow-xl">
        {/* Navbar com altura aumentada e preenchimento melhorado */}
        <div className="max-w-5xl mx-auto px-4 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative flex items-center justify-center animate-fadeInLogo">
              <div className="absolute -inset-1.5 bg-luxGold/30 rounded-full blur-md"></div>
              <img
                src="/logo.jpeg"
                alt="Essência Lux Logo"
                width={100}
                height={100}
                className="relative w-11 h-11 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-luxGold/60 shadow-xl hover:scale-180 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wide text-white leading-tight">
                Essência <span className="text-luxGold">Lux</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-300 font-semibold tracking-widest uppercase mt-0.5">
                Catálogo Exclusivo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button onClick={handleCall} className="p-2.5 text-luxGold bg-luxGold/10 hover:bg-luxGold/20 rounded-full border border-luxGold/30 transition-all active:scale-95 flex items-center justify-center shadow-md" aria-label="Ligar para Atendimento">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </button>

            <button onClick={handleQuickContact} className="hidden sm:flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shadow-md">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
              <span>WhatsApp</span>
            </button>

            {/* Botão de Carrinho descritivo com ícone de sacola/carrinho nítido */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 text-luxGold bg-luxGold/15 hover:bg-luxGold/25 rounded-xl border border-luxGold/30 transition-all active:scale-95 flex items-center gap-2 shadow-md group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="text-xs font-bold tracking-wide text-white hidden sm:inline">Carrinho</span>
              
              {/* Contador do Carrinho */}
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
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