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

  return (
    <div className="relative h-12 mb-2 mt-1">
      <NavBar 
        items={navItems} 
        className="static sm:static mt-0 transform-none sm:transform-none"
        onNavItemClick={handleNavClick}
      />
    </div>
  );
}
