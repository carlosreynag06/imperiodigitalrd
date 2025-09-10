"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLoader, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type Status = "idle" | "loading" | "success" | "error";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<Status>("idle");
  const [leadMessage, setLeadMessage] = useState<string>("");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // --- Full Cooldown and Session Logic (Restored from your original code) ---
  const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
  const LAST_SHOWN_KEY = "exit-intent-last-shown";
  const SESSION_FLAG_KEY = "exit-intent-shown";

  function setLastShown() {
    try {
      localStorage.setItem(LAST_SHOWN_KEY, String(Date.now()));
    } catch {}
  }

  function handleClose() {
    setLastShown();
    setIsVisible(false);
  }

  useEffect(() => {
    const getLastShown = (): number | null => {
      try {
        const raw = localStorage.getItem(LAST_SHOWN_KEY);
        if (raw) {
          const n = parseInt(raw, 10);
          if (!isNaN(n)) return n;
        }
      } catch {}
      return null;
    };

    const hasSeenInSession = (): boolean => {
      try {
        return sessionStorage.getItem(SESSION_FLAG_KEY) === "true";
      } catch {}
      return false;
    };

    const lastTop = getLastShown();
    if (lastTop != null && Date.now() - lastTop < COOLDOWN_MS) return;
    if (hasSeenInSession()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isVisible) {
        const last = getLastShown();
        if (last != null && Date.now() - last < COOLDOWN_MS) return;
        if (hasSeenInSession()) return;

        setIsVisible(true);
        try {
          sessionStorage.setItem(SESSION_FLAG_KEY, "true");
        } catch {}
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isVisible, COOLDOWN_MS]);

  // --- Accessibility: Focus Trap & ESC close (Restored) ---
  useEffect(() => {
    if (!isVisible) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      // Basic focus trap
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [isVisible, handleClose]);

  // --- Brevo API Integration (Restored) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setLeadStatus("error");
      setLeadMessage("Por favor, ingresa un email válido.");
      return;
    }
    setLeadStatus("loading");
    setLeadMessage("");

    try {
      const response = await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          listIds: [11], // Target list for the automation guide
          attributes: {
            SOURCE: "ExitIntentPopup",
            RESOURCE: "Guía Estratégica",
          },
        }),
      });

      if (!response.ok) throw new Error("API response not ok");

      setLeadStatus("success");
      setLeadMessage("¡Listo! Te hemos enviado el recurso por email.");
      setLastShown(); // Set cooldown on success
      setTimeout(() => setIsVisible(false), 3000); // Close after 3s on success
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage("Hubo un problema. Intenta nuevamente.");
      console.error("Exit-intent submission failed:", error);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4" onClick={handleClose}>
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-xl bg-[var(--color-carbon)] text-white p-8 text-center shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleClose} aria-label="Cerrar" className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
              <FiX size={24} />
            </button>

            <h2 id="exit-intent-title" className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-brilliant-white)] leading-tight whitespace-pre-line">
              {/* CORRECTED: Using your specified copy */}
              ¿Y si mañana te cierran las redes sociales?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-md mx-auto whitespace-pre-line">
              Toma el control y aprende a construir tu propio Imperio Digital
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full max-w-sm px-4 py-3 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-sunstone-orange)] border border-transparent"
              />
              <button
                type="submit"
                disabled={leadStatus === "loading"}
                className="w-full max-w-sm px-6 py-3 rounded-full bg-[var(--color-sunstone-orange)] text-[var(--color-brilliant-white)] font-semibold shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
              >
                {leadStatus === "loading" && <FiLoader className="animate-spin mr-2" />}
                Descarga tu Guía GRATIS
              </button>
              <AnimatePresence>
                {leadMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`mt-2 text-sm flex items-center gap-2 ${
                      leadStatus === "success" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {leadStatus === "success" && <FiCheckCircle />}
                    {leadStatus === "error" && <FiAlertCircle />}
                    {leadMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
