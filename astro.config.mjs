// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

import tailwindcss from '@tailwindcss/vite';
import localizedMarkdown from './src/markdown-presentation.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.engawahq.dev',
  integrations: [mdx(), react(), sitemap()],
  markdown: { processor: satteri({ hastPlugins: [localizedMarkdown] }) },


  vite: {
    plugins: [tailwindcss()],
  },
});