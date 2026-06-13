'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@/lib/funnel';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'amber' | 'parchment';
  className?: string;
  trackIntent?: boolean;
}

export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'amber',
  className = '',
  trackIntent = false,
}: CTAButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses =
    'relative inline-flex items-center justify-center overflow-hidden px-8 py-4 font-dm-sans font-medium text-sm tracking-label uppercase transition-colors duration-200';

  const variantClasses =
    variant === 'amber'
      ? 'border border-toasted-amber text-toasted-amber hover:text-parchment'
      : 'border border-parchment text-parchment hover:text-molasses';

  const fillColor = variant === 'amber' ? '#C8791A' : '#F5EFE0';

  const handleClick = () => {
    if (trackIntent) track('intent');
    onClick?.();
  };

  const content = (
    <>
      {!prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 origin-left"
          style={{ backgroundColor: fillColor }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`}
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
