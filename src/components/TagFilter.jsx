'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TagFilter({ tags, activeTag, setActiveTag }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-3 my-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-center flex-wrap gap-3 bg-black/20 border border-white/10 backdrop-blur-lg py-2 px-3 rounded-full shadow-lg">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative px-4 py-1.5 md:px-6 md:py-2 text-[0.7rem] md:text-[0.85rem] rounded-full transition-colors ${
          activeTag === 'all' ? 'text-white' : 'text-white/80 hover:text-white'
        }`}
        onClick={() => setActiveTag('all')}
      >
        All
        {activeTag === 'all' && mounted && (
          <motion.div
            layoutId="tag-lamp"
            className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
              <div className="absolute w-12 h-6 bg-white/30 rounded-full blur-md -top-2 -left-2" />
              <div className="absolute w-8 h-6 bg-white/30 rounded-full blur-md -top-1" />
              <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm top-0 left-2" />
            </div>
          </motion.div>
        )}
      </motion.button>
      
      {tags.map(tag => (
        <motion.button
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-1.5 md:px-6 md:py-2 text-[0.7rem] md:text-[0.85rem] rounded-full transition-colors ${
            activeTag === tag ? 'text-white' : 'text-white/80 hover:text-white'
          }`}
          onClick={() => setActiveTag(tag)}
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
          {activeTag === tag && mounted && (
            <motion.div
              layoutId="tag-lamp"
              className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                <div className="absolute w-12 h-6 bg-white/30 rounded-full blur-md -top-2 -left-2" />
                <div className="absolute w-8 h-6 bg-white/30 rounded-full blur-md -top-1" />
                <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm top-0 left-2" />
              </div>
            </motion.div>
          )}
        </motion.button>
      ))}
      </div>
    </div>
  );
}
