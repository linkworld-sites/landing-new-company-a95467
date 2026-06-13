'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const logotype = ['G', 'o', 'l', 'd', 'e', 'n', ' ', 'B', 'a', 't', 'c', 'h'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.6]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed hero image with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-[115%]"
        style={prefersReducedMotion ? {} : { y: imageY }}
      >
        <Image
          src="/images/hero.png"
          alt="Granola cascading from a ceramic jar"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-molasses/10" />
      </motion.div>

      {/* Centered logotype — burns through at low opacity */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          style={prefersReducedMotion ? { opacity: 0.3 } : { opacity: logoOpacity }}
          className="text-center"
        >
          <div
            className="font-playfair italic text-parchment select-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.02em' }}
            aria-label="Golden Batch"
          >
            {logotype.map((char, i) => (
              <motion.span
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="font-label text-parchment/80 text-xs mt-4"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Small-Batch &nbsp;·&nbsp; Limited Run &nbsp;·&nbsp; Seasonal
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="font-label text-parchment/60 text-[10px]">Scroll</span>
        <motion.div
          className="w-px h-10 bg-parchment/40 origin-top"
          animate={prefersReducedMotion ? {} : { scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
