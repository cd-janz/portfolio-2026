// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import vercel from '@astrojs/vercel';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), mdx(), solidJs({ devtools: true })],
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ["es", "en"],
    routing: {
      fallbackType: "redirect",
      prefixDefaultLocale: true,
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