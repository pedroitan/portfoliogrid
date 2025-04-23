"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// Removed unused prop: posterUrl
export default function HeroVideo({ videoUrl }: { videoUrl: string }) {
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
            youtube: { playerVars: { showinfo: 0, rel: 0, modestbranding: 1 } },
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100dvh',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Subtract light effect overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 mix-blend-lighten z-10 pointer-events-none" />

      {/* Menu button top right */}
      <button className="absolute top-6 right-8 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 transition-all shadow-lg">
        <Menu size={28} />
      </button>

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

      {/* Scroll down message at the bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce text-white opacity-90 select-none">
        <span className="text-lg md:text-xl font-medium tracking-wide" style={{ fontFamily: '"PP Neue Montreal", "Inter", sans-serif' }}>
          Scroll Down
        </span>
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mt-1 animate-pulse">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Custom font preload (PP Neue Montreal) */}
      <style jsx global>{`
        @font-face {
          font-family: 'PP Neue Montreal';
          src: url('/fonts/PPNeueMontreal-Bold.woff2') format('woff2'),
               url('/fonts/PPNeueMontreal-Bold.woff') format('woff');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        /* Removed all @import statements from here to prevent build errors */
      `}</style>
    </section>
  );
}
