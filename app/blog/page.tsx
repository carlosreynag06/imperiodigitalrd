// app/blog/page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLaptopCode, FaBullseye, FaMobile } from "react-icons/fa";

export default function BlogPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const postListRef = useRef(null);
  const postListInView = useInView(postListRef, { once: true, amount: 0.3 });

  // Variants for section and item animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween" as const, duration: 0.5, ease: "easeOut" as const },
    },
  };

  const textUnveilVariants = {
    hidden: { opacity: 0, y: 30, clipPath: "inset(100% 0 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0)",
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  const cardPopInVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "tween" as const, duration: 0.4, ease: "easeOut" as const },
    },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.15 } },
    hidden: {},
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    { name: "Todos", value: "all" },
    { name: "Desarrollo Web", value: "desarrollo-web", icon: <FaLaptopCode /> },
    { name: "Estrategia Digital", value: "estrategia-digital", icon: <FaBullseye /> },
    { name: "UX/UI", value: "ux-ui", icon: <FaMobile /> },
  ];

  const allBlogPosts = [
    {
      id: "post1",
      title: "Secretos del Copywriting para Generar Conversiones",
      meta_description:
        "Descubre los secretos clave del copywriting enfocado en conversión y aprende a crear contenido para tu página web que conecte verdaderamente con tu audiencia, genere confianza y motive a tomar acción",
      featured_image_url: "/blog-copywriting-hero.jpg",
      slug: "secretos-copywriting",
      tags: ["estrategia-digital"],
      publish_date: "2024-01-24",
    },
    {
      id: "post3",
      title: "Por qué una Página Web es Clave, Incluso si tu Negocio Usa Redes Sociales",
      meta_description:
        "Descubre cómo una página web potencia tu negocio, complementa tus redes sociales y atrae clientes en automático con sistemas inteligentes 24/7",
      featured_image_url: "/blog-web-vs-social-hero.jpg",
      slug: "web-vs-social-media",
      tags: ["estrategia-digital", "desarrollo-web"],
      publish_date: "2024-03-05",
    },
    {
      id: "post2",
      title: "Estrategia Mobile-First: Clave para Negocios Modernos",
      meta_description:
        "Diseñar tu web pensando primero en móviles ya no es opcional. Descubre por qué esta estrategia es clave para mejorar la experiencia del usuario, impulsar tu crecimiento y subir en los resultados de búsqueda.",
      featured_image_url: "/blog-mobile-first-hero.jpg",
      slug: "estrategia-mobile-first",
      tags: ["ux-ui"],
      publish_date: "2024-02-14",
    },
  ];

  const filteredAndSearchedPosts = allBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.meta_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSearchedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredAndSearchedPosts.length / postsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main>
      <section className="relative w-full min-h-screen bg-blog-hero-final flex flex-col justify-center items-center text-center px-4 pt-[72px] md:pt-0">
        <div className="absolute inset-0 digital-grain-overlay"></div>
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="max-w-4xl mx-auto py-20 md:py-32 relative z-10"
        >
          <motion.h1
            variants={textUnveilVariants}
            className="font-playfair text-stark-white text-[48px] md:text-[72px] font-bold leading-tight mb-6"
          >
            <span className="block">Nuestro Blog</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-flare to-blue-300">
              Estrategias de Crecimiento
            </span>
          </motion.h1>
          <motion.p
            variants={textUnveilVariants}
            className="font-inter text-lg md:text-xl text-stark-white/90 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Sumérgete en el conocimiento que impulsa la transformación digital<br />
            y descubre cómo construir un imperio en línea
          </motion.p>
          <motion.div variants={textUnveilVariants} className="w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Buscar artículos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-atmospheric-gray text-stark-white placeholder-stark-white/40 focus:outline-none focus:ring-2 focus:ring-cyber-flare focus:border-transparent transition-all duration-200 ease-custom-bezier"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          ref={postListRef}
          initial="hidden"
          animate={postListInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="max-w-7xl mx-auto"
        >
          <div className="md:col-span-2">
            <motion.h2 variants={sectionVariants} className="font-playfair text-stark-white text-[32px] md:text-[44px] font-bold mb-12">
              Últimas Publicaciones
            </motion.h2>

            <motion.div variants={staggerChildren} className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  variants={sectionVariants}
                  onClick={() => setActiveCategory(category.value)}
                  className={`flex items-center px-4 py-2 rounded-full font-inter font-semibold text-sm transition-all duration-300 whitespace-nowrap border-2 ${
                    activeCategory === category.value
                      ? "bg-cyber-flare text-imperial-void border-cyber-flare shadow-lg"
                      : "bg-imperial-void text-stark-white/80 border-atmospheric-gray hover:bg-imperial-void/80 hover:text-cyber-flare hover:border-cyber-flare"
                  }`}
                >
                  {category.icon && <span className="mr-2">{category.icon}</span>}
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            {!filteredAndSearchedPosts.length && (
              <p className="font-inter text-stark-white/80 text-center py-12">No se encontraron publicaciones que coincidan con tu búsqueda</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={cardPopInVariants}
                  whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
                  className="bg-imperial-void rounded-xl shadow-xl overflow-hidden group border border-atmospheric-gray"
                >
                  <div className="relative w-full aspect-[3/2] overflow-hidden">
                    {post.featured_image_url && (
                      <>
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-imperial-void/70 to-transparent"></div>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-stark-white text-2xl font-bold leading-tight mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-cyber-flare transition-colors duration-200">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="font-inter text-stark-white/80 text-base mb-4 line-clamp-3">{post.meta_description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-cyber-flare/10 text-cyber-flare text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-inter text-stark-white/60 text-sm">
                      Publicado el{" "}
                      {new Date(post.publish_date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0px 4px 15px rgba(0, 229, 255, 0.2)" }}
                        className="mt-6 border-2 border-cyber-flare text-cyber-flare bg-transparent px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-custom-bezier cursor-pointer"
                      >
                        Leer Más
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ease-custom-bezier ${
                      currentPage === i + 1
                        ? "bg-cyber-flare text-imperial-void shadow-lg"
                        : "text-stark-white/80 border border-atmospheric-gray hover:text-cyber-flare hover:border-cyber-flare"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
