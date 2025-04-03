'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from './Modal';

export default function VideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
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
      <div className="w-full h-full overflow-hidden">
        {video.thumbnailImage ? (
          <div className="w-full h-full relative">
            <Image 
              src={`/images/thumbnails/${video.thumbnailImage}`} 
              alt={video.title}
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <ReactPlayer
              url={getProperUrl(video.url)}
              width="100%"
              height="100%"
              light={true}
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
          className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-4 text-white backdrop-blur-[0px]"
        >
          <h3 className="text-xl font-bold mb-2">{video.title}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {video.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/20 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
      {/* Modal for displaying the video */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        videoUrl={video.url} 
      />
    </motion.div>
  );
}
