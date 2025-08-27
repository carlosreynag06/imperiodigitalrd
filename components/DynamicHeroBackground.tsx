'use client';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function DynamicHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    function handleMove(e: MouseEvent | TouchEvent) {
      if (!mounted || !layerRef.current) return;

      let x = 0.5, y = 0.5;
      if (e instanceof MouseEvent) {
        x = e.clientX / window.innerWidth;
        y = e.clientY / window.innerHeight;
      } else if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX / window.innerWidth;
        y = e.touches[0].clientY / window.innerHeight;
      }

      const moveX = (x - 0.5) * 50;
      const moveY = (y - 0.5) * 30;

      layerRef.current.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    }

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      mounted = false;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        ref={layerRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '150%',
          height: '150%',
          background: `linear-gradient(45deg, #0D0F1A, #16182D, #0D0F1A, #16182D)`,
          backgroundSize: '400% 400%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
}