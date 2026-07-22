# Internationalization Rules

1. Never translate internal theme identifiers, API keys or stored JSON keys.
2. All new user-interface text must be added to `src/i18n/locales/en.js`.
3. Japanese equivalents belong only in `src/i18n/locales/ja.js`.
4. Components should call `t('namespace.key')` instead of embedding new prose.
5. Company names must be resolved from `/data/stock_index.json`.
6. Theme names must be resolved through `themeNames.js`.
7. `npm run build` automatically runs:
   - `check:english-ui`
   - `check:reports`
8. Do not copy a Japanese JSX file over an English JSX file without migrating its UI strings to the dictionary.
9. Content articles may remain separate by language, but navigation and reusable UI components should share stable keys.
10. Long-term recommendation: merge the Japanese and English frontends into one shared codebase with locale-specific content bundles.
