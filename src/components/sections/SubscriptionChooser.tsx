'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import { track } from '@/lib/funnel';

const plans = [
  {
    name: 'Monthly Box',
    frequency: 'Delivered every month',
    price: '£28',
    period: '/ month',
    description:
      'One curated batch, every month. Each box reflects whatever the season is doing right now — the freshest ingredients at the right moment.',
    includes: [
      '300g seasonal granola',
      'Ingredient origin card',
      'Handwritten batch note',
      'Free shipping',
    ],
    cta: 'Start Monthly',
  },
  {
    name: 'Seasonal Box',
    frequency: 'Delivered four times a year',
    price: '£24',
    period: '/ box',
    description:
      'Our quarterly batches are slower and more considered — each one a deeper expression of a single season. The batch subscribers see first.',
    includes: [
      '350g seasonal granola',
      'Early access to limited runs',
      'Origin card + tasting guide',
      'Free shipping',
    ],
    cta: 'Start Seasonal',
    featured: true,
  },
];

export default function SubscriptionChooser() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="subscribe" className="bg-parchment py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-label text-toasted-amber text-xs">Two Simple Choices</span>
          <h2
            className="font-playfair text-molasses mt-3 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Choose your cadence.
          </h2>
          <p className="font-dm-sans text-ink-brown/70 text-base mt-4 leading-relaxed">
            No tier tables. No confusing bundles. Just two ways to receive a batch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className="relative bg-molasses p-8 md:p-10 flex flex-col cursor-default"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -6,
                      boxShadow: '0 16px 40px rgba(43,26,14,0.18)',
                    }
              }
              style={{ boxShadow: '0 4px 12px rgba(43,26,14,0.08)' }}
            >
              {plan.featured && (
                <div className="absolute top-0 right-6 bg-toasted-amber px-3 py-1">
                  <span className="font-label text-parchment text-[10px]">Recommended</span>
                </div>
              )}

              <span className="font-label text-toasted-amber text-[10px]">{plan.frequency}</span>

              <h3
                className="font-playfair text-parchment mt-2 mb-1 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-5">
                <span
                  className="font-playfair text-toasted-amber"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {plan.price}
                </span>
                <span className="font-dm-sans text-parchment/50 text-sm">{plan.period}</span>
              </div>

              <p className="font-dm-sans text-parchment/70 text-sm leading-relaxed mb-6">
                {plan.description}
              </p>

              <ul className="space-y-2 mb-8 flex-1">
                {plan.includes.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-toasted-amber text-xs mt-0.5">◆</span>
                    <span className="font-dm-sans text-parchment/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <CTAButton
                variant="parchment"
                onClick={() => {
                  track('intent');
                  track('convert');
                }}
                trackIntent
                className="w-full justify-center"
              >
                {plan.cta}
              </CTAButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
