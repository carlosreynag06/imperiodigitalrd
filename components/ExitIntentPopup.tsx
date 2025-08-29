// components/ExitIntentPopup.tsx 
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase"; // write popup leads to Supabase

type Status = "idle" | "loading" | "success" | "error";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  // Lead gate state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<Status>("idle");
  const [leadMessage, setLeadMessage] = useState<string>("");

  // Refs for basic focus trap + restoration
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Keys / timing
  const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
  const LAST_SHOWN_KEY = "exit-intent-last-shown";
  const SESSION_FLAG_KEY = "exit-intent-shown";

  // --- Cookie fallback helpers (used only if localStorage is unavailable) ---
  const setCookie = (name: string, value: string, days: number) => {
    try {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; expires=${expires}; path=/; SameSite=Lax`;
    } catch {}
  };

  const getCookie = (name: string): string | null => {
    try {
      const re = new RegExp(
        `(?:^|; )${name.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&")}=([^;]*)`
      );
      const match = document.cookie.match(re);
      return match ? decodeURIComponent(match[1]) : null;
    } catch {
      return null;
    }
  };

  const getLastShown = (): number | null => {
    try {
      const raw = localStorage.getItem(LAST_SHOWN_KEY);
      if (raw) {
        const n = parseInt(raw, 10);
        if (!isNaN(n)) return n;
      }
    } catch {}
    const fromCookie = getCookie(LAST_SHOWN_KEY);
    if (fromCookie) {
      const n = parseInt(fromCookie, 10);
      if (!isNaN(n)) return n;
    }
    return null;
  };

  const setLastShown = (ts: number) => {
    try {
      localStorage.setItem(LAST_SHOWN_KEY, String(ts));
    } catch {
      setCookie(LAST_SHOWN_KEY, String(ts), 2);
    }
  };

  // Unified close that also sets 24h cooldown
  const closeAndCooldown = () => {
    setLastShown(Date.now());
    setIsVisible(false);
  };

  // Show logic (mouse leaves viewport top). Respect 24h cooldown + per-session flag.
  useEffect(() => {
    const lastShown = getLastShown();
    if (lastShown && Date.now() - lastShown < COOLDOWN_MS) return;

    try {
      const hasSeenPopup = sessionStorage.getItem(SESSION_FLAG_KEY);
      if (hasSeenPopup) return;
    } catch {}

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        // Re-check cooldown and session flag at event time
        const last = getLastShown();
        if (last && Date.now() - last < COOLDOWN_MS) return;
        try {
          if (sessionStorage.getItem(SESSION_FLAG_KEY)) return;
        } catch {}

        setIsVisible(true);
        try {
          sessionStorage.setItem(SESSION_FLAG_KEY, "true");
        } catch {}
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Accessibility: focus trap + ESC close + focus restoration
  useEffect(() => {
    if (!isVisible) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Focus the close button after opening
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeAndCooldown();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (current === first || !modalRef.current?.contains(current)) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      } else {
        if (current === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", keydownHandler);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isVisible]);

  // Open form and focus input
  useEffect(() => {
    if (isFormOpen) {
      const t = setTimeout(() => emailInputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [isFormOpen]);

  // ===== Lead submit: Supabase + Brevo =====
  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setLeadStatus("error");
      setLeadMessage("Por favor, ingresa un email válido.");
      return;
    }

    setLeadStatus("loading");
    setLeadMessage("");

    // 1) Insert into Supabase (new table)
    try {
      const { error: supaErr } = await supabase
        .from("exit_intent_leads")
        .insert([{ email, source: "exit_intent_popup" }]); // removed 'status'

      if (supaErr) {
        // Do not block Brevo — just log for diagnosis
        console.error("Supabase insert error (exit-intent):", supaErr);
      }
    } catch (err) {
      console.error("Supabase insert exception (exit-intent):", err);
    }

    // 2) Also add to Brevo list #11 to trigger automation
    try {
      const response = await fetch("/api/brevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          listIds: [11],
          event: "resource_request",
          attributes: {
            SOURCE: "ExitIntentPopup",
            RESOURCE: "Guía de Automatización",
            SLUG: "guia-automatizacion",
          },
        }),
      });

      if (!response.ok) {
        setLeadStatus("error");
        setLeadMessage("Hubo un problema al procesar tu solicitud. Intenta nuevamente");
        return;
      }

      setLeadStatus("success");
      setLeadMessage("¡Listo! Te enviamos el recurso por email");
      setLastShown(Date.now());
    } catch {
      setLeadStatus("error");
      setLeadMessage("Hubo un problema al procesar tu solicitud. Intenta nuevamente");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 sm:p-6"
          onClick={closeAndCooldown}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 12, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md sm:max-w-lg rounded-3xl bg-imperial-void border-2 border-liquid-gold shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              ref={closeBtnRef}
              onClick={closeAndCooldown}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-flare rounded-full p-1"
            >
              <FiX size={24} />
            </button>

            {/* Top Icon */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#00E5FF"
                className="w-10 h-10 sm:w-12 sm:h-12"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12h19.5M12 2.25c2.485 2.516 4.035 5.876 4.035 9.75 0 3.874-1.55 7.234-4.035 9.75M12 2.25c-2.485 2.516-4.035 5.876-4.035 9.75 0 3.874-1.55 7.234-4.035 9.75"
                />
              </svg>
            </div>

            {/* Text Content */}
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10 text-center">
              <h2 id="exit-intent-title" className="text-2xl sm:text-3xl font-bold text-liquid-gold">
                Sé el Dueño de tu Futuro Digital
              </h2>

              <p className="mt-3 sm:mt-4 text-white/80 text-base sm:text-lg leading-relaxed">
                Aprende a construir un activo digital donde tú tienes el
                control total
              </p>

              {/* Primary CTA: abre el formulario inline */}
              {!isFormOpen && (
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="mt-6 block w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-cyber-flare to-blue-500 text-black font-semibold hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-cyber-flare mx-auto"
                >
                  Descargar Guía Gratis
                </button>
              )}

              {/* Inline email form (gated) */}
              {isFormOpen && (
                <form onSubmit={handleLeadSubmit} className="mt-6 flex flex-col sm:flex-row items-stretch gap-3 justify-center">
                  <input
                    ref={emailInputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email"
                    className="flex-1 min-w-0 px-4 py-3 rounded-full bg-atmospheric-gray text-stark-white placeholder-stark-white/40 focus:outline-none focus:ring-2 focus:ring-cyber-flare border border-atmospheric-gray"
                    disabled={leadStatus === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-cyber-flare to-blue-500 text-imperial-void font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyber-flare"
                  >
                    {leadStatus === "loading" ? "Enviando..." : "Enviar por Email"}
                  </button>
                </form>
              )}

              {/* Confirmation / error text */}
              {isFormOpen && leadMessage && (
                <p className={`mt-3 text-sm ${leadStatus === "success" ? "text-success-green" : "text-error-red"}`}>
                  {leadMessage}
                </p>
              )}

              {/* Secondary Dismiss — separated to avoid overlap */}
              <button
                type="button"
                onClick={closeAndCooldown}
                className="mt-4 block mx-auto text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-flare rounded"
              >
                No, gracias
              </button>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
