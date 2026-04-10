'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useExpertise } from '../context/ExpertiseContext';


export default function ExpertiseDescriptions() {
  const { activeExpertise } = useExpertise();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const t = useTranslations('bio');

  return (
    <div className="px-4 mb-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-fit mx-auto bg-black/20 border border-white/10 backdrop-blur-sm rounded-2xl px-5 py-3"
      >
        <p className="text-white/70 text-xs md:text-xl leading-relaxed mb-6 font-satoshi whitespace-pre-line text-center">
          {t('poetic_p1')}
        </p>
        <p className="text-white/50 text-xs md:text-xl leading-relaxed font-satoshi whitespace-pre-line text-center">
          {t('poetic_p2')}
        </p>
      </motion.div>
    </div>
  );
}
