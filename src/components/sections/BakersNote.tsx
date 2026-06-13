'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export default function BakersNote() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-oat-cream py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-label text-toasted-amber text-xs">A Note from the Baker</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start">
          {/* Essay — narrow column, ~52ch */}
          <motion.div
            className="max-w-[52ch]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-playfair text-molasses leading-relaxed mb-6"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
            >
              The first batch I ever made was for a farmers&apos; market stall in November 2018. I
              had no logo, no packaging, no pitch. I had a jar of granola and a handwritten card
              that said{' '}
              <em>&ldquo;Wild honey. Smoked almond. Made this week.&rdquo;</em>
            </p>
            <p
              className="font-playfair text-ink-brown/80 leading-relaxed mb-6"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
            >
              By eleven in the morning it was gone. Not because I had priced it cleverly or
              marketed it well. Because it tasted honest. Because people could smell the toasted
              oat from three stalls away and follow their nose.
            </p>
            <p
              className="font-playfair text-ink-brown/80 leading-relaxed mb-6"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
            >
              Golden Batch exists because I believe breakfast should be the slowest part of the day.
              Not a nutrition delivery mechanism. Not a wellness product. A small, deliberate act
              of care — for the grain, for the season, and for the hour before everything else
              starts.
            </p>
            <p
              className="font-playfair italic text-molasses"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
            >
              I hope the next box arrives on a morning you need it.
            </p>
            <p className="font-dm-sans text-ink-brown/50 text-sm mt-6 font-label">
              — Eleanor H., Founder &amp; Baker
            </p>
          </motion.div>

          {/* Portrait offset to right margin */}
          <motion.div
            className="w-56 md:w-64 shrink-0 relative"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/process.png"
                alt="Eleanor, baker and founder of Golden Batch"
                fill
                className="object-cover object-center"
                sizes="280px"
              />
            </div>
            <div className="absolute -top-3 -left-3 w-12 h-12 border border-toasted-amber/30" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border border-toasted-amber/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
