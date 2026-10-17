# engawa website

Static Astro website with Tailwind CSS v4. Traditional Chinese is at `/`, English at `/en/`, and Simplified Chinese at `/zh-cn/`. Each locale has its own `/blog/` and `/rss.xml`; the language switcher preserves the current article.

Write the brand as `engawa` in all user-facing copy, titles and accessibility labels, including at the start of English sentences.

## Develop

Use the Bun version pinned in `package.json`'s `packageManager` field. `--bun` ensures Astro's CLI also runs on Bun rather than following its Node shebang:

```sh
bun install --frozen-lockfile
bun --bun run dev --background
bun --bun run astro dev logs
bun --bun run astro dev stop
```

Build and preview the generated static site:

```sh
bun --bun run build
bun --bun run preview --background
bun --bun run astro preview stop
```

The default local port is 4321. Pass `--port 4329` to use a different port. Output is generated in `dist/`. The canonical production origin is `https://www.engawahq.dev`, configured in `astro.config.mjs` and used for canonical links, hreflang, sitemap and RSS.

## Deployment

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) builds every push and pull request with a frozen Bun lockfile. Successful pushes to the repository's default branch deploy `dist/` to **GitHub Pages** using the official upload/deploy actions. `workflow_dispatch` can redeploy the default branch; runs on other branches and pull requests never deploy. Deployment uses GitHub's OIDC token, not a personal access token. Actions are pinned to full commit digests.

Before the first deployment:

1. Push this repository to GitHub and set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
2. Verify the domain with GitHub, then set the Pages **Custom domain** to `www.engawahq.dev` before changing DNS.
3. At the DNS provider, point the `www` **CNAME** record to the repository owner's `<owner>.github.io` hostname, without a repository path. For a repository owned by `engawahq`, the target is `engawahq.github.io`.
4. After GitHub provisions the certificate, enable **Enforce HTTPS**. Check the `github-pages` environment's deployment rules if the repository requires approval or restricts deployment branches.

`public/CNAME` records the intended hostname and is copied into `dist/`. With an Actions-based Pages deployment, GitHub's repository **Custom domain** setting is authoritative; the CNAME file does not configure that setting. No Astro `base` prefix is needed for this custom domain.

