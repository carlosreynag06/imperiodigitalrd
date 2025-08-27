// app/casos-de-exito/[slug]/page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { notFound } from "next/navigation";
import { useRef, use } from "react";
import Link from "next/link";
import Image from "next/image";

interface CaseStudy {
  slug: string;
  title: string;
  clientName: string;
  serviceCategory: string;
  keyResult: string;
  description: string;
  challenge: string;
  solution: string;
  resultsDetail: string;
  heroImage: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    slug: "boutique-glamour",
    title: "Plataforma E-commerce <span class='text-cyber-flare'>de Lujo</span>",
    clientName: "Boutique Glamour",
    serviceCategory: "E-commerce",
    keyResult: "+200% Ventas Online",
    description:
      "Boutique Glamour, una marca de moda de alta gama, necesitaba una presencia online que reflejara su exclusividad y proporcionara una experiencia de compra fluida y visualmente impactante, superando las limitaciones de las plataformas genéricas de e-commerce.",
    challenge:
      "Crear una experiencia de compra online que emule el lujo de la tienda física, con un enfoque en la estética y la influencia psicológica para maximizar las ventas de productos de alta gama.",
    solution:
      "Desarrollamos una plataforma de e-commerce a medida, donde cada elemento visual y cada flujo de usuario fueron diseñados para evocar el <span class='text-cyber-flare'>lujo y la exclusividad</span>. Integramos micro-interacciones sutiles, una galería de productos de alta resolución con carga optimizada, y un proceso de checkout simplificado y elegante. La estrategia incluyó storytelling visual de la marca y testimonios estratégicamente ubicados.",
    resultsDetail:
      "Las ventas online se dispararon en un <span class='text-cyber-flare'>200%</span> en los primeros seis meses. La tasa de abandono del carrito se redujo en un <span class='text-cyber-flare'>35%</span>, y el tiempo promedio en el sitio web aumentó en un 50%. La boutique no solo vendió más, sino que fortaleció su imagen de marca como <span class='text-cyber-flare'>líder en moda de lujo</span>, atrayendo a una clientela más sofisticada.",
    heroImage: "/boutique-glamour.jpg",
  },
  {
    slug: "law-firm",
    title: "Transformación Digital de <span class='text-cyber-flare'>Firma Legal</span>",
    clientName: "Firma de Abogados Legis",
    serviceCategory: "Servicios Legales",
    keyResult: "150% Leads Calificados",
    description:
      "La Firma de Abogados Legis necesitaba una presencia online que proyectara confianza, autoridad y accesibilidad. Su objetivo era convertir su experiencia legal en un <span class='text-cyber-flare'>flujo constante de leads calificados</span>, sin depender únicamente de las referencias tradicionales.",
    challenge:
      "Diseñar una plataforma web que combine la seriedad del sector legal con una experiencia de usuario moderna y persuasiva, simplificando la captación de clientes sin sacrificar el prestigio.",
    solution:
      "Construimos un sitio web con una arquitectura de contenido centrada en la autoridad. Utilizamos un diseño limpio y estructurado, con secciones dedicadas a sus áreas de especialización y testimonios de clientes. El sistema integra <span class='text-cyber-flare'>formularios de consulta inteligentes</span> que pre-cualifican a los leads, automatizando el primer contacto y permitiendo al equipo legal enfocarse en casos de mayor valor.",
    resultsDetail:
      "La firma experimentó un aumento del <span class='text-cyber-flare'>150% en leads calificados</span> en el primer trimestre. La percepción de modernidad y confianza de la marca mejoró notablemente, atrayendo a una clientela más joven y digitalmente consciente. La <span class='text-cyber-flare'>automatización de la captación de leads</span> liberó un 40% del tiempo administrativo, que ahora se invierte directamente en atención al cliente y desarrollo de casos.",
    heroImage: "/law-firm.jpg",
  },
  {
    slug: "dental-practice",
    title: "Presencia Digital para <span class='text-cyber-flare'>Clínica Dental</span>",
    clientName: "Clínica Dental Sonríe",
    serviceCategory: "Salud y Bienestar",
    keyResult: "75% Citas Agendadas Online",
    description:
      "Clínica Dental Sonríe buscaba modernizar su imagen y optimizar la gestión de citas, que dependía casi por completo de llamadas telefónicas. Su objetivo era ofrecer una experiencia digital fluida que reflejara la calidad de sus servicios.",
    challenge:
      "Crear una plataforma web que inspire confianza y facilite la reserva de citas online, reduciendo la carga administrativa del personal y mejorando la accesibilidad para los pacientes.",
    solution:
      "Desarrollamos un sitio web con un diseño limpio y moderno. Implementamos un <span class='text-cyber-flare'>sistema de agendamiento de citas online 24/7</span> integrado, que se sincroniza directamente con el calendario de la clínica. La plataforma se diseñó para educar a los visitantes sobre los servicios ofrecidos, con galerías de 'antes y después' y secciones de preguntas frecuentes que construyen confianza.",
    resultsDetail:
      "En seis meses, el <span class='text-cyber-flare'>75% de las nuevas citas se agendan a través del sitio web</span>, liberando al personal de recepción para atender a los pacientes en la clínica. La tasa de conversión de visitantes a pacientes aumentó en un <span class='text-cyber-flare'>30%</span> gracias a la facilidad del proceso de reserva y a la imagen profesional proyectada. Esto permitió a la clínica enfocarse más en la calidad de la atención y en la expansión de sus servicios.",
    heroImage: "/dental-practice.jpg",
  },
];

