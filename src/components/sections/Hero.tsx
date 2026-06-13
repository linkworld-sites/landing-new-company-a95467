'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { track } from '@/lib/funnel';

const trustItems = [
  {
    label: 'Roasted & shipped within 48 hrs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7v5.25l3 1.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Free shipping on orders over £40',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 7l9-4 9 4M3 7l9 4m-9-4v9l9 4m0-13l9 4m-9-4v13m9-13v9l-9 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Pause or cancel anytime',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

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
        <div className="absolute inset-0 bg-molasses/58" />
      </motion.div>

      {/* Hero content — centered, padded above trust bar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-24 text-center">
        {/* Brand label */}
        <motion.span
          className="font-label text-toasted-amber text-[11px] mb-5"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Golden Batch &nbsp;·&nbsp; Small-Batch Artisan Granola
        </motion.span>

        {/* Main headline */}
        <motion.h1
          className="font-playfair italic text-parchment leading-[1.05] max-w-4xl"
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 7rem)', letterSpacing: '-0.02em' }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Roasted to order —{' '}
          <br className="hidden sm:block" />
          <span className="text-toasted-amber">never from a shelf.</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          className="font-dm-sans text-parchment/75 text-base md:text-lg mt-6 max-w-xl leading-relaxed"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Each batch fires fresh in our Cotswolds kitchen, ships within 48 hours, and rotates
          with the season — a genuinely new flavour every delivery.
        </motion.p>

        {/* Savings callout pill */}
        <motion.div
          className="mt-7 inline-flex items-center gap-2.5 border border-toasted-amber/50 bg-molasses/40 backdrop-blur-sm px-5 py-2.5"
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-toasted-amber shrink-0" />
          <span className="font-label text-parchment text-[11px]">
            Subscribe &amp; save 15% — pause or cancel anytime
          </span>
        </motion.div>

        {/* Primary CTA — solid amber, high-contrast */}
        <motion.a
          href="#subscribe"
          className="relative mt-8 inline-flex items-center gap-3 bg-toasted-amber text-parchment font-dm-sans font-medium text-sm tracking-label uppercase px-10 py-4 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.97 }}
          onClick={() => track('intent')}
        >
          {!prefersReducedMotion && (
            <motion.span
              className="absolute inset-0 bg-molasses origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span className="relative z-10">Start My Subscription</span>
          <motion.span
            className="relative z-10 text-base leading-none"
            animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          >
            →
          </motion.span>
        </motion.a>

        {/* Free shipping note */}
        <motion.p
          className="font-label text-parchment/50 text-[10px] mt-3 tracking-wide"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Free shipping over 30 EUR
        </motion.p>
      </div>

      {/* Trust bar — 3 icons, pinned to the bottom of the hero */}
      <motion.div
        className="absolute bottom-0 inset-x-0 border-t border-parchment/12 bg-molasses/52 backdrop-blur-sm"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-3xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 sm:divide-x sm:divide-parchment/15">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 text-parchment/70 sm:px-8 first:pl-0 last:pr-0"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.35 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-toasted-amber shrink-0">{item.icon}</span>
              <span className="font-label text-[10px] whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
