import React, { createContext, type ReactNode } from 'react';
import useQuery from '../hooks/useQuery';
import { getAllProducts } from '../services/lighting-services';

interface LightingContextType {
  lightingData: any; 
  error: any;
  isFail: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

interface LightingProviderProps {
  children: ReactNode;
}

export const LightingContext = createContext<LightingContextType | null>(null);

const LightingProviderProps: React.FC<LightingProviderProps> = ({ children }) => {
  const {
    data: lightingData,
    error,
    isFail,
    isLoading,
    isSuccess,
  } = useQuery({ fetchFn: getAllProducts });

  return (
    <LightingContext.Provider value={{ lightingData, error, isFail, isLoading, isSuccess }}>
      {children}
    </LightingContext.Provider>
  );
};

export default LightingContext;
