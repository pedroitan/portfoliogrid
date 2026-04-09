"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type ReactPlayerType from "react-player";
import { useTranslations, useLocale } from "next-intl";
import { Volume2, VolumeX } from "lucide-react";
import { useExpertise } from "../context/ExpertiseContext";
import ItalExpertiseNav from './ItalExpertiseNav';

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function MuteControl({ playerRef }: { playerRef: React.RefObject<ReactPlayerType | null> }) {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const unmute = () => {
      const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
      if (video) {
        video.muted = false;
        video.play().catch(() => {});
      }
      setMuted(false);
      window.removeEventListener('scroll', unmute);
      window.removeEventListener('touchstart', unmute);
      window.removeEventListener('click', unmute);
    };
    window.addEventListener('scroll', unmute, { passive: true });
    window.addEventListener('touchstart', unmute, { passive: true });
    window.addEventListener('click', unmute);
    return () => {
      window.removeEventListener('scroll', unmute);
      window.removeEventListener('touchstart', unmute);
      window.removeEventListener('click', unmute);
    };
  }, [playerRef]);

  const toggle = useCallback(() => {
    const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
    const next = !muted;
    if (video) {
      video.muted = next;
      if (!next) video.play().catch(() => {});
    }
    setMuted(next);
  }, [muted, playerRef]);

  return (
    <button
      className="absolute bottom-8 right-8 z-30 bg-black/60 text-white rounded-full p-3 shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
      style={{ pointerEvents: 'auto' }}
      aria-label={muted ? 'Ativar som' : 'Desativar som'}
      onClick={toggle}
    >
      {!muted ? <Volume2 size={22} /> : <VolumeX size={22} />}
    </button>
  );
}

const PLAYER_CONFIG = {
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
};

const PLAYER_STYLE = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh',
  objectFit: 'cover' as const,
  minWidth: '100vw',
  minHeight: '100dvh',
  maxWidth: '100vw',
  maxHeight: '100dvh',
  zIndex: 1,
  pointerEvents: 'none' as const,
};

const featuredVideos: Record<string, Record<string, string>> = {
  director: {
    pt: "https://itan.b-cdn.net/PORTFOLIO_V5_BR_ICON.mp4",
    en: "https://itan.b-cdn.net/PORTFOLIO_V5_EN_ICON2.mp4",
  },
  music: {
    pt: "https://itan.b-cdn.net/Dilsinho,%20Paula%20Fernandes%20-%20%20Me%20Ensina%20(Ao%20Vivo%20No%20Casa%20Filtr).mp4",
    en: "https://itan.b-cdn.net/Dilsinho,%20Paula%20Fernandes%20-%20%20Me%20Ensina%20(Ao%20Vivo%20No%20Casa%20Filtr).mp4",
  },
  engineer: {
    pt: "https://itan.b-cdn.net/Ludmilla%20-%20Live%20At%20Half%20Time%20Show%20NBA%20-%20With%20Budweiser.mp4",
    en: "https://itan.b-cdn.net/Ludmilla%20-%20Live%20At%20Half%20Time%20Show%20NBA%20-%20With%20Budweiser.mp4",
  },
};

export default function HeroVideoDynamic() {
  const { activeExpertise } = useExpertise();
  const locale = useLocale();
  const section = featuredVideos[activeExpertise] ?? featuredVideos.director;
  const videoUrl = section[locale] ?? section.pt;
  const [videoReady, setVideoReady] = useState(false);
  const playerRef = useRef<ReactPlayerType | null>(null);
  const t = useTranslations('hero');

  useEffect(() => {
    setVideoReady(false);
  }, [videoUrl]);

  const handleReady = useCallback(() => setVideoReady(true), []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Fullscreen video background - bulletproof mobile fit */}
      <div className="fixed top-0 left-0 w-screen h-[100dvh] z-1 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
        <ReactPlayer
          ref={playerRef}
          key={videoUrl}
          url={videoUrl}
          playing
          loop
          muted
          controls={false}
          width="100vw"
          height="100dvh"
          playsinline
          onReady={handleReady}
          config={PLAYER_CONFIG}
          style={PLAYER_STYLE}
        />
        </div>
        <MuteControl playerRef={playerRef} />
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
          {t('scrollDown')}
        </span>
      </div>
    </section>
  );
}
