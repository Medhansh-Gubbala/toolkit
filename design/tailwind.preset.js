// Tailwind v3 preset — REPLACES defaults (not extend) so slop classes cease to exist:
// bg-indigo-600, rounded-md-as-shipped, font-sans-Inter — none of them compile here.
// Usage: copy this file + the project's tokens.json into <project>/design/, then in
// tailwind.config.js:  module.exports = { presets: [require('./design/tailwind.preset')], content: [...] }
//
// Tailwind v4 projects: skip this file — the design-system skill generates an
// @theme block in globals.css from the same tokens.json instead.

const tokens = require('./tokens.json')

module.exports = {
  theme: {
    // Full replacement: only token colors exist.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      dominant: tokens.color.dominant,
      accent: tokens.color.accent,
      neutral: tokens.color.neutral,
      ...tokens.color.semantic,
    },
    // Full replacement: only token radii exist.
    borderRadius: tokens.radius,
    fontFamily: {
      display: [tokens.type.display.family, 'serif'],
      body: [tokens.type.body.family, 'sans-serif'],
    },
    fontSize: tokens.type.sizes,
    extend: {
      transitionDuration: tokens.motion.duration,
      transitionTimingFunction: tokens.motion.easing,
    },
  },
}
