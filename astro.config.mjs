// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), solidJs({ devtools: true })],
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ["en", "es"],
    routing: {
      fallbackType: "redirect",
      redirectToDefaultLocale: true
    },
  },
  compressHTML: false,
  devToolbar: { enabled: false },
  experimental: { clientPrerender: true },
  security: { checkOrigin: true },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true
  },
  trailingSlash: "ignore"
});
