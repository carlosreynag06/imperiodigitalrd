"use client"; 

import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
// CORRECTED: Importing a single new icon for replacement
import { FiTarget } from "react-icons/fi";

// CORRECTED: Only the 'psychology' icon is replaced. 'custom' and 'automation' are restored to their original state.
const DifferentiatorIcon = ({ type }: { type: 'psychology' | 'custom' | 'automation' }) => {
     const icons = {
         psychology: (
            <FiTarget className="w-8 h-8" />
         ),
         custom: (
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21.25 12.75L12 18.5l-9.25-5.75L12 7l9.25 5.75z" />
                 <path d="M21.25 12.75v3.5L12 22l-9.25-5.75v-3.5" />
                 <path d="M12 2L2.75 7.75l9.25 5.75L21.25 7.75 12 2z" />
             </svg>
         ),
         automation: (
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <circle cx="12" cy="12" r="3" />
                 <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
             </svg>
         ),
     };
     return <div className="mb-6 text-[var(--color-sunstone-orange)]">{icons[type]}</div>;
};

export default function ServiciosPage() {
    const [openFAQAccordion, setOpenFAQAccordion] = useState<number | null>(null);

    const services = [
        {
            title: "Diseño Web de Alta Conversión",
            description: "Creamos tu centro de operaciones digital desde cero. Cada sitio es una obra de arte y una herramienta de precisión, diseñada a la medida de tus objetivos comerciales",
            bulletPoints: [
                "Combinamos psicología del consumidor, diseño de clase mundial y tecnología de punta",
                "Aseguramos que tu presencia online sea tan poderosa como tu visión",
            ],
            cta: { text: "Solicitar Cotización", href: "/contacto" },
        },
        {
            title: "Sistemas de Automatización de Marketing y Ventas",
            description: "Este es el <strong class='font-bold text-[var(--color-sunstone-orange)]'>motor de tu crecimiento</strong>. Integramos <strong class='font-bold'>sistemas inteligentes</strong> que capturan la información de tus visitantes. Les damos seguimiento con secuencias de comunicación persuasivas, entregándote <strong class='font-bold text-white'>prospectos listos para comprar</strong>. Libera tu tiempo y escala tu capacidad de venta, ya que funciona en piloto automático 24/7",
            bulletPoints: [],
            cta: { text: "Explorar Sistemas de Automatización", href: "/contacto" },
        },
        {
            title: "Integración de Herramientas Inteligentes",
            description: "Integramos tu sitio web con tecnología inteligente que potencia resultados: analítica avanzada, automatización de procesos y asistentes virtuales que multiplican el alcance de tu negocio",
            bulletPoints: [
                "Dormirás tranquilo sabiendo que tu inversión está protegida",
                "Tu plataforma estará siempre vigente y trabajando para ti",
            ],
            cta: { text: "Descubrir Integraciones Inteligentes", href: "/contacto" },
        },
    ];

    const faqs = [
        {
            question: "¿Qué diferencia a Imperio Digital RD de otras agencias web?",
            answer: "Nos diferenciamos por nuestro enfoque en ingeniería de conversión, la aplicación de psicología del comportamiento en cada diseño, la automatización de procesos de venta, y la creación de ecosistemas digitales que son activos de tu negocio, no solo 'páginas web'. No usamos plantillas; cada solución es 100% a medida.",
        },
        {
            question: "¿Necesito un sitio web si ya tengo una fuerte presencia en redes sociales?",
            answer: "Absolutamente. Las redes sociales son terreno 'alquilado'. Tu sitio web es tu propiedad, tu centro de operaciones donde controlas la narrativa, los datos de tus clientes y la experiencia de venta sin depender de algoritmos o cambios de plataforma. Es donde construyes tu verdadero activo digital.",
        },
        {
            question: "¿Cuánto tiempo toma construir un sitio web de alta conversión?",
            answer: "El tiempo varía según la complejidad y las funcionalidades requeridas. Sin embargo, nuestro proceso es eficiente y transparente. Tras un diagnóstico inicial, te proporcionaremos un cronograma detallado y un presupuesto claro. Priorizamos la calidad y la estrategia sobre la velocidad sin compromiso.",
        },
        {
            question: "¿Ofrecen opciones de pago a plazos?",
            answer: "No ofrecemos planes de pago a plazos. Consideramos nuestros servicios una inversión estratégica de alto retorno. El valor que generamos a largo plazo justifica la inversión inicial, y nos enfocamos en clientes que entienden el impacto de construir un activo digital robusto para su negocio.",
        },
        {
            question: "¿Cómo aseguran que el sitio web genere ventas y no solo visitas?",
            answer: "Integramos principios de psicología del consumidor y copywriting persuasivo en cada etapa del diseño. Implementamos llamados a la acción estratégicos, formularios de captura de prospectos inteligentes, embudos de venta automatizados y análisis de datos constante para optimizar la conversión de visitantes en clientes. Sin embargo, aunque aplicamos las mejores prácticas probadas para maximizar resultados, no garantizamos ventas específicas, ya que el rendimiento también depende de factores como el mercado, la competencia, la oferta del negocio y su estrategia general.",
        },
        {
            question: "¿El precio del plan incluye hosting y dominio?",
            answer: "Sí, todos nuestros planes incluyen un año de hosting y registro de dominio sin costo adicional. Después del primer año, usted podrá renovarlos directamente o con nuestra asistencia. Nos encargamos de toda la configuración inicial para asegurar el mejor rendimiento de su nuevo activo digital.",
        },
        {
            question: "¿Cuál es el proceso de pago para un proyecto?",
            answer: "Para iniciar un proyecto, se requiere un porcentaje inicial de la inversión total, el cual se discute y acuerda durante la fase de consultoría. No ofrecemos planes de pago a plazos, ya que consideramos este un activo de alto retorno que justifica una inversión única y estratégica.",
        },
    ];
     
    const useAnimatedSection = (threshold = 0.2) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, amount: threshold });
        const variants = {
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, staggerChildren: 0.2 } },
        };
        return { ref, variants, controls: isInView ? "visible" : "hidden" };
    };

    const heroSection = useAnimatedSection(0.5);
    const service1Section = useAnimatedSection(0.3);
    const service2Section = useAnimatedSection(0.3);
    const service3Section = useAnimatedSection(0.3);
    const differenceSection = useAnimatedSection();
    const pricingSection = useAnimatedSection();
    const faqSection = useAnimatedSection();

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    };
     
    const differentiators = [
         { title: "Psicología de la Conversión", desc: ["Cada elemento, desde el color de un botón hasta la estructura de una frase, está basado en principios de la psicología del comportamiento para maximizar la conversión."], icon: "psychology" as const, image: null },
         { title: "Diseño A la Medida", desc: ["Rechazamos las plantillas. Tu negocio es único y tu plataforma digital también debe serlo.", "Creamos soluciones a la medida para un rendimiento y una estética inigualables."], icon: "custom" as const, image: null },
         { title: "Automatización Estratégica", desc: ["Construimos sistemas, no solo sitios.", "Nuestro enfoque se centra en crear un motor que trabaje para ti, generando oportunidades y ventas de forma autónoma."], icon: "automation" as const, image: null }
     ];

    return (
        <main>
            <motion.section ref={heroSection.ref} variants={heroSection.variants} initial="hidden" animate={heroSection.controls} className="min-h-screen flex items-center justify-center text-center bg-[var(--color-cloud-gray)] pt-24">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h1 variants={itemVariants} className="font-playfair text-5xl md:text-7xl font-bold leading-tight text-[var(--color-carbon)]">Nuestros Servicios <span className="text-[var(--color-sunstone-orange)]">Inteligentes</span></motion.h1>
                    <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-[var(--color-carbon)]/80 leading-relaxed">Vamos más allá de la estética. Creamos ecosistemas digitales automatizados, estratégicamente diseñados para impulsar el crecimiento de tu negocio</motion.p>
                </div>
            </motion.section>
            
            <motion.section ref={service1Section.ref} variants={service1Section.variants} initial="hidden" animate={service1Section.controls} className="min-h-screen flex items-center bg-[var(--color-feather-gray)] py-20">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={itemVariants} className="md:order-2 relative aspect-square rounded-lg shadow-lg overflow-hidden">
                        <Image src="/diseño-web.png" alt="Diseño Web de Alta Conversión" layout="fill" objectFit="cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="md:order-1">
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--color-carbon)] leading-tight mb-6">{services[0].title}</h2>
                        <p className="text-lg text-[var(--color-carbon)]/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: services[0].description }} />
                        <Link href={services[0].cta.href} className="inline-block mt-8 bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity transform hover:scale-105">{services[0].cta.text}</Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section ref={service2Section.ref} variants={service2Section.variants} initial="hidden" animate={service2Section.controls} className="min-h-screen flex items-center bg-[var(--color-carbon)] text-white py-20">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={itemVariants} className="relative aspect-square rounded-lg shadow-lg overflow-hidden">
                        <Image src="/funnel.png" alt="Sistemas de Automatización de Marketing y Ventas" layout="fill" objectFit="cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--color-brilliant-white)] leading-tight mb-6">{services[1].title}</h2>
                        <p className="text-lg text-white/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: services[1].description }} />
                        <Link href={services[1].cta.href} className="inline-block mt-8 bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity transform hover:scale-105">{services[1].cta.text}</Link>
                    </motion.div>
                </div>
            </motion.section>
            
            <motion.section ref={service3Section.ref} variants={service3Section.variants} initial="hidden" animate={service3Section.controls} className="min-h-screen flex items-center bg-[var(--color-light-tan)] py-20">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={itemVariants} className="md:order-2 relative aspect-square rounded-lg shadow-lg overflow-hidden">
                        <Image src="/automation.png" alt="Integración de Herramientas Inteligentes" layout="fill" objectFit="cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="md:order-1">
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--color-carbon)] leading-tight mb-6">{services[2].title}</h2>
                        <p className="text-lg text-[var(--color-carbon)]/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: services[2].description }} />
                        <Link href={services[2].cta.href} className="inline-block mt-8 bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity transform hover:scale-105">{services[2].cta.text}</Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section ref={differenceSection.ref} variants={differenceSection.variants} initial="hidden" animate={differenceSection.controls} className="py-20 md:py-28 bg-[var(--color-cloud-gray)]">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <motion.h2 variants={itemVariants} className="font-playfair text-3xl md:text-4xl font-bold mb-4">No Solo Creamos Páginas Web</motion.h2>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-3xl mx-auto text-[var(--color-carbon)]/80 mb-16">Creamos Activos Rentables</motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {differentiators.map((item, index) => (
                            <motion.div key={index} variants={itemVariants} className="bg-[var(--color-brilliant-white)] p-8 rounded-xl shadow-md border border-[var(--color-feather-gray)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-left">
                                {item.icon && <DifferentiatorIcon type={item.icon} />}
                                <h3 className="font-playfair text-2xl font-semibold mb-4">{item.title}</h3>
                                <div className="text-[var(--color-carbon)]/70 leading-relaxed flex-grow">
                                    {item.desc.map((paragraph, pIndex) => (
                                        <p key={pIndex} className={pIndex < item.desc.length - 1 ? 'mb-4' : ''}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section ref={pricingSection.ref} variants={pricingSection.variants} initial="hidden" animate={pricingSection.controls} className="py-20 md:py-28 text-center bg-[var(--color-feather-gray)]">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h2 variants={itemVariants} className="font-playfair text-3xl md:text-4xl font-bold leading-tight">Una Inversión Inteligente en tu Activo Más Valioso</motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-[var(--color-carbon)]/80 leading-relaxed mb-8">Nuestra estructura de precios es transparente y está diseñada para reflejar el inmenso valor y <strong className="font-bold text-[var(--color-carbon)]">el retorno de inversión que nuestros sistemas generan</strong>. Esto no es un gasto, es la construcción de tu imperio digital.</motion.p>
                    <motion.div variants={itemVariants}>
                        <Link href="/precios" className="inline-block bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-10 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity transform hover:scale-105">Ver Precios y Planes</Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section ref={faqSection.ref} variants={faqSection.variants} initial="hidden" animate={faqSection.controls} className="py-20 md:py-28 bg-[var(--color-light-tan)]">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h2 variants={itemVariants} className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">Preguntas Frecuentes</motion.h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div key={index} variants={itemVariants} className="bg-white rounded-lg shadow-sm border border-[var(--color-carbon)]/5 overflow-hidden">
                                <button onClick={() => setOpenFAQAccordion(openFAQAccordion === index ? null : index)} className="w-full flex justify-between items-center p-6 text-left font-playfair text-xl font-semibold cursor-pointer">
                                    <span>{faq.question}</span>
                                    <motion.div animate={{ rotate: openFAQAccordion === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        <FaChevronDown className="text-[var(--color-sunstone-orange)]" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFAQAccordion === index && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: easeInOut }} className="overflow-hidden">
                                            <div className="px-6 pb-6 pt-2 text-[var(--color-carbon)]/80 leading-relaxed border-t border-[var(--color-carbon)]/10">{faq.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </main>
    );
}
