// app/recursos/page.tsx

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";

type Resource = {
  id: number; // UI-only id (not Brevo)
  title: string;
  description: string;
  category: "Guías" | "Checklists";
  imageUrl: string;
  downloadLink: string;
  slug: string;         // used for attributes
  listId: number;       // Brevo list ID (your #11, #10, #9)
};

export default function ResourcesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });

  const resourcesGridRef = useRef(null);
  const resourcesGridInView = useInView(resourcesGridRef, { once: true, amount: 0.3 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const resourceCategories = ["Todos", "Guías", "Checklists"] as const;
  const [activeCategory, setActiveCategory] =
    useState<(typeof resourceCategories)[number]>("Todos");

  // State for the gated download modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<Status>("idle");
  const [leadMessage, setLeadMessage] = useState<string>("");

  // ⬇️ Only paths updated (images in /public and PDFs in /public/resources)
  // NOTE: id is UI-only. Brevo list IDs are in listId.
  const resources: Resource[] = [
    {
      id: 1,
      title: "Guía Avanzada de Automatización para Negocios",
      description:
        "Implementa sistemas automatizados que escalen tu negocio sin necesidad de más personal",
      category: "Guías",
      imageUrl: "/advanced-automation-guide.png",
      downloadLink: "/resources/guia-avanzada-automatizacion.pdf",
      slug: "guia-avanzada-automatizacion",
      listId: 11, // Brevo #11
    },
    {
      id: 2,
      title: "Guía Estratégica de Persuasión Web",
      description:
        "Aprende a usar la psicología del consumidor y el diseño estratégico para convertir visitantes en clientes de forma predecible",
      category: "Guías",
      imageUrl: "/web-persuasion-strategy.png",
      downloadLink: "/resources/guia-estrategica-persuasion-web.pdf",
      slug: "guia-estrategica-persuasion-web",
      listId: 10, // Brevo #10
    },
    {
      id: 3,
      title: "Checklist Esencial para tu Primer Activo Digital",
      description:
        "Descubre los pasos claves para construir tu primer activo digital: un sitio web diseñado para el crecimiento",
      category: "Checklists",
      imageUrl: "/digital-asset-checklist.png",
      downloadLink: "/resources/checklist-activo-digital.pdf",
      slug: "checklist-activo-digital",
      listId: 9, // Brevo #9
    },
  ];

  const filteredResources =
    activeCategory === "Todos"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  // ===== Lead magnet gate (cards) — unchanged =====
  const openGate = (resource: Resource) => {
    setSelectedResource(resource);
    setLeadEmail("");
    setLeadStatus("idle");
    setLeadMessage("");
    setIsModalOpen(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedResource) return;

    if (!leadEmail.includes("@") || !leadEmail.includes(".")) {
      setLeadStatus("error");
      setLeadMessage("Por favor, ingresa un email válido.");
      return;
    }

    setLeadStatus("loading");
    setLeadMessage("");

    try {
      const response = await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leadEmail,
          listIds: [selectedResource.listId], // ⬅️ your Brevo list IDs (#11/#10/#9)
          event: "resource_request",
          attributes: {
            SOURCE: "Recursos Page",
            RESOURCE: selectedResource.title,
            SLUG: selectedResource.slug,
          },
        }),
      });

      if (response.ok) {
        setLeadStatus("success");
        setLeadMessage("¡Listo! Te enviamos el recurso por email");
        // If you ALSO want to allow immediate access after submission, uncomment:
        // window.open(selectedResource.downloadLink, "_blank");
      } else {
        setLeadStatus("error");
        setLeadMessage("Hubo un problema al procesar tu solicitud. Intenta nuevamente");
      }
    } catch {
      setLeadStatus("error");
      setLeadMessage("Hubo un problema al procesar tu solicitud. Intenta nuevamente");
    }
  };

  return (
    <main>
      {/* HERO */}
      <section
        className="relative w-full min-h-screen bg-imperial-void flex flex-col justify-center items-center text-center px-4 pt-[72px] md:pt-0"
        style={{ background: "linear-gradient(to bottom, #2A2D3A 0%, #0A0A0A 100%)" }}
      >
        <div className="absolute inset-0 digital-grain-overlay"></div>

        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto py-20 md:py-32 relative z-10"
        >
          <h1 className="font-playfair text-stark-white text-[48px] md:text-[72px] font-bold leading-tight mb-6">
            Centro de Recursos{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-flare to-blue-300">
              Gratuitos
            </span>
          </h1>

          <p className="font-inter text-lg md:text-xl text-stark-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Obtén guías, plantillas y herramientas exclusivas para potenciar tu presencia digital y acelerar tu
            crecimiento
          </p>

          {/* Centered CTA button that jumps to the resources grid */}
          <div className="w-full max-w-xl mx-auto flex justify-center">
            <Link href="#recursos">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
                className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
              >
                Ver Recursos Disponibles
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* GRID (layout intact; button opens gate modal) */}
      <section id="recursos" className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={resourcesGridRef}
          initial={resourcesGridInView ? "visible" : "hidden"}
          animate={resourcesGridInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12 text-center">
            Nuestra Biblioteca de Conocimiento
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {resourceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-custom-bezier ${
                  activeCategory === category
                    ? "bg-cyber-flare text-imperial-void shadow-lg"
                    : "text-stark-white/80 border border-atmospheric-gray hover:text-cyber-flare hover:border-cyber-flare"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <p className="font-inter text-stark-white/80 text-center text-lg mt-8">
              No hay recursos disponibles en esta categoría por el momento
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 229, 255, 0.2)" }}
                  className="bg-imperial-void rounded-xl shadow-xl overflow-hidden group border-[2px] border-atmospheric-gray"
                >
                  <div className="relative w-full h-52 overflow-hidden bg-atmospheric-gray">
                    <Image
                      src={resource.imageUrl}
                      alt={resource.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-playfair text-stark-white text-2xl font-bold leading-tight mb-3">
                      {resource.title}
                    </h3>

                    <p className="font-inter text-stark-white/80 text-base mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                    {/* Button looks the same, but opens the email gate */}
                    <button
                      onClick={() => openGate(resource)}
                      className="border-2 border-cyber-flare text-cyber-flare bg-transparent px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-custom-bezier cursor-pointer hover:shadow-[0_4px_15px_rgba(0,229,255,0.2)] hover:scale-[1.03]"
                    >
                      Descargar Recurso
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full text-stark-white py-16 md:py-28 px-4 overflow-hidden gradient-imperial-section">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold leading-tight mb-6">
            ¿Buscas Contenido Más Específico?
          </h2>

          <p className="font-inter text-stark-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Explora nuestro blog para artículos detallados o contáctanos para una consulta personalizada sobre tus
            necesidades digitales
          </p>

          <div className="flex justify-center flex-col sm:flex-row gap-4">
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
                className="bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer"
              >
                Visitar el Blog
              </motion.button>
            </Link>

            <Link href="/contacto">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.2)" }}
                className="border-2 border-cyber-flare text-cyber-flare bg-transparent px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-custom-bezier cursor-pointer"
              >
                Agendar Consulta
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===== Modal for email gate (cards) ===== */}
      <AnimatePresence>
        {isModalOpen && selectedResource && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-[92%] max-w-md rounded-2xl bg-imperial-void border border-atmospheric-gray p-6 shadow-2xl"
            >
              <h3 className="font-playfair text-stark-white text-2xl font-bold mb-2">
                {selectedResource.title}
              </h3>

              <p className="font-inter text-stark-white/80 text-sm mb-5">
                Deja tu email para recibir este recurso en tu bandeja de entrada
              </p>

              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="Tu email"
                  className="px-4 py-3 rounded-xl bg-atmospheric-gray text-stark-white placeholder-stark-white/40 focus:outline-none focus:ring-2 focus:ring-cyber-flare border border-atmospheric-gray"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border-2 border-atmospheric-gray text-stark-white bg-transparent px-4 py-3 rounded-xl font-semibold text-sm transition-all"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="flex-1 bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all"
                  >
                    {leadStatus === "loading" ? "Enviando..." : "Enviar por Email"}
                  </button>
                </div>
              </form>

              {leadMessage && (
                <p
                  className={`mt-3 text-sm ${
                    leadStatus === "success" ? "text-success-green" : "text-error-red"
                  }`}
                >
                  {leadMessage}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
