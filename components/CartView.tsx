import React, { useState, useMemo } from 'react';
import { useCart } from '../hooks/useCart';
import { Address } from '../types';
import { PlusIcon, MinusIcon, TrashIcon, WhatsAppIcon } from '../constants';
import { formatPrice } from '../services/googleSheetService';
import { WHATSAPP_NUMBER } from '../constants';

const CartView = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [address, setAddress] = useState<Address>({
    name: '', phone: '', cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '', observations: ''
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return address.name && address.phone && address.cep && address.city && address.state;
  }, [address]);

  const handleCheckout = () => {
    if (!isFormValid || cartItems.length === 0) return;

    const itemsList = cartItems.map((item, index) => 
      `${index + 1}) ${item.name} – Qtd: ${item.quantity} – ${formatPrice(item.price)} – Subtotal: ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const message = `
CRIE INOVE – Pedido Online
*Itens:*
${itemsList}
---
*Total:* ${formatPrice(getCartTotal())}

*Entrega:*
${address.name}
Tel: ${address.phone}
CEP: ${address.cep}
Endereço: ${address.street}, ${address.number} ${address.complement}
Bairro: ${address.neighborhood}
Cidade/UF: ${address.city}/${address.state}

*Observações:* ${address.observations || 'Nenhuma'}

---
*Mensagem para negociação:*
Olá! Gostaria de alinhar a melhor opção de entrega (frete/retirada e prazo). Pode me confirmar disponibilidade? Obrigado(a)!
    `.trim().replace(/\n\s*\n/g, '\n'); 

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-slate-800">Seu carrinho está vazio</h2>
        <p className="text-slate-500 mt-2">Adicione produtos do catálogo para começar.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Seu Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <ul className="divide-y divide-slate-200">
              {cartItems.map(item => (
                <li key={item.id} className="p-4 flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-600">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-slate-500 hover:text-teal-600"><MinusIcon className="w-4 h-4" /></button>
                    <span className="px-3 text-lg font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-slate-500 hover:text-teal-600"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  <p className="w-24 text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500"><TrashIcon className="w-6 h-6" /></button>
                </li>
              ))}
            </ul>
            <div className="p-4 flex justify-end">
              <button onClick={clearCart} className="text-sm text-slate-500 hover:text-rose-600">Limpar Carrinho</button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 mt-8 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Endereço de Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" value={address.name} onChange={handleAddressChange} placeholder="Nome Completo*" className="p-2 border border-slate-300 rounded-md w-full md:col-span-2 focus:ring-teal-500 focus:border-teal-500" />
              <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Telefone (com DDD)*" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="cep" value={address.cep} onChange={handleAddressChange} placeholder="CEP*" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Rua/Avenida" className="p-2 border border-slate-300 rounded-md w-full md:col-span-2 focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="number" value={address.number} onChange={handleAddressChange} placeholder="Número" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="complement" value={address.complement} onChange={handleAddressChange} placeholder="Complemento (opcional)" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="neighborhood" value={address.neighborhood} onChange={handleAddressChange} placeholder="Bairro" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="Cidade*" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <input type="text" name="state" value={address.state} onChange={handleAddressChange} placeholder="Estado (UF)*" className="p-2 border border-slate-300 rounded-md w-full focus:ring-teal-500 focus:border-teal-500" />
              <textarea name="observations" value={address.observations} onChange={handleAddressChange} placeholder="Observações do pedido (opcional)" className="p-2 border border-slate-300 rounded-md w-full md:col-span-2 h-24 focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
             <p className="text-xs text-slate-500 mt-2">* Campos obrigatórios</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-28">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between text-lg mb-4">
              <span>Subtotal</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={!isFormValid}
              className="w-full mt-6 bg-emerald-500 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span>Finalizar no WhatsApp</span>
            </button>
             {!isFormValid && <p className="text-xs text-center text-rose-500 mt-2">Preencha os campos obrigatórios do endereço para continuar.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;