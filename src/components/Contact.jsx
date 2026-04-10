'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const subject = encodeURIComponent(`Contato via portfólio — ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contato@pedroitan.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-20 text-white relative z-10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-black/60 backdrop-blur-sm rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
          <p className="mb-8">{t('subtitle')}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">{t('infoTitle')}</h3>
              <p className="mb-4">Email: contato@pedroitan.com</p>
              <p className="mb-4">+55 21 9 8841-9463</p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="https://instagram.com/pedroitan" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="mailto:contato@pedroitan.com" className="text-white hover:text-gray-300 transition" aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">{t('formTitle')}</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('namePlaceholder')}
                    required
                    className="w-full p-2 bg-black/50 border border-gray-700 rounded focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    required
                    className="w-full p-2 bg-black/50 border border-gray-700 rounded focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    rows="4"
                    required
                    className="w-full p-2 bg-black/50 border border-gray-700 rounded focus:outline-none focus:border-white"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition disabled:opacity-50"
                  type="submit"
                >
                  {sent ? t('sentFeedback') : t('submit')}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
