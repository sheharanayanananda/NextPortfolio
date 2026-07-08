<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Font Subsetting and Maintenance

All custom local fonts have been split into tiny, optimized Unicode slices located in `public/fonts/` (saving ~90% of file size).

- Full backups of the original font files are stored in `public/fonts/originals/`. Do NOT load these directly on the client.
- The active split ranges are:
  - `*.latin.woff2`: U+0020-007F (Basic Latin)
  - `*.latin1.woff2`: U+00A0-00FF (Latin-1 Supplement for middle dot, etc.)
  - `*.symbols.woff2`: U+2000-27FF (Punctuation, quotes, symbols, arrows)

## How to Regenerate/Update Font Subsets:
If you need to edit the website content in the future and add new characters from other languages or symbol sets not covered by the above ranges (e.g. Cyrillic, extended symbols):
1. Keep the full original fonts in `public/fonts/originals/` as the master files.
2. Edit/run the Python helper script `scripts/subset_fonts.py` (which uses python's `fonttools` library) to update the slice definitions or add a new slice.
   - Command: `python3 scripts/subset_fonts.py`
3. If new ranges are added, declare them in `app/layout.tsx` under the corresponding `localFont` configuration objects.
