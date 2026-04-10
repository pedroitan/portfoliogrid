"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Volume2, VolumeX } from "lucide-react";
import { useExpertise } from "../context/ExpertiseContext";
import ItalExpertiseNav from './ItalExpertiseNav';

function MuteControl({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [muted, setMuted] = useState(true);
  const userExplicitlyMutedRef = useRef(false);

  // Restore unmute preference from sessionStorage after hydration
  useEffect(() => {
    if (sessionStorage.getItem('heroUnmuted') === 'true') {
      setMuted(false);
    }
  }, []);

  // When muted becomes false, unmute the video element (works for both sessionStorage restore and user click)
  useEffect(() => {
    if (muted) return;
    const interval = setInterval(() => {
      const v = videoRef.current;
      if (v && v.readyState >= 2) {
        v.muted = false;
        if (v.paused) {
          v.play().catch(() => {
            // Browser blocked unmuted play (no user gesture) — revert to muted
            v.muted = true;
            v.play().catch(() => {});
            sessionStorage.removeItem('heroUnmuted');
            setMuted(true);
          });
        }
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [muted, videoRef]);

  // Listen for click/touch on empty areas to unmute
  useEffect(() => {
    if (!muted) return;

    const handleClick = (e: MouseEvent) => {
      if (userExplicitlyMutedRef.current) {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"]')) return;
        if (window.getComputedStyle(target).cursor === 'pointer') return;
      }
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        if (v.paused) v.play().catch(() => {});
      }
      sessionStorage.setItem('heroUnmuted', 'true');
      setMuted(false);
      window.removeEventListener('click', handleClick);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [muted, videoRef]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    const next = !muted;
    if (v) {
      v.muted = next;
      if (!next && v.paused) v.play().catch(() => {});
    }
    if (next) {
      sessionStorage.removeItem('heroUnmuted');
      sessionStorage.setItem('heroExplicitlyMuted', 'true');
      userExplicitlyMutedRef.current = true;
    } else {
      sessionStorage.setItem('heroUnmuted', 'true');
    }
    setMuted(next);
  }, [muted, videoRef]);

  const t = useTranslations('hero');

  return (
    <>
      {/* Tap-to-unmute overlay — visible only when muted */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-end pb-32 md:pb-28 gap-3 transition-opacity duration-700 pointer-events-none ${muted ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="animate-pulse text-white/80 text-sm md:text-base font-medium tracking-wide font-satoshi select-none">
          {t('tapToUnmute')}
        </span>
      </div>

      {/* Mute/Unmute button — always visible */}
      <button
        className="fixed bottom-8 right-8 z-[200] bg-black/60 text-white rounded-full p-3 shadow-lg hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        style={{ pointerEvents: 'auto' }}
        aria-label={muted ? 'Ativar som' : 'Desativar som'}
        onClick={(e) => { e.stopPropagation(); toggle(); }}
      >
        {!muted ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
    </>
  );
}

const VIDEO_STYLE: React.CSSProperties = {
  width: '100vw',
  height: '100dvh',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  pointerEvents: 'none',
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevUrlRef = useRef(videoUrl);
  const t = useTranslations('hero');

  const videoCallbackRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      if (el.readyState >= 3) setVideoReady(true);
      else setVideoReady(false);
    }
  }, []);

  // Reset videoReady only when URL actually changes (not on initial mount)
  useEffect(() => {
    if (prevUrlRef.current !== videoUrl) {
      setVideoReady(false);
      prevUrlRef.current = videoUrl;
    }
  }, [videoUrl]);

  const handleCanPlay = useCallback(() => setVideoReady(true), []);


  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Fullscreen video background */}
      <div className="fixed top-0 left-0 w-screen h-[100dvh] z-1 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
        <video
          ref={videoCallbackRef}
          key={videoUrl}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={handleCanPlay}
          style={VIDEO_STYLE}
        />
        {/* Logo 'itan' with blend mode — must be sibling of video inside same opacity wrapper */}
        <span 
          className="fixed top-8 left-4 md:left-[120px] text-white text-2xl font-bold font-satoshi tracking-tight lowercase pointer-events-none"
          style={{
            mixBlendMode: 'difference',
            letterSpacing: '-0.04em',
            zIndex: 10,
          }}
        >
          itan
        </span>
        </div>
        <MuteControl videoRef={videoRef} />
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
        className="hidden absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl tracking-tight text-center select-none lowercase font-satoshi"
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
