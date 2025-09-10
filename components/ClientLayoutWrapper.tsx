"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import ChatbotWidget from '@/components/ChatbotWidget';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButtons(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      
      <AnimatePresence>
        {showFloatingButtons && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="floating-action-buttons"
          >
            <ChatbotWidget />
            <div className="group relative">
                <Link 
                  href="https://wa.me/12232375309" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Contact on WhatsApp"
                  className="floating-action-button whatsapp-button"
                >
                    <FaWhatsapp size={32} />
                </Link>
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-[var(--color-carbon)] text-[var(--color-brilliant-white)] text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ¿Hablamos de tu proyecto?
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <ExitIntentPopup />
    </>
  );
}