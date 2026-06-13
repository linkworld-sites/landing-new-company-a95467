'use client';

import { motion, useReducedMotion } from 'framer-motion';

const batches = [
  {
    season: 'Summer 2026',
    flavour: 'Lemon Verbena & Poppy',
    status: 'Sold Out',
    note: 'A bright, herbal batch from Provençal herb fields. Sold out in 72 hours.',
    span: 'row-span-1',
  },
  {
    season: 'Spring 2026',
    flavour: 'Elderflower & Pistachio',
    status: 'Back in Stock',
    note: 'Rare restock. Elderflower collected at peak bloom, pistachios from a Sicilian co-operative.',
    span: 'row-span-2',
  },
  {
    season: 'Winter 2025',
    flavour: 'Blood Orange & Dark Chocolate',
    status: 'Sold Out',
    note: 'Our most requested batch. A cold-morning recipe built around Sicilian blood orange zest.',
    span: 'row-span-1',
  },
  {
    season: 'Autumn 2025',
    flavour: 'Quince & Cardamom',
    status: 'Sold Out',
    note: 'Slow-poached quince from a small Welsh orchard, cardamom from the Cardamom Hills of Kerala.',
    span: 'row-span-1',
  },
  {
    season: 'Summer 2025',
    flavour: 'Wild Strawberry & Rose',
    status: 'Sold Out',
    note: 'Freeze-dried wild strawberries. Not the supermarket kind — small, perfumed, imperfect.',
    span: 'row-span-2',
  },
  {
    season: 'Spring 2025',
    flavour: 'Apricot & Fennel Seed',
    status: 'Sold Out',
    note: 'The batch that started everything. Still the flavour most people describe as "home."',
    span: 'row-span-1',
  },
];

export default function Archive() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="archive" className="bg-oat-cream py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-label text-toasted-amber text-xs">The Archive</span>
          <h2
            className="font-playfair text-molasses mt-3 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Past Batches
          </h2>
          <p className="font-dm-sans text-ink-brown/70 text-base mt-4 max-w-md leading-relaxed">
            Every season, one batch. When it&apos;s gone, it&apos;s gone — until the rare restock
            that makes the waitlist worth joining.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {batches.map((batch, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="relative bg-parchment p-6 md:p-8 cursor-default group"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -4,
                        boxShadow: '0 12px 36px rgba(43,26,14,0.12)',
                      }
                }
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                {/* Recipe-card corner ornament */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-toasted-amber/20 rotate-45" />

                <span className="font-label text-toasted-amber/70 text-[10px]">{batch.season}</span>

                <h3
                  className="font-playfair italic text-molasses mt-2 mb-3 leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  {batch.flavour}
                </h3>

                <p className="font-dm-sans text-ink-brown/70 text-sm leading-relaxed mb-5">
                  {batch.note}
                </p>

                {/* Status stamp */}
                <span
                  className={`inline-block font-label text-[10px] px-3 py-1 border ${
                    batch.status === 'Sold Out'
                      ? 'border-ink-brown/30 text-ink-brown/40'
                      : 'border-toasted-amber text-toasted-amber'
                  }`}
                >
                  {batch.status}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
