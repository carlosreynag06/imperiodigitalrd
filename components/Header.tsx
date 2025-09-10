'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  // Close the mobile menu after navigation completes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  // CORRECTED: Navigation links updated as per your request
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/precios", label: "Precios" },
    { href: "/recursos", label: "Recursos" },
  ];

  // Animation for the full-screen mobile menu
  const mobileMenuVariants = {
    initial: {
      clipPath: 'circle(0% at 100% 0%)',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
    animate: {
      clipPath: 'circle(150% at 100% 0%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
  };

  // Staggered animation for the links inside the mobile menu
  const linkVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: easeOut,
      },
    }),
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-[var(--color-cloud-gray)]/80 backdrop-blur-lg border-b border-[var(--color-feather-gray)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-5">
          <Link href="/" className="font-serif text-[var(--color-carbon)] text-2xl md:text-3xl font-bold tracking-tight cursor-pointer transition-colors hover:text-[var(--color-sunstone-orange)]">
            Imperio Digital RD
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-sm uppercase font-medium tracking-wider p-1 bg-white/50 rounded-full border border-white/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseOver={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(pathname)}
                className={`relative px-4 py-2 transition-colors duration-300 z-10 ${
                  hoveredPath === link.href ? 'text-[var(--color-sunstone-orange)]' : 'text-[var(--color-carbon)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            {/* CORRECTED: Button text updated */}
            <Link href="/contacto" className="bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity duration-300">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[var(--color-carbon)] focus:outline-none z-50 p-2"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="md:hidden fixed inset-0 z-40 bg-[var(--color-carbon)] text-[var(--color-brilliant-white)] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-4 text-white p-2"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={linkVariants} initial="initial" animate="animate">
                  <Link href={link.href} onClick={handleMobileLinkClick} className="text-4xl font-serif hover:text-[var(--color-sunstone-orange)] transition-colors duration-300">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div custom={navLinks.length} variants={linkVariants} initial="initial" animate="animate">
              {/* CORRECTED: Button text updated for mobile menu */}
              <Link href="/contacto" onClick={handleMobileLinkClick} className="block w-full text-center mt-8 border-2 border-[var(--color-sunstone-orange)] text-[var(--color-sunstone-orange)] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[var(--color-sunstone-orange)] hover:text-[var(--color-brilliant-white)] transition-all duration-300">
                Contacto
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
