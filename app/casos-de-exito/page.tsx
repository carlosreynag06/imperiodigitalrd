// app/casos-de-exito/page.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CaseStudiesPage() {
  const portfolioGridRef = useRef(null);
  const testimonialsCarouselRef = useRef(null);
  const finalCtaRef = useRef(null);
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 80, damping: 15 } 
    }
  };

  const projectCategories = ["Todos", "E-commerce", "Servicios Legales", "Salud y Bienestar"];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const projects = [
    {
      id: 1,
      clientName: "Firma de Abogados Legis",
      serviceCategory: "Servicios Legales",
      keyResult: "150% Leads Calificados",
      title: "Transformación Digital de <span class='text-stark-white'>Firma Legal</span>",
      slug: "law-firm",
      tags: ["Diseño Web", "Servicios Legales"],
      imageSrc: "/law-firm.jpg"
    },
    {
      id: 2,
      clientName: "Boutique Glamour",
      serviceCategory: "E-commerce",
      keyResult: "+200% Ventas Online",
      title: "Plataforma E-commerce <span class='text-stark-white'>de Lujo</span>",
      slug: "boutique-glamour",
      tags: ["E-commerce"],
      imageSrc: "/boutique-glamour.jpg"
    },
    {
      id: 3,
      clientName: "Clínica Dental Sonríe",
      serviceCategory: "Salud y Bienestar",
      keyResult: "75% Citas Agendadas Online",
      title: "Presencia Digital para <span class='text-stark-white'>Clínica Dental</span>",
      slug: "dental-practice",
      tags: ["Diseño Web", "Salud y Bienestar"],
      imageSrc: "/dental-practice.jpg"
    },
  ];

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(project => project.tags.includes(activeCategory));

  const testimonials = [
    {
      quote: "Pasamos de recibir prospectos ocasionales a un flujo constante y calificado cada semana. El sistema se paga solo.",
      clientName: "Juan de los Santos",
      clientTitle: "Fundador de Terapias Físicas Kairo",
      logoSrc: "/client-logo-5.svg"
    },
    {
      quote: "La estética y la funcionalidad superaron nuestras expectativas. Ahora tenemos un activo digital que genera negocio 24/7.",
      clientName: "Lorna Alvarado",
      clientTitle: "Soluciones Legales",
      logoSrc: "/client-logo-2.svg"
    },
    {
      quote: "Nunca imaginamos el nivel de control y las nuevas oportunidades que nos traería un sitio web bien diseñado por Imperio Digital RD.",
      clientName: "Roberto Gómez",
      clientTitle: "Agente Bienes Raíces",
      logoSrc: "/client-logo-1.svg"
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <main>
      <section className="relative w-full bg-gradient-to-b from-imperial-void to-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden pt-[72px]" >
        <motion.div
          ref={portfolioGridRef}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12 text-center">Nuestro Trabajo Destacado</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {projectCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 229, 255, 0.2)" }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-custom-bezier ${activeCategory === category ? 'bg-cyber-flare text-imperial-void shadow-lg border-cyber-flare' : 'text-stark-white/80 border-atmospheric-gray hover:text-cyber-flare hover:border-cyber-flare'} cursor-pointer`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 229, 255, 0.2)" }}
                  className="bg-imperial-void rounded-xl shadow-xl overflow-hidden group border-2 border-atmospheric-gray cursor-pointer"
                >
                  <div className="relative w-full h-60 bg-atmospheric-gray flex items-end p-6 overflow-hidden">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    <h3 className="font-playfair text-stark-white text-2xl font-bold leading-tight relative z-10" dangerouslySetInnerHTML={{ __html: project.title }} />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-imperial-void to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <p className="font-inter text-liquid-gold text-lg font-semibold mb-2">{project.clientName}</p>
                    <p className="font-inter text-stark-white/80 text-sm mb-4">Categoría: {project.serviceCategory}</p>
                    <p className="font-inter text-cyber-flare text-base font-semibold mb-6">{project.keyResult}</p>
                    <Link href={`/casos-de-exito/${project.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0px 4px 15px rgba(0, 229, 255, 0.2)" }}
                        className="border-2 border-cyber-flare text-cyber-flare bg-transparent px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-custom-bezier cursor-pointer"
                      >
                        Ver Caso Completo
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          ref={testimonialsCarouselRef}
          initial="hidden"
          animate={"visible"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center relative"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12">Lo Que Nuestros Clientes Dicen</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-imperial-void p-8 md:p-12 rounded-xl shadow-xl border border-atmospheric-gray relative min-h-[300px] flex flex-col justify-center items-center"
            >
              <p className="font-playfair text-liquid-gold text-3xl md:text-4xl leading-relaxed mb-6 italic">
                {`"${testimonials[currentTestimonial].quote}"`}
              </p>
              <div className="flex items-center">
                <div className="relative rounded-full mr-4 w-16 h-16 bg-atmospheric-gray flex items-center justify-center text-stark-white/50 text-xl font-bold p-2">
                  {testimonials[currentTestimonial].logoSrc && (
                    <Image
                      src={testimonials[currentTestimonial].logoSrc}
                      alt={`${testimonials[currentTestimonial].clientName} logo`}
                      fill
                      style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                    />
                  )}
                </div>
                <div className="text-left">
                  <p className="font-inter text-stark-white text-lg font-semibold">{testimonials[currentTestimonial].clientName}</p>
                  <p className="font-inter text-stark-white/70 text-sm">{testimonials[currentTestimonial].clientTitle}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={handlePrevTestimonial}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 229, 255, 0.4)" }}
              className="p-3 rounded-full bg-cyber-flare text-imperial-void shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={handleNextTestimonial}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 229, 255, 0.4)" }}
              className="p-3 rounded-full bg-cyber-flare text-imperial-void shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </section>
      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={finalCtaRef}
          initial="hidden"
          animate={"visible"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold leading-tight mb-6">
            Hablemos de la estrategia que transformará tu presencia digital
          </h2>
          <Link href="/contacto" className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
              className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
            >
              Agendar Consulta Estratégica
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
