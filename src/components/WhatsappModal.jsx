import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsappModal({ product, onClose, phoneNumber = "244900000000" }) {
  const [selectedQuestion, setSelectedQuestion] = useState("Gostaria de obter mais informações sobre este produto.");

  const defaultQuestions = [
    "Gostaria de saber a disponibilidade em stock.",
    "Qual é o preço e os métodos de entrega disponíveis?",
    "Quero fazer um pedido deste item agora.",
    "Gostaria de saber se há descontos para compras em quantidade."
  ];

  const handleSendToWhatsApp = () => {
    const text = `Olá, Essência Lux! 🌟\n\nTenho interesse no produto: *${product.name}* (Cód: #${product.id})\n\n❓ *Minha Dúvida:* ${selectedQuestion}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-luxGray text-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 border border-luxGold/20 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-luxGold">Atendimento WhatsApp</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-luxGold">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-gray-300 mb-2">Produto selecionado:</p>
        <div className="bg-black/40 p-3 rounded-xl flex items-center gap-3 mb-4 border border-white/5">
          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
          <div>
            <p className="font-semibold text-sm leading-snug">{product.name}</p>
            <p className="text-xs text-luxGold font-bold mt-0.5">{product.price}</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-2 font-medium">Escolha uma pergunta rápida:</p>
        <div className="space-y-2 mb-6">
          {defaultQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedQuestion(q)}
              className={`w-full text-left p-2.5 text-xs rounded-xl border transition-all ${
                selectedQuestion === q
                  ? 'border-luxGold bg-luxGold/10 text-luxGold font-semibold'
                  : 'border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        <button
          onClick={handleSendToWhatsApp}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <MessageCircle size={18} />
          Continuar no WhatsApp
        </button>
      </div>
    </div>
  );
}