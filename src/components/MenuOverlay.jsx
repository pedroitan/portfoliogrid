import React, { useState } from 'react';
import Image from 'next/image';

// Menu items and their corresponding video thumbnails
const MENU_ITEMS = [
  {
    label: 'Portfolio',
    anchor: '#portfolio',
    value: 'portfolio',
    thumbnail: '/images/thumbnails/iza-uma-vida.jpg',
  },
  {
    label: 'Bio',
    anchor: '#bio',
    value: 'bio',
    thumbnail: '/images/thumbnails/farm-oxe.jpg',
  },
  {
    label: 'Contato',
    anchor: '#contact',
    value: 'contact',
    thumbnail: '/images/thumbnails/ludmilla-making-off.jpg',
  },
];

export default function MenuOverlay({ open, onClose, onSelect }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 font-satoshi pointer-events-auto"
      style={{ pointerEvents: 'auto', background: 'rgba(0,0,0,0.8)' }}
    >
      {/* Close button */}
      <button
        className="fixed md:absolute top-6 right-8 flex items-center justify-center text-white text-3xl tracking-widest font-bold opacity-80 hover:opacity-100 transition w-12 h-12 z-[10000]"
        onClick={onClose}
        aria-label="Fechar menu"
        style={{ pointerEvents: 'auto', left: 'unset', right: '2rem' }}
      >
        ×
      </button>

      {/* Menu Items */}
      <div className="relative flex flex-col items-center gap-6 md:gap-8 z-20 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.label}
            className="text-white text-4xl md:text-6xl font-satoshi font-bold transition-all duration-200 relative bg-transparent border-none outline-none cursor-pointer"
            style={{
              color: hoveredIdx === idx ? '#2cb8d6' : 'white',
              mixBlendMode: hoveredIdx === idx ? 'normal' : 'difference',
              textShadow: hoveredIdx === idx ? '0 2px 16px rgba(44,184,214,0.16)' : 'none',
              zIndex: 20,
              pointerEvents: 'auto',
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => {
              if (item.value === 'bio' || item.value === 'contact') {
                if (onSelect) onSelect(item.value);
              } else {
                window.location.hash = item.anchor;
                onClose();
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Thumbnails on hover */}
      {hoveredIdx !== null && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 fade-in pointer-events-none" style={{ transition: 'opacity 0.3s', opacity: 1 }}>
          <Image
            src={MENU_ITEMS[hoveredIdx].thumbnail}
            alt={MENU_ITEMS[hoveredIdx].label}
            width={600}
            height={340}
            className="rounded-2xl shadow-xl object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}
