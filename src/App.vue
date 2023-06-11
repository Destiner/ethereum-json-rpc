<template>
  <EthHeader />
  <router-view />
</template>

<script setup lang="ts">
import '@fontsource/inter/variable.css';

import EthHeader from '@/components/_app/header/EthHeader.vue';
</script>

<style>
:root {
  --white: #fff;
  --color-bg-primary: var(--white);
  --color-bg-secondary: #f8f8f8;
  --color-bg-tertiary: #e6e6e6;
  --color-bg-info: #e1ebf0;
  --color-text-primary: #04111d;
  --color-text-secondary: #3f4b52;
  --color-text-info: #235574;
  --color-border-primary: #e5e5e5;
  --color-border-secondary: #b3b3b3;
  --color-border-info: #c4d9e6;
  --color-accent-primary: #bd21e2;
  --color-accent-secondary: #a91dc9;
  --color-accent-tertiary: #f5ebf7;
  --color-error: #ff4d45;
  --color-success: #23cdb1;
  --shadow-small: rgb(0 0 0 / 10%) 0 1px 1px 0;
  --shadow-small-inset: rgba(0 0 0 / 5%) 0 1px 1px 0 inset;
  --shadow-medium: rgb(0 0 0 / 20%) 0 2px 4px 0;
  --shadow-medium-inset: rgb(0 0 0 / 10%) 0 2px 2px 0 inset;
  --spacing-tiny: 2px;
  --spacing-small: 4px;
  --spacing-normal: 8px;
  --spacing-big: 16px;
  --spacing-large: 32px;
  --border-radius-small: 2px;
  --border-radius-medium: 4px;
  --border-radius-big: 10px;
  --font-size-tiny: 11px;
  --font-size-small: 12px;
  --font-size-normal: 14px;
  --font-size-big: 16px;
  --font-size-extra-large: 36px;
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
    --color-bg-tertiary: #292529;
    --color-bg-info: #04131a;
    --color-text-primary: #d9d9d9;
    --color-text-secondary: #a6a6a6;
    --color-text-info: #75bbd9;
    --color-border-primary: #1f2226;
    --color-border-secondary: #333840;
    --color-border-info: #2e373c;
    --color-accent-primary: #8c18a6;
    --color-accent-secondary: #7c1694;
    --color-accent-tertiary: #241d26;
    --color-error: #992e29;
    --color-success: #299986;
    --shadow-small: rgb(0 0 0 / 15%) 0 1px 1px 0;
    --shadow-small-inset: rgba(0 0 0 / 10%) 0 1px 1px 0 inset;
    --shadow-medium: rgb(0 0 0 / 30%) 0 2px 4px 0;
    --shadow-medium-inset: rgb(0 0 0 / 20%) 0 2px 2px 0 inset;
  }
}

body {
  --header-height: 58px;

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
