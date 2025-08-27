// app/not-found.tsx
"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export default function NotFoundPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-imperial-void text-stark-white text-center px-4 pt-[72px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto py-16 md:py-24"
      >
        <motion.h1
          variants={itemVariants}
          className="font-playfair text-[100px] md:text-[180px] font-bold leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyber-flare to-blue-300"
        >
          404
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="font-playfair text-stark-white text-[36px] md:text-[56px] font-bold leading-tight mb-6"
        >
          Página No Encontrada
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="font-inter text-lg md:text-xl text-stark-white/90 leading-relaxed mb-10"
        >
          Parece que te has desviado del camino. La página que buscas no existe o ha sido movida.
        </motion.p>
        <Link href="/">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
            className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
          >
            Volver a la Página de Inicio
          </motion.button>
        </Link>
        <Link href="/contacto">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.2)" }}
            className="mt-4 md:mt-0 md:ml-6 border-2 border-cyber-flare text-cyber-flare bg-transparent px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-custom-bezier cursor-pointer"
          >
            Contactar Soporte
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
