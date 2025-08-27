// app/page.tsx
"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const socialProofRef = useRef(null);
  const socialProofInView = useInView(socialProofRef, { once: true, amount: 0.3 });
  const problemSolutionRef = useRef(null);
  const problemSolutionInView = useInView(problemSolutionRef, { once: true, amount: 0.4 });
  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const servicePillarsRef = useRef(null);
  const servicePillarsInView = useInView(servicePillarsRef, { once: true, amount: 0.3 });
  const featuredCaseStudyRef = useRef(null);
  const featuredCaseStudyInView = useInView(featuredCaseStudyRef, { once: true, amount: 0.4 });
  const finalCtaRef = useRef(null);
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.3 });
  // Respect users who prefer reduced motion
  const prefersReducedMotion = useReducedMotion();

  const textUnveilVariants: Variants = {
    hidden: { opacity: 0, y: 30, clipPath: "inset(100% 0 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0)",
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const staggerChildren: Variants = {
    visible: { transition: { staggerChildren: 0.1 } },
    hidden: {},
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const problemSolutionContainerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const problemSolutionItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  // Reusable focus ring for a11y
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-flare/60 focus-visible:ring-offset-2 focus-visible:ring-offset-imperial-void";

  return (
    <main>
      <section className="relative w-full min-h-screen bg-hero-static-final flex flex-col justify-center items-center overflow-hidden text-center z-10">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0.25 }}
              animate={
                prefersReducedMotion
                  ? { scale: 1, opacity: 0.25 }
                  : { scale: [0.8, 1.1, 0.8], opacity: [0, 0.5, 0] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.6, ease: "easeOut" }
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
              className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyber-flare/20 to-imperial-void/10"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0.2 }}
              animate={
                prefersReducedMotion
                  ? { scale: 1, opacity: 0.2 }
                  : { scale: [0.8, 1.1, 0.8], opacity: [0, 0.5, 0] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.6, ease: "easeOut" }
                  : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }
              className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-atmospheric-gray/20 to-imperial-void/10"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0.15 }}
              animate={
                prefersReducedMotion
                  ? { scale: 1, opacity: 0.15 }
                  : { scale: [0.8, 1.1, 0.8], opacity: [0, 0.5, 0] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.6, ease: "easeOut" }
                  : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }
              }
              className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-300/10 to-imperial-void/10"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 pt-[72px] md:py-32 flex flex-col items-center justify-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={textUnveilVariants}
            className="font-playfair text-[48px] md:text-[72px] font-bold leading-tight mb-6"
          >
            <span className="text-stark-white block">Páginas Web Inteligentes</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={textUnveilVariants}
            transition={{ delay: 0.4 }}
            className="font-inter text-lg md:text-xl text-stark-white/90 max-w-3xl mb-10 leading-relaxed md:leading-snug"
          >
            Diseñamos páginas web que generan clientes en automático, <br /> un sistema inteligente que trabaja para ti 24/7
          </motion.p>

          <Link href="/contacto">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)", y: -3 }
              }
              className={`min-h-[44px] bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer w-full sm:w-auto ${focusRing}`}
            >
              Agendar Consulta Estratégica
            </motion.button>
          </Link>
        </div>
      </section>

      <motion.section
        ref={socialProofRef}
        initial="hidden"
        animate={socialProofInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="w-full bg-atmospheric-gray py-6 flex flex-col items-center justify-center z-20"
      >
        <h3 className="font-inter text-stark-white/80 text-sm md:text-base uppercase tracking-wider mb-4">
          Marcas que Confían en Nuestra Ingeniería Digital
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-16 max-w-6xl mx-auto px-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <motion.div
              key={num}
              variants={itemVariants}
              className="flex items-center justify-center h-16 w-20 md:h-20 md:w-24 relative"
            >
              <Image
                src={`/client-logo-${num}.svg`}
                alt={`Client Logo ${num}`}
                fill
                sizes="80px"
                style={{ filter: "brightness(0) invert(1) opacity(0.7)", objectFit: "contain" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="w-full bg-atmospheric-gray text-stark-white py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={problemSolutionRef}
          initial="hidden"
          animate={problemSolutionInView ? "visible" : "hidden"}
          variants={problemSolutionContainerVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <motion.div
            variants={problemSolutionItemVariants}
            className="bg-imperial-void/30 border border-atmospheric-gray/50 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-[url('/subtle-noise.png')] bg-repeat opacity-10"></div>
            <div className="relative z-10 flex-grow space-y-4 md:space-y-6">
              <h2 className="font-playfair text-[32px] md:text-[44px] font-bold leading-tight">
                <span className="block">No Alquiles tu Presencia</span>
                <span className="block">
                  Digital: <span className="text-liquid-gold">Sé el Dueño</span>
                </span>
              </h2>
              <h3 className="font-playfair text-cyber-flare text-2xl font-semibold leading-snug">
                ¿Y si mañana te cierran las redes sociales?
              </h3>
              <p className="font-inter text-lg md:text-xl text-stark-white/80 leading-relaxed md:leading-snug">
                Depender solo de las redes sociales pone en riesgo todo lo que has construido.
              </p>
              <p className="font-inter text-lg md:text-xl text-stark-white/80 leading-relaxed md:leading-snug">
                <span className="text-cyber-flare font-bold">Tus clientes y tu futuro digital</span> están a merced de plataformas que pueden cambiar sus reglas en cualquier momento.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={problemSolutionItemVariants}
            whileHover={
              prefersReducedMotion
                ? {}
                : { scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 229, 255, 0.2)", transition: { duration: 0.3 } }
            }
            className="bg-imperial-void backdrop-blur-md border border-liquid-gold/50 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="relative z-10 flex-grow space-y-4 md:space-y-6">
              <h3 className="font-playfair text-cyber-flare text-3xl font-semibold">
                Toma el Control de tu Presencia Digital
              </h3>
              <p className="font-inter text-lg md:text-xl text-stark-white/90 leading-relaxed md:leading-snug">
                <span className="text-liquid-gold font-bold">Tu sitio web es el único activo digital</span> que te pertenece por completo. Es el motor de tu negocio, diseñado para atraer nuevos clientes y generar ventas de forma automatizada.
              </p>
              <p className="font-inter text-lg md:text-xl text-stark-white/90 leading-relaxed md:leading-snug">
                <span className="text-liquid-gold font-bold">Es la pieza fundamental</span> para construir una presencia digital sólida donde las reglas y las políticas las decides tú.
              </p>
            </div>
            <Link href="/servicios">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.2)" }}
                className={`min-h-[44px] border-2 border-cyber-flare text-cyber-flare bg-transparent px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-custom-bezier cursor-pointer relative z-10 w-full sm:w-auto ${focusRing}`}
              >
                Descubre Nuestras Soluciones
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={howItWorksRef}
          initial="hidden"
          animate={howItWorksInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="font-playfair text-[32px] md:text-[44px] font-bold mb-12">
            Tu Sistema de Crecimiento en 3 Pasos Simples
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <motion.div
                className="w-20 h-20 flex items-center justify-center rounded-full bg-cyber-flare/10 mb-6"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { boxShadow: ["0 0 0 0px #00E5FF", "0 0 10px 5px rgba(0, 229, 255, 0)"] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }
              >
                <span className="text-cyber-flare text-4xl">1</span>
              </motion.div>
              <h3 className="font-playfair text-liquid-gold text-2xl font-semibold mb-3">
                Diagnóstico y Arquitectura
              </h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed md:leading-snug text-center">
                Analizamos tus metas y tu mercado para diseñar la estrategia y la arquitectura digital perfecta para tu negocio.
              </p>
            </motion.div>

            <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-1/3 hidden md:block px-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={howItWorksInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="section-separator origin-left"
              />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-1/3 hidden md:block px-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={howItWorksInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="section-separator origin-left"
              />
            </div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <motion.div
                className="w-20 h-20 flex items-center justify-center rounded-full bg-cyber-flare/10 mb-6"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { boxShadow: ["0 0 0 0px #00E5FF", "0 0 10px 5px rgba(0, 229, 255, 0)"] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
                }
              >
                <span className="text-cyber-flare text-4xl">2</span>
              </motion.div>
              <h3 className="font-playfair text-liquid-gold text-2xl font-semibold mb-3">
                Diseño y Automatización
              </h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed md:leading-snug text-center">
                Creamos una experiencia visual de alto impacto e integramos los sistemas que convertirán visitantes en clientes de forma automática.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <motion.div
                className="w-20 h-20 flex items-center justify-center rounded-full bg-cyber-flare/10 mb-6"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { boxShadow: ["0 0 0 0px #00E5FF", "0 0 10px 5px rgba(0, 229, 255, 0)"] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }
                }
              >
                <span className="text-cyber-flare text-4xl">3</span>
              </motion.div>
              <h3 className="font-playfair text-liquid-gold text-2xl font-semibold mb-3">
                Lanzamiento y Optimización
              </h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed md:leading-snug text-center">
                Lanzamos tu plataforma al mundo y monitoreamos su rendimiento para asegurar un crecimiento continuo y un retorno de inversión claro.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="w-full bg-atmospheric-gray text-stark-white py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={servicePillarsRef}
          initial="hidden"
          animate={servicePillarsInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="font-playfair text-[32px] md:text-[44px] font-bold mb-12">
            Ingeniería Digital para un Crecimiento Sostenible
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-imperial-void p-8 rounded-xl shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare">🌐</div>
              <h3 className="font-playfair text-cyber-flare text-2xl font-semibold mb-3">
                Diseño Web de Alta Conversión
              </h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed md:leading-snug text-center">
                Más que una página lujosa, una máquina de ventas. Creamos experiencias visuales que guían al usuario hacia la acción
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-imperial-void p-8 rounded-xl shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare">🧭</div>
              <h3 className="font-playfair text-cyber-flare text-2xl font-semibold mb-3">
                Sistemas de Marketing Automatizado
              </h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed md:leading-snug text-center">
                Implementamos la inteligencia que captura, nutre y convierte prospectos mientras tú te enfocas en tu negocio
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-imperial-void p-8 rounded-xl shadow-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare">🔄</div>
              <h3 className="font-playfair text-cyber-flare text-2xl font-semibold mb-3">
                Ecosistemas Digitales Integrados
              </h3>
              <p className="font-inter text-stark-white/80 text-base leading-relaxed md:leading-snug text-center">
                Aseguramos que tu sitio web, redes sociales y otras plataformas trabajen en perfecta armonía para maximizar tus resultados
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={featuredCaseStudyRef}
          initial="hidden"
          animate={featuredCaseStudyInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          <motion.div
            variants={itemVariants}
            className="w-full md:w-full relative h-[450px] rounded-xl overflow-hidden shadow-2xl bg-atmospheric-gray"
          >
            <Image
              src="/casestudy-juan.jpg"
              alt="Caso de estudio: Juan de los Santos"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col">
            <h2 className="font-playfair text-liquid-gold text-3xl md:text-4xl font-bold leading-tight mb-4 break-words">
              {`"Pasamos de recibir prospectos ocasionales a un flujo constante y calificado cada semana. El sistema se paga solo"`}
            </h2>
            <div className="font-inter text-stark-white/90 text-lg mb-6">
              <p className="font-semibold">+300% Prospectos Calificados</p>
              <p className="font-semibold">95% Procesos Automatizados</p>
            </div>
            <p className="font-inter text-stark-white/70 text-base mb-8">
              Juan de los Santos, Fundador de Terapias Físicas Kairo
            </p>
            <Link href="/casos-de-exito">
              <motion.button
                whileHover={
                  prefersReducedMotion ? {} : { scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }
                }
                className={`min-h-[44px] bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer w-full sm:w-auto ${focusRing}`}
              >
                Ver más Casos de Éxito
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={finalCtaRef}
          initial="hidden"
          animate={finalCtaInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-playfair text-[32px] md:text-[44px] font-bold leading-tight mb-6">
            ¿Listo para Construir el Futuro de tu Negocio?
          </h2>
          <p className="font-inter text-lg md:text-xl text-stark-white/90 max-w-2xl mx-auto mb-10 leading-relaxed md:leading-snug">
            Un imperio no se improvisa: se diseña con estrategia, precisión y tecnología que trabaja por ti las 24 horas
          </p>
          <Link href="/contacto">
            <motion.button
              whileHover={
                prefersReducedMotion ? {} : { scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }
              }
              className={`min-h-[44px] bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer w-full sm:w-auto ${focusRing}`}
            >
              Agendar Consulta Estratégica
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
