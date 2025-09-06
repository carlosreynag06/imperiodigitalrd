// components/Footer.tsx
'use client';
import Link from 'next/link';
import { FaInstagram, FaFacebookF } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-imperial-void mt-24">
      <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col md:flex-row items-stretch justify-between gap-8">
        <div className="flex flex-col min-w-[170px] md:mr-20 items-start">
          <Link
            href="/"
            className="font-playfair text-stark-white text-3xl font-bold tracking-tight leading-[1.1] mb-4 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare"
          >
            Imperio Digital RD
          </Link>
          <p className="font-inter text-stark-white/80 text-sm mb-4">
            Ingeniería digital para un <br /> crecimiento automatizado
          </p>
          <ul className="space-y-2 font-inter text-cyber-flare text-base font-semibold">
            <li>
              <a href="https://wa.me/12232375309" target="_blank" rel="noopener noreferrer">
                WhatsApp: (223) 237-5309
              </a>
            </li>
            <li>
              <a href="mailto:contacto@imperiodigitalrd.com">
                Email: contacto@imperiodigitalrd.com
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl mx-auto gap-x-12">
          <div className="h-full">
            <div className="font-inter font-bold text-cyber-flare uppercase tracking-wide mb-2 text-base">
              Navegación
            </div>
            <ul className="space-y-2 font-inter text-stark-white/80 text-lg">
              <li>
                <Link
                  href="/servicios"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/casos-de-exito"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/recursos"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="h-full mt-8 md:mt-0">
            <div className="font-inter font-bold text-cyber-flare uppercase tracking-wide mb-2 text-base">
              Legal & Ayuda
            </div>
            <ul className="space-y-2 font-inter text-stark-white/80 text-lg">
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-de-servicio"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare cursor-pointer"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-atmospheric-gray/30 w-full" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4">
        <span className="font-inter text-stark-white/80 text-sm">
          © <span suppressHydrationWarning>{currentYear}</span> Imperio Digital RD. Todos los derechos reservados
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.facebook.com/profile.php?id=61579429996034"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-stark-white/80 text-2xl cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/imperiodigitalrd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-stark-white/80 text-2xl cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-cyber-flare"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
