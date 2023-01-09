<template>
  <router-view />
</template>

<script setup lang="ts">
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
  --color-accent-primary: #bd21e2;
  --color-accent-secondary: #f5ebf7;
  --color-accent-tertiary: #a91dc9;
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
    --color-bg-primary: #050105;
    --color-bg-secondary: #141214;
    --color-text-primary: #d9d9d9;
    --color-text-secondary: #a6a6a6;
    --color-border-primary: #1f2226;
    --color-border-secondary: #333840;
    --color-accent-primary: #8c18a6;
    --color-accent-secondary: #241d26;
    --color-accent-tertiary: #84179d;
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
