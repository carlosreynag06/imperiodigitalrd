// app/politica-de-privacidad/page.tsx
"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";

export default function PrivacyPolicyPage() {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
    const contentRef = useRef(null);
    const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 90, damping: 16 },
        },
    };

    // Accordion state
    const [open, setOpen] = useState<number[]>([0]); // intro open by default
    const toggle = (idx: number) =>
        setOpen((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
    const openAll = () => setOpen([0, 1, 2, 3, 4, 5, 6, 7]);
    const closeAll = () => setOpen([]);

    const privacyItems = [
        {
            title: "Introducción",
            content: (
                <p>
                    <span className="font-semibold text-[var(--color-sunstone-orange)]">En Imperio Digital RD</span>, valoramos profundamente tu privacidad. Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta política.
                </p>
            ),
        },
        {
            title: "1. Información que Recopilamos",
            content: (
                <>
                    <p>
                        Recopilamos información personal que nos proporcionas voluntariamente a través de formularios en nuestro sitio web (como el formulario de contacto y el formulario de agendamiento de citas). Esta información puede incluir:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mt-4">
                        <li>Nombre completo</li>
                        <li>Dirección de correo electrónico</li>
                        <li>Número de teléfono (WhatsApp)</li>
                        <li>Servicio de interés</li>
                        <li>Mensaje o notas adicionales sobre tu proyecto o cita</li>
                    </ul>
                    <p className="mt-4">
                        También podemos recopilar información no personal automáticamente, como tu dirección IP, tipo de navegador, sistema operativo y páginas visitadas, para mejorar la funcionalidad y el rendimiento de nuestro sitio.
                    </p>
                </>
            ),
        },
        {
            title: "2. Cómo Usamos Tu Información",
            content: (
                <>
                    <p>La información que recopilamos se utiliza para los siguientes propósitos:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mt-4">
                        <li>Para responder a tus consultas y proporcionarte los servicios solicitados</li>
                        <li>Para gestionar tus citas y comunicaciones relacionadas</li>
                        <li>Para personalizar tu experiencia en nuestro sitio web</li>
                        <li>Para mejorar nuestros servicios y la funcionalidad del sitio web</li>
                        <li>Para fines de marketing directo (con tu consentimiento explícito) como el envío de newsletters o promociones</li>
                        <li>Para cumplir con obligaciones legales y reglamentarias</li>
                    </ul>
                </>
            ),
        },
        {
            title: "3. Compartir Tu Información",
            content: (
                <p>
                    Imperio Digital RD no vende, alquila ni comparte tu información personal con terceros para sus propios fines de marketing, salvo que tengamos tu consentimiento explícito o sea requerido por ley. Podemos compartir tu información con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio y a ofrecerte nuestros servicios (por ejemplo, servicios de email marketing), siempre bajo estrictos acuerdos de confidencialidad.
                </p>
            ),
        },
        {
            title: "4. Almacenamiento y Protección de Datos",
            content: (
                <p>
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, la alteración, divulgación o destrucción. Conservamos tus datos únicamente durante el tiempo necesario para cumplir con los fines descritos en esta política o según lo exijan las leyes aplicables.
                </p>
            ),
        },
        {
            title: "5. Tus Derechos",
            content: (
                <p>
                    Tienes derecho a acceder, rectificar o eliminar tu información personal que tenemos. Si deseas ejercer estos derechos o tienes preguntas sobre nuestra política de privacidad, por favor contáctanos a través de los canales proporcionados en nuestra página de Contacto.
                </p>
            ),
        },
        {
            title: "6. Enlaces a Sitios de Terceros",
            content: (
                <p>
                    Nuestro sitio web puede contener enlaces a sitios web de terceros. Esta política de privacidad no se aplica a esos sitios. Te recomendamos revisar las políticas de privacidad de cualquier sitio de terceros antes de proporcionarles información personal.
                </p>
            ),
        },
        {
            title: "7. Cambios en Esta Política de Privacidad",
            content: (
                <>
                    <p>
                        Podemos actualizar nuestra política de privacidad ocasionalmente. Cualquier cambio se publicará en esta página, y la fecha de &apos;Última Actualización&apos; se revisará. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu información.
                    </p>
                    <p className="mt-4 font-semibold">Última Actualización: 3 de Agosto de 2025</p>
                </>
            ),
        },
    ];

    return (
        <main className="bg-[var(--color-cloud-gray)] text-[var(--color-carbon)] min-h-screen">
            {/* HERO — reduced height, no oversized padding */}
            <section
                ref={heroRef as any}
                className="relative w-full bg-[var(--color-feather-gray)] min-h-[55vh] md:min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-24"
            >
                <motion.div
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-4xl mx-auto py-6 md:py-10"
                >
                    <h1 className="font-playfair text-[44px] md:text-[68px] font-bold leading-tight mb-5">
                        Política de <span className="text-[var(--color-sunstone-orange)]">Privacidad</span>
                    </h1>
                    <p className="font-inter text-base md:text-xl text-[var(--color-carbon)]/80 max-w-3xl mx-auto leading-relaxed">
                        Tu confianza es nuestra prioridad. Entiende cómo Imperio Digital RD protege tu información
                    </p>
                </motion.div>
            </section>

            {/* BODY — subtle tinted gradient background and tighter vertical rhythm */}
            <section
                ref={contentRef}
                className="w-full py-12 md:py-20 px-4 bg-[var(--color-cloud-gray)]"
            >
                <motion.div
                    initial="hidden"
                    animate={contentInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-3xl mx-auto"
                >
                    {/* Controls */}
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

                    {/* Accordion Items */}
                    <ul className="space-y-4">
                        {privacyItems.map((item, idx) => {
                            const isOpen = open.includes(idx);
                            return (
                                <li
                                    key={idx}
                                    className="bg-[var(--color-brilliant-white)] rounded-xl border border-[var(--color-feather-gray)] shadow-sm overflow-hidden"
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