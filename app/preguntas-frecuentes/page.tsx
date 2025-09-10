"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from 'react-icons/fa';

export default function FAQPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const faqSectionRef = useRef(null);
  const faqSectionInView = useInView(faqSectionRef, { once: true, amount: 0.3 });
  const unresolvedQueryRef = useRef(null);
  const unresolvedQueryInView = useInView(unresolvedQueryRef, { once: true, amount: 0.3 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const faqs = [
    {
      question: "¿Qué diferencia a Imperio Digital RD de otras agencias web?",
      answer:
        "Nos diferenciamos por nuestro enfoque en ingeniería de conversión, la aplicación de psicología del comportamiento en cada diseño, la automatización de procesos de venta, y la creación de ecosistemas digitales que son activos de tu negocio, no solo 'páginas web'. No usamos plantillas; cada solución es 100% a medida.",
    },
    {
      question: "¿Necesito un sitio web si ya tengo una fuerte presencia en redes sociales?",
      answer:
        "Absolutamente. Las redes sociales son terreno 'alquilado'. Tu sitio web es tu propiedad, tu centro de operaciones donde controlas la narrativa, los datos de tus clientes y la experiencia de venta sin depender de algoritmos o cambios de plataforma. Es donde construyes tu verdadero activo digital.",
    },
    {
      question: "¿Cuánto tiempo toma construir un sitio web de alta conversión?",
      answer:
        "El tiempo varía según la complejidad y las funcionalidades requeridas. Sin embargo, nuestro proceso es eficiente y transparente. Tras un diagnóstico inicial, te proporcionaremos un cronograma detallado y un presupuesto claro. Priorizamos la calidad y la estrategia sobre la velocidad sin compromiso.",
    },
    {
      question: "¿Ofrecen opciones de pago a plazos?",
      answer:
        "No ofrecemos planes de pago a plazos. Consideramos nuestros servicios una inversión estratégica de alto retorno. El valor que generamos a largo plazo justifica la inversión inicial, y nos enfocamos en clientes que entienden el impacto de construir un activo digital robusto para su negocio.",
    },
    {
      question: "¿Cómo aseguran que el sitio web genere ventas y no solo visitas?",
      answer:
        "Integramos principios de psicología del consumidor y copywriting persuasivo en cada etapa del diseño. Implementamos llamados a la acción estratégicos, formularios de captura de prospectos inteligentes, embudos de venta automatizados y análisis de datos constante para optimizar la conversión de visitantes en clientes.",
    },
    {
      question: "¿Estos precios son definitivos o varían?",
      answer:
        "Los precios indicados para los planes 'Presencia Profesional' y 'Motor de Crecimiento' son para configuraciones estándar. Si su proyecto requiere funcionalidades muy específicas o una escala mucho mayor, el plan 'Imperio a la Medida' es personalizable y se cotiza tras un diagnóstico detallado.",
    },
    {
      question: "¿Incluye el precio el hosting o el dominio?",
      answer:
        "Sí, para asegurar una experiencia integral, todos nuestros planes incluyen el alojamiento web (hosting) y el registro de su dominio durante el primer año.",
    },
    {
      question: "¿Se ofrecen planes de mantenimiento con estos paquetes?",
      answer:
        "Cada plan incluye un período de soporte inicial. Para un crecimiento continuo y tranquilidad a largo plazo, recomendamos nuestros Planes de Mantenimiento y Crecimiento Continuo, los cuales cubren actualizaciones, seguridad, monitoreo y optimizaciones que aseguran la vigencia y rendimiento de su inversión digital.",
    },
    {
      question: "¿Cuál es el proceso de pago para un proyecto?",
      answer:
        "Para iniciar un proyecto, se requiere un porcentaje inicial de la inversión total, el cual se discute y acuerda durante la fase de consultoría. No ofrecemos planes de pago a plazos, ya que consideramos este un activo de alto retorno que justifica una inversión única y estratégica.",
    },
  ];

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-[var(--color-cloud-gray)] text-[var(--color-carbon)]">
      {/* Hero Section */}
      <section className="w-full bg-[var(--color-feather-gray)] pt-32 pb-20 md:pt-40 md:pb-28 text-center px-4">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-playfair text-[48px] md:text-[72px] font-bold leading-tight mb-6">
            Preguntas <span className="text-[var(--color-sunstone-orange)]">Frecuentes</span>
          </h1>
          <p className="font-inter text-lg md:text-xl text-[var(--color-carbon)]/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Encuentra respuestas a tus dudas más comunes sobre nuestros servicios y el mundo digital
          </p>
          <div className="w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-[var(--color-brilliant-white)] border border-[var(--color-feather-gray)] text-[var(--color-carbon)] placeholder-[var(--color-carbon)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-sunstone-orange)] transition-all duration-200"
            />
          </div>
        </motion.div>
      </section>

      {/* FAQ Section (Accordion Questions) */}
      <section className="w-full bg-[var(--color-cloud-gray)] py-20 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={faqSectionRef}
          initial="hidden"
          animate={faqSectionInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto"
        >
          {filteredFaqs.length === 0 && searchTerm !== "" ? (
            <p className="font-inter text-[var(--color-carbon)]/80 text-center text-lg">
              No se encontraron resultados para tu búsqueda.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-[var(--color-brilliant-white)] rounded-xl shadow-sm border border-[var(--color-feather-gray)]"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left font-playfair text-[var(--color-carbon)] text-xl font-semibold cursor-pointer"
                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openAccordion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="text-[var(--color-sunstone-orange)]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openAccordion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-4 border-t border-[var(--color-feather-gray)]">
                          <p className="font-inter text-[var(--color-carbon)]/80 text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Unresolved Query CTA */}
      <section className="w-full text-[var(--color-brilliant-white)] py-20 md:py-28 px-4 overflow-hidden bg-[var(--color-carbon)]">
        <motion.div
          ref={unresolvedQueryRef}
          initial="hidden"
          animate={unresolvedQueryInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="font-playfair text-[32px] md:text-[44px] font-bold leading-tight mb-6 text-[var(--color-brilliant-white)]/90">
            ¿No Encontraste lo que Buscas?
          </motion.h2>
          <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-[var(--color-brilliant-white)]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Si nuestras preguntas frecuentes no han resuelto tu duda, no te preocupes. Estamos aquí para ayudarte personalmente.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/contacto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-10 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity transform"
              >
                Contacta con Nosotros
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
