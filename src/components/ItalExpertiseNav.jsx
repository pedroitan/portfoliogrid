'use client';

import { Film, Music, Monitor } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useExpertise } from "../context/ExpertiseContext";
import { useEffect } from "react";

export default function ItalExpertiseNav() {
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Handle click on navbar items
  const handleNavClick = (itemName) => {
    let expertise = 'director';
    if (itemName === 'Music Producer') expertise = 'music';
    else if (itemName === 'Audiovisual Engineer') expertise = 'engineer';
    
    // Update hash and expertise state
    window.location.hash = expertise;
    setActiveExpertise(expertise);
    
    // Force a small delay to ensure state updates properly
    setTimeout(() => {
      // Refresh active state to ensure UI is in sync
      setActiveExpertise(expertise);
    }, 10);
  };
  
  // Set initial hash if needed
  useEffect(() => {
    // Only set the hash on initial load if it's not already set
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.location.hash = activeExpertise;
    }
  }, []);
  
  const navItems = [
    { name: 'Film Director', url: '#director', icon: Film },
    { name: 'Music Producer', url: '#music', icon: Music },
    { name: 'Audiovisual Engineer', url: '#engineer', icon: Monitor }
  ];

  // Get the current active URL from the active expertise
  const getActiveItemUrl = () => {
    return `#${activeExpertise}`;
  };

  return (
    <div className="relative h-12 mb-2 mt-1 z-50">
      <NavBar 
        items={navItems} 
        className="static sm:static mt-0 transform-none sm:transform-none"
        onNavItemClick={handleNavClick}
        activeItemUrl={getActiveItemUrl()}
      />
    </div>
  );
}
