# Wyze Bundle Builder

React prototype for a four-step security bundle builder with a live review panel.

## Run locally

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Notes

- Product and step content is driven from `src/data/bundle.json`.
- Variant quantities are tracked independently, so changing from one color to another does not overwrite the previous color quantity.
- The review panel is computed from the current configuration and stays in sync with card steppers.
- `Save my system for later` writes the full selection state to `localStorage` and restores it on reload.
