'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useExpertise } from '../context/ExpertiseContext';

export default function ExpertiseDescriptions() {
  const { activeExpertise } = useExpertise();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const descriptions = {
    director: (
      <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
        Tudo parte de uma ideia 💡<br/>
        Do desejo de comunicar um sentimento<br/>
        Daqueles que não tem palavras que alcancem<br/>
        Só a magia de um espetáculo pode traduzir!<br/>
        Só a expressão de um artista pode sintetizar!<br/>
        Na verdade muitos artistas,<br/>
        Porque nada se faz sozinho!<br/>
        A Música como fio condutor,<br/>
        Arte e Tecnologia amplificando mensagens!
      </p>
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
      </motion.div>
    </div>
  );
}