See the [Astro Pages guide](https://docs.astro.build/en/guides/deploy/github/) and [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Licence and contributions

Project code is licensed under [Apache-2.0](LICENSE). Third-party assets retain their own notices in `public/licenses/` and `public/fonts/`.

Contributions use the [Developer Certificate of Origin 1.1](DCO), not a CLA. Follow [CONTRIBUTING.md](CONTRIBUTING.md), use Conventional Commits, and sign off each commit with `git commit -s`. Report vulnerabilities privately according to [SECURITY.md](SECURITY.md).


## Design and animation

- `src/styles/global.css`: Tailwind theme, Geist fonts, shared typography, buttons and motion preferences. Ink `#253326` and lime `#D7F593` follow the supplied landing design.
- `src/components/Icon.astro`: all interface icons use regular-weight Phosphor SVGs from the build-only `@phosphor-icons/core` dependency. They inherit `currentColor` and ship as static SVG, without an icon font, CDN or client-side icon runtime. Use this component rather than Unicode symbols or hand-drawn SVGs; the engawa brand artwork is separate. Playback and sidebar controls toggle existing SVGs instead of replacing their contents with text. The MIT notice ships in `public/licenses/phosphor-icons.txt`.
- Icon display and size defaults live in `.phosphor-icon` within Tailwind's components layer. Keep them out of the component's utility class list so `hidden`, `group-open:*` and caller sizes can override them. A disclosure must show only its current-state caret.
- `src/data/landing.json`: Traditional Chinese, native-style American English, and Mainland Simplified Chinese copy, including demo controls and technical diagrams. engawa is not yet open-sourced; free/open-source distribution and Apache-2.0 licensing are plans, not current availability claims.
- `src/components/Landing.astro`: static landing sections, logo entrance/hover and headline highlight.
- `src/components/PreviewNotice.astro`: homepage-only temporary preview banner in all three locales. Its localized copy lives under `preview` in `src/data/landing.json`.
- `src/components/TechnicalDetails.astro`: expandable object-to-interface mapping and trust-layer diagram for L0–L1, L2 and L3. The animation derives its endpoint from the rendered layers instead of assuming a fixed count.
- `src/components/DemoTour.astro`, `src/scripts/demo-tour.ts`, `src/styles/demo-tour.css`: five-chapter interactive demonstration. All data and changes are illustrative; it never connects to a cluster.
- The simulated click pointer uses `src/assets/cursor-macos.svg`: a macOS-style black arrow with a white outline and a subtle shadow. It is decorative and ignores pointer events; native mouse cursors are unchanged. This pointer illustration is separate from the Phosphor interface icons.
- The tour plays only while its stage is visible and the browser tab is active. Pause, replay and chapter controls are available. Interacting with the simulated interface pauses the narrative. Reduced-motion preferences replace autoplay with static chapter endpoints.
- Beat updates retain existing conversation nodes and terminal lines, and construct each static diff only once. Only newly introduced content should play an entrance animation; rebuilding unchanged content on every beat causes visible flashing.
- `public/brand/`: supplied wordmark and mark. `public/fonts/`: self-hosted Geist and Geist Mono with their OFL licences. Geist is copied from Genkan commit `d933aa984a7e4fda006c4df042b4714ece2fc50a`; Geist Mono comes from Vercel Geist v1.7.2, matching the adjacent engawa application's vendored fonts.

## Blog

The export contains `Main.dc.html` but no `Blog.dc.html`. The blog therefore uses the landing's visual language rather than claiming to reproduce an unavailable blog artboard.

The blog publishes only `say-hi-to-engawa` followed by `make-a-zero-trust-paas`, in that explicit order rather than publication-date order. Traditional Chinese MDX lives directly in `src/content/blog/`; English and Simplified Chinese use `en/` and `zh-cn/` subdirectories. Each translation includes localized diagram text, accessibility labels, captions and image descriptions.

`src/i18n.ts` defines locale paths, article identity/order, and blog interface copy. `src/components/BlogIndex.astro` shares the listing; root and `[locale]` page routes render the translated collection entries through `src/layouts/BlogPost.astro`. One endpoint, `src/pages/[...locale]/rss.xml.js`, generates all three feeds, each containing only its locale's two posts in the same order. Starter articles, the lorem-ipsum `/about/` page, and the unused starter header helper are removed.

Document language tags are centralized as `zh-Hant-TW`, `en-US`, and `zh-Hans-CN`, matching the regional writing conventions. HTML, language-switch links, `hreflang`, date formatting and RSS share these BCP 47 tags; Open Graph uses its required underscore form (`zh_TW`, `en_US`, `zh_CN`). Pages explicitly pass their language to the layout/head instead of inferring it from the URL.

Keep release status separate from implementation status in all three locales: Genkan is already integrated, while engawa 0.1 is unreleased. Do not invent version-specific feature limits or present the Genkan integration as future work.

For the progress section, cross-check the current `../engawa/` implementation against the latest dated status in `../engawa-notes/`. Plans and historical unchecked lists are not proof of current implementation or remaining work. Keep workload rollback distinct from data restoration, MCP explicitly read-only, and installation instructions distinct from an automated installer.

The header uses a compact globe/current-language disclosure instead of segmented buttons. Its links keep the current article, show the active language, and remain keyboard accessible. Escape restores focus to the trigger; outside clicks and focus leaving the disclosure close it. Menus stay inside the viewport down to 320px.

Use Markdown footnote markers (`[^1]`) and definitions (`[^1]:`) while retaining complete IEEE-style reference bodies. Do not cite the unpublished engawa repository as a public source. `src/markdown-presentation.mjs` is a supported Astro 7 Sätteri HAST extension: it localizes reference headings/numbered backlinks and wraps wide tables in keyboard-focusable horizontal scroll regions. These per-document labels and accessible scroll wrappers are not supplied by site-wide Markdown configuration. Dates remain unbroken, and overflow stays inside the table rather than widening the page.

Article figure captions are centered, muted, and set to 13px across all locales.

The four explanatory figures are the author's React TSX modules in `src/components/figures/`: `K8sMapping.tsx`, `TrustStructure.tsx`, `HotelKeycard.tsx`, and `LoginFlow.tsx`. MDX imports these files directly through the official `@astrojs/react` integration, passing `lang` without any `client:*` directive. There are no intermediate Astro wrappers or custom figure renderer. Traditional Chinese preserves the author's original SVG output; English and Simplified Chinese use explicit JSON translations in `src/data/k8s-mapping.json`, `trust-structure.json`, `hotel-keycard.json`, and `login-flow.json`. React runs at build time; no React hydration/runtime is sent to the browser.

Keep framework integration standard: no custom figure renderer, intermediate figure wrappers, or client hydration for static diagrams. Remaining browser scripts implement actual interactions in the demo, technical-detail panel, and native language disclosure. Derive copy types from the translation data and rely on Tailwind's built-in `hidden` handling rather than duplicating resets. The technical panel's layer-0 note uses the `hidden` attribute so its script can correctly reveal it.

Manual smoke checks cover all three landing/blog languages, article order, desktop/mobile article widths, author-original Traditional Chinese SVG output, translated diagram labels without glyph compression, centered 13px captions, article-preserving language switches, keyboard dropdown behavior, footnote navigation with IEEE reference bodies, locale RSS, and the interactive tour.
