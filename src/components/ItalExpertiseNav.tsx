'use client';

import { Film, Music, Monitor } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function ItalExpertiseNav() {
  const navItems = [
    { name: 'Film Director', url: '#film', icon: Film },
    { name: 'Music Producer', url: '#music', icon: Music },
    { name: 'Audiovisual Engineer', url: '#av', icon: Monitor }
  ];

  return (
    <div className="relative h-20 mb-8 mt-6">
      <NavBar 
        items={navItems} 
        className="static sm:static mt-4 transform-none sm:transform-none"
      />
    </div>
  );
}
