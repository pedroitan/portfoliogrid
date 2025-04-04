'use client';

import { useState, useEffect, useRef } from 'react';
import { useExpertise } from '../context/ExpertiseContext';

export default function ExpertiseSwipeContainer({ children }) {
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef(null);
  
  const { activeExpertise, setActiveExpertise } = useExpertise();
  
  // Define the expertise options
  const expertiseOptions = [
    { id: 'director', label: 'Film Director' },
    { id: 'music', label: 'Music Producer' },
    { id: 'engineer', label: 'Audiovisual Engineer' }
  ];
  
  // Listen for hash changes (in case navbar is clicked directly)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && expertiseOptions.some(option => option.id === hash)) {
        setActiveExpertise(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [expertiseOptions, setActiveExpertise]);
  
  const getCurrentIndex = () => {
    return expertiseOptions.findIndex(option => option.id === activeExpertise);
  };
  
  const handleNextExpertise = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % expertiseOptions.length;
    const nextExpertise = expertiseOptions[nextIndex].id;
    setActiveExpertise(nextExpertise);
    window.location.hash = nextExpertise;
  };
  
  const handlePrevExpertise = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = (currentIndex - 1 + expertiseOptions.length) % expertiseOptions.length;
    const prevExpertise = expertiseOptions[prevIndex].id;
    setActiveExpertise(prevExpertise);
    window.location.hash = prevExpertise;
  };
  
  const handleTouchStart = (e) => {
    // Only activate swiping on mobile devices
    if (window.innerWidth >= 768) return;
    
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };
  
  const handleTouchMove = (e) => {
    if (!startX || !isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    // Always prevent default during swipe to ensure smooth transitions
    // and to prevent unwanted scrolling behavior
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleTouchEnd = (e) => {
    if (!startX || !isSwiping) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // Calculate vertical movement to detect if it's a scroll attempt
    const endY = e.changedTouches[0].clientY;
    const verticalDiff = Math.abs(startY - endY);
    
    // Only handle as swipe if horizontal movement is significantly more than vertical
    if (Math.abs(diff) > 50 && Math.abs(diff) > verticalDiff * 2) {
      if (diff > 0) {
        // Swipe left, go to next
        handleNextExpertise();
      } else {
        // Swipe right, go to previous
        handlePrevExpertise();
      }
    }
    
    setStartX(null);
    setStartY(null);
    setIsSwiping(false);
  };
  
  // Only apply touch handlers on mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div 
      className="swipe-area w-full flex flex-col"
      ref={containerRef}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
