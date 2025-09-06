"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { usePathname } from "next/navigation";

interface ContactFormProps {
  initialService?: string;
  formTitle?: string;
  ctaText?: string;
}

export default function ContactForm({
  initialService = '',
  formTitle = 'Envíanos un Mensaje',
  ctaText = 'Enviar Mensaje'
}: ContactFormProps) {
  const pathname = usePathname();
  const isPreciosPage = pathname === "/precios";

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    interestedService: initialService,
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateContactForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "El nombre completo es requerido.";
    }
    if (!formData.email.trim()) {
      errors.email = "El email es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El formato del email no es válido";
    }
    if (!formData.message.trim()) {
      errors.message = "Por favor, cuéntanos sobre tu negocio";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateContactForm()) {
      setSubmitStatus('error');
      setErrorMessage('Por favor, corrige los errores en el formulario');
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          attributes: { FIRSTNAME: formData.fullName },
          listIds: [12],
        }),
      });
    } catch (err) {
      console.error("Brevo API call failed:", err);
    }

    setSubmitStatus('success');
    setFormData({
      fullName: '',
      email: '',
      whatsappNumber: '',
      interestedService: '',
      message: ''
    });
  };

  const getInputClassNames = (fieldName: string) => {
    let classes =
      "w-full px-5 py-3 rounded-lg bg-atmospheric-gray text-stark-white placeholder-stark-white/40 focus:outline-none transition-all duration-200 ease-custom-bezier border border-atmospheric-gray";
    classes += " focus:border-cyber-flare focus:ring-2 focus:ring-cyber-flare/50";
    if (submitStatus === 'success' && !validationErrors[fieldName]) {
      classes += " border-success-green";
    } else if (validationErrors[fieldName]) {
      classes += " border-error-red";
    }
    return classes;
  };

  return (
    <div
      className={[
        "bg-imperial-void rounded-xl shadow-2xl border-2 border-liquid-gold w-full",
        isPreciosPage ? "p-6 md:p-8" : "p-8 md:p-10",
      ].join(" ")}
    >
      <h2
        className={[
          "font-playfair text-stark-white font-bold leading-tight text-center",
          isPreciosPage ? "text-2xl mb-4" : "text-3xl mb-6",
        ].join(" ")}
      >
        {formTitle}
      </h2>

      <form onSubmit={handleSubmit} className={isPreciosPage ? "space-y-4" : "space-y-6"}>
        {/* Nombre */}
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
            className={getInputClassNames('fullName')}
          />
          <AnimatePresence>
            {validationErrors.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error-red text-sm mt-1"
              >
                {validationErrors.fullName}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
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
            className={getInputClassNames('email')}
          />
          <AnimatePresence>
            {validationErrors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error-red text-sm mt-1"
              >
                {validationErrors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="whatsappNumber" className="sr-only">Número de WhatsApp (Opcional)</label>
          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="Número de WhatsApp (Opcional)"
            className={getInputClassNames('whatsappNumber')}
          />
        </div>

        {/* Servicio de Interés */}
        <div>
          <label htmlFor="interestedService" className="sr-only">Servicio de Interés</label>
          <select
            id="interestedService"
            name="interestedService"
            value={formData.interestedService}
            onChange={handleChange}
            className={getInputClassNames('interestedService')}
          >
            <option value="" disabled>¿En qué servicio estás interesado? (Opcional)</option>
            <option value="Diseño Web de Alta Conversión">Diseño Web de Alta Conversión</option>
            <option value="Sistemas de Marketing Automatizado">Sistemas de Marketing Automatizado</option>
            <option value="Planes de Mantenimiento y Crecimiento Continuo">Planes de Mantenimiento y Crecimiento Continuo</option>
            <option value="Imperio a la Medida (Personalizado)">Imperio a la Medida (Personalizado)</option>
            <option value="Consulta General">Consulta General</option>
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="sr-only">Tu mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos brevemente sobre tu negocio y tus metas..."
            rows={isPreciosPage ? 4 : 5}
            required
            className={getInputClassNames('message') + " resize-y"}
          ></textarea>
          <AnimatePresence>
            {validationErrors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error-red text-sm mt-1"
              >
                {validationErrors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 229, 255, 0.4)" }}
          className="w-full bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ease-custom-bezier cursor-pointer flex items-center justify-center"
          disabled={submitStatus === 'loading'}
        >
          {submitStatus === 'loading' && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-imperial-void" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {submitStatus === 'idle' && ctaText}
          {submitStatus === 'loading' && 'Enviando...'}
          {submitStatus === 'success' && 'Mensaje Enviado'}
          {submitStatus === 'error' && 'Reintentar'}
        </motion.button>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-success-green/20 text-success-green rounded-lg flex items-center justify-center font-semibold"
            >
              <FaCheckCircle className="mr-2" /> ¡Mensaje enviado con éxito!
            </motion.div>
          )}
          {submitStatus === 'error' && errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-error-red/20 text-error-red rounded-lg flex items-center justify-center font-semibold"
            >
              <FaTimesCircle className="mr-2" /> {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
