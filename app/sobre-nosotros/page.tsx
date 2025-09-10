// app/sobre-nosotros/page.tsx

"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiTarget, FiEye, FiZap } from "react-icons/fi";

export default function AboutUsPage() {
    const useAnimatedSection = (threshold = 0.3) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, amount: threshold });
        return { ref, isInView };
    };

    const heroSection = useAnimatedSection(0.5);
    const coreValuesSection = useAnimatedSection();
    const philosophySection = useAnimatedSection(0.3);
    const finalCtaSection = useAnimatedSection();

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut" as const,
                staggerChildren: 0.2
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        },
    };

    return (
        <main className="bg-[var(--color-cloud-gray)] text-[var(--color-carbon)]">

            {/* SECTION 1: HERO */}
            <section ref={heroSection.ref} className="w-full min-h-[75vh] lg:min-h-[60vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-[var(--color-cloud-gray)] to-[var(--color-feather-gray)] pt-[72px] pb-12">
                <motion.div
                    initial="hidden"
                    animate={heroSection.isInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-4xl"
                >
                    <motion.h1 variants={itemVariants} className="font-playfair text-[48px] md:text-[80px] font-bold leading-tight">
                        Nuestra <span className="text-[var(--color-sunstone-orange)]">Historia</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-[var(--color-carbon)]/80 leading-relaxed mt-6 max-w-2xl mx-auto">
                        Nacimos de una visión clara: empoderar a los negocios para que dominen en la era digital
                    </motion.p>
                </motion.div>
            </section>

            {/* SECTION 2: MISION, VISION & 'POR QUÉ' */}
            <section ref={coreValuesSection.ref} className="w-full py-20 md:py-28 px-4 bg-[var(--color-light-tan)]">
                <motion.div
                    initial="hidden"
                    animate={coreValuesSection.isInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10"
                >
                    <motion.div variants={itemVariants} className="border-t-4 border-[var(--color-sunstone-orange)] pt-6">
                        <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Misión</h3>
                        <p className="font-inter text-[var(--color-carbon)]/80 text-lg leading-relaxed">
                            Empoderar a los negocios dominicanos, proporcionándoles las herramientas tecnológicas y estratégicas.
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="border-t-4 border-[var(--color-sunstone-orange)] pt-6">
                        <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Visión</h3>
                        <p className="font-inter text-[var(--color-carbon)]/80 text-lg leading-relaxed">
                            Convertirnos en el socio digital de referencia en el país, reconocido por nuestra innovación y excelencia.
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="border-t-4 border-[var(--color-sunstone-orange)] pt-6">
                        <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Nuestro &apos;Por Qué&apos;</h3>
                        <p className="font-inter text-[var(--color-carbon)]/80 text-lg leading-relaxed">
                            Nacimos de la frustración de ver a negocios con gran potencial depender de plataformas que no controlaban.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* SECTION 3: FILOSOFÍA DE TRABAJO */}
            <section ref={philosophySection.ref} className="w-full bg-[var(--color-feather-gray)] py-20 md:py-28 px-4">
                <motion.div
                    initial="hidden"
                    animate={philosophySection.isInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-6xl mx-auto"
                >
                    <motion.h2 variants={itemVariants} className="font-playfair text-center text-4xl md:text-5xl font-bold mb-16">
                        Nuestra Filosofía de Trabajo
                    </motion.h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div variants={itemVariants} className="relative w-full aspect-square max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/planning.png"
                                alt="A professional Dominican male working on a strategic plan in a modern office"
                                fill
                                sizes="(max-width: 1024px) 80vw, 40vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-10">
                            <div className="flex items-start gap-4">
                                <FiTarget className="text-3xl text-[var(--color-sunstone-orange)] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-playfair text-2xl font-semibold mb-2">Enfoque Estratégico</h3>
                                    <p className="font-inter text-[var(--color-carbon)]/70 leading-relaxed">
                                        Cada decisión que tomamos está basada en una estrategia clara, diseñada para construir un activo digital robusto y alcanzar tus objetivos comerciales.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiEye className="text-3xl text-[var(--color-sunstone-orange)] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-playfair text-2xl font-semibold mb-2">Transparencia Radical</h3>
                                    <p className="font-inter text-[var(--color-carbon)]/70 leading-relaxed">
                                        Desde el precio hasta el proceso, operamos con una claridad absoluta. Sabrás siempre qué esperar.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiZap className="text-3xl text-[var(--color-sunstone-orange)] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-playfair text-2xl font-semibold mb-2">Excelencia como Estándar</h3>
                                    <p className="font-inter text-[var(--color-carbon)]/70 leading-relaxed">
                                        No negociamos la calidad. Cada línea de código, cada palabra y cada diseño se ejecutan al más alto nivel.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 4: FINAL CTA (COLOR CORRECTED) */}
            <section ref={finalCtaSection.ref} className="w-full bg-[var(--color-carbon)] text-[var(--color-brilliant-white)] py-20 md:py-28 px-4">
                <motion.div
                    initial="hidden"
                    animate={finalCtaSection.isInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h2 variants={itemVariants} className="font-playfair text-4xl md:text-5xl font-bold leading-tight mb-6 text-[var(--color-brilliant-white)]/80"> {/* CORRECTED COLOR */}
                        Hablemos de tu Proyecto
                    </motion.h2>
                    <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-[var(--color-brilliant-white)]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Detrás de la tecnología y la estrategia, hay personas. Me encantaría conocer tu visión y explorar cómo podemos materializarla juntos.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link href="/contacto" className="inline-block bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-10 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity transform hover:scale-105">
                            Agendar Consulta Gratis
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}