"use client"; 

 import { useEffect, useState } from "react"; 
 import { motion, AnimatePresence } from "framer-motion"; 
 import { FiX } from "react-icons/fi"; 

 export default function ExitIntentPopup() { 
   const [isVisible, setIsVisible] = useState(false); 

   useEffect(() => { 
     const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours 
     const LAST_SHOWN_KEY = "exit-intent-last-shown"; 
     const SESSION_FLAG_KEY = "exit-intent-shown"; 

     // Check 24h cooldown (persisted across sessions) 
     try { 
       const lastShownRaw = localStorage.getItem(LAST_SHOWN_KEY); 
       if (lastShownRaw) { 
         const lastShown = parseInt(lastShownRaw, 10); 
         if (!isNaN(lastShown) && Date.now() - lastShown < COOLDOWN_MS) { 
           return; // within cooldown -> do not attach listener / do not show 
         } 
       } 
     } catch { 
       // ignore storage access errors 
     } 

     // Keep original per-session behavior 
     const hasSeenPopup = sessionStorage.getItem(SESSION_FLAG_KEY); 
     if (hasSeenPopup) return; 

     const handleMouseLeave = (e: MouseEvent) => { 
       if (e.clientY <= 0) { 
         setIsVisible(true); 
         sessionStorage.setItem(SESSION_FLAG_KEY, "true"); 
         try { 
           localStorage.setItem(LAST_SHOWN_KEY, String(Date.now())); 
         } catch { 
           // ignore storage access errors 
         } 
       } 
     }; 

     document.addEventListener("mouseleave", handleMouseLeave); 
     return () => { 
       document.removeEventListener("mouseleave", handleMouseLeave); 
     }; 
   }, []); 

   return ( 
     <AnimatePresence> 
       {isVisible && ( 
         <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           exit={{ opacity: 0 }} 
           transition={{ duration: 0.2 }} 
           className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4" 
           onClick={() => setIsVisible(false)} 
         > 
           <motion.div 
             initial={{ y: 12, opacity: 0, scale: 0.985 }} 
             animate={{ y: 0, opacity: 1, scale: 1 }} 
             exit={{ y: 12, opacity: 0, scale: 0.985 }} 
             transition={{ duration: 0.28, ease: "easeOut" }} 
             className="relative w-full max-w-md rounded-3xl bg-imperial-void border-2 border-liquid-gold shadow-2xl overflow-hidden" 
             onClick={(e) => e.stopPropagation()} 
           > 
             {/* Top Icon */} 
             <div className="flex justify-center mt-6"> 
               <svg 
                 xmlns="http://www.w3.org/2000/svg" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 strokeWidth={1.5} 
                 stroke="#00E5FF" 
                 className="w-10 h-10" 
               > 
                 <path 
                   strokeLinecap="round" 
                   strokeLinejoin="round" 
                   d="M12 21a9 9 0 100-18 9 9 0 000 18z" 
                 /> 
                 <path 
                   strokeLinecap="round" 
                   strokeLinejoin="round" 
                   d="M2.25 12h19.5M12 2.25c2.485 2.516 4.035 5.876 4.035 9.75 0 3.874-1.55 7.234-4.035 9.75M12 2.25c-2.485 2.516-4.035 5.876-4.035 9.75 0 3.874 1.55 7.234-4.035 9.75" 
                 /> 
               </svg> 
             </div> 

             {/* Close Button */} 
             <button 
               onClick={() => setIsVisible(false)} 
               className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors" 
             > 
               <FiX size={24} /> 
             </button> 

             {/* Text Content */} 
             <div className="px-8 pb-8 text-center"> 
               <h2 className="text-2xl font-bold text-liquid-gold mt-4"> 
                 Sé el Dueño de tu Futuro Digital 
               </h2> 
               <p className="mt-3 text-white/80 text-lg leading-relaxed"> 
                 Aprende a construir un activo digital donde tú tienes el 
                 control total 
               </p> 
               <a 
                 href="#" 
                 className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyber-flare to-blue-500 text-black font-semibold hover:opacity-90 transition" 
               > 
                 Descargar Guía Gratis 
             	</a> 
             	<div className="mt-4 text-sm text-white/60 hover:text-white cursor-pointer"> 
             	  No, gracias 
           	  </div> 
           	  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div> 
           	</div> 
           </motion.div> 
         </motion.div> 
       )} 
     </AnimatePresence> 
   ); 
 }