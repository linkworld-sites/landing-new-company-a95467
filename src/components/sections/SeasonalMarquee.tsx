'use client';

import { motion } from 'framer-motion';

const ingredients = [
  'Toasted Coconut',
  'Black Fig',
  'Cardamom',
  'Wild Honey',
  'Medjool Date',
  'Ceylon Cinnamon',
  'Smoked Almond',
  'Elderflower',
  'Buckwheat Groat',
  'Orange Blossom',
];

const ticker = [...ingredients, ...ingredients];

export default function SeasonalMarquee() {
  return (
    <section className="bg-parchment py-20 md:py-28 overflow-hidden">
      {/* Marquee ticker */}
      <div className="marquee-wrapper overflow-hidden mb-14 select-none">
        <div className="marquee-track flex gap-10 whitespace-nowrap">
          {ticker.map((item, i) => (
            <span
              key={i}
              className="font-playfair italic text-2xl md:text-3xl text-molasses/50 shrink-0"
            >
              {item}
              <span className="mx-8 text-toasted-amber/60">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Manifesto statement */}
      <motion.div
        className="mx-auto max-w-5xl px-6 md:px-12"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-playfair text-molasses leading-[1.15]"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
        >
          Each batch begins with a season,
          <br />
          <em>not a spreadsheet.</em>
        </p>
        <p className="mt-8 font-dm-sans text-ink-brown/70 text-lg max-w-xl leading-relaxed">
          We bake when the ingredients are right. You&apos;ll know when to expect us.
        </p>
      </motion.div>
    </section>
  );
}
