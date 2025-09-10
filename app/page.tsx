"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Variants } from "framer-motion";
// Importing professional icons to replace emojis
import { FiMonitor, FiZap, FiGrid } from "react-icons/fi";


/**
 * CORRECTED: Replaced emoji icons with clean, professional SVG icons from React Icons.
 * This provides a more sophisticated and on-brand look.
 */
const ServicePillarIcon = ({
  type,
  className = "",
}: {
  type: "web" | "marketing" | "ecosystem";
  className?: string;
}) => {
    const iconMap = {
        web: <FiMonitor className="w-8 h-8" />,
        marketing: <FiZap className="w-8 h-8" />,
        ecosystem: <FiGrid className="w-8 h-8" />,
    };

    return (
        <div className={`mb-4 ${className}`}>
            <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-feather-gray)] text-[var(--color-sunstone-orange)]"
            >
                {iconMap[type]}
            </div>
        </div>
    );
};

type Step =
    | { n: number; title: string; desc: string; descTop?: never; descBottom?: never }
    | { n: number; title: string; desc?: never; descTop: string; descBottom: string };

export default function Home() {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
    const featuredCaseStudyRef = useRef(null);
    const featuredCaseStudyInView = useInView(featuredCaseStudyRef, { once: true, amount: 0.4 });
    const finalCtaRef = useRef(null);
    const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.3 });
    const socialProofRef = useRef(null);
    const socialProofInView = useInView(socialProofRef, { once: true, amount: 0.3 });
    const problemSolutionRef = useRef(null);
    const problemSolutionInView = useInView(problemSolutionRef, { once: true, amount: 0.3 });
    const howItWorksRef = useRef(null);
    const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 });
    const servicePillarsRef = useRef(null);
    const servicePillarsInView = useInView(servicePillarsRef, { once: true, amount: 0.4 });

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1, when: "beforeChildren" } },
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const steps: Step[] = [
        {
            n: 1,
            title: "Diagnóstico y Arquitectura",
            descTop: "Analizamos tu mercado para diseñar la estrategia",
            descBottom: "y la arquitectura digital perfecta para tu negocio.",
        },
        {
            n: 2,
            title: "Diseño y Automatización",
            desc:
                "Creamos una experiencia visual de alto impacto e integramos los sistemas que convertirán visitantes en clientes de forma automática.",
        },
        {
            n: 3,
            title: "Optimización y Lanzamiento",
            descTop: "Perfeccionamos los últimos detalles, y lanzamos tu plataforma al mundo,",
            descBottom: "lista para crear un impacto inmediato.",
        },
    ];
    const [active, setActive] = useState(0);
    const pct = ((active + 1) / 3) * 100;

    return (
        <main>
            {/* HERO */}
            <section
                ref={heroRef}
                className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-feather-gray)] text-[var(--color-carbon)]"
            >
                <video autoPlay muted loop playsInline className="absolute w-full h-full object-cover opacity-30" poster="/hero-placeholder.jpg">
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="font-playfair text-5xl md:text-7xl font-bold leading-tight"
                    >
                        Páginas Web
                        <br />
                        Inteligentes
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-6 text-xl md:text-2xl font-inter leading-relaxed"
                    >
                        Diseñamos páginas web que generan clientes en automático,<br />un sistema inteligente que trabaja para ti 24/7
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/contacto"
                            className="inline-block bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-[0_0_15px_var(--color-sunstone-orange)] transition-all"
                        >
                            Agendar Consulta Estratégica
                        </Link>
                        <Link
                            href="/servicios"
                            className="inline-block border-2 border-[var(--color-sunstone-orange)] text-[var(--color-carbon)] px-6 py-3 rounded-full font-bold text-base hover:bg-[var(--color-sunstone-orange)] hover:text-[var(--color-brilliant-white)] transition-all"
                        >
                            Ver Servicios
                        </Link>
                    </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-feather-gray)]/70" />
            </section>

            {/* SOCIAL PROOF */}
            <section ref={socialProofRef} className="py-20 bg-[var(--color-light-tan)]">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.h3
                        initial="hidden"
                        animate={socialProofInView ? "visible" : "hidden"}
                        variants={itemVariants}
                        className="text-center font-inter text-[var(--color-carbon)]/60 text-sm md:text-base uppercase tracking-wider mb-10"
                    >
                        Marcas que Confían en Nuestra Ingeniería Digital
                    </motion.h3>
                    <motion.div initial={{ opacity: 0 }} animate={socialProofInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="marquee-wrapper overflow-hidden">
                        <div className="marquee-content flex space-x-12 animate-marquee">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="relative h-12 w-24 flex-shrink-0">
                                    <Image src={`/client-logo-${i + 1}.svg`} alt={`Client Logo ${i + 1}`} fill style={{ objectFit: "contain", filter: "invert(20%)" }} />
                                </div>
                            ))}
                        </div>
                        <div className="marquee-content flex space-x-12 animate-marquee" aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="relative h-12 w-24 flex-shrink-0">
                                    <Image src={`/client-logo-${i + 1}.svg`} alt={`Client Logo ${i + 1}`} fill style={{ objectFit: "contain", filter: "invert(20%)" }} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PROBLEM / SOLUTION */}
            <section ref={problemSolutionRef} className="relative py-32 bg-[var(--color-feather-gray)] overflow-hidden">
                <div className="absolute inset-0 bg-[var(--color-sunstone-orange)]/5" />
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <motion.div initial="hidden" animate={problemSolutionInView ? "visible" : "hidden"} variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants} className="order-2 md:order-1">
                            <h2 className="font-playfair text-4xl font-bold leading-tight text-[var(--color-carbon)]">
                                No Alquiles tu Presencia Digital: <span className="text-[var(--color-carbon)]">Sé el Dueño</span>
                            </h2>
                            <h3 className="font-playfair text-2xl text-[var(--color-sunstone-orange)] mt-4">¿Y si mañana te cierran las redes sociales?</h3>
                            <p className="font-inter text-lg text-[var(--color-carbon)]/70 mt-6 leading-relaxed">
                                Depender solo de las redes sociales pone en riesgo todo lo que has construido. Tus clientes y tu futuro digital están a merced de plataformas que pueden cambiar sus reglas en cualquier momento.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="order-1 md:order-2 bg-[var(--color-brilliant-white)] p-8 rounded-xl shadow-lg border border-[var(--color-feather-gray)]">
                            <h3 className="font-playfair text-3xl font-bold text-[var(--color-sunstone-orange)]">Toma el Control de tu Presencia Digital</h3>
                            <p className="font-inter text-lg text-[var(--color-carbon)]/90 mt-6 leading-relaxed">
                                <span className="font-bold">Tu sitio web es el único activo digital</span> que te pertenece por completo. Es el motor de tu negocio, diseñado para atraer nuevos clientes y generar ventas de forma automatizada.
                            </p>
                            <p className="font-inter text-lg text-[var(--color-carbon)]/90 mt-4 leading-relaxed">
                                <span className="font-bold">Es la pieza fundamental</span> para construir una presencia digital sólida donde las reglas y las políticas las decides tú.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* HOW IT WORKS — CONIC RING NAVIGATOR */}
            <section ref={howItWorksRef} className="py-28 px-4 bg-[var(--color-light-tan)]">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <motion.h2
                            initial="hidden"
                            animate={howItWorksInView ? "visible" : "hidden"}
                            variants={itemVariants}
                            className="font-playfair text-4xl font-bold mb-6"
                        >
                            Tu Sistema de Crecimiento
                            <br />
                            en 3 Pasos Simples
                        </motion.h2>
                        <div className="mt-10 md:mt-12 flex gap-4">
                            {steps.map((s, i) => (
                                <button
                                    key={s.n}
                                    onClick={() => setActive(i)}
                                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${i === active
                                            ? "bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] border-[var(--color-sunstone-orange)]"
                                            : "bg-[var(--color-brilliant-white)] border-[var(--color-feather-gray)] text-[var(--color-carbon)]"
                                        }`}
                                >
                                    {s.n}
                                </button>
                            ))}
                        </div>
                        <div className="mt-6">
                            <h3 className="font-playfair text-3xl font-semibold">{steps[active].title}</h3>
                            {"descTop" in steps[active] ? (
                                <p className="font-inter text-[var(--color-carbon)]/80 mt-2">
                                    {(steps[active] as Extract<Step, { descTop: string }>).descTop}
                                    <br />
                                    {(steps[active] as Extract<Step, { descBottom: string }>).descBottom}
                                </p>
                            ) : (
                                <p className="font-inter text-[var(--color-carbon)]/80 mt-2">
                                    {(steps[active] as Extract<Step, { desc: string }>).desc}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <div
                            className="relative w-72 h-72 rounded-full"
                            style={{
                                background: `conic-gradient(var(--color-sunstone-orange) ${pct}%, rgba(0,0,0,0.08) 0)`,
                            }}
                        >
                            <div className="absolute inset-6 bg-[var(--color-brilliant-white)] rounded-full border border-[var(--color-feather-gray)]" />
                            {[0, 1, 2].map((i) => {
                                const angle = (-90 + i * 120) * (Math.PI / 180);
                                const r = 144;
                                const x = 144 + (r - 8) * Math.cos(angle);
                                const y = 144 + (r - 8) * Math.sin(angle);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border font-bold ${active === i
                                                ? "bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] border-[var(--color-sunstone-orange)]"
                                                : "bg-[var(--color-brilliant-white)] text-[var(--color-carbon)] border-[var(--color-feather-gray)]"
                                            }`}
                                        style={{ left: x, top: y }}
                                        aria-label={`Paso ${i + 1}`}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            })}
                            <div className="absolute inset-14 rounded-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-xs uppercase tracking-widest text-[var(--color-carbon)]/60">Paso</div>
                                    <div className="font-playfair text-6xl text-[var(--color-sunstone-orange)] leading-none">{active + 1}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE PILLARS */}
            <section ref={servicePillarsRef} className="py-32 px-4 bg-[var(--color-feather-gray)]">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial="hidden" animate={servicePillarsInView ? "visible" : "hidden"} variants={itemVariants} className="text-center mb-12">
                        <h2 className="font-playfair text-4xl font-bold">Ingeniería Digital para un Crecimiento Sostenible</h2>
                    </motion.div>
                    <motion.div initial="hidden" animate={servicePillarsInView ? "visible" : "hidden"} variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Diseño Web de Alta Conversión",
                                desc: "Más que una página lujosa, una máquina de ventas. Creamos experiencias visuales que guían al usuario hacia la acción.",
                                type: "web" as const,
                            },
                            {
                                title: "Sistemas de Marketing Automatizado",
                                desc: "Implementamos la inteligencia que captura, nutre y convierte prospectos mientras tú te enfocas en tu negocio.",
                                type: "marketing" as const,
                            },
                            {
                                title: "Ecosistemas Digitales Integrados",
                                desc: "Aseguramos que tu sitio web, redes sociales y otras plataformas trabajen en perfecta armonía para maximizar tus resultados.",
                                type: "ecosystem" as const,
                            },
                        ].map((pillar, index) => (
                            <motion.div key={index} variants={itemVariants} className="bg-[var(--color-brilliant-white)] p-8 rounded-xl border border-transparent hover:border-[var(--color-feather-gray)] hover:shadow-lg transition-all text-center">
                                <ServicePillarIcon type={pillar.type} />
                                <h3 className="font-playfair text-2xl font-semibold mb-3">{pillar.title}</h3>
                                <p className="font-inter text-[var(--color-carbon)]/70 leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FEATURED CASE STUDY */}
            <section ref={featuredCaseStudyRef} className="py-20 md:py-28 px-4 bg-[var(--color-feather-gray)]">
                <motion.div
                    initial="hidden"
                    animate={featuredCaseStudyInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
                >
                    <motion.div variants={itemVariants} className="w-full relative aspect-square md:aspect-[1/1] rounded-lg overflow-hidden shadow-2xl">
                        <Image src="/casestudy-juan.jpg" alt="Caso de estudio: Juan de los Santos" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <h3 className="font-sans text-sm uppercase tracking-widest text-[var(--color-sunstone-orange)] font-bold">Caso Destacado</h3>
                        <h2 className="font-serif text-[var(--color-carbon)] text-3xl md:text-4xl font-bold leading-tight mt-4">"El sistema se paga solo."</h2>
                        <p className="font-sans text-lg mt-6 text-[var(--color-carbon)]/80 leading-relaxed">"Pasamos de recibir prospectos ocasionales a un flujo constante y calificado cada semana."</p>
                        <div className="font-sans text-lg mt-8 space-y-3 border-l-4 border-[var(--color-sunstone-orange)] pl-6">
                            <p className="font-semibold text-[var(--color-carbon)]">+300% Prospectos Calificados</p>
                            <p className="font-semibold text-[var(--color-carbon)]">95% Procesos Automatizados</p>
                        </div>
                        <p className="font-sans text-[var(--color-carbon)]/60 text-base mt-8">Juan de los Santos, Fundador de Terapias Físicas Kairo</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* FINAL CTA */}
            <section ref={finalCtaRef} className="bg-[var(--color-carbon)] text-[var(--color-brilliant-white)] py-20 md:py-32">
                <motion.div initial="hidden" animate={finalCtaInView ? "visible" : "hidden"} variants={sectionVariants} className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[var(--color-brilliant-white)]/80">¿Listo para Construir el Futuro de tu Negocio?</h2>
                    <p className="font-sans text-lg md:text-xl text-[var(--color-brilliant-white)]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Un imperio no se improvisa: se diseña con estrategia, precisión y tecnología que trabaja por ti las 24 horas
                    </p>
                    <Link href="/contacto" className="inline-block bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-10 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity text-lg">
                        Agendar Consulta Estratégica
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}