'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Bio() {
  const t = useTranslations('bio');

  return (
    <section id="bio" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6 md:px-16 lg:px-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6 font-satoshi">
            {t('tagline')}
          </p>
          <h2 className="text-5xl md:text-7xl font-bold font-satoshi tracking-tight lowercase mb-10">
            {t('title')}
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 font-satoshi">
            {t('p1')}
          </p>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-satoshi">
            {t('p2')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
