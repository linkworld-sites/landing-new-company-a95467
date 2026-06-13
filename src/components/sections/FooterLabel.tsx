'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@/lib/funnel';

const navLinks = [
  ['This Season', '#this-season'],
  ['The Archive', '#archive'],
  ['How It Works', '#process'],
  ['Subscribe', '#subscribe'],
  ['Journal', '/blog'],
];

const legal = [
  ['Privacy', '#'],
  ['Terms', '#'],
  ['Shipping', '#'],
];

export default function FooterLabel() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    track('convert');
    setSubmitted(true);
  }

  return (
    <footer className="bg-molasses py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Central seal / logotype */}
        <div className="flex justify-center mb-14">
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-toasted-amber/30 mb-4" />
            <div className="border border-toasted-amber/40 rounded-full px-10 py-6 flex flex-col items-center gap-1">
              <span className="font-label text-toasted-amber/60 text-[9px]">Est. 2018</span>
              <span
                className="font-playfair italic text-parchment"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                Golden Batch
              </span>
              <span className="font-label text-toasted-amber/60 text-[9px]">Small-Batch Granola</span>
            </div>
            <div className="w-px h-8 bg-toasted-amber/30 mt-4" />
          </div>
        </div>

        {/* Navigation as ingredient-list typography */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-14">
          {navLinks.map(([label, href]) => (
            <motion.a
              key={label}
              href={href}
              className="font-label text-parchment/50 text-xs hover:text-parchment/90 transition-colors"
              whileHover={prefersReducedMotion ? {} : { y: -1 }}
            >
              {label}
            </motion.a>
          ))}
        </nav>

        {/* Newsletter signup framed as "Add your address" */}
        <div className="max-w-md mx-auto mb-14">
          <p className="font-playfair italic text-parchment/60 text-center mb-5 text-base">
            Add your address to our batch list.
          </p>
          {submitted ? (
            <p className="font-dm-sans text-sage-dust text-center text-sm">
              You&apos;re on the list. We&apos;ll write when the next batch is ready.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@address.com"
                required
                className="flex-1 bg-transparent border border-parchment/20 border-r-0 px-4 py-3 font-dm-sans text-parchment text-sm placeholder-parchment/30 focus:outline-none focus:border-parchment/50 transition-colors"
              />
              <motion.button
                type="submit"
                className="bg-toasted-amber px-6 py-3 font-label text-parchment text-xs hover:bg-toasted-amber/90 transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                Join
              </motion.button>
            </form>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-parchment/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            {legal.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-label text-parchment/30 text-[10px] hover:text-parchment/60 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <p className="font-label text-parchment/20 text-[10px]">
            © {new Date().getFullYear()} Golden Batch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
