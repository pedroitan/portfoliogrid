'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from './Modal';

// Import ReactPlayer dynamically to prevent hydration errors
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState(Date.now()); // Add a key to force re-render of ReactPlayer
  
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
  
  const handleClick = () => {
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    // Force ReactPlayer to re-render and reset its state
    setKey(Date.now());
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="aspect-video relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="w-full h-full overflow-hidden relative bg-black">
        {video.thumbnailImage ? (
          <div className="w-full h-full relative">
            <Image 
              src={`/images/thumbnails/${video.thumbnailImage}`} 
              alt={video.title}
              fill
              priority={true}
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="w-full h-full relative" style={{overflow: 'hidden'}}>
            <ReactPlayer
              url={getProperUrl(video.url)}
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                border: 'none',
                background: 'black',
                pointerEvents: 'auto',
                display: 'block',
                zIndex: 1,
                maxWidth: '100%',
                minWidth: 0,
                minHeight: 0,
              }}
              light={true}
              key={key} // Add key to force re-render
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
            <style jsx>{`
              :global(.react-player__preview-overlay),
              :global(.react-player__shadow),
              :global(.react-player__play-icon) {
                display: none !important;
              }
            `}</style>
          </div>
        )}
      </div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 flex flex-col justify-end items-start p-2 text-white backdrop-blur-[0px]"
        >
          <h3 className="text-[0.78rem] md:text-[0.95rem] font-bold mb-0.5">{video.title}</h3>
          {video.description && <p className="text-[0.66rem] md:text-[0.8rem] opacity-80">{video.description}</p>}
        </motion.div>
      )}
      {/* Modal for displaying the video */}
      <Modal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        videoUrl={video.url} 
      />
    </motion.div>
  );
}
