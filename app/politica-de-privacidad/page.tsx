// app/politica-de-privacidad/page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

export default function PrivacyPolicyPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <main>
      <section className="relative w-full min-h-screen bg-blog-hero-final flex flex-col justify-center items-center text-center px-4 pt-[72px] md:pt-0">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-4xl mx-auto py-20 md:py-32"
        >
          <h1 className="font-playfair text-stark-white text-[48px] md:text-[72px] font-bold leading-tight mb-6">
            Política de{" "}
            <span className="text-stark-white">
              Privacidad
            </span>
          </h1>
          <p className="font-inter text-lg md:text-xl text-stark-white/90 max-w-3xl mx-auto leading-relaxed">
            Tu confianza es nuestra prioridad. Entiende cómo Imperio Digital RD protege tu información
          </p>
        </motion.div>
      </section>
      <section className="w-full bg-atmospheric-gray py-16 md:py-28 px-4 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-stark-white/90 text-base leading-relaxed space-y-8"
        >
          <p>
            <span className="text-liquid-gold font-bold">En Imperio Digital RD</span>, valoramos profundamente tu privacidad. Esta política describe cómo recolectamos, usamos y protegemos la información personal que nos proporcionas al usar nuestro sitio web y servicios. Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta política.
          </p>
          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">1. Información que Recopilamos</h2>
            <p>
              Recopilamos información personal que nos proporcionas voluntariamente a través de formularios en nuestro sitio web (como el formulario de contacto y el formulario de agendamiento de citas). Esta información puede incluir:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (WhatsApp)</li>
              <li>Servicio de interés</li>
              <li>Mensaje o notas adicionales sobre tu proyecto o cita</li>
            </ul>
            <p className="mt-4">
              También podemos recopilar información no personal automáticamente, como tu dirección IP, tipo de navegador, sistema operativo y páginas visitadas, para mejorar la funcionalidad y el rendimiento de nuestro sitio.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">2. Cómo Usamos Tu Información</h2>
            <p>
              La información que recopilamos se utiliza para los siguientes propósitos:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Para responder a tus consultas y proporcionarte los servicios solicitados</li>
              <li>Para gestionar tus citas y comunicaciones relacionadas</li>
              <li>Para personalizar tu experiencia en nuestro sitio web</li>
              <li>Para mejorar nuestros servicios y la funcionalidad del sitio web</li>
              <li>Para fines de marketing directo (con tu consentimiento explícito) como el envío de newsletters o promociones</li>
              <li>Para cumplir con obligaciones legales y reglamentarias</li>
            </ul>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">3. Compartir Tu Información</h2>
            <p>
              Imperio Digital RD no vende, alquila ni comparte tu información personal con terceros para sus propios fines de marketing, salvo que tengamos tu consentimiento explícito o sea requerido por ley. Podemos compartir tu información con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio y a ofrecerte nuestros servicios (por ejemplo, servicios de email marketing o alojamiento de datos como Supabase), siempre bajo estrictos acuerdos de confidencialidad.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">4. Almacenamiento y Seguridad de Datos</h2>
            <p>
              Utilizamos Supabase para el almacenamiento de datos de leads y citas, lo que nos permite gestionar tu información de manera segura. Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger tu información personal contra el acceso no autorizado, la divulgación, alteración o destrucción. A pesar de nuestros esfuerzos, ninguna transmisión de datos por Internet o sistema de almacenamiento electrónico puede garantizar una seguridad del 100%.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">5. Tus Derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar o eliminar tu información personal que tenemos. Si deseas ejercer estos derechos o tienes preguntas sobre nuestra política de privacidad, por favor contáctanos a través de los canales proporcionados en nuestra página de Contacto.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">6. Enlaces a Sitios de Terceros</h2>
            <p>
              Nuestro sitio web puede contener enlaces a sitios web de terceros. Esta política de privacidad no se aplica a esos sitios. Te recomendamos revisar las políticas de privacidad de cualquier sitio de terceros antes de proporcionarles información personal.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">7. Cambios en Esta Política de Privacidad</h2>
            <p>
              Podemos actualizar nuestra política de privacidad ocasionalmente. Cualquier cambio se publicará en esta página, y la fecha de &apos;Última Actualización&apos; se revisará. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu información.
            </p>
            <p className="mt-4 font-semibold">
              Última Actualización: 3 de Agosto de 2025
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
