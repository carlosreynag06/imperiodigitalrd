// app/sobre-nosotros/page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function AboutUsPage() {
  const ourValuesRef = useRef(null);
  const ourValuesInView = useInView(ourValuesRef, { once: true, amount: 0.3 });
  const finalCtaRef = useRef(null);
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.3 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  const heroTextVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const cardParentVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main>
      <section className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="relative w-full min-h-screen bg-imperial-void px-4 pt-[72px] md:pt-0 flex">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-xl mx-auto py-20 md:py-32 flex flex-col items-start justify-center relative z-10 text-left"
          >
            <motion.h1
              variants={heroTextVariants}
              className="font-playfair text-cyber-flare text-[48px] md:text-[72px] font-bold leading-tight mb-6"
            >
              Nuestra Historia
            </motion.h1>
            <motion.p
              variants={heroTextVariants}
              transition={{ delay: 0.2 }}
              className="font-inter text-lg md:text-xl text-stark-white/90 leading-relaxed"
            >
              Nacimos de una visión clara: empoderar a los negocios <br /> dominicanos para que dominen en la era digital
            </motion.p>
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-atmospheric-gray to-transparent z-0"></div>
        </div>

        <div className="relative w-full min-h-screen bg-atmospheric-gray flex">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardParentVariants}
            className="w-full max-w-md mx-auto p-8 md:p-12 flex flex-col justify-center gap-8 relative z-10"
          >
            <motion.div variants={cardVariants} className="w-full bg-imperial-void p-5 rounded-xl shadow-xl border-2 border-cyber-flare/30 flex flex-col">
              <h3 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">Misión</h3>
              <p className="font-inter text-stark-white/90 text-base leading-relaxed flex-grow">
                Empoderar a los negocios dominicanos, proporcionándoles las herramientas tecnológicas y estratégicas.
              </p>
            </motion.div>
            <motion.div variants={cardVariants} className="w-full bg-imperial-void p-5 rounded-xl shadow-xl border-2 border-liquid-gold/30 flex flex-col">
              <h3 className="font-playfair text-liquid-gold text-3xl font-bold mb-4">Visión</h3>
              <p className="font-inter text-stark-white/90 text-base leading-relaxed flex-grow">
                Convertirnos en el socio digital de referencia en el país, reconocido por nuestra innovación y excelencia.
              </p>
            </motion.div>
            <motion.div variants={cardVariants} className="w-full bg-imperial-void p-5 rounded-xl shadow-xl border-2 border-atmospheric-gray/30 flex flex-col">
              <h3 className="font-playfair text-stark-white text-3xl font-bold mb-4">Nuestro &apos;Por Qué&apos;</h3>
              <p className="font-inter text-stark-white/90 text-base leading-relaxed flex-grow">
                Nacimos de la frustración de ver a negocios con gran potencial depender de plataformas que no controlaban.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={ourValuesRef}
          initial="hidden"
          animate={ourValuesInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12">Nuestra Filosofía de Trabajo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-imperial-void p-8 rounded-xl shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare">✅</div>
              <h3 className="font-playfair text-liquid-gold text-2xl font-semibold mb-3">Resultados, no Excusas</h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed">
                Tu éxito es nuestra única métrica. Nos enfocamos obsesivamente en entregar resultados tangibles y medibles.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-imperial-void p-8 rounded-xl shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare">💡</div>
              <h3 className="font-playfair text-liquid-gold text-2xl font-semibold mb-3">Transparencia Radical</h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed">
                Desde el precio hasta el proceso, operamos con una claridad absoluta. Sabrás siempre qué esperar.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-imperial-void p-8 rounded-xl shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare">💎</div>
              <h3 className="font-playfair text-liquid-gold text-2xl font-semibold mb-3">Excelencia como Estándar</h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed">
                No negociamos la calidad. Cada línea de código, cada palabra y cada diseño se ejecutan al más alto nivel.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={finalCtaRef}
          initial="hidden"
          animate={finalCtaInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold leading-tight mb-6">Hablemos de tu Proyecto</h2>
          <p className="font-inter text-stark-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Detrás de la tecnología y la estrategia, hay personas. Me encantaría conocer tu visión y explorar cómo podemos materializarla juntos.
          </p>
          <Link href="/contacto">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
              className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
            >
              Agendar Consulta Gratis
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
