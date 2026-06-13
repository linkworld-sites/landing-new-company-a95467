'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const hotspots = [
  {
    id: 'fig',
    x: '22%',
    y: '38%',
    ingredient: 'Black Fig',
    farm: 'Finca La Encina',
    county: 'Almería, Andalusia',
    note: 'Sun-dried on reed mats. Dense, jammy, with a faint anise finish.',
  },
  {
    id: 'oat',
    x: '58%',
    y: '28%',
    ingredient: 'Whole Rolled Oat',
    farm: 'Ballyhoura Mountain Grains',
    county: 'County Limerick, Ireland',
    note: 'Cold-milled from hulled oat. Nuttier than commercial varieties, with a clean cereal sweetness.',
  },
  {
    id: 'honey',
    x: '75%',
    y: '55%',
    ingredient: 'Wild Honey',
    farm: 'Briar Hill Apiary',
    county: 'Herefordshire, England',
    note: 'Raw, unfiltered. Buckwheat-forward with a deep molasses undertone.',
  },
  {
    id: 'almond',
    x: '42%',
    y: '65%',
    ingredient: 'Blanched Almond',
    farm: 'Mas La Sala',
    county: 'Tarragona, Catalonia',
    note: 'Slow-roasted whole, split during baking. Buttery without any bitterness.',
  },
  {
    id: 'clove',
    x: '65%',
    y: '18%',
    ingredient: 'Clove',
    farm: 'Zanzibar Clove Collective',
    county: 'Pemba Island, Tanzania',
    note: 'Used in micro-measure. Fragrance rather than flavour — warmth without heat.',
  },
];

export default function ProvenanceMap() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-label text-toasted-amber text-xs">Ingredient Provenance</span>
          <h2
            className="font-playfair text-molasses mt-3 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Sourced like wine.
            <br />
            <em>Treated like grain.</em>
          </h2>
          <p className="font-dm-sans text-ink-brown/70 text-base mt-4 max-w-md leading-relaxed">
            Every ingredient in the Autumn Batch has a postcode and a handshake behind it. Hover
            each marker to read the terroir note.
          </p>
        </motion.div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          {/* Ingredient photograph */}
          <Image
            src="/images/detail.png"
            alt="Raw ingredients laid flat on linen"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-parchment/20" />

          {/* Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute"
              style={{ left: spot.x, top: spot.y, transform: 'translate(-50%,-50%)' }}
            >
              <motion.button
                className="relative w-6 h-6 rounded-full border-2 border-toasted-amber bg-parchment/80 cursor-pointer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.3 }}
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                aria-label={`View ${spot.ingredient} provenance`}
              >
                <span className="absolute inset-0 rounded-full bg-toasted-amber/30 animate-ping" />
              </motion.button>

              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div
                    className="absolute z-20 w-56 bg-parchment border border-oat-cream shadow-xl p-4 pointer-events-none"
                    style={{ bottom: '120%', left: '50%', x: '-50%' }}
                    initial={prefersReducedMotion ? {} : { scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.88, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <p className="font-label text-toasted-amber text-[10px] mb-1">
                      {spot.ingredient}
                    </p>
                    <p className="font-dm-sans font-medium text-molasses text-sm">{spot.farm}</p>
                    <p className="font-dm-sans text-ink-brown/60 text-xs mb-2">{spot.county}</p>
                    <p className="font-dm-sans text-ink-brown/80 text-xs leading-relaxed italic">
                      {spot.note}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
