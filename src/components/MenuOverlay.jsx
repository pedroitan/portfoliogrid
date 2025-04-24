import React, { useState } from 'react';
import Image from 'next/image';

// Menu items and their corresponding images (3 per item)
const MENU_ITEMS = [
  {
    label: 'Portfolio',
    anchor: '#portfolio',
    value: 'portfolio',
    images: [
      '/images/thumbnails/iza-uma-vida.jpg',
      '/images/thumbnails/iza-uma-vida2.jpg',
      '/images/thumbnails/iza-uma-vida3.jpg',
    ],
  },
  {
    label: 'Bio',
    anchor: '#bio',
    value: 'bio',
    images: [
      '/images/thumbnails/farm-oxe.jpg',
      '/images/thumbnails/farm-oxe2.jpg',
      '/images/thumbnails/farm-oxe3.jpg',
    ],
  },
  {
    label: 'Contato',
    anchor: '#contact',
    value: 'contact',
    images: [
      '/images/thumbnails/ludmilla-making-off.jpg',
      '/images/thumbnails/ludmilla-making-off2.jpg',
      '/images/thumbnails/ludmilla-making-off3.jpg',
    ],
  },
];

export default function MenuOverlay({ open, onClose, onSelect }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 font-satoshi pointer-events-auto"
      style={{ pointerEvents: 'auto', background: 'rgba(0,0,0,0.6)' }}
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
      <div className="relative flex flex-col items-center gap-14 md:gap-24 z-20 pointer-events-auto" style={{ pointerEvents: 'auto' }}>
        {MENU_ITEMS.map((item, idx) => {
          // Opacity: 0.4 on hover or select, 1 otherwise
          let opacity = 1;
          if (hoveredIdx === idx || selectedIdx === idx) opacity = 0.4;

          return (
            <div key={item.label} className="relative flex flex-col items-center justify-center min-h-0 md:min-h-0">
              {/* Images around the label, only on hover */}
              {hoveredIdx === idx && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  {/* Right image (was top) */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-28">
                    <Image src={item.images[0]} alt={item.label+" 1"} width={90} height={60} className="rounded-xl shadow-lg object-cover" />
                  </div>
                  {/* Left image */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-28">
                    <Image src={item.images[1]} alt={item.label+" 2"} width={90} height={60} className="rounded-xl shadow-lg object-cover" />
                  </div>
                </div>
              )}
              <button
                className={`text-white text-4xl md:text-6xl font-satoshi font-bold transition-all duration-200 relative bg-transparent border-none outline-none cursor-pointer`}
                style={{
                  opacity,
                  color: 'white',
                  mixBlendMode: hoveredIdx === idx ? 'normal' : 'difference',
                  textShadow: hoveredIdx === idx ? 'none' : '0 2px 16px rgba(44,184,214,0.16)',
                  zIndex: 20,
                  pointerEvents: 'auto',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  setSelectedIdx(idx);
                  setTimeout(() => setSelectedIdx(null), 600); // fade for 600ms
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
