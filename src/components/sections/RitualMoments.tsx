'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const testimonials = [
  {
    quote: 'The smell when you open the box — that alone is worth the subscription.',
    attribution: 'Martha H., Edinburgh',
    bg: '#EDE5D0',
  },
  {
    quote: 'I have been eating granola for twenty years. I did not know it could taste like this.',
    attribution: 'Tom B., Bristol',
    bg: '#F5EFE0',
  },
  {
    quote: 'My morning ritual has not changed since the first Autumn box arrived.',
    attribution: 'Sofia P., Lisbon',
    bg: '#EDE5D0',
  },
  {
    quote:
      'The fact that it sells out every season tells you everything. I set a reminder for the restock.',
    attribution: 'James K., London',
    bg: '#F5EFE0',
  },
  {
    quote: 'We serve it at the café on Saturdays. People ask about it every single week.',
    attribution: 'Nadia O., Amsterdam',
    bg: '#EDE5D0',
  },
];

export default function RitualMoments() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment py-20 md:py-28 overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6 md:px-12 mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="font-label text-toasted-amber text-xs">Ritual Moments</span>
        <h2
          className="font-playfair text-molasses mt-3 leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Your morning,
          <br />
          <em>made slowly.</em>
        </h2>
      </motion.div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-12 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="shrink-0 w-[85vw] sm:w-[55vw] md:w-[40vw] lg:w-[32vw] p-8 md:p-10 flex flex-col justify-between"
            style={{ backgroundColor: t.bg }}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-playfair italic text-molasses leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-dm-sans text-ink-brown/50 text-xs mt-6 font-label">
              — {t.attribution}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
