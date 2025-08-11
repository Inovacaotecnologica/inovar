
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  name: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  observations: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}
