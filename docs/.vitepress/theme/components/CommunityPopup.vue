<script setup lang="ts">
import { withBase } from 'vitepress'

defineEmits(['close'])
</script>

<template>
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content community-popup">
      <h3>加入交流圈</h3>
      <div class="qr-row">
        <div class="qr-item">
          <img :src="withBase('/wechat_group.png')" alt="微信群二维码" />
          <p>微信交流群</p>
        </div>
        <div class="qr-item">
          <img :src="withBase('/wechat_subscribe.png')" alt="公众号二维码" />
          <p>微信公众号</p>
        </div>
      </div>
      <button class="popup-close" @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<style scoped>
.community-popup {
  max-width: 420px !important;
}

.qr-row {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.qr-item {
  text-align: center;
}

.qr-item img {
  width: 160px;
  height: 160px;
  object-fit: contain;
}

.qr-item p {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 8px 0 0;
}
</style>
