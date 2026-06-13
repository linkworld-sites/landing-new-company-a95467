import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5EFE0',
        'toasted-amber': '#C8791A',
        molasses: '#2B1A0E',
        'sage-dust': '#8A9E7B',
        'oat-cream': '#EDE5D0',
        'ink-brown': '#3A2A1C',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        'dm-sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.12em',
      },
    },
  },
  plugins: [],
};

export default config;
