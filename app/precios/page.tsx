"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
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

  // ✅ Only edits requested previously:
  // 1) Removed the phrase “Inversión Única” from all prices
  // 2) Removed the orange border from the “Motor de Crecimiento” (mostPopular) card (neutral border instead)
  const pricingTiers = [
    {
      name: "Presencia Profesional",
      price: "$24,999",
      features: [
        "Diseño Web de Lujo (5 páginas)",
        "Integración de Formulario de Contacto",
        "Optimización SEO Fundacional",
        "Integración de Google Analytics",
        "Blog Integrado con 2 Artículos Profesionales",
        "Secuencias de Email Automatizadas (3 emails)",
      ],
      mostPopular: false,
      cta: "Agendar Consulta Estratégica",
    },
    {
      name: "Motor de Crecimiento",
      price: "$39,999",
      features: [
        "Diseño Web Avanzado (10+ páginas)",
        "Sistema de Generación de Clientes Automatizado",
        "Secuencias de Email Automatizadas (7–10 emails)",
        "Blog Integrado con 5 Artículos Profesionales",
        "Chatbot Inteligente 24/7 (opcional • $500/mes adicionales)",
      ],
      mostPopular: true,
      cta: "Agendar Consulta Estratégica",
    },
    {
      name: "Imperio a la Medida",
      price: "$99,999",
      features: [
        "Estrategia Digital Integral Personalizada",
        "Diseño Web Premium Sin Límite de Páginas",
        "Ecosistema Digital Completamente Automatizado",
        "CRM Personalizado",
        "Desarrollo de Funcionalidades Específicas",
        "Soporte Premium Continuo",
        "Consultoría Estratégica Mensual",
      ],
      mostPopular: false,
      cta: "Agendar Consulta Estratégica",
    },
  ] as const;

  const faqs = [
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
        "Para iniciar un proyecto, se requiere un porcentaje inicial de la inversión total, el cual se discute y acuerda durante la fase de consultoría. El resto se estructura en hitos del proyecto. No ofrecemos planes de pago a plazos, ya que consideramos este un activo de alto retorno que justifica una inversión única y estratégica.",
    },
  ] as const;

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <main>
      {/* PRICING (layout/colors preserved) */}
      <section className="w-full bg-[var(--color-cloud-gray)] py-16 md:py-28 px-4 overflow-hidden pt-[72px]">
        <motion.div
          ref={pricingTiersRef}
          initial="hidden"
          animate={pricingTiersInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="font-playfair text-[var(--color-carbon)] text-[32px] md:text-[44px] font-bold mb-12">
            Elige el plan que impulsará tu negocio
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(255, 107, 0, 0.2)" }}
                className={`p-8 rounded-xl shadow-xl border-2 flex flex-col justify-between ${
                  tier.mostPopular
                    // Neutral border (no orange) on the popular/Motor card
                    ? "bg-[var(--color-carbon)] border-[var(--color-feather-gray)]"
                    : "bg-[var(--color-brilliant-white)] border-[var(--color-feather-gray)]"
                }`}
              >
                <div>
                  {tier.mostPopular && (
                    <div className="text-sm font-semibold text-[var(--color-sunstone-orange)] uppercase mb-3 tracking-wider">
                      Más Popular
                    </div>
                  )}

                  <h3
                    className={`font-playfair text-3xl font-bold mb-4 ${
                      tier.mostPopular ? "text-[var(--color-brilliant-white)]" : "text-[var(--color-carbon)]"
                    }`}
                  >
                    {tier.name}
                  </h3>

                  {/* Price size reduced globally (Option 1): text-3xl
                      Colors remain: carbon on light cards, white on dark card */}
                  <p
                    className={`font-playfair text-3xl font-bold mb-6 ${
                      tier.mostPopular
                        ? "text-[var(--color-brilliant-white)]"
                        : "text-[var(--color-carbon)]"
                    }`}
                  >
                    {tier.price}
                  </p>

                  <ul
                    className={`text-left space-y-3 mb-8 ${
                      tier.mostPopular ? "text-[var(--color-brilliant-white)]/80" : "text-[var(--color-carbon)]/80"
                    }`}
                  >
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center font-inter text-base">
                        <FaCheckCircle className="text-[var(--color-sunstone-orange)] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contacto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className={`w-full px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 cursor-pointer ${
                      tier.mostPopular
                        ? "bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)]"
                        : "bg-transparent border-2 border-[var(--color-sunstone-orange)] text-[var(--color-carbon)] hover:bg-[var(--color-sunstone-orange)] hover:text-[var(--color-brilliant-white)]"
                    }`}
                  >
                    {tier.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* INVESTMENT + FORM (unchanged; keeps Brevo mapping inside AppointmentForm) */}
      <section className="w-full text-[var(--color-brilliant-white)] py-16 md:py-28 px-4 overflow-hidden bg-[var(--color-carbon)]">
        <motion.div
          ref={investmentJustificationRef}
          initial="hidden"
          animate={investmentJustificationInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h2 className="font-playfair text-[var(--color-brilliant-white)] text-[32px] md:text-[44px] font-bold leading-tight mb-6">
              Más que un Gasto, una Inversión Estratégica en tu Negocio
            </h2>
            <p className="font-inter text-[var(--color-brilliant-white)]/80 text-lg md:text-xl leading-relaxed">
              Un sitio web de baja calidad te cuesta clientes, y la dependencia exclusiva de redes sociales es como vivir
              en terreno alquilado.
            </p>
            <p className="font-inter text-[var(--color-brilliant-white)]/80 text-lg md:text-xl leading-relaxed mt-4">
              Una inversión estratégica en tu propio activo digital no solo se paga sola, sino que te da el control absoluto
              sobre el futuro digital de tu negocio.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <AppointmentForm formTitle="Comienza tu Proyecto Hoy" ctaText="Agendar Consulta Estratégica" />
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ (unchanged) */}
      <section ref={faqRef} className="py-20 md:py-28 bg-[var(--color-light-tan)]">
        <motion.div
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-playfair text-[var(--color-carbon)] text-[32px] md:text-[44px] font-bold mb-12 text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--color-brilliant-white)] rounded-xl shadow-sm border border-[var(--color-feather-gray)]">
                <button
                  className="w-full flex justify-between items-center p-6 text-left font-playfair text-[var(--color-carbon)] text-xl font-semibold cursor-pointer"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  {faq.question}
                  <motion.div animate={{ rotate: openAccordion === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown className="text-[var(--color-sunstone-orange)]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-[var(--color-carbon)]/80 leading-relaxed border-t border-[var(--color-carbon)]/10">
                        {faq.answer}
                      </div>
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
