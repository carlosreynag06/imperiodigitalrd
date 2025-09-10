// app/terminos-de-servicio/page.tsx
"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";

export default function TermsOfServicePage() {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
    const contentRef = useRef(null);
    const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 },
        },
    };

    // Accordion state
    const [open, setOpen] = useState<number[]>([0]); // intro open by default
    const toggle = (idx: number) =>
        setOpen((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
    const openAll = () => setOpen([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const closeAll = () => setOpen([]);

    const termsItems = [
        {
            title: "Introducción",
            content: (
                <p>
                    <span className="font-bold text-[var(--color-sunstone-orange)]">Bienvenido a Imperio Digital RD.</span> Al acceder y utilizar nuestro sitio web y los servicios que ofrecemos, aceptas cumplir con los siguientes Términos de Servicio. Estos términos constituyen un acuerdo legal vinculante entre tú y Imperio Digital RD. Por favor, léelos detenidamente antes de proceder con cualquier servicio.
                </p>
            ),
        },
        {
            title: "1. Aceptación de los Términos",
            content: (
                <p>
                    Al utilizar los servicios de Imperio Digital RD, confirmas que has leído, entendido y aceptado estos Términos de Servicio, así como nuestra Política de Privacidad. Si no estás de acuerdo con estos términos, no debes utilizar nuestros servicios. Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento sin previo aviso. Es tu responsabilidad revisar periódicamente esta página para conocer los cambios.
                </p>
            ),
        },
        {
            title: "2. Descripción de los Servicios",
            content: (
                <p>
                    Imperio Digital RD se especializa en la ingeniería de sistemas web de alta conversión, incluyendo diseño y desarrollo web a medida, implementación de sistemas de marketing y ventas automatizados, y consultoría para la creación de ecosistemas digitales integrados. Nuestros servicios están diseñados para transformar visitantes en clientes y asegurar un crecimiento digital sostenible para negocios y profesionales.
                </p>
            ),
        },
        {
            title: "3. Proceso de Contratación y Pagos",
            content: (
                <>
                    <p>
                        La contratación de nuestros servicios se inicia con una consulta estratégica y un diagnóstico de tus necesidades. Se presentará una propuesta detallada que incluirá el alcance del proyecto, el cronograma y la inversión requerida. Para iniciar un proyecto, se solicitará un pago inicial no reembolsable. Los pagos subsiguientes se estructurarán en hitos definidos en el contrato de servicio. Imperio Digital RD no ofrece planes de pago a plazos para proyectos de desarrollo.
                    </p>
                    <p className="mt-4">
                        Todos los precios se establecen en Dólares Estadounidenses (USD) o Pesos Dominicanos (DOP), según lo acordado en la propuesta. Los servicios adicionales o fuera del alcance inicial de la propuesta se cotizarán por separado.
                    </p>
                </>
            ),
        },
        {
            title: "4. Obligaciones del Cliente",
            content: (
                <>
                    <p>Para el éxito del proyecto, el cliente se compromete a:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mt-4">
                        <li>Proporcionar de manera oportuna todo el contenido, imágenes, logotipos y accesos necesarios</li>
                        <li>Revisar y aprobar las fases del proyecto en los plazos acordados</li>
                        <li>Realizar los pagos correspondientes según el cronograma establecido</li>
                        <li>Asegurarse de que todo el material proporcionado no infringe derechos de autor o propiedad intelectual de terceros</li>
                    </ul>
                </>
            ),
        },
        {
            title: "5. Propiedad Intelectual",
            content: (
                <p>
                    Todos los diseños, códigos, gráficos y contenidos desarrollados por Imperio Digital RD como parte de un proyecto de servicio, una vez que se haya recibido el pago total y final del proyecto, pasarán a ser propiedad intelectual del cliente. Sin embargo, Imperio Digital RD se reserva el derecho de mostrar el trabajo completado en su portafolio con fines promocionales. Las herramientas o plataformas de terceros (como licencias de software, plugins, etc.) que se utilicen en el proyecto seguirán rigiéndose por sus propias licencias y términos.
                </p>
            ),
        },
        {
            title: "6. Garantías y Limitación de Responsabilidad",
            content: (
                <p>
                    Imperio Digital RD garantiza que los servicios se realizarán con profesionalismo y con la debida diligencia. No garantizamos que el funcionamiento del sitio web será ininterrumpido o libre de errores. No seremos responsables de daños indirectos, incidentales, especiales o consecuentes que surjan del uso o la imposibilidad de usar nuestros servicios. Nuestra responsabilidad total por cualquier reclamo relacionado con los servicios no excederá la cantidad total pagada por el cliente por dichos servicios.
                </p>
            ),
        },
        {
            title: "7. Confidencialidad",
            content: (
                <p>
                    Ambas partes se comprometen a mantener la confidencialidad de toda la información propietaria y sensible que se revele durante el curso del proyecto.
                </p>
            ),
        },
        {
            title: "8. Legislación Aplicable y Jurisdicción",
            content: (
                <>
                    <p>
                        Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes de la República Dominicana. Cualquier disputa que surja de estos términos o servicios se someterá a la jurisdicción exclusiva de los tribunales competentes en la República Dominicana.
                    </p>
                    <p className="mt-4 font-semibold">Última Actualización: 3 de Agosto de 2025</p>
                </>
            ),
        },
    ];

    return (
        <main className="bg-[var(--color-cloud-gray)] text-[var(--color-carbon)] min-h-screen">
            {/* HERO SECTION */}
            <section
                ref={heroRef}
                className="w-full bg-[var(--color-feather-gray)] pt-32 pb-20 md:pt-40 md:pb-28 text-center px-4"
            >
                <motion.div
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="font-playfair text-[48px] md:text-[72px] font-bold leading-tight mb-6">
                        Términos de <span className="text-[var(--color-sunstone-orange)]">Servicio</span>
                    </h1>
                    <p className="font-inter text-lg md:text-xl text-[var(--color-carbon)]/80 max-w-3xl mx-auto leading-relaxed">
                        Nuestros acuerdos y tus derechos. Conoce las bases de nuestra relación profesional.
                    </p>
                </motion.div>
            </section>

            {/* CONTENT SECTION - ACCORDION LAYOUT */}
            <section
                ref={contentRef}
                className="w-full py-20 md:py-28 px-4"
            >
                <motion.div
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-3 justify-end mb-6">
                        <button
                            onClick={openAll}
                            className="px-4 py-2 rounded-lg font-semibold text-sm text-[var(--color-brilliant-white)] bg-[var(--color-sunstone-orange)] shadow-sm transition-transform hover:scale-[1.03]"
                        >
                            Expandir todo
                        </button>
                        <button
                            onClick={closeAll}
                            className="px-4 py-2 rounded-lg font-semibold text-sm bg-[var(--color-brilliant-white)] border border-[var(--color-feather-gray)] hover:border-[var(--color-carbon)]/50 transition-colors"
                        >
                            Contraer todo
                        </button>
                    </div>

                    <ul className="space-y-4">
                        {termsItems.map((item, idx) => {
                            const isOpen = open.includes(idx);
                            return (
                                <li
                                    key={idx}
                                    className="bg-[var(--color-brilliant-white)] rounded-xl shadow-sm border border-[var(--color-feather-gray)] overflow-hidden"
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => toggle(idx)}
                                        className="w-full text-left px-5 py-4 flex items-center justify-between"
                                    >
                                        <span className="font-playfair text-xl font-semibold text-[var(--color-carbon)]">
                                            {item.title}
                                        </span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-[var(--color-sunstone-orange)]"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-5 pb-5 pt-2 border-t border-[var(--color-feather-gray)] text-[var(--color-carbon)]/80 font-inter leading-relaxed space-y-4">
                                                    {item.content}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>
            </section>
        </main>
    );
}