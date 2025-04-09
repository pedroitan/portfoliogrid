'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TagFilter({ tags, activeTag, setActiveTag }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Prepare tags for display
  const displayTags = isMobile ? getDisplayTags(tags, activeTag) : tags;
  
  function getDisplayTags(allTags, currentTag) {
    // Always include 'todos' tag and current active tag
    const todosTag = allTags.find(tag => tag === 'todos');
    const priorityTags = [todosTag];
    
    // Add active tag if it's not already included and not 'todos'
    if (currentTag !== 'todos' && currentTag) {
      priorityTags.push(currentTag);
    }
    
    // Fill remaining slots with other tags (up to 12 total)
    const remainingTags = allTags.filter(tag => 
      tag !== 'todos' && tag !== currentTag
    ).slice(0, 12 - priorityTags.length);
    
    return [...priorityTags, ...remainingTags];
  }
  
  return (
    <div className="flex flex-wrap justify-center my-2 overflow-x-auto px-2">
      <div className="max-w-6xl flex items-center justify-center flex-wrap gap-1 bg-black/20 border border-white/10 backdrop-blur-lg py-1 px-2 rounded-lg shadow-lg mx-auto">
      {displayTags.map(tag => (
        <motion.button
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-2 py-1 md:px-3 md:py-1 text-[0.65rem] md:text-[0.75rem] font-bold uppercase rounded-full transition-colors ${
            activeTag === tag ? 'text-white' : 'text-white/80 hover:text-white'
          }`}
          onClick={() => setActiveTag(tag)}
        >
          {tag.toUpperCase()}
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
