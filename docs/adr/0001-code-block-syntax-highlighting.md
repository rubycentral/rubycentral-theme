# ADR 0001: Code Block Syntax Highlighting

**Date:** 2026-03-29
**Status:** Done

## Context

The theme needed support for displaying code blocks in posts and pages. Ghost's Koenig editor outputs `<pre><code class="language-*">` markup but the theme had no styles or syntax highlighting for it.

## Decisions

### Prism.js via CDN

Prism.js is loaded from jsDelivr with the autoloader plugin rather than bundled into `app.js`. This keeps the theme build lean and means any language is supported on demand without maintaining a list of grammar files.

### Token colors from the design system

Syntax token colors are mapped to existing CSS variables (`--color-blue`, `--color-green`, `--color-red`, `--color-yellow`) rather than introducing a third-party theme. This keeps the code blocks feeling native to the site.

### Language label via JS + CSS

Ghost's Markdown card puts `language-*` on the `<code>` element, not the `<pre>`. A script in `post.js` reads the class, extracts the language name, and sets it as `data-language` on the `<pre>`. A CSS `::before` pseudo-element renders the label. This avoids a dependency on Ghost-specific markup that could change.

### Line wrap toggle via `<!--wrap-->` HTML card

Ghost provides no mechanism to add classes to code block elements from the editor. Authors who want line wrapping instead of horizontal scroll can insert an HTML card containing `<!--wrap-->` immediately before a code block. A script in `post.js` detects the comment node and adds a `.wrap` class to the `<pre>`.

## Alternatives Considered

- **Bundling Prism grammars** — would avoid the CDN dependency but add build complexity and require updating the bundle when new languages are needed.
- **A Prism theme (e.g. Tomorrow Night)** — rejected in favor of token colors derived from the design system.
- **Default line wrapping** — rejected because wrapping breaks visual indentation and makes code harder to scan. Opt-in per block is more appropriate.
