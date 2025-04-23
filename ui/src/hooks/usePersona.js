// /gebral-Estate/ui/src/hooks/usePersona.js
import { useContext } from 'react';
import { PersonaContext } from '@context/PersonaContext';

export const usePersona = () => {
  const context = useContext(PersonaContext);
  
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  
  return context;
};
