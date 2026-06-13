'use client';

import { useEffect } from 'react';
import { track } from '@/lib/funnel';

export default function FunnelTracker() {
  useEffect(() => {
    track('landing');

    const onFirstScroll = () => {
      track('engage');
      window.removeEventListener('scroll', onFirstScroll);
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });
    return () => window.removeEventListener('scroll', onFirstScroll);
  }, []);

  return null;
}
