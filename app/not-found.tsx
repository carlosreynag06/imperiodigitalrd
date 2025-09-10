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
    <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-cloud-gray)] text-[var(--color-carbon)] text-center px-4 pt-[72px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto py-16 md:py-24"
      >
        <motion.h1
          variants={itemVariants}
          className="font-playfair text-[100px] md:text-[180px] font-bold leading-none mb-4 text-[var(--color-sunstone-orange)]"
        >
          404
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="font-playfair text-[36px] md:text-[56px] font-bold leading-tight mb-6"
        >
          Página No Encontrada
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="font-inter text-lg md:text-xl text-[var(--color-carbon)]/80 leading-relaxed mb-10"
        >
          Parece que te has desviado del camino. La página que buscas no existe o ha sido movida.
        </motion.p>
        <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
            <Link href="/">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition-opacity"
                >
                    Volver a la Página de Inicio
                </motion.button>
            </Link>
            <Link href="/contacto">
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="border-2 border-[var(--color-sunstone-orange)] text-[var(--color-carbon)] bg-transparent px-6 py-3 rounded-full font-semibold hover:bg-[var(--color-sunstone-orange)] hover:text-[var(--color-brilliant-white)] transition-colors"
                >
                    Contactar Soporte
                </motion.button>
            </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}