import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Product } from '../services/type.ts'; 

export type CartItem = Product & { 
    qty: number;
    selectedVariant: {
    qty: any;
    colour: string;
    image: string;
    price: number;
  };
 };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product & { selectedVariant: CartItem['selectedVariant'] }) => void;
  removeFromCart: (id: string, variantColour: string) => void;
  updateQuantity: (id: string, variantColour: string, qty: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

const addToCart = (product: Product & { selectedVariant: CartItem['selectedVariant'] }) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(
      item => item.id === product.id && item.selectedVariant.colour === product.selectedVariant.colour
    );

    const stockQty = product.selectedVariant.qty;

    if (existingItem) {
      if (existingItem.qty < stockQty) {
        return prevItems.map(item =>
          item.id === product.id && item.selectedVariant.colour === product.selectedVariant.colour
            ? { ...item, qty: item.qty + 1 } 
            : item
        );
      } else {
        alert(`Only ${stockQty} item(s) available in stock.`);
        return prevItems; 
      }
    } else {
      return [...prevItems, { ...product, qty: 1 }];
    }
  });
};



  const removeFromCart = (id: string, variantColour: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.selectedVariant.colour === variantColour))
    );
  };


    const updateQuantity = (id: string, variantColour: string, qty: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id && item.selectedVariant.colour === variantColour) {
          const stockQty = item.selectedVariant.qty;  
          
          if (qty <= stockQty) {
             return { ...item, qty };
          } else {
             alert(`Only ${stockQty} item(s) available in stock.`);
            return item; 
          }
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
