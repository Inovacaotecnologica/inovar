import React, { useState } from 'react';
import { CartProvider } from './hooks/useCart';
import Header from './components/Header';
import CatalogView from './components/CatalogView';
import CartView from './components/CartView';
import Footer from './components/Footer';

type View = 'catalog' | 'cart';

const App: React.FC = () => {
  const [view, setView] = useState<View>('catalog');

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header setView={setView} />
        <main className="flex-grow">
          {view === 'catalog' && <CatalogView />}
          {view === 'cart' && <CartView />}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;