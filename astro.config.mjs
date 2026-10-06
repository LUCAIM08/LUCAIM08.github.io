import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  site: 'https://itslucaa.is-a.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});