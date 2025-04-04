'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useExpertise } from '../context/ExpertiseContext';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from './Modal';

export default function VideoCarousel() {
  const [isClient, setIsClient] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState(Date.now()); // Add a key to force re-render of ReactPlayer
  const videoRef = useRef(null);
  
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Featured video URLs for each expertise area
  const expertiseOptions = [
    { id: 'director', label: 'Film Director' },
    { id: 'music', label: 'Music Producer' },
    { id: 'engineer', label: 'Audiovisual Engineer' }
  ];
  
  const featuredVideos = {
    director: {
      url: "https://www.youtube.com/watch?v=gxTSuCtx510", // IZA Uma Vida é pouco pra te amar
      thumbnail: "/images/thumbnails/iza-uma-vida.jpg", // Add a placeholder image path
      title: "IZA - Uma Vida É Pouco"
    },
    music: {
      url: "https://www.youtube.com/watch?v=9XIFvM0Zppw", // IZA Uma Vida é pouco pra te amar Making Off
      thumbnail: "/images/thumbnails/iza-making-of.jpg", // Add a placeholder image path
      title: "IZA - Making Of"
    },
    engineer: {
      url: "https://www.youtube.com/watch?v=gxTSuCtx510", // Using IZA video again temporarily
      thumbnail: "/images/thumbnails/iza-uma-vida.jpg", // Add a placeholder image path
      title: "IZA - Engenharia de Áudio"
    }
  };
  
  // Current featured video based on active expertise
  const featuredVideo = featuredVideos[activeExpertise];
  
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
  
  const handleClick = () => {
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    // Force ReactPlayer to re-render and reset its state
    setKey(Date.now());
  };
  
  // Fix Vimeo URLs if they're manage links
  const getProperUrl = (url) => {
    if (url.includes('vimeo.com/manage/videos/')) {
      // Extract ID and format correctly
      const parts = url.split('/');
      const id = parts[parts.indexOf('videos') + 1];
      return `https://vimeo.com/${id}`;
    }
    // Fix youtu.be short URLs
    if (url.includes('youtu.be/')) {
      const id = url.split('/').pop().split('?')[0];
      return `https://www.youtube.com/watch?v=${id}`;
    }
    return url;
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
        className="aspect-video relative rounded-lg overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
        key={activeExpertise} // Key changes to trigger animation on expertise change
        onClick={handleClick}
      >
        {isClient && (
          <div className="w-full h-full relative">
            {featuredVideo.thumbnail ? (
              <Image 
                src={featuredVideo.thumbnail} 
                alt={featuredVideo.title}
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full relative">
                <ReactPlayer
                  url={getProperUrl(featuredVideo.url)}
                  width="100%"
                  height="100%"
                  light={true}
                  key={key}
                  playing={false}
                  controls={false}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, rel: 0 }
                    },
                    vimeo: {
                      playerOptions: { background: true }
                    }
                  }}
                />
                {/* This overlay hides the play button */}
                <div className="absolute inset-0 bg-transparent z-10" style={{ pointerEvents: 'none' }}></div>
              </div>
            )}
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 backdrop-blur-sm">
              <h3 className="text-sm md:text-base font-medium text-white">{featuredVideo.title}</h3>
            </div>
            
            {/* Hide YouTube controls */}
            <style jsx>{`
              :global(.react-player__preview-overlay),
              :global(.react-player__shadow),
              :global(.react-player__play-icon) {
                display: none !important;
              }
            `}</style>
          </div>
        )}
        
        {/* Modal for playing the video */}
        {modalOpen && (
          <Modal onClose={handleCloseModal}>
            <div className="w-full h-full bg-black rounded-lg overflow-hidden">
              <ReactPlayer
                url={getProperUrl(featuredVideo.url)}
                width="100%"
                height="100%"
                controls={true}
                playing={true}
                key={key}
                config={{
                  youtube: {
                    playerVars: { 
                      showinfo: 0,
                      rel: 0,
                      modestbranding: 1,
                      disablekb: 1,
                      controls: 1,
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      autohide: 1
                    }
                  }
                }}
              />
            </div>
          </Modal>
        )}
      </motion.div>
    </div>
  );
}
