<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import QRCodePopup from './QRCodePopup.vue'
import CommunityPopup from './CommunityPopup.vue'
import DownloadPopup from './DownloadPopup.vue'

const route = useRoute()

const showQR = ref(false)
const showCommunity = ref(false)
const showDownload = ref(false)
const hasSidebar = ref(false)

function updateSidebarState() {
  hasSidebar.value = !!document.querySelector('.VPSidebar')
}

onMounted(updateSidebarState)
watch(() => route.path, () => { setTimeout(updateSidebarState, 100) })

function toggleOutline() {
  const aside = document.querySelector('.VPDocAside')
  if (!aside) return
  document.documentElement.classList.toggle('hide-aside')
}

function toggleSidebar() {
  if (!hasSidebar.value) return
  document.documentElement.classList.toggle('hide-sidebar')
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function goPrev() {
  const prev = document.querySelector('.pager-link.prev') as HTMLAnchorElement | null
  if (prev) prev.click()
}

function goNext() {
  const next = document.querySelector('.pager-link.next') as HTMLAnchorElement | null
  if (next) next.click()
}
</script>

<template>
  <div class="floating-toolbar">
    <button class="toolbar-btn" @click="toggleOutline" title="目录">
      <span class="tooltip">目录</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
    </button>

    <button class="toolbar-btn" @click="showQR = true" title="手机看">
      <span class="tooltip">手机看</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
    </button>

    <button class="toolbar-btn" @click="toggleFullscreen" title="全屏">
      <span class="tooltip">全屏看</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
    </button>

    <button class="toolbar-btn" @click="toggleSidebar" :disabled="!hasSidebar" :style="!hasSidebar ? 'opacity:0.3;cursor:not-allowed' : ''" title="左栏">
      <span class="tooltip">左栏</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
    </button>

    <button class="toolbar-btn" @click="showCommunity = true" title="交流圈">
      <span class="tooltip">交流圈</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
    </button>

    <button class="toolbar-btn" @click="showDownload = true" title="下资料">
      <span class="tooltip">下资料</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>

    <button class="toolbar-btn" @click="goPrev" title="上一篇">
      <span class="tooltip">上一篇</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>

    <button class="toolbar-btn" @click="goNext" title="下一篇">
      <span class="tooltip">下一篇</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>

    <a class="toolbar-btn" href="/sitemap.xml" target="_blank" title="站点地图">
      <span class="tooltip">站点地图</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
    </a>
  </div>

  <QRCodePopup v-if="showQR" @close="showQR = false" />
  <CommunityPopup v-if="showCommunity" @close="showCommunity = false" />
  <DownloadPopup v-if="showDownload" @close="showDownload = false" />
</template>
