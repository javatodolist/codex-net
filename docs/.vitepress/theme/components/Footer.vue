<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>Codex中文网</span>
      <span class="sep">|</span>
      <span>Codex CLI 中文指南</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.site-footer a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--vp-c-brand-1);
}

.sep {
  color: var(--vp-c-divider);
}
</style>
