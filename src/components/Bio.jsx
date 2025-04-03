'use client';

import { motion } from 'framer-motion';

export default function Bio() {
  return (
    <section id="bio" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">ITAN</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Creative Director with expertise in Film Direction, Music Production, and Audiovisual Engineering.
              </p>
              <p className="mb-4">
                Specializing in creating immersive visual experiences that blend artistic vision with technical excellence.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-medium mb-2">Areas of Expertise:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Film Direction</li>
                  <li>Music Production</li>
                  <li>Audiovisual Engineering</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 bg-gray-800 rounded-full overflow-hidden flex items-center justify-center">
                <img 
                  src="/images/profile.jpg" 
                  alt="Itan" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div className="flex items-center justify-center h-full w-full text-4xl font-bold">ITAN</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
