'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoCard from './VideoCard';
import TagFilter from './TagFilter';
import { videos, allTags } from '../data/videos';

export default function VideoGrid() {
  const [activeTag, setActiveTag] = useState('todos');
  
  const filteredVideos = activeTag === 'todos'
    ? videos
    : videos.filter(video => video.tags && Array.isArray(video.tags) && video.tags.includes(activeTag));
  
  return (
    <section id="portfolio" className="py-4 bg-black min-h-screen w-full">
      <div className="w-full">
        <TagFilter tags={allTags} activeTag={activeTag} setActiveTag={setActiveTag} />
        
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0"
        >
          <AnimatePresence>
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
