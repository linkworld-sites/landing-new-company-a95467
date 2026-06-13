'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';

export default function ProductFeature() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const watermarkSize = useTransform(scrollYProgress, [0.1, 0.8], ['18vw', '28vw']);
  const watermarkOpacity = useTransform(scrollYProgress, [0.1, 0.8], [0.04, 0.10]);

  return (
    <section ref={ref} id="this-season" className="bg-oat-cream py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 items-start">
          {/* Left: tall lifestyle photograph */}
          <motion.div
            className="relative aspect-[3/4] w-full overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/material.png"
              alt="Raw seasonal ingredients laid on linen"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right: season name watermark + copy + CTA */}
          <div className="relative flex flex-col justify-center pt-12 md:pt-24 pb-8">
            {/* Watermark season word */}
            <motion.div
              className="absolute top-0 left-0 right-0 font-playfair font-bold text-molasses pointer-events-none select-none leading-none overflow-hidden"
              style={
                prefersReducedMotion
                  ? { fontSize: '22vw', opacity: 0.06 }
                  : { fontSize: watermarkSize, opacity: watermarkOpacity }
              }
              aria-hidden="true"
            >
              AUTUMN
            </motion.div>

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <span className="font-label text-toasted-amber text-xs">
                This Season&apos;s Batch — Autumn 2026
              </span>

              <h2
                className="font-playfair text-molasses mt-4 mb-6 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Black Fig,
                <br />
                Toasted Oat &amp;
                <br />
                <em>a Whisper of Clove.</em>
              </h2>

              <p className="font-dm-sans text-ink-brown/80 text-base leading-relaxed max-w-md mb-10">
                Dark, jammy black figs sourced from a single orchard in Andalusia. Slow-toasted
                whole oats that shatter at first spoonful. Clove pressed in small measures — a
                fragrance more than a flavour, weaving warmth through every bowl.
              </p>

              <p className="font-dm-sans text-ink-brown/60 text-sm mb-8 leading-relaxed">
                Small-batch. Limited run. Gone when it&apos;s gone.
              </p>

              <CTAButton href="#subscribe" variant="amber" trackIntent>
                Join the Autumn Batch
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
