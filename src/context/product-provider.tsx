import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';

import { fetchLightingFixtures } from '../services/fetchLightingfixtures';
import {type Product} from "../services/type.ts";


const ProductsContext = createContext<Product[]>([]);

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchLightingFixtures(setProducts);
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};