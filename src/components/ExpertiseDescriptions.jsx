'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useExpertise } from '../context/ExpertiseContext';
import PortfolioButton from './PortfolioButton';

export default function ExpertiseDescriptions() {
  const { activeExpertise } = useExpertise();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const descriptions = {
    director: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 text-white/90 text-sm md:text-base max-w-3xl mx-auto">
        <p className="text-justify leading-relaxed">
          Tudo parte de uma ideia 💡 Do desejo de comunicar um sentimento. Daqueles que não tem palavras que alcancem. Só a magia de um espetáculo pode traduzir!
        </p>
        <p className="text-justify leading-relaxed">
          Só a expressão de um artista pode sintetizar! Na verdade muitos artistas, porque nada se faz sozinho! A Música como fio condutor, Arte e Tecnologia amplificando mensagens!
        </p>
      </div>
    ),
    music: (
      <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
        Na função de <strong>Produtor Musical</strong>, Itan utiliza sua profunda compreensão de teoria musical e tecnologia de áudio para 
        criar composições originais e trilhas sonoras envolventes. Trabalhando nos gêneros de música eletrônica, hip-hop e experimental, 
        ele constrói paisagens sonoras que complementam perfeitamente o elemento visual de cada projeto audiovisual.
      </p>
    ),
    engineer: (
      <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
        Como <strong>Engenheiro Audiovisual</strong>, Itan domina os aspectos técnicos da produção, desde captação de imagem e som até 
        pós-produção avançada. Sua expertise em sistemas de câmera, iluminação, fluxos de trabalho e tecnologia digital garante que 
        cada projeto alcance o mais alto padrão técnico sem comprometer a visão criativa original.
      </p>
    )
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
