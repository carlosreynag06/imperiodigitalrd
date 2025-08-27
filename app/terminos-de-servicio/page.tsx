// app/terminos-de-servicio/page.tsx
"use client";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

export default function TermsOfServicePage() {
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
            Términos de{" "}
            <span className="text-stark-white">
              Servicio
            </span>
          </h1>
          <p className="font-inter text-lg md:text-xl text-stark-white/90 max-w-3xl mx-auto leading-relaxed">
            Nuestros acuerdos y tus derechos. Conoce las bases de nuestra relación profesional
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
            <span className="font-bold text-liquid-gold">Bienvenido a Imperio Digital RD</span>. Al acceder y utilizar nuestro sitio web y los servicios que ofrecemos, aceptas cumplir con los siguientes Términos de Servicio. Estos términos constituyen un acuerdo legal vinculante entre tú y Imperio Digital RD. Por favor, léelos detenidamente antes de proceder con cualquier servicio.
          </p>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al utilizar los servicios de Imperio Digital RD, confirmas que has leído, entendido y aceptado estos Términos de Servicio, así como nuestra Política de Privacidad. Si no estás de acuerdo con estos términos, no debes utilizar nuestros servicios. Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento sin previo aviso. Es tu responsabilidad revisar periódicamente esta página para conocer los cambios.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">2. Descripción de los Servicios</h2>
            <p>
              Imperio Digital RD se especializa en la ingeniería de sistemas web de alta conversión, incluyendo diseño y desarrollo web a medida, implementación de sistemas de marketing y ventas automatizados, y consultoría para la creación de ecosistemas digitales integrados. Nuestros servicios están diseñados para transformar visitantes en clientes y asegurar un crecimiento digital sostenible para negocios y profesionales.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">3. Proceso de Contratación y Pagos</h2>
            <p>
              La contratación de nuestros servicios se inicia con una consulta estratégica y un diagnóstico de tus necesidades. Se presentará una propuesta detallada que incluirá el alcance del proyecto, el cronograma y la inversión requerida. Para iniciar un proyecto, se solicitará un pago inicial no reembolsable. Los pagos subsiguientes se estructurarán en hitos definidos en el contrato de servicio. Imperio Digital RD no ofrece planes de pago a plazos para proyectos de desarrollo.
            </p>
            <p className="mt-4">
              Todos los precios se establecen en Dólares Estadounidenses (USD) o Pesos Dominicanos (DOP), según lo acordado en la propuesta. Los servicios adicionales o fuera del alcance inicial de la propuesta se cotizarán por separado.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">4. Obligaciones del Cliente</h2>
            <p>
              Para el éxito del proyecto, el cliente se compromete a:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Proporcionar de manera oportuna todo el contenido, imágenes, logotipos y accesos necesarios</li>
              <li>Revisar y aprobar las fases del proyecto en los plazos acordados</li>
              <li>Realizar los pagos correspondientes según el cronograma establecido</li>
              <li>Asegurarse de que todo el material proporcionado no infringe derechos de autor o propiedad intelectual de terceros</li>
            </ul>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">5. Propiedad Intelectual</h2>
            <p>
              Todos los diseños, códigos, gráficos y contenidos desarrollados por Imperio Digital RD como parte de un proyecto de servicio, una vez que se haya recibido el pago total y final del proyecto, pasarán a ser propiedad intelectual del cliente. Sin embargo, Imperio Digital RD se reserva el derecho de mostrar el trabajo completado en su portafolio con fines promocionales. Las herramientas o plataformas de terceros (como licencias de software, plugins, etc.) que se utilicen en el proyecto seguirán rigiéndose por sus propias licencias y términos.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">6. Garantías y Limitación de Responsabilidad</h2>
            <p>
              Imperio Digital RD garantiza que los servicios se realizarán con profesionalismo y con la debida diligencia. No garantizamos que el funcionamiento del sitio web será ininterrumpido o libre de errores. No seremos responsables de daños indirectos, incidentales, especiales o consecuentes que surjan del uso o la imposibilidad de usar nuestros servicios. Nuestra responsabilidad total por cualquier reclamo relacionado con los servicios no excederá la cantidad total pagada por el cliente por dichos servicios.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">7. Confidencialidad</h2>
            <p>
              Ambas partes se comprometen a mantener la confidencialidad de toda la información propietaria y sensible que se revele durante el curso del proyecto.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-cyber-flare text-3xl font-bold mb-4">8. Legislación Aplicable y Jurisdicción</h2>
            <p>
              Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes de la República Dominicana. Cualquier disputa que surja de estos términos o servicios se someterá a la jurisdicción exclusiva de los tribunales competentes en la República Dominicana.
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
