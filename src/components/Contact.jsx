'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="mb-8">
            Interested in collaborating or have a project in mind? Get in touch.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Reach Out</h3>
              <p className="mb-4">Email: contact@itan.work</p>
              <p className="mb-4">Phone: +55 (21) 99999-9999</p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="text-white hover:text-gray-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Work Inquiries</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full p-2 bg-black/50 border border-gray-700 rounded focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-2 bg-black/50 border border-gray-700 rounded focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Message" 
                    rows="4"
                    className="w-full p-2 bg-black/50 border border-gray-700 rounded focus:outline-none focus:border-white"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition"
                  type="button"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
