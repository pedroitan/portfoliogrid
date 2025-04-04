'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useExpertise } from '../context/ExpertiseContext';
import ReactPlayer from 'react-player';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoCarousel() {
  const [isClient, setIsClient] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);
  
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Featured video URLs for each expertise area
  const expertiseOptions = [
    { id: 'director', label: 'Film Director' },
    { id: 'music', label: 'Music Producer' },
    { id: 'engineer', label: 'Audiovisual Engineer' }
  ];
  
  const featuredVideos = {
    director: "https://www.youtube.com/watch?v=gxTSuCtx510", // IZA Uma Vida é pouco pra te amar
    music: "https://www.youtube.com/watch?v=9XIFvM0Zppw", // IZA Uma Vida é pouco pra te amar Making Off
    engineer: "https://www.youtube.com/watch?v=gxTSuCtx510" // Using IZA video again temporarily
  };
  
  // Current featured video URL based on active expertise
  const featuredVideoUrl = featuredVideos[activeExpertise];
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const getCurrentIndex = () => {
    return expertiseOptions.findIndex(option => option.id === activeExpertise);
  };
  
  const handleNextExpertise = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % expertiseOptions.length;
    const nextExpertise = expertiseOptions[nextIndex].id;
    setActiveExpertise(nextExpertise);
    window.location.hash = nextExpertise;
  };
  
  const handlePrevExpertise = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = (currentIndex - 1 + expertiseOptions.length) % expertiseOptions.length;
    const prevExpertise = expertiseOptions[prevIndex].id;
    setActiveExpertise(prevExpertise);
    window.location.hash = prevExpertise;
  };

  const showIndicators = () => {
    setShowControls(true);
  };

  const hideIndicators = () => {
    setShowControls(false);
  };
  
  return (
    <div 
      className="max-w-4xl mx-auto mt-2 mb-6 px-4 relative"
      onMouseEnter={showIndicators}
      onMouseLeave={hideIndicators}
      ref={videoRef}
    >
      {/* Navigation indicators - visible on hover (desktop only) */}
      <div className={`absolute inset-y-0 left-0 flex items-center z-20 hidden md:flex transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={handlePrevExpertise}
          className="h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center ml-2"
          aria-label="Previous expertise"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className={`absolute inset-y-0 right-0 flex items-center z-20 hidden md:flex transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={handleNextExpertise}
          className="h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center mr-2"
          aria-label="Next expertise"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
        className="aspect-video relative rounded-lg overflow-hidden shadow-2xl border border-white/10"
        key={activeExpertise} // Key changes to trigger animation on expertise change
      >
        {isClient && (
          <ReactPlayer
            url={featuredVideoUrl}
            width="100%"
            height="100%"
            controls={true}
            light={false}
            playing={false}
            config={{
              youtube: {
                playerVars: { 
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  disablekb: 1,
                  controls: 1,
                  cc_load_policy: 0,
                  iv_load_policy: 3, // hide annotations
                  autohide: 1,
                  fs: 1, // allow fullscreen
                  playsinline: 1,
                  loop: 0,
                  showsearch: 0,
                  enablejsapi: 1
                }
              }
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
