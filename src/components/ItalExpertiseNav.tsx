'use client';

import { Film, Music, Monitor } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useExpertise } from "../context/ExpertiseContext";
import { useEffect } from "react";

export default function ItalExpertiseNav() {
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Handle click on navbar items
  const handleNavClick = (itemName: string) => {
    let expertise = 'director';
    if (itemName === 'Produção Musical') expertise = 'music';
    else if (itemName === 'Tecnologia') expertise = 'engineer';
    
    // Update hash and expertise state
    window.location.hash = expertise;
    setActiveExpertise(expertise);
  };
  
  // Set initial hash if needed
  useEffect(() => {
    // Only set the hash on initial load if it's not already set
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.location.hash = activeExpertise;
    }
  }, [activeExpertise]);
  const navItems = [
    { name: 'Direção Audiovisual', url: '#director', icon: Film },
    { name: 'Produção Musical', url: '#music', icon: Music },
    { name: 'Tecnologia', url: '#engineer', icon: Monitor }
  ];

  return (
    <div className="relative h-12 mb-2 mt-[100px] md:mt-1 md:mb-2 z-50 md:static md:h-12"
         style={{ marginTop: 0 }}>
      <NavBar 
        items={navItems} 
        className="static sm:static mt-0 transform-none sm:transform-none"
        onNavItemClick={handleNavClick}
      />
    </div>
  );
}
