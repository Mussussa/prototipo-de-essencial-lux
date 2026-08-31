import React, { useState } from 'react';
import { MessageCircle, Phone, MessageSquare, X } from 'lucide-react';

export default function ContactModal({ 
  product, 
  onClose, 
  whatsappNumber = "258858573868", 
  callPhoneNumber = "258877305740" 
}) {
  const [selectedQuestion, setSelectedQuestion] = useState("Gostaria de obter mais informações sobre este produto.");

  const defaultQuestions = [
    "Gostaria de saber a disponibilidade em stock.",
    "Qual é o preço e os métodos de entrega disponíveis?",
    "Quero fazer um pedido deste item agora.",
    "Gostaria de saber se há descontos para compras em quantidade."
  ];

  // Limpeza dos números de telefone (apenas dígitos)
  const cleanWhatsapp = whatsappNumber.replace(/\D/g, '');
  const cleanCallNum = callPhoneNumber.replace(/\D/g, '');

  // 1. Enviar mensagem para o WhatsApp
  const handleSendToWhatsApp = () => {
    if (!product) return;
    const text = `Olá, Essência Lux! 🌟\n\nTenho interesse no produto: *${product.name}* \n LINK:${product.image}) \n\n❓ *Minha Dúvida:* ${selectedQuestion}`;
    const encodedText = encodeURIComponent(text);
    window.location.href = `https://wa.me/${cleanWhatsapp}?text=${encodedText}`;
    onClose();
  };

  // 2. Fazer Chamada Telefónica Direta
  const handleMakeCall = () => {
    window.location.href = `tel:+${cleanCallNum}`;
    onClose();
  };

  // 3. Enviar Mensagem SMS Normal
  const handleSendSMS = () => {
    if (!product) return;
    const smsText = `Essência Lux: Interesse no produto ${product.name} (#${product.id})  #${product.image}. ${selectedQuestion}`;
    const encodedText = encodeURIComponent(smsText);
    window.location.href = `sms:+${cleanCallNum}?body=${encodedText}`;
    onClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-luxGray text-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 border border-luxGold/20 shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-luxGold">Atendimento & Contacto</h3>
          <button 
            onClick={onClose} 
            className="p-1 text-gray-400 hover:text-luxGold transition-colors" 
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Produto Selecionado */}
        <p className="text-xs text-gray-300 mb-2">Produto selecionado:</p>
        <div className="bg-black/40 p-3 rounded-xl flex items-center gap-3 mb-4 border border-white/5">
          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm leading-snug truncate">{product.name}</p>
            <p className="text-xs text-luxGold font-bold mt-0.5">{product.price}</p>
          </div>
        </div>

        {/* Perguntas Rápidas */}
        <p className="text-xs text-gray-400 mb-2 font-medium">Escolha uma mensagem/dúvida rápida:</p>
        <div className="space-y-2 mb-5">
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

        {/* Botões de Ação */}
        <div className="space-y-2.5">
          {/* Botão Principal: WhatsApp */}
          <button
            onClick={handleSendToWhatsApp}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 text-sm"
          >
            <MessageCircle size={18} />
            Continuar no WhatsApp
          </button>

          {/* Opções Alternativas: Ligar e SMS */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleMakeCall}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 border border-white/15 transition-all text-xs active:scale-95"
            >
              <Phone size={15} className="text-luxGold" />
              Ligar (+258 87 730 5740)
            </button>

            <button
              onClick={handleSendSMS}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 border border-white/15 transition-all text-xs active:scale-95"
            >
              <MessageSquare size={15} className="text-blue-400" />
              Enviar SMS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}