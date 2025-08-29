// components/Header.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? 'bg-imperial-void/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        <Link href="/" className="font-playfair text-stark-white text-3xl font-bold tracking-tight leading-[1.1] cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">
          Imperio Digital RD
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-stark-white text-sm uppercase font-medium tracking-wider">
          <Link href="/" className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">Inicio</Link>
          <Link href="/servicios" className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">Servicios</Link>
          <Link href="/precios" className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">Precios</Link>
          <Link href="/casos-de-exito" className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">Portafolio</Link>
          <Link href="/blog" className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">Blog</Link>
          <Link href="/contacto" className="cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare">Contacto</Link>
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-stark-white focus:outline-none cursor-pointer p-2"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 text-stark-white space-y-4 bg-imperial-void transition-all duration-300">
          <Link href="/" onClick={handleMobileLinkClick} className="block py-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:text-cyber-flare">Inicio</Link>
          <Link href="/servicios" onClick={handleMobileLinkClick} className="block py-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:text-cyber-flare">Servicios</Link>
          <Link href="/precios" onClick={handleMobileLinkClick} className="block py-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:text-cyber-flare">Precios</Link>
          <Link href="/casos-de-exito" onClick={handleMobileLinkClick} className="block py-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:text-cyber-flare">Portafolio</Link>
          <Link href="/blog" onClick={handleMobileLinkClick} className="block py-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:text-cyber-flare">Blog</Link>
          <Link href="/contacto" onClick={handleMobileLinkClick} className="block py-2 cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:text-cyber-flare">Contacto</Link>
        </div>
      )}
    </header>
  );
}