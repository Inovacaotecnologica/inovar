import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../services/googleSheetService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transform hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-56 w-full">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-slate-800 truncate">{product.name}</h3>
        <p className="text-sm text-slate-600 mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-slate-800">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors duration-300"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;