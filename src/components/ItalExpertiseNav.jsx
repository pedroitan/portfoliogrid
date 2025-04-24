'use client';

import { Film, Music, Monitor } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useExpertise } from "../context/ExpertiseContext";
import { useEffect } from "react";

export default function ItalExpertiseNav(props) {
  const navBarClassName = props.navBarClassName || '';
  const arrowPosition = props.arrowPosition || '';
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Handle click on navbar items
  const handleNavClick = (itemName) => {
    let expertise = 'director';
    if (itemName === 'Produção Musical') expertise = 'music';
    else if (itemName === 'Tecnologia') expertise = 'engineer';
    
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
    { name: 'Direção Audiovisual', url: '#director', icon: Film },
    { name: 'Produção Musical', url: '#music', icon: Music },
    { name: 'Tecnologia', url: '#engineer', icon: Monitor }
  ];

  // Get the current active URL from the active expertise
  const getActiveItemUrl = () => {
    return `#${activeExpertise}`;
  };

  return (
    <div
      className={
        `relative z-50 w-full flex justify-center items-center pointer-events-auto ` +
        (arrowPosition === 'top-centered' ? 'mt-0 mb-2' : 'h-12 mb-2 mt-[100px] md:mt-1 md:mb-2 md:static md:h-12')
      }
      style={arrowPosition === 'top-centered' ? { marginTop: 0, position: 'relative', top: 0 } : { marginTop: 0 }}
    >
      <NavBar
        items={navItems}
        className={`static sm:static mt-0 transform-none sm:transform-none ${navBarClassName}`}
        onNavItemClick={handleNavClick}
        activeItemUrl={getActiveItemUrl()}
      />
    </div>
  );
}
