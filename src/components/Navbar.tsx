'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Batches', href: '#archive' },
  { label: 'How It Works', href: '#process' },
  { label: 'Subscribe', href: '#subscribe' },
  { label: 'Journal', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-parchment/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="font-playfair text-xl font-normal italic text-molasses tracking-tight">
          Golden Batch
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                className="font-label text-xs text-ink-brown opacity-70 hover:opacity-100 transition-opacity"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>
        <a
          href="#subscribe"
          className="hidden md:inline-flex items-center gap-2 font-label text-xs text-toasted-amber border border-toasted-amber/40 px-4 py-2 hover:border-toasted-amber transition-colors duration-200"
        >
          Subscribe
        </a>
      </nav>
    </motion.header>
  );
}
