'use client';

import { motion } from 'framer-motion';

export default function TagFilter({ tags, activeTag, setActiveTag }) {
  return (
    <div className="flex flex-wrap justify-center gap-1 my-4 max-w-3xl mx-auto">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-2 py-1 text-xs rounded-full transition-colors ${
          activeTag === 'all' ? 'bg-white text-black' : 'bg-black text-white border border-white'
        }`}
        onClick={() => setActiveTag('all')}
      >
        All
      </motion.button>
      
      {tags.map(tag => (
        <motion.button
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            activeTag === tag ? 'bg-white text-black' : 'bg-black text-white border border-white'
          }`}
          onClick={() => setActiveTag(tag)}
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </motion.button>
      ))}
    </div>
  );
}
