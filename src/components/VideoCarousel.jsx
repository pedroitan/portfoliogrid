'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useExpertise } from '../context/ExpertiseContext';
import Image from 'next/image';

export default function VideoCarousel() {
  const [isClient, setIsClient] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(Date.now()); // Add a key to force re-render of ReactPlayer
  const videoRef = useRef(null);
  
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Featured video URLs for each expertise area
  const expertiseOptions = [
    { id: 'director', label: 'Direção Criativa' },
    { id: 'music', label: 'Música' },
    { id: 'engineer', label: 'Tecnologia' }
  ];
  
  const featuredVideos = {
    director: {
      url: "https://www.youtube.com/watch?v=gxTSuCtx510", // IZA Uma Vida é pouco pra te amar
      thumbnail: "/images/thumbnails/iza-uma-vida.jpg", // Add a placeholder image path
      title: "IZA - Uma Vida É Pouco"
    },
    music: {
      url: "https://www.youtube.com/watch?v=VCAQVijLiR4", // FARM Oxe
      thumbnail: "/images/thumbnails/farm-oxe.jpg", // Will download this thumbnail
      title: "FARM Oxe - Trilha Sonora & Produção Musical"
    },
    engineer: {
      url: "https://www.youtube.com/watch?v=WaB3ys94Yj4", // Ludmilla NBA Halftime Show Making Off
      thumbnail: "/images/thumbnails/ludmilla-making-off.jpg", // Will download this thumbnail
      title: "Ludmilla NBA Halftime Show - Making Off"
    }
  };
  
  // Current featured video based on active expertise
  const featuredVideo = featuredVideos[activeExpertise];
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const showIndicators = () => {
    setShowControls(true);
  };

  const hideIndicators = () => {
    setShowControls(false);
  };
  
  const handleVideoClick = () => {
    setIsPlaying(true);
  };
  
  const handleVideoReset = () => {
    setIsPlaying(false);
    setKey(Date.now()); // Force ReactPlayer to re-render and reset its state
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
  
  const isYoutubeVideo = featuredVideo.url && (
    featuredVideo.url.includes('youtube.com') || 
    featuredVideo.url.includes('youtu.be')
  );
  // Extract YouTube video ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    if (url.includes('youtu.be')) {
      return url.split('/').pop().split('?')[0];
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const youtubeId = isYoutubeVideo ? getYoutubeId(featuredVideo.url) : null;

  return (
    <div 
      className="max-w-6xl mx-auto mt-2 mb-6 px-4 relative"
      onMouseEnter={showIndicators}
      onMouseLeave={hideIndicators}
      ref={videoRef}
    >
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
        className="aspect-video w-full md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative rounded-lg overflow-hidden shadow-2xl border border-white/10"
        key={activeExpertise} // Key changes to trigger animation on expertise change
      >
        {isClient && (
          <div className="w-full h-full relative">
            {!isPlaying ? (
              <div 
                className="w-full h-full relative cursor-pointer"
                onClick={handleVideoClick}
              >
                <style jsx global>{`
                  .react-player__preview-overlay,
                  .react-player__shadow,
                  .react-player__play-icon {
                    display: none !important;
                  }
                `}</style>
                {featuredVideo.thumbnail ? (
                  <Image 
                    src={featuredVideo.thumbnail} 
                    alt={featuredVideo.title}
                    fill
                    priority={true}
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    {isYoutubeVideo && youtubeId ? (
                      <div
                        className="absolute top-0 left-0 w-full h-full overflow-hidden"
                        style={{ background: 'red' }} // DEBUG: red background
                      >
                        <div style={{position: 'absolute', top: 0, left: 0, zIndex: 10000, color: 'white', background: 'black', padding: 8, fontWeight: 'bold'}}>YOUTUBE IFRAME ACTIVE</div>
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1&controls=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="YouTube video player"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            height: '100vh',
                            width: '177.78vh', // 16/9 aspect ratio, based on height
                            transform: 'translateX(-50%)',
                            border: '5px solid lime', // DEBUG: visible border
                            background: 'black',
                            pointerEvents: 'auto',
                            display: 'block',
                            zIndex: 9999,
                            maxWidth: 'none',
                            minWidth: 'none',
                            minHeight: 'none',
                          }}
                        />
                      </div>
                    ) : (
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
                    )}
                  </div>
                )}
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1"></div>
                  </div>
                </div>
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 backdrop-blur-sm">
                  <h3 className="text-sm md:text-base font-medium text-white">{featuredVideo.title}</h3>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                {isYoutubeVideo && youtubeId ? (
                  <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden"
                    style={{ background: 'red' }} // DEBUG: red background
                  >
                    <div style={{position: 'absolute', top: 0, left: 0, zIndex: 10000, color: 'white', background: 'black', padding: 8, fontWeight: 'bold'}}>YOUTUBE IFRAME ACTIVE</div>
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        height: '100vh',
                        width: '177.78vh', // 16/9 aspect ratio, based on height
                        transform: 'translateX(-50%)',
                        border: '5px solid lime', // DEBUG: visible border
                        background: 'black',
                        pointerEvents: 'auto',
                        display: 'block',
                        zIndex: 9999,
                        maxWidth: 'none',
                        minWidth: 'none',
                        minHeight: 'none',
                      }}
                    />
                  </div>
                ) : (
                  <ReactPlayer
                    url={getProperUrl(featuredVideo.url)}
                    width="177.78vw" // 16/9 * 100vw
                    height="100vh"
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
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      transform: 'translateX(-50%)',
                      border: 'none',
                      background: 'black',
                      pointerEvents: 'auto',
                    }}
                    onEnded={handleVideoReset}
                  />
                )}
                
                {/* Close button */}
                <button 
                  onClick={handleVideoReset}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center"
                  aria-label="Close video"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 4L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
