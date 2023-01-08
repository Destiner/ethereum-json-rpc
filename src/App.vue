<template>
  <router-view />
</template>

<script lang="ts">
import '@fontsource/inter/variable.css';
</script>

<style>
:root {
  --color-bg-primary: #fff;
  --color-bg-secondary: #f8f8f8;
  --color-text-primary: #04111d;
  --color-text-secondary: #3f4b52;
  --color-border-primary: #e5e5e5;
  --color-border-secondary: #b3b3b3;
  --color-accent: #2181e2;
  --color-accent-light: #dfebf7;
  --color-accent-dark: #1d73c9;
  --color-error: #ff4d45;
  --font-sans: 'Inter', -apple-system, 'BlinkMacSystemFont', avenir next, avenir,
    segoe ui, helvetica neue, helvetica, 'Ubuntu', roboto, noto, arial,
    sans-serif;
  --font-serif: 'Iowan Old Style', 'Apple Garamond', 'Baskerville',
    'Times New Roman', 'Droid Serif', 'Times', 'Source Serif Pro', serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono: 'Menlo', 'Consolas', 'Monaco', 'Liberation Mono',
    'Lucida Console', monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #02070b;
    --color-bg-secondary: #0e0f10;
    --color-text-primary: #e5e5e5;
    --color-text-secondary: #c0c0c0;
    --color-border-primary: #1f2226;
    --color-border-secondary: #333840;
    --color-accent: #155493;
    --color-accent-light: #17191a;
    --color-accent-dark: #175a9d;
    --color-error: #992e29;
  }
}

body {
  margin: 0;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

/* Reset */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#app {
  isolation: isolate;
}
</style>
