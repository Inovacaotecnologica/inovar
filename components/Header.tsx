import React from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCartIcon } from '../constants';

interface HeaderProps {
  setView: (view: 'catalog' | 'cart') => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="text-3xl font-bold text-slate-800 cursor-pointer"
            onClick={() => setView('catalog')}
          >
            <span className="font-medium">CRIE</span> INOVE<span className="text-teal-600">.</span>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setView('catalog')}
              className="text-slate-600 hover:text-teal-600 transition-colors duration-300 font-medium"
            >
              Catálogo
            </button>
            <button
              onClick={() => setView('cart')}
              className="relative text-slate-600 hover:text-teal-600 transition-colors duration-300"
            >
              <ShoppingCartIcon className="h-7 w-7" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;