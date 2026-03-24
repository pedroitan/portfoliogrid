'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useExpertise } from '../context/ExpertiseContext';
import PortfolioButton from './PortfolioButton';

export default function ExpertiseDescriptions() {
  const { activeExpertise } = useExpertise();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const t = useTranslations('expertise');

  const descriptions = {
    director: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 text-white/90 text-sm md:text-base max-w-3xl mx-auto">
        <p className="text-justify leading-relaxed">{t('director.p1')}</p>
        <p className="text-justify leading-relaxed">{t('director.p2')}</p>
      </div>
    ),
    music: (
      <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
        {t.rich('music', { bold: (chunks) => <strong>{chunks}</strong> })}
      </p>
    ),
    engineer: (
      <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
        {t.rich('engineer', { bold: (chunks) => <strong>{chunks}</strong> })}
      </p>
    ),
  };

  return (
    <div className="px-4 mb-6">
      <motion.div 
        key={activeExpertise}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
        className="bg-black/20 backdrop-blur-sm rounded-lg p-4"
      >
        {mounted && descriptions[activeExpertise]}
        
        <div className="flex justify-center mt-6">
          <PortfolioButton />
        </div>
      </motion.div>
    </div>
  );
}
