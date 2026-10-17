# Contributing

## Developer Certificate of Origin

This project uses the [Developer Certificate of Origin 1.1](DCO), not a CLA. Sign off every
commit to certify that you wrote it or otherwise have the right to submit it under the
[Apache-2.0 licence](LICENSE):

```sh
git commit -s
```

CI rejects pull requests whose non-merge commits lack a `Signed-off-by` line matching the
author. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/),
for example `fix: correct the language switcher` or `docs: update a blog reference`.
Use your own name and email. When squashing, preserve other contributors' attribution;
do not add a sign-off on someone else's behalf.

The sign-off check is shared with Genkan. Run it against your branch's base:

```sh
./scripts/check-dco.sh <base-rev> HEAD
```

## Before you open a pull request

Use the Bun version pinned in `package.json`'s `packageManager` field. No separate Node
installation is required. Run the same install and build commands as CI:

```sh
bun install --frozen-lockfile
bun --bun run build
```

When changing workflow or shell files, also run:

```sh
actionlint
shellcheck scripts/check-dco.sh
```

There is no separate automated test suite. Exercise the changed surface in the browser,
including desktop and mobile layouts. For localized changes, check Traditional Chinese,
Simplified Chinese and English; for blog changes, check article ordering, figure labels,
footnotes, language switching and RSS. Report the verification you actually performed.
Never commit `dist/`, `.astro/`, `node_modules/`, credentials or local environment files.

## Implementation and content

- Prefer standard Astro, MDX and React integration over custom renderers or wrappers.
  Static React figures are imported directly into MDX without `client:*` directives.
- Preserve the author's figure design. The Traditional Chinese TSX output is the reference;
  translate labels without stretching glyphs or substituting a different diagram.
- Keep language tags and locale paths centralized in `src/i18n.ts`, and pass the page
  language explicitly to layouts and metadata.
- Use Taiwan terminology for Traditional Chinese, Mainland terminology for Simplified
  Chinese, and idiomatic American English. Keep the brand lowercase: `engawa`.
- Use Markdown footnotes while retaining complete IEEE-style reference bodies. Never cite
  a source you have not read; mark it as not verified instead. Do not cite engawa's
  unpublished source repository as a public reference.
- Explain non-obvious decisions next to the code, including the reason and any verified
  specification or prior art. Keep contributor and technical documentation in English;
  published site content remains localized.

## Dependencies and third-party material

Commit `bun.lock` with dependency changes and use frozen installs in CI. Review the source,
licence and security impact of new dependencies rather than adding a package for a small
built-in capability. Preserve third-party notices in `public/licenses/` and `public/fonts/`.

[Renovate](https://docs.renovatebot.com/) opens weekly dependency and pinned GitHub Action
updates with a seven-day minimum release age. Compatible npm dependency updates share a
pull request; major updates stay separate. Review dependency updates before merging.
Urgent security fixes may bypass the delay with an explicit maintainer decision.

## Review and deployment

Keep pull requests focused and describe the change, its reason, and browser/build checks.
Do not merge until the build and DCO checks pass. Maintainers should configure those checks
as required in the repository's branch rules; workflow files alone do not enforce merge
protection.

GitHub Pages deploys successful pushes to the default branch, or a manually triggered run
on that branch. Pull requests build but never deploy. See [the deployment instructions](README.md#deployment)
for the custom-domain and repository settings.

Report security vulnerabilities privately as described in [SECURITY.md](SECURITY.md),
not in a public issue.
