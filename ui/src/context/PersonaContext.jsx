// /gebral-Estate/ui/src/context/PersonaContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import { 
  UserCircleIcon, 
  BuildingOfficeIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

export const PersonaContext = createContext();

const defaultPersonas = [
  { 
    id: 'manager', 
    name: 'Amina', 
    role: 'Property Manager',
    icon: UserCircleIcon,
    description: 'Optimize rent pricing and reduce vacancies'
  },
  { 
    id: 'investor', 
    name: 'Robert', 
    role: 'Portfolio Investor',
    icon: CurrencyDollarIcon,
    description: 'Focus on acquisition opportunities'
  },
  { 
    id: 'developer', 
    name: 'Faisal', 
    role: 'Developer CFO',
    icon: BuildingOfficeIcon,
    description: 'Scenario analysis and investment forecasting'
  },
];

export const PersonaProvider = ({ children }) => {
  const [currentPersona, setCurrentPersona] = useState(defaultPersonas[0]);
  const [personas] = useState(defaultPersonas);
  
  const setPersona = useCallback((persona) => {
    setCurrentPersona(persona);
    // Here you could also fetch persona-specific data
  }, []);
  
  return (
    <PersonaContext.Provider value={{ currentPersona, personas, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};
