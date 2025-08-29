// app/precios/page.tsx
"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import AppointmentForm from "@/components/AppointmentForm";

export default function PricingPage() {
  const pricingTiersRef = useRef(null);
  const pricingTiersInView = useInView(pricingTiersRef, { once: true, amount: 0.3 });
  const investmentJustificationRef = useRef(null);
  const investmentJustificationInView = useInView(investmentJustificationRef, { once: true, amount: 0.3 });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pricingTiers = [
    {
      name: "Presencia Profesional",
      price: "Inversión Única: $24,999",
      features: [
        "Diseño Web de Lujo (5 páginas)",
        "Integración de Formulario de Contacto",
        "Optimización SEO Fundacional",
        "Integración de Google Analytics",
        "Blog Integrado con 2 Artículos Profesionales",
        "Secuencias de Email Automatizadas (3 emails)"
      ],
      mostPopular: false,
      cta: "Agendar Consulta Estratégica"
    },
    {
      name: "Motor de Crecimiento",
      price: "Inversión Única: $39,999",
      features: [
        "Diseño Web Avanzado (10+ páginas)",
        "Sistema de Generación de Clientes Automatizado",
        "Secuencias de Email Automatizadas (7-10 emails)",
        "Blog Integrado con 5 Artículos Profesionales",
        "Chatbot Inteligente 24/7 (opcional – $500/mes adicionales)"
      ],
      mostPopular: true,
      cta: "Agendar Consulta Estratégica"
    },
    {
      name: "Imperio a la Medida",
      price: "Inversión Única: $99,999",
      features: [
        "Estrategia Digital Integral Personalizada",
        "Diseño Web Premium Sin Límite de Páginas",
        "Ecosistema Digital Completamente Automatizado",
        "CRM Personalizado",
        "Desarrollo de Funcionalidades Específicas",
        "Soporte Premium Continuo",
        "Consultoría Estratégica Mensual"
      ],
      mostPopular: false,
      cta: "Agendar Consulta Estratégica"
    }
  ];

  const faqs = [
    {
      question: "¿Estos precios son definitivos o varían",
      answer: "Los precios indicados para los planes 'Presencia Profesional' y 'Motor de Crecimiento' son para configuraciones estándar. Si su proyecto requiere funcionalidades muy específicas o una escala mucho mayor, el plan 'Imperio a la Medida' es personalizable y se cotiza tras un diagnóstico detallado."
    },
    {
      question: "¿Incluye el precio el hosting o el dominio",
      answer: "Sí, para asegurar una experiencia integral, todos nuestros planes incluyen el alojamiento web (hosting) y el registro de su dominio durante el primer año."
    },
    {
      question: "¿Se ofrecen planes de mantenimiento con estos paquetes",
      answer: "Cada plan incluye un período de soporte inicial. Para un crecimiento continuo y tranquilidad a largo plazo, recomendamos nuestros Planes de Mantenimiento y Crecimiento Continuo, los cuales cubren actualizaciones, seguridad, monitoreo y optimizaciones que aseguran la vigencia y rendimiento de su inversión digital."
    },
    {
      question: "¿Cuál es el proceso de pago para un proyecto",
      answer: "Para iniciar un proyecto, se requiere un porcentaje inicial de la inversión total, el cual se discute y acuerda durante la fase de consultoría. El resto se estructura en hitos del proyecto. No ofrecemos planes de pago a plazos, ya que consideramos este un activo de alto retorno que justifica una inversión única y estratégica."
    }
  ];

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <main>
      {/* TOP SECTION now reserves space for sticky header */}
      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden pt-[72px]">
        <motion.div
          ref={pricingTiersRef}
          initial="hidden"
          animate={pricingTiersInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12">Elige el plan que impulsará tu negocio</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 229, 255, 0.2)" }}
                className={`bg-imperial-void p-8 rounded-xl shadow-xl border-2 ${tier.mostPopular ? 'border-liquid-gold' : 'border-atmospheric-gray'} flex flex-col justify-between`}
              >
                <div>
                  {tier.mostPopular && (
                    <div className="text-sm font-semibold text-liquid-gold uppercase mb-3 tracking-wider">
                      Más Popular
                    </div>
                  )}
                  {/* FIXED: removed invalid markdown-style JSX */}
                  <h3 className="font-playfair text-stark-white text-3xl font-bold mb-4">{tier.name}</h3>
                  <p className="font-playfair text-cyber-flare text-4xl font-bold mb-6">{tier.price}</p>
                  <ul className="text-stark-white/90 text-left space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center font-inter text-base">
                        <FaCheckCircle className="text-success-green mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contacto">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
                    className="w-full bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
                  >
                    {tier.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={investmentJustificationRef}
          initial="hidden"
          animate={investmentJustificationInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h2 className="font-playfair text-liquid-gold text-[32px] md:text-[44px] font-bold leading-tight mb-6">
              Más que un Gasto, una Inversión Estratégica en tu Negocio
            </h2>
            <p className="font-inter text-stark-white/90 text-lg md:text-xl leading-relaxed mb-8">
              Un sitio web de baja calidad te cuesta clientes, y la dependencia exclusiva de redes sociales es como vivir en terreno alquilado. <span className="text-cyber-flare">Una inversión estratégica en tu propio activo digital no solo se paga sola</span>, sino que te da el control absoluto sobre el futuro digital de tu negocio.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="w-full">
            <AppointmentForm
              formTitle="¿Y si mañana te cierran las redes sociales?"
              ctaText="Descarga tu Guía estratégica GRATIS"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={faqRef}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-imperial-void rounded-xl shadow-xl border border-atmospheric-gray">
                <button
                  className="w-full flex justify-between items-center p-6 text-left font-playfair text-stark-white text-xl font-semibold cursor-pointer"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  {faq.question}
                  <motion.div
                    animate={{ rotate: openAccordion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-cyber-flare" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" as const }}
                      className="overflow-hidden px-6 pb-6"
                    >
                      <p className="font-inter text-stark-white/80 text-base leading-relaxed pt-4 border-t border-atmospheric-gray">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
