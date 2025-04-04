'use client';

import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, videoUrl }) {
  const modalRef = useRef();
  
  // Fix Vimeo URLs if they're manage links
  const getProperUrl = (url) => {
    if (url.includes('vimeo.com/manage/videos/')) {
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside); // Add touch event support for mobile
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside); // Clean up touch event
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
          onTouchEnd={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div 
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-black overflow-visible"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on the modal from closing it
            onTouchEnd={(e) => e.stopPropagation()} // Also stop touch events from propagating
          >
            <button
              onClick={onClose}
              className="absolute -right-3 -top-3 md:right-0 md:top-0 text-white bg-black/80 rounded-full w-8 h-8 flex items-center justify-center z-20 hover:bg-white hover:text-black transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="w-full h-full">
              <ReactPlayer
                url={getProperUrl(videoUrl)}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
