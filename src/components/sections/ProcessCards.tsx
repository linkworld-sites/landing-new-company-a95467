'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'We Forage\nthe Season',
    body: 'Every autumn, we travel to the farms and orchards we trust — the same handful of growers we have shaken hands with for years. Ingredients are chosen when they peak, not when the calendar dictates.',
    bg: '#F5EFE0',
    text: '#2B1A0E',
  },
  {
    number: '02',
    title: 'We Bake in\nSmall Runs',
    body: 'No conveyor belts. No industrial ovens. Each batch is baked in a single rotation, hand-stirred at intervals, cooled on wire racks in our kitchen. Volume is limited by intention, not accident.',
    bg: '#EDE5D0',
    text: '#2B1A0E',
  },
  {
    number: '03',
    title: 'It Ships\nto Your Door',
    body: 'Your morning, made slowly. Packed in compostable kraft paper with a wax seal, shipped within 24 hours of baking. The date on the box is the date it left the oven.',
    bg: '#2B1A0E',
    text: '#F5EFE0',
  },
];

export default function ProcessCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="process" className="relative">
      {steps.map((step, i) => (
        <ProcessCard key={i} step={step} index={i} prefersReducedMotion={!!prefersReducedMotion} />
      ))}
    </section>
  );
}

function ProcessCard({
  step,
  index,
  prefersReducedMotion,
}: {
  step: (typeof steps)[0];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={ref} className="relative" style={{ height: '200vh' }}>
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ backgroundColor: step.bg }}
      >
        <div className="mx-auto max-w-5xl px-6 md:px-12 w-full">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="font-playfair italic block"
              style={{
                fontSize: 'clamp(5rem, 18vw, 18rem)',
                color: step.text,
                opacity: 0.08,
                lineHeight: 1,
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              {step.number}
            </span>
            <div className="-mt-4 md:-mt-12 relative z-10">
              <h3
                className="font-playfair font-normal whitespace-pre-line leading-tight mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                  color: step.text,
                }}
              >
                {step.title}
              </h3>
              <p
                className="font-dm-sans text-base leading-relaxed max-w-md"
                style={{ color: step.text, opacity: 0.7 }}
              >
                {step.body}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
