'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

export default function FeaturedVideo() {
  const [isClient, setIsClient] = useState(false);
  
  // Featured video URL - can be replaced with any of Itan's videos
  const featuredVideoUrl = "https://www.youtube.com/watch?v=X_gNdioT-1I";
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="aspect-video relative rounded-lg overflow-hidden shadow-2xl border border-white/10"
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
                  rel: 0
                }
              }
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
