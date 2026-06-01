import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

import './styles/vars.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/sidebar.css'
import './styles/content.css'
import './styles/code.css'
import './styles/toolbar.css'
import './styles/blog.css'
import './styles/dark.css'
import './styles/animations.css'
import './styles/responsive.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {

    // 百度统计：VitePress 是 SPA，路由切换不刷新页面，
    // 需在每次路由变化时手动上报一次 PV，否则站内导航的 PV 全部漏报。
    router.onAfterRouteChange = (to) => {
      if (typeof window !== 'undefined' && (window as any)._hmt) {
        (window as any)._hmt.push(['_trackPageview', to])
      }
    }
  },
}

export default theme
