'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoCard from './VideoCard';
import TagFilter from './TagFilter';
import { videos, allTags } from '../data/videos';

const PAGE_SIZE = 24;

export default function VideoGrid() {
  const [activeTag, setActiveTag] = useState('todos');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const validVideos = videos.filter(
    video => video.url && video.url.trim() !== '' && !video.url.includes('instagram.com')
  );

  const filteredVideos = activeTag === 'todos'
    ? validVideos
    : validVideos.filter(video => video.tags && Array.isArray(video.tags) && video.tags.includes(activeTag));

  const visibleVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  const handleTagChange = (tag) => {
    setActiveTag(tag);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="portfolio" className="py-4 min-h-screen w-full scroll-mt-16 relative z-10">
      <div className="w-full">
        <TagFilter tags={allTags} activeTag={activeTag} setActiveTag={handleTagChange} />

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0"
        >
          <AnimatePresence>
            {visibleVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} priority={index < 12} />
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="flex justify-center py-10">
            <button
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              className="px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white/60 border border-white/20 rounded-full hover:text-white hover:border-white/50 transition-all duration-300"
            >
              + {filteredVideos.length - visibleCount} vídeos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
