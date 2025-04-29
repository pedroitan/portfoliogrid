"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useExpertise } from "../context/ExpertiseContext";
import ItalExpertiseNav from './ItalExpertiseNav';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const featuredVideos: Record<string, string> = {
  director: "https://itan.b-cdn.net/IZA_LIVE_UMA_VIDA_E_POUCO_PARA_TE_AMAR_4K_V02.mp4", // IZA Uma Vida é pouco pra te amar (Bunny.net CDN)
  music: "https://itan.b-cdn.net/Dilsinho,%20Paula%20Fernandes%20-%20%20Me%20Ensina%20(Ao%20Vivo%20No%20Casa%20Filtr).mp4", // Produção Musical section (Bunny.net CDN, Dilsinho & Paula Fernandes)
  engineer: "https://itan.b-cdn.net/Ludmilla%20-%20Live%20At%20Half%20Time%20Show%20NBA%20-%20With%20Budweiser.mp4"  // Tecnologia section (Bunny.net CDN)
};

export default function HeroVideoDynamic() {
  const { activeExpertise } = useExpertise();
  const videoUrl = featuredVideos[activeExpertise] || featuredVideos.director;
  const [muted, setMuted] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Fullscreen video background - bulletproof mobile fit */}
      <div className="fixed top-0 left-0 w-screen h-[100dvh] z-1 overflow-hidden pointer-events-none">
        <ReactPlayer
          url={videoUrl}
          playing
          loop
          muted={muted}
          controls={false}
          width="100vw"
          height="100dvh"
          playsinline
          config={{
            file: {
              attributes: {
                style: {
                  width: '100vw',
                  height: '100dvh',
                  objectFit: 'cover',
                  minWidth: '100vw',
                  minHeight: '100dvh',
                  maxWidth: '100vw',
                  maxHeight: '100dvh',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  pointerEvents: 'none',
                }
              }
            },
            youtube: { playerVars: { showinfo: 0, rel: 0, modestbranding: 1 } },
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100dvh',
            objectFit: 'cover',
            minWidth: '100vw',
            minHeight: '100dvh',
            maxWidth: '100vw',
            maxHeight: '100dvh',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Mute/Unmute Button */}
        <button
          className="absolute bottom-8 right-8 z-30 bg-black/60 text-white rounded-full p-3 shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          style={{ pointerEvents: 'auto' }}
          aria-label={muted ? 'Desativar som' : 'Ativar som'}
          onClick={() => setMuted((m) => !m)}
        >
          {/* Unmuted icon when NOT muted, Muted icon when muted */}
          {!muted ? (
            // Unmuted icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
            </svg>
          ) : (
            // Muted icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
              <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {/* Subtract light effect overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 mix-blend-lighten z-10 pointer-events-none" />

      {/* NAVBAR above scroll down button, with custom position for scroll arrows */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-30 w-full flex justify-center pointer-events-none">
        <div className="max-w-2xl w-full px-2 relative flex justify-center items-start">
          <ItalExpertiseNav navBarClassName="justify-center items-center" arrowPosition="top-centered" />
        </div>
      </div>

      {/* Name in the center - Satoshi with mix-blend-mode */}
      <h1
        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl tracking-tight text-center select-none lowercase font-satoshi"
        style={{
          color: '#fff',
          mixBlendMode: 'difference',
          letterSpacing: '-0.04em',
          textShadow: '0 4px 24px rgba(0,0,0,0.55)'
        }}
      >
        itan
      </h1>

      {/* Scroll down message at the bottom with animation restored */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce text-white opacity-90 select-none">
        <span
          className="text-lg md:text-xl font-medium tracking-wide font-satoshi cursor-pointer"
          onClick={() => {
            // Try both hash and scrollIntoView for robust navigation
            const el = document.getElementById('portfolio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.location.hash = '#portfolio';
          }}
        >
          ver portfólio
        </span>
      </div>
    </section>
  );
}
