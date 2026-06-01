<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'

defineEmits(['close'])

const canvas = ref<HTMLCanvasElement>()

onMounted(async () => {
  if (canvas.value) {
    await QRCode.toCanvas(canvas.value, window.location.href, {
      width: 200,
      margin: 2,
      color: { dark: '#333', light: '#fff' },
    })
  }
})
</script>

<template>
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content">
      <h3>手机扫码阅读</h3>
      <div class="qr-canvas">
        <canvas ref="canvas"></canvas>
      </div>
      <p style="font-size: 13px; color: var(--vp-c-text-3); margin: 8px 0 0;">扫描二维码在手机上阅读</p>
      <button class="popup-close" @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>
