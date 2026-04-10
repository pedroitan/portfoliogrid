'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const INITIAL_LIMIT = 12;

const TAG_DISPLAY_PT = {
  'todos': 'Todos',
  'direção audiovisual': 'Direção Criativa',
  'direção criativa': 'Direção Criativa',
  'música': 'Música',
  'produção musical': 'Produção Musical',
  'direção técnica': 'Direção Técnica',
  'masterização': 'Masterização',
  'edição vídeo': 'Edição Vídeo',
  'edição de vídeo': 'Edição Vídeo',
  'projeção mapeada': 'Projeção Mapeada',
  'captação ao vivo': 'Captação Ao Vivo',
  'direção de transmissão': 'Direção de Transmissão',
  'making off': 'Making Off',
  'live': 'Live',
  'moda': 'Moda',
  'trilha sonora': 'Trilha Sonora',
  'tecnologia': 'Tecnologia',
  'talkshow': 'Talkshow',
  'futebol': 'Futebol',
  'performance ao vivo': 'Performance Ao Vivo',
};

const TAG_DISPLAY_EN = {
  'todos': 'All',
  'direção audiovisual': 'Creative Direction',
  'direção criativa': 'Creative Direction',
  'música': 'Music',
  'produção musical': 'Music Production',
  'direção técnica': 'Technical Direction',
  'masterização': 'Mastering',
  'edição vídeo': 'Video Editing',
  'edição de vídeo': 'Video Editing',
  'projeção mapeada': 'Projection Mapping',
  'captação ao vivo': 'Live Capture',
  'direção de transmissão': 'Broadcast Direction',
  'making off': 'Making Of',
  'live': 'Live',
  'moda': 'Fashion',
  'trilha sonora': 'Soundtrack',
  'tecnologia': 'Technology',
  'talkshow': 'Talkshow',
  'futebol': 'Football',
  'performance ao vivo': 'Live Performance',
};

export default function TagFilter({ tags, activeTag, setActiveTag }) {
  const locale = useLocale();
  const TAG_DISPLAY = locale === 'en' ? TAG_DISPLAY_EN : TAG_DISPLAY_PT;
  const displayTag = (tag) => TAG_DISPLAY[tag.toLowerCase()] ?? tag.replace(/\b\w/g, c => c.toUpperCase());
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
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
  const mobileTags = isMobile ? getDisplayTags(tags, activeTag) : tags;
  const displayTags = showAll ? mobileTags : getDisplayTags(mobileTags, activeTag).slice(0, INITIAL_LIMIT);
  const hasMore = mobileTags.length > INITIAL_LIMIT;
  
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
          className={`relative px-2 py-1 md:px-3 md:py-1 text-[0.65rem] md:text-[0.75rem] font-bold rounded-full transition-colors font-poppins ${
            activeTag === tag ? 'text-white' : 'text-white/80 hover:text-white'
          }`}
          onClick={() => setActiveTag(tag)}
        >
          {displayTag(tag)}
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
        {hasMore && (
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="px-2 py-1 text-[0.65rem] md:text-[0.75rem] font-bold uppercase text-white/40 hover:text-white/80 transition"
          >
            {showAll ? '−' : `+${mobileTags.length - INITIAL_LIMIT}`}
          </button>
        )}
      </div>
    </div>
  );
}
