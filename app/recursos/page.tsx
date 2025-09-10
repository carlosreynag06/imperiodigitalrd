"use client";

/* Option 2 — Pestañas por categoría + Grid 2 columnas (lead gate y copy intactos) */

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  FiDownload,
  FiFileText,
  FiCheckSquare,
  FiX,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

type Status = "idle" | "loading" | "success" | "error";

type Resource = {
  id: number;
  title: string;
  description: string;
  category: "Guías" | "Checklists";
  downloadLink: string;
  slug: string;
  listId: number;
};

const ResourceIcon = ({ category }: { category: "Guías" | "Checklists" }) =>
  category === "Guías" ? (
    <FiFileText className="w-6 h-6 text-[var(--color-sunstone-orange)]" />
  ) : (
    <FiCheckSquare className="w-6 h-6 text-[var(--color-sunstone-orange)]" />
  );

export default function ResourcesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const resourcesGridRef = useRef(null);
  const resourcesGridInView = useInView(resourcesGridRef, { once: true, amount: 0.2 });
  const finalCtaRef = useRef(null);
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.3 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15, staggerChildren: 0.1 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const resourceCategories = ["Todos", "Guías", "Checklists"] as const;
  const [activeCategory, setActiveCategory] = useState<(typeof resourceCategories)[number]>("Todos");

  // Modal (lead gate)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<Status>("idle");
  const [leadMessage, setLeadMessage] = useState<string>("");

  // Data (copy intacto)
  const resources: Resource[] = [
    {
      id: 1,
      title: "Guía Avanzada de Automatización para Negocios",
      description:
        "Implementa sistemas automatizados que escalen tu negocio sin necesidad de más personal.",
      category: "Guías",
      downloadLink: "/resources/guia-avanzada-automatizacion.pdf",
      slug: "guia-avanzada-automatizacion",
      listId: 11,
    },
    {
      id: 2,
      title: "Guía Estratégica de Persuasión Web",
      description:
        "Aprende a usar la psicología del consumidor y el diseño estratégico para convertir visitantes en clientes de forma predecible.",
      category: "Guías",
      downloadLink: "/resources/guia-estrategica-persuasion-web.pdf",
      slug: "guia-estrategica-persuasion-web",
      listId: 10,
    },
    {
      id: 3,
      title: "Checklist Esencial para tu Primer Activo Digital",
      description:
        "Descubre los pasos claves para construir tu primer activo digital: un sitio web diseñado para el crecimiento.",
      category: "Checklists",
      downloadLink: "/resources/checklist-activo-digital.pdf",
      slug: "checklist-activo-digital",
      listId: 9,
    },
  ];

  const filteredResources =
    activeCategory === "Todos"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

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
          listIds: [selectedResource.listId],
          attributes: {
            SOURCE: "Recursos Page",
            RESOURCE: selectedResource.title,
            SLUG: selectedResource.slug,
          },
        }),
      });
      if (response.ok) {
        setLeadStatus("success");
        setLeadMessage("¡Listo! Te enviamos el recurso por email.");
      } else {
        setLeadStatus("error");
        setLeadMessage("Hubo un problema. Intenta nuevamente.");
      }
    } catch {
      setLeadStatus("error");
      setLeadMessage("Hubo un problema. Intenta nuevamente.");
    }
  };

  return (
    <main className="bg-[var(--color-cloud-gray)] text-[var(--color-carbon)]">
      {/* HERO */}
      <section className="w-full bg-[var(--color-feather-gray)] pt-32 pb-20 md:pt-40 md:pb-28 text-center px-4">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="font-playfair text-[48px] md:text-[72px] font-bold leading-tight mb-6">
            Centro de Recursos Gratuitos
          </motion.h1>
          <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-[var(--color-carbon)]/80 max-w-3xl mx-auto leading-relaxed mb-10">
            Obtén guías y checklists exclusivos para potenciar tu presencia digital y acelerar tu crecimiento
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="#recursos" className="inline-block bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity">
              Ver Recursos
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* BODY — Tabs + Grid */}
      <section id="recursos" className="w-full bg-[var(--color-cloud-gray)] py-20 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={resourcesGridRef}
          initial="hidden"
          animate={resourcesGridInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="font-playfair text-[32px] md:text-[44px] font-bold mb-6 text-center">
            Nuestra Biblioteca de Conocimiento
          </motion.h2>

          {/* Tabs */}
          <div className="relative flex justify-center">
            <div className="inline-flex rounded-full border border-[var(--color-feather-gray)] bg-white p-1">
              {resourceCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                      isActive
                        ? "bg-[var(--color-sunstone-orange)] text-white"
                        : "text-[var(--color-carbon)] hover:text-[var(--color-sunstone-orange)]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-[var(--color-brilliant-white)] border border-[var(--color-feather-gray)] rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 bg-[var(--color-feather-gray)]/70 w-12 h-12 rounded-full grid place-items-center">
                    <ResourceIcon category={resource.category} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-playfair text-xl font-bold">{resource.title}</h3>
                    <p className="font-inter text-[var(--color-carbon)]/70">{resource.description}</p>
                    <button
                      onClick={() => openGate(resource)}
                      className="mt-2 inline-flex items-center gap-2 border-2 border-[var(--color-sunstone-orange)] text-[var(--color-carbon)] font-semibold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:bg-[var(--color-sunstone-orange)] hover:text-[var(--color-brilliant-white)]"
                    >
                      <FiDownload />
                      <span>Descargar</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredResources.length === 0 && (
            <p className="font-inter text-[var(--color-carbon)]/80 text-center text-lg mt-8">
              No hay recursos disponibles en esta categoría por el momento
            </p>
          )}
        </motion.div>
      </section>

      {/* CTA final */}
      <section
        ref={finalCtaRef}
        className="w-full text-[var(--color-brilliant-white)] py-20 md:py-28 px-4 overflow-hidden bg-[var(--color-carbon)]"
      >
        <motion.div
          initial="hidden"
          animate={finalCtaInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="font-playfair text-[32px] md:text-[44px] font-bold leading-tight mb-6 text-[var(--color-brilliant-white)]/90">
            ¿Buscas Contenido Más Específico?
          </motion.h2>
          <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-[var(--color-brilliant-white)]/80">
            Contáctanos para una consulta personalizada sobre tus necesidades digitales
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/contacto">
              <motion.button whileHover={{ scale: 1.03 }} className="bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity">
                Agendar Consulta
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal Gate (lead capture) */}
      <AnimatePresence>
        {isModalOpen && selectedResource && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative z-10 w-full max-w-md rounded-2xl bg-[var(--color-brilliant-white)] border border-[var(--color-feather-gray)] p-6 shadow-2xl"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-[var(--color-carbon)]/50 hover:text-[var(--color-carbon)] transition-colors">
                <FiX size={24} />
              </button>
              <h3 className="font-playfair text-2xl font-bold mb-2">{selectedResource.title}</h3>
              <p className="font-inter text-[var(--color-carbon)]/80 text-sm mb-5">
                Deja tu email para recibir este recurso en tu bandeja de entrada.
              </p>
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="Tu email"
                  className="px-4 py-3 rounded-xl bg-[var(--color-feather-gray)] text-[var(--color-carbon)] placeholder-[var(--color-carbon)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-sunstone-orange)] border border-transparent transition"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-[var(--color-feather-gray)] text-[var(--color-carbon)]/80 bg-transparent px-4 py-3 rounded-xl font-semibold text-sm transition-colors hover:border-[var(--color-carbon)]/50 hover:text-[var(--color-carbon)]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="flex-1 bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
                  >
                    {leadStatus === "loading" ? <FiLoader className="animate-spin" /> : "Enviar por Email"}
                  </button>
                </div>
              </form>
              <AnimatePresence>
                {leadMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`mt-3 text-sm flex items-center justify-center gap-2 font-medium ${
                      leadStatus === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {leadStatus === "success" && <FiCheckCircle />}
                    {leadStatus === "error" && <FiAlertCircle />}
                    {leadMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
