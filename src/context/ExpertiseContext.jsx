'use client';

import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ExpertiseContext = createContext(null);

// Create a provider component
export const ExpertiseProvider = ({ children }) => {
  const [activeExpertise, setActiveExpertise] = useState('director');

  // Update the state based on URL hash when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#music') setActiveExpertise('music');
      else if (hash === '#engineer') setActiveExpertise('engineer');
      else if (hash === '#director') setActiveExpertise('director');
    }
    
    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#music') setActiveExpertise('music');
      else if (hash === '#engineer') setActiveExpertise('engineer');
      else if (hash === '#director' || hash === '') setActiveExpertise('director');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ExpertiseContext.Provider value={{ activeExpertise, setActiveExpertise }}>
      {children}
    </ExpertiseContext.Provider>
  );
};

// Create a custom hook to use the context
export const useExpertise = () => {
  const context = useContext(ExpertiseContext);
  if (!context) {
    throw new Error('useExpertise must be used within an ExpertiseProvider');
  }
  return context;
};
