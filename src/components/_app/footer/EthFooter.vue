<template>
  <footer>
    <a
      href="https://destiner.io"
      target="_blank"
      rel="noopener"
    >
      Made by Destiner
    </a>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--footer-height);
  border-top: 1px solid var(--color-border-primary);
}

a {
  opacity: 0.6;
  color: inherit;
  font-size: var(--font-size-small);
  text-decoration: inherit;
}

a:hover {
  opacity: 1;
}
</style>
