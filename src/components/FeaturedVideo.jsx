'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { useExpertise } from '../context/ExpertiseContext';

export default function FeaturedVideo() {
  const [isClient, setIsClient] = useState(false);
  const { activeExpertise } = useExpertise();
  
  // Featured video URLs for each expertise area
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
  
  return (
    <div className="max-w-4xl mx-auto mt-2 mb-6 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
