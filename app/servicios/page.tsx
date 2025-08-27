// app/servicios/page.tsx
"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function ServiciosPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.3 });

  const imperioDifferenceRef = useRef(null);
  const imperioDifferenceInView = useInView(imperioDifferenceRef, { once: true, amount: 0.3 });

  const pricingAnchorRef = useRef(null);
  const pricingAnchorInView = useInView(pricingAnchorRef, { once: true, amount: 0.3 });

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(0);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      title: "Diseño y Desarrollo Web de Alta Conversión",
      displayTitle: "Diseño Web<br/><span class='text-cyber-flare'>de Alta Conversión</span>",
      subheadline: "Tu Negocio, Tu Activo Digital",
      description:
        "Creamos tu centro de operaciones digital desde cero. Cada sitio es una obra de arte y una herramienta de precisión, diseñada a la medida de tus objetivos comerciales",
      bulletPoints: [
        "Combinamos psicología del consumidor, diseño de clase mundial y tecnología de punta",
        "Aseguramos que tu presencia online sea tan poderosa como tu visión",
      ],
      cta: { text: "Solicitar Cotización", href: "/contacto" },
    },
    {
      title: "Sistemas de Automatización de Marketing y Ventas",
      displayTitle: "Sistemas de <span class='text-cyber-flare'>Automatización</span><br/>de Ventas",
      subheadline: "Más Clientes. Menos Esfuerzo",
      description:
        "Este es el <strong class='font-bold text-liquid-gold'>motor de tu crecimiento</strong>. Integramos <strong class='font-bold'>sistemas inteligentes</strong> que capturan la información de tus visitantes. Les damos seguimiento con secuencias de comunicación persuasivas, entregándote <strong class='font-bold text-cyber-flare'>prospectos listos para comprar</strong>. Libera tu tiempo y escala tu capacidad de venta, ya que funciona en piloto automático 24/7",
      bulletPoints: [],
      cta: { text: "Explorar Sistemas de Automatización", href: "/contacto" },
    },
    {
      title: "Planes de Mantenimiento y Crecimiento Continuo",
      displayTitle: "<span class='text-stark-white'>Planes de</span> <span class='text-cyber-flare'>Mantenimiento</span>",
      subheadline: "Optimización Periódica",
      description:
        "Tu activo digital necesita protección y optimización constante. Nuestros planes de mantenimiento aseguran que <span class='text-liquid-gold'>tu sitio web opere con máximo rendimiento</span>, seguridad impenetrable y tecnología siempre actualizada",
      bulletPoints: [
        "Dormirás tranquilo sabiendo que tu inversión está protegida",
        "Tu plataforma estará siempre vigente y trabajando para ti",
      ],
      cta: { text: "Ver Planes de Mantenimiento", href: "/contacto" },
    },
  ];

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
        "Integramos principios de psicología del consumidor y copywriting persuasivo en cada etapa del diseño. Implementamos llamados a la acción estratégicos, formularios de captura de prospectos inteligentes, embudos de venta automatizados y análisis de datos constante para optimizar la conversión de visitantes en clientes. Sin embargo, aunque aplicamos las mejores prácticas probadas para maximizar resultados, no garantizamos ventas específicas, ya que el rendimiento también depende de factores como el mercado, la competencia, la oferta del negocio y su estrategia general.",
    },
    {
      question: "¿El precio del plan incluye hosting y dominio?",
      answer:
        "Sí, todos nuestros planes incluyen un año de hosting y registro de dominio sin costo adicional. Después del primer año, usted podrá renovarlos directamente o con nuestra asistencia. Nos encargamos de toda la configuración inicial para asegurar el mejor rendimiento de su nuevo activo digital.",
    },
    {
      question: "¿Cuál es el proceso de pago para un proyecto?",
      answer:
        "Para iniciar un proyecto, se requiere un porcentaje inicial de la inversión total, el cual se discute y acuerda durante la fase de consultoría. No ofrecemos planes de pago a plazos, ya que consideramos este un activo de alto retorno que justifica una inversión única y estratégica.",
    },
  ];

  const [openFAQAccordion, setOpenFAQAccordion] = useState<number | null>(null);

  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main>
      {/* Top split hero */}
      <section className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT column: keeps header offset at all breakpoints */}
        <div className="relative w-full md:min-h-screen bg-atmospheric-gray text-center px-4 pt-[72px] flex flex-col justify-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="w-full max-w-lg flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" as const }}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ease-custom-bezier text-left ${
                  activeServiceIndex === index
                    ? "bg-atmospheric-gray shadow-xl border-2 border-cyber-flare relative overflow-hidden"
                    : "bg-imperial-void border-2 border-atmospheric-gray hover:bg-atmospheric-gray"
                }`}
                onClick={() => setActiveServiceIndex(index)}
                whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 229, 255, 0.1)" }}
              >
                <motion.div
                  className={`absolute inset-0 bg-cyber-flare opacity-10 rounded-xl pointer-events-none ${
                    hoveredServiceIndex === index ? "opacity-10" : "opacity-0"
                  }`}
                  initial={false}
                  animate={{ opacity: hoveredServiceIndex === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="font-playfair text-stark-white text-xl sm:text-2xl font-bold leading-tight">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-imperial-void to-transparent z-0 md:hidden"></div>
        </div>

        {/* RIGHT column: keeps header offset at all breakpoints */}
        <div className="relative w-full md:min-h-screen bg-gradient-to-b from-imperial-void to-atmospheric-gray text-center px-4 pt-[72px] flex flex-col justify-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="max-w-xl mx-auto py-20 md:py-32 flex flex-col items-start justify-center relative z-10 text-left"
          >
            <motion.div
              key={activeServiceIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <h1 className="font-playfair text-stark-white text-[48px] md:text-[72px] font-bold leading-tight mb-6 drop-shadow-lg">
                <span
                  className="text-stark-white"
                  dangerouslySetInnerHTML={{ __html: services[activeServiceIndex].displayTitle }}
                />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-inter text-stark-white/90 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
                dangerouslySetInnerHTML={{ __html: services[activeServiceIndex].description }}
              />
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="list-disc list-inside space-y-2 font-inter text-stark-white/90 text-base sm:text-lg mb-6 sm:mb-8 pl-5"
              >
                {services[activeServiceIndex].bulletPoints.map((point, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                ))}
              </motion.ul>
              <Link href={services[activeServiceIndex].cta.href}>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
                  className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer w-full sm:w-auto"
                >
                  {services[activeServiceIndex].cta.text}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-atmospheric-gray to-transparent z-0 md:hidden"></div>
        </div>
      </section>

      {/* Imperio difference */}
      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={imperioDifferenceRef}
          initial="hidden"
          animate={imperioDifferenceInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 leading-tight">
            <span className="block">No Solo Creamos Páginas Web,</span>
            <span className="block">Creamos Activos Rentables</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 12px 24px rgba(0, 229, 255, 0.15)" }}
              className="bg-imperial-void p-6 sm:p-8 rounded-xl shadow-xl flex flex-col items-center text-center cursor-pointer border-2 border-cyber-flare min-h-[300px]"
            >
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare transition-colors duration-300">
                🧠
              </div>
              <h3 className="font-playfair text-liquid-gold text-xl sm:text-2xl font-semibold mb-3">
                Psicología de la Conversión
              </h3>
              <p className="font-inter text-stark-white/80 text-sm sm:text-base leading-relaxed text-center">
                Cada elemento, desde el color de un botón hasta la estructura de una frase, está basado en principios de la psicología del comportamiento para maximizar la conversión
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 12px 24px rgba(0, 229, 255, 0.15)" }}
              className="bg-imperial-void p-6 sm:p-8 rounded-xl shadow-xl flex flex-col items-center text-center cursor-pointer border-2 border-cyber-flare min-h-[300px]"
            >
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare transition-colors duration-300">
                🎨
              </div>
              <h3 className="font-playfair text-liquid-gold text-xl sm:text-2xl font-semibold mb-3">
                Diseño A la Medida
              </h3>
              <p className="font-inter text-stark-white/80 text-sm sm:text-base leading-relaxed text-center">
                Rechazamos las plantillas. Tu negocio es único y tu plataforma digital también debe serlo. Creamos soluciones a la medida para un rendimiento y una estética inigualables
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 12px 24px rgba(0, 229, 255, 0.15)" }}
              className="bg-imperial-void p-6 sm:p-8 rounded-xl shadow-xl flex flex-col items-center text-center cursor-pointer border-2 border-cyber-flare min-h-[300px]"
            >
              <div className="w-16 h-16 flex items-center justify-center text-5xl mb-4 text-cyber-flare transition-colors duration-300">
                ⚙️
              </div>
              <h3 className="font-playfair text-liquid-gold text-xl sm:text-2xl font-semibold mb-3">
                Automatización Estratégica
              </h3>
              <p className="font-inter text-stark-white/80 text-sm sm:text-base leading-relaxed text-center">
                Construimos sistemas, no solo sitios. Nuestro enfoque se centra en crear un motor que trabaje para ti, generando oportunidades y ventas de forma autónoma
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pricing anchor */}
      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={pricingAnchorRef}
          initial="hidden"
          animate={pricingAnchorInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-3xl sm:text-4xl font-bold leading-tight mb-6">
            <span className="block">Una Inversión Inteligente</span>
            <span className="block">en tu Activo Más Valioso</span>
          </h2>
          <p className="font-inter text-stark-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
            Nuestra estructura de precios es transparente y está diseñada para reflejar el inmenso valor y{" "}
            <strong className="font-bold text-cyber-flare">el retorno de inversión que nuestros sistemas generan</strong>. Esto no es un gasto, es la construcción de tu imperio digital
          </p>
          <Link href="/precios">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
              className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer w-full sm:w-auto"
            >
              Ver Precios y Planes
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={faqRef}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-playfair text-stark-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-imperial-void rounded-xl shadow-xl border border-atmospheric-gray">
                <button
                  className="w-full flex justify-between items-center p-6 text-left font-playfair text-stark-white text-xl font-semibold cursor-pointer"
                  onClick={() => setOpenFAQAccordion(openFAQAccordion === index ? null : index)}
                >
                  {faq.question}
                  <motion.div animate={{ rotate: openFAQAccordion === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown className="text-cyber-flare" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQAccordion === index && (
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