export default function DynamicCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);
  if (!caseStudy) notFound();

  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });

  // ✅ Type-safe spring transition (Framer Motion v12)
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-imperial-void text-stark-white min-h-screen">
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 pt-[72px] md:pt-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 229, 255, 0.2) 0%, rgba(13, 15, 26, 0.7) 40%, rgba(13, 15, 26, 1) 80%)",
        }}
      >
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto py-20 md:py-32 relative z-10"
        >
          <p className="font-inter text-base sm:text-lg text-liquid-gold mb-4 uppercase tracking-widest font-semibold">
            Caso de Éxito
          </p>
          <h1 className="font-playfair text-stark-white text-[48px] md:text-[72px] font-bold leading-tight mb-6 drop-shadow-lg">
            <span
              className="text-stark-white"
              dangerouslySetInnerHTML={{ __html: caseStudy.title }}
            />
          </h1>
          <p className="font-inter text-lg md:text-xl text-stark-white/90 max-w-3xl mx-auto leading-relaxed">
            Cómo transformamos a {caseStudy.clientName} en un líder de mercado
            digital
          </p>
        </motion.div>
      </section>

      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 bg-imperial-void rounded-xl shadow-xl border border-atmospheric-gray h-fit sticky top-24"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
              <Image
                src={caseStudy.heroImage}
                alt={`Imagen de la empresa ${caseStudy.clientName}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-8">
              <h2 className="font-playfair text-stark-white text-2xl font-bold mb-6">
                Detalles del Proyecto
              </h2>
              <ul className="space-y-4 font-inter text-base sm:text-lg text-stark-white/90">
                <li>
                  <span className="text-cyber-flare font-semibold">Cliente:</span>{" "}
                  {caseStudy.clientName}
                </li>
                <li>
                  <span className="text-cyber-flare font-semibold">Servicio:</span>{" "}
                  {caseStudy.serviceCategory}
                </li>
                <li
                  className="font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: `<span class="text-cyber-flare font-semibold">Resultados Clave:</span> ${caseStudy.keyResult}`,
                  }}
                />
              </ul>
              <Link href="/contacto" className="cursor-pointer">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)",
                  }}
                  className="mt-8 w-full bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-6 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
                >
                  Agendar Consulta Estratégica
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2 space-y-12">
            <div>
              <h2 className="font-playfair text-liquid-gold text-[32px] font-bold leading-tight mb-6">
                El Desafío
              </h2>
              <p
                className="font-inter text-stark-white/90 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.challenge }}
              ></p>
            </div>

            <div className="section-separator" />

            <div>
              <h2 className="font-playfair text-liquid-gold text-[32px] font-bold leading-tight mb-6">
                Nuestra Solución
              </h2>
              <p
                className="font-inter text-stark-white/90 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
              ></p>
            </div>

            <div className="section-separator" />

            <div>
              <h2 className="font-playfair text-liquid-gold text-[32px] font-bold leading-tight mb-6">
                Resultados Detallados
              </h2>
              <p
                className="font-inter text-stark-white/90 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caseStudy.resultsDetail }}
              ></p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold leading-tight mb-6">
            Hablemos de la estrategia que transformará tu presencia digital
          </h2>
          <Link href="/contacto" className="cursor-pointer">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)",
              }}
              className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-6 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
            >
              Agendar Consulta Estratégica
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
