"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import { FaWhatsapp, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ContactPage() {
    const contactSectionRef = useRef(null);
    const contactSectionInView = useInView(contactSectionRef, { once: true, amount: 0.2 });

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15, staggerChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // State management for the single contact form
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        whatsappNumber: "",
        interestedService: "",
        message: "",
    });

    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateContactForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.fullName.trim()) errors.fullName = "El nombre completo es requerido.";
        if (!formData.email.trim()) {
            errors.email = "El email es requerido.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "El formato del email no es válido.";
        }
        if (!formData.message.trim()) errors.message = "Por favor, cuéntanos sobre tu negocio.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateContactForm()) {
            setSubmitStatus("error");
            setErrorMessage("Por favor, corrige los errores en el formulario.");
            return;
        }

        setSubmitStatus("loading");
        setErrorMessage("");

        // Brevo integration remains untouched
        try {
            const res = await fetch("/api/brevo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    listIds: [12],
                    attributes: {
                        NOMBRE: formData.fullName,
                        EMAIL: formData.email,
                        TELEFONO: formData.whatsappNumber || "",
                        SERVICIO: formData.interestedService || "",
                        MENSAJE: formData.message,
                        FECHA: new Date().toISOString(),
                    },
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Brevo API failed:", text);
                setSubmitStatus("error");
                setErrorMessage("No se pudo enviar. Inténtalo de nuevo.");
                return;
            }
        } catch (brevoError) {
            console.error("Brevo API call failed:", brevoError);
            setSubmitStatus("error");
            setErrorMessage("No se pudo enviar. Inténtalo de nuevo.");
            return;
        }

        setSubmitStatus("success");
        setFormData({
            fullName: "",
            email: "",
            whatsappNumber: "",
            interestedService: "",
            message: "",
        });
    };

    const getInputClassNames = (fieldName: string) => {
        let classes = "w-full px-5 py-3 rounded-lg bg-[var(--color-brilliant-white)] text-[var(--color-carbon)] placeholder-[var(--color-carbon)]/60 focus:outline-none transition-all duration-200 border border-[var(--color-feather-gray)]";
        classes += " focus:border-[var(--color-sunstone-orange)] focus:ring-2 focus:ring-[var(--color-sunstone-orange)]/50";
        if (validationErrors[fieldName]) {
            classes += " border-red-500 ring-red-500/50";
        }
        return classes;
    };
    
    return (
        <main className="bg-[var(--color-cloud-gray)] text-[var(--color-carbon)]">
            <section className="relative w-full bg-[var(--color-feather-gray)] overflow-hidden">
                <motion.div
                    ref={contactSectionRef}
                    initial="hidden"
                    animate={contactSectionInView ? "visible" : "hidden"}
                    variants={sectionVariants}
                    className="max-w-6xl mx-auto min-h-screen grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left px-4 pt-28 pb-12 md:pt-24"
                >
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <h1 className="font-playfair text-[48px] md:text-[64px] font-bold leading-tight mb-6">
                            Hablemos de tu <span>Imperio Digital</span>
                        </h1>
                        <p className="font-inter text-lg md:text-xl text-[var(--color-carbon)]/80 leading-relaxed mb-8">
                            Estás a un paso de comenzar la construcción de tu activo digital. Completa el formulario o contáctanos directamente. Usualmente respondemos en menos de 24 horas.
                        </p>
                        <ul className="space-y-4 font-inter text-[var(--color-carbon)]/90 text-lg">
                            <li className="flex items-center">
                                <FaWhatsapp className="text-[var(--color-sunstone-orange)] mr-3 text-xl flex-shrink-0" />
                                <span>WhatsApp: (223) 237-5309</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="text-[var(--color-sunstone-orange)] mr-3 text-xl flex-shrink-0" />
                                <span>Email: contacto@imperiodigitalrd.com</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-[var(--color-cloud-gray)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--color-feather-gray)] w-full"
                    >
                        {/* Buttons and conditional logic removed, only the main form remains */}
                        <h2 className="font-playfair text-[28px] font-bold leading-tight mb-6 text-center">
                            Agenda tu Consulta Gratis
                        </h2>
                        <form onSubmit={handleSubmitContactForm} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="sr-only">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Nombre Completo"
                                    required
                                    className={getInputClassNames("fullName")}
                                />
                                <AnimatePresence>
                                    {validationErrors.fullName && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                            className="text-red-600 text-sm mt-1"
                                        >
                                            {validationErrors.fullName}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                    className={getInputClassNames("email")}
                                />
                                <AnimatePresence>
                                    {validationErrors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                            className="text-red-600 text-sm mt-1"
                                        >
                                            {validationErrors.email}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <label htmlFor="whatsappNumber" className="sr-only">Número de WhatsApp (Opcional)</label>
                                <input
                                    type="tel"
                                    id="whatsappNumber"
                                    name="whatsappNumber"
                                    value={formData.whatsappNumber}
                                    onChange={handleChange}
                                    placeholder="Número de WhatsApp (Opcional)"
                                    className={getInputClassNames("whatsappNumber")}
                                />
                            </div>
                            <div>
                                <label htmlFor="interestedService" className="sr-only">Servicio de Interés</label>
                                <select id="interestedService" name="interestedService" value={formData.interestedService} onChange={handleChange} className={getInputClassNames("interestedService")}>
                                    <option value="" disabled>¿En qué servicio estás interesado? (Opcional)</option>
                                    <option value="Diseño Web de Alta Conversión">Diseño Web de Alta Conversión</option>
                                    <option value="Sistemas de Marketing Automatizado">Sistemas de Marketing Automatizado</option>
                                    <option value="Planes de Mantenimiento y Crecimiento Continuo">Planes de Mantenimiento y Crecimiento Continuo</option>
                                    <option value="Imperio a la Medida (Personalizado)">Imperio a la Medida (Personalizado)</option>
                                    <option value="Consulta General">Consulta General</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Tu mensaje</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Cuéntanos brevemente sobre tu negocio y tus metas..." rows={4} required className={getInputClassNames("message") + " resize-y"}></textarea>
                                <AnimatePresence>
                                    {validationErrors.message && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                            className="text-red-600 text-sm mt-1"
                                        >
                                            {validationErrors.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03, boxShadow: `0px 8px 20px rgba(255, 107, 0, 0.4)` }}
                                className="w-full bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center"
                                disabled={submitStatus === "loading"}
                            >
                                {submitStatus === "loading" && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
                                {submitStatus === "idle" && "Agendar Consulta"}
                                {submitStatus === "loading" && "Enviando..."}
                                {submitStatus === "success" && "Consulta Agendada"}
                                {submitStatus === "error" && "Reintentar"}
                            </motion.button>
                            <AnimatePresence>
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 p-3 bg-green-500/10 text-green-700 rounded-lg flex items-center justify-center font-semibold"
                                    >
                                        <FaCheckCircle className="mr-2" /> ¡Mensaje enviado con éxito!
                                    </motion.div>
                                )}
                                {submitStatus === "error" && errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 p-3 bg-red-500/10 text-red-600 rounded-lg flex items-center justify-center font-semibold"
                                    >
                                        <FaTimesCircle className="mr-2" /> {errorMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}
