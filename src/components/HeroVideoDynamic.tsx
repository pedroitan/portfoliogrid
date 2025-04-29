"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useExpertise } from "../context/ExpertiseContext";
import ItalExpertiseNav from './ItalExpertiseNav';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const featuredVideos: Record<string, string> = {
  director: "/videos/IZA_LIVE_UMA_VIDA_E_POUCO_PARA_TE_AMAR_4K_V02.mp4", // IZA Uma Vida é pouco pra te amar (local, per user request)
  music: "https://www.youtube.com/watch?v=VCAQVijLiR4",    // FARM Oxe (new for music)
  engineer: "https://www.youtube.com/watch?v=WaB3ys94Yj4"  // Ludmilla NBA Halftime Show
};

export default function HeroVideoDynamic() {
  const { activeExpertise } = useExpertise();
  const videoUrl = featuredVideos[activeExpertise] || featuredVideos.director;

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Fullscreen video background - bulletproof mobile fit */}
      <div className="fixed top-0 left-0 w-screen h-[100dvh] z-1 overflow-hidden pointer-events-none">
        <ReactPlayer
          url={videoUrl}
          playing
          loop
          muted
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
