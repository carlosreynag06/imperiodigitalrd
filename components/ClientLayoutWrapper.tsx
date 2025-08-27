// components/ClientLayoutWrapper.tsx
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
  const [canTriggerExitPopup, setCanTriggerExitPopup] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButtons(true);
      } else {
        setShowFloatingButtons(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExitPopupDismiss = () => {
    setCanTriggerExitPopup(false);
  };

  return (
    <>
      <Header />
      {children}
      <Footer />

      <AnimatePresence>
        {showFloatingButtons && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-6"
          >
            <ChatbotWidget />
            <div className="group">
              <Link
                href="https://wa.me/12232375309?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20consulta%20sobre%20mi%20proyecto%20digital."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <motion.div
                  className="bg-cyber-flare text-imperial-void rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-4xl cursor-pointer"
                  whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(0, 229, 255, 0.7)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' as const }}
                >
                  <FaWhatsapp className="relative z-10" />
                </motion.div>
              </Link>
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-4 py-2 bg-atmospheric-gray text-stark-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                ¿Hablamos de tu proyecto?
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {canTriggerExitPopup && <ExitIntentPopup />}
    </>
  );
}