<script setup lang="ts">
import { withBase } from 'vitepress'

defineEmits(['close'])
</script>

<template>
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content">
      <h3>关注公众号下载资料</h3>
      <img :src="withBase('/wechat_subscribe.png')" alt="公众号二维码" />
      <p style="font-size: 13px; color: var(--vp-c-text-3); margin: 8px 0 0;">扫码关注公众号获取学习资料</p>
      <button class="popup-close" @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>
