'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

function RoastIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="text-toasted-amber"
    >
      {/* Oven tray */}
      <rect x="6" y="32" width="36" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Granola dots in tray */}
      <circle cx="14" cy="36" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="19" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="24" cy="36.5" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="29" cy="35" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="34" cy="36" r="1.5" fill="currentColor" opacity="0.6" />
      {/* Heat waves */}
      <path
        d="M16 26 Q17.5 22 16 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M24 25 Q25.5 21 24 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M32 26 Q33.5 22 32 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Timer dial suggestion */}
      <circle cx="8" cy="36" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="36" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function AboutRoasting() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const visible = inView || prefersReducedMotion;

  return (
    <section
      ref={ref}
      className="bg-parchment py-20 md:py-28 px-6"
      aria-labelledby="about-roasting-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05, ease }}
        >
          <RoastIcon />
        </motion.div>

        {/* Eyebrow label */}
        <motion.span
          className="font-label text-toasted-amber text-[11px] block mb-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12, ease }}
        >
          The craft
        </motion.span>

        {/* Heading */}
        <motion.h2
          id="about-roasting-heading"
          className="font-playfair italic text-ink-brown leading-tight mb-6"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.01em' }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease }}
        >
          About our roasting
        </motion.h2>

        {/* Amber rule */}
        <motion.div
          className="mx-auto mb-7 h-px w-12 bg-toasted-amber"
          initial={prefersReducedMotion ? {} : { scaleX: 0, opacity: 0 }}
          animate={visible ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          style={{ originX: 0.5 }}
        />

        {/* Body copy */}
        <motion.p
          className="font-dm-sans text-ink-brown/70 text-base md:text-lg leading-relaxed"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.42, ease }}
        >
          Every bag starts with a small tray, a low oven, and an unhurried hour. We roast our
          granola slowly — by hand, in batches small enough that each tray gets our full attention
          — so the oats caramelise evenly and the nuts never scorch. The moment a batch is done,
          it's packed and posted. No warehouse storage, no best-before guessing: you receive
          granola at the peak of its flavour, never from a shelf.
        </motion.p>
      </div>
    </section>
  );
}
