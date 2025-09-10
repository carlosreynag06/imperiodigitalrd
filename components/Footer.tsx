'use client';
import Link from 'next/link';
import { FaInstagram, FaFacebookF } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-[var(--color-feather-gray)] mt-24 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Contact Info */}
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-[var(--color-carbon)] text-3xl font-bold mb-4 inline-block">
              Imperio Digital RD
            </Link>
            <p className="font-sans text-[var(--color-carbon)]/70 text-base max-w-sm mb-6">
              Ingeniería digital para un crecimiento automatizado.
            </p>
            {/* CORRECTED: Color changed for a more professional look */}
            <ul className="space-y-2 font-sans text-[var(--color-carbon)] text-base font-semibold">
              <li>
                <a href="https://wa.me/12232375309" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-sunstone-orange)] transition-colors">
                  WhatsApp: (223) 237-5309
                </a>
              </li>
              <li>
                <a href="mailto:contacto@imperiodigitalrd.com" className="hover:text-[var(--color-sunstone-orange)] transition-colors">
                  Email: contacto@imperiodigitalrd.com
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-sans font-bold text-[var(--color-carbon)] uppercase tracking-wider mb-4 text-sm">Navegación</h3>
            <ul className="space-y-2 font-sans text-[var(--color-carbon)]/80">
              <li><Link href="/servicios" className="hover:text-[var(--color-sunstone-orange)] transition-colors">Servicios</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-[var(--color-sunstone-orange)] transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-[var(--color-sunstone-orange)] transition-colors">Contacto</Link></li>
            </ul>
          </div>
          {/* Column 3: Legal & Help */}
          <div>
            <h3 className="font-sans font-bold text-[var(--color-carbon)] uppercase tracking-wider mb-4 text-sm">Legal & Ayuda</h3>
            <ul className="space-y-2 font-sans text-[var(--color-carbon)]/80">
              <li><Link href="/preguntas-frecuentes" className="hover:text-[var(--color-sunstone-orange)] transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/politica-de-privacidad" className="hover:text-[var(--color-sunstone-orange)] transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terminos-de-servicio" className="hover:text-[var(--color-sunstone-orange)] transition-colors">Términos de Servicio</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-carbon)]/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <span className="font-sans text-[var(--color-carbon)]/60 text-sm text-center md:text-left">
            &copy; {currentYear} Imperio Digital RD. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="https://www.facebook.com/profile.php?id=61579429996034" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--color-carbon)]/60 text-2xl hover:text-[var(--color-sunstone-orange)] transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/imperiodigitalrd" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--color-carbon)]/60 text-2xl hover:text-[var(--color-sunstone-orange)] transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
