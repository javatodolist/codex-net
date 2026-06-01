<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import FloatingToolbar from './components/FloatingToolbar.vue'
import Footer from './components/Footer.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <FloatingToolbar v-if="frontmatter.layout !== 'home'" />
      <Footer />
    </template>
  </Layout>
</template>
