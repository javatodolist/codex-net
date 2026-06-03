import { defineConfig, type HeadConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import disableUrlEncode from 'markdown-it-disable-url-encode'
import { fileURLToPath } from 'url'
import path from 'path'
import { statSync } from 'fs'
import { nav } from './nav'
import { sidebar } from './sidebar'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://codex-net.local'
const SITE_NAME = 'Codex中文网'
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`

// HTML 标准自闭合标签 + 项目中使用的 Vue 全局组件
// 添加新的全局 Vue 组件时需同步更新此列表
const HTML_SELF_CLOSING_TAGS = ['br', 'hr', 'img', 'input', 'source', 'wbr']
const VUE_GLOBAL_COMPONENTS = ['bloghome', 'blogcategories', 'blogtags', 'blogtimeline', 'homemodules']
const ALLOWED_OPEN_TAGS = [...HTML_SELF_CLOSING_TAGS, ...VUE_GLOBAL_COMPONENTS]
const MAX_SEARCH_SECTION_CHARS = 1200
const CODE_LANG_FALLBACKS: Record<string, string> = {
  django: 'jinja',
  env: 'dotenv',
  gitignore: 'txt',
  redis: 'txt',
}

function stripHtmlTags(content: string) {
  return content
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitSearchSections(html: string) {
  const headingRegex = /<h(\d*).*?>(.*?<a.*? href="#.*?".*?>.*?<\/a>)<\/h\1>/gi
  const headingContentRegex = /(.*?)<a.*? href="#(.*?)".*?>.*?<\/a>/i
  const parts = html.split(headingRegex)
  parts.shift()

  const sections: Array<{ anchor?: string; titles: string[]; text: string }> = []
  let parentTitles: string[] = []

  for (let i = 0; i < parts.length; i += 3) {
    const level = Number.parseInt(parts[i], 10) - 1
    const heading = parts[i + 1]
    const content = parts[i + 2]
    const headingResult = headingContentRegex.exec(heading)
    const title = stripHtmlTags(headingResult?.[1] ?? '')
    const anchor = headingResult?.[2] ?? ''
    const text = stripHtmlTags(content ?? '').slice(0, MAX_SEARCH_SECTION_CHARS)
    if (!title || !text) continue

    let titles = parentTitles.slice(0, level)
    titles[level] = title
    titles = titles.filter(Boolean)
    sections.push({ anchor, titles, text })

    if (level === 0) parentTitles = [title]
    else parentTitles[level] = title
  }

  return sections
}

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'Codex中文网 | Codex CLI 中文指南',
    description: 'Codex中文网专注 Codex CLI 国内使用、安装配置、报错排查、终端 AI Agent 工作流与 Codex 横向对比。',

    outDir: '../dist',
    metaChunk: true,
    buildConcurrency: 4,
    ignoreDeadLinks: true,
    // 去除 URL 的 .html 后缀（需 Nginx try_files 配合）
    cleanUrls: true,

    head: [
      ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }],
      ['meta', { name: 'robots', content: 'all' }],
      ['meta', { name: 'author', content: 'Codex中文网 - Codex CLI 中文指南' }],
      ['meta', { property: 'og:site_name', content: 'Codex中文网' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
      // 百度统计（codex.it8090.cn）
      [
        'script',
        {},
        `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?14c65368025af90dded423efdae122a0";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`,
      ],
    ],

    // 开启后 VitePress 内置 sitemap 会自动用 git 最后提交时间填充 <lastmod>
    lastUpdated: true,

    sitemap: {
      hostname: SITE_URL,
      transformItems: (items) => {
        const HIGH_PRIORITY_DIRS = ['codex-cli/', 'codex-domestic/', 'comparisons/']
        return items.map((item) => {
          const url = item.url
          if (url === '' || url === 'index' || url === 'index.html') {
            return { ...item, priority: 1.0, changefreq: 'daily' }
          }
          if (HIGH_PRIORITY_DIRS.some((dir) => url.startsWith(dir))) {
            return { ...item, priority: 0.8, changefreq: 'weekly' }
          }
          return { ...item, priority: 0.6, changefreq: 'monthly' }
        })
      },
    },

    transformHead({ page, pageData, title, description, content }) {
      const head: HeadConfig[] = []
      // cleanUrls 已开启：URL 不带 .html 后缀
      const pageUrl = page.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
      const canonicalUrl = `${SITE_URL}/${pageUrl}`
      const frontmatter = pageData.frontmatter || {}
      const isHome = page === 'index.md'

      // 如果页面没有 description，从内容中提取
      const pageTitle = frontmatter.title || title
      const pageDescription = description
        || frontmatter.description
        || content?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 150)
        || ''

      // Canonical
      head.push(['link', { rel: 'canonical', href: canonicalUrl }])

      // Open Graph 页面级标签
      head.push(
        ['meta', { property: 'og:title', content: pageTitle }],
        ['meta', { property: 'og:description', content: pageDescription }],
        ['meta', { property: 'og:url', content: canonicalUrl }],
        ['meta', { property: 'og:type', content: frontmatter.date ? 'article' : 'website' }],
        ['meta', { property: 'og:image', content: DEFAULT_IMAGE }],
      )

      // Twitter Card 页面级标签
      head.push(
        ['meta', { name: 'twitter:title', content: pageTitle }],
        ['meta', { name: 'twitter:description', content: pageDescription }],
        ['meta', { name: 'twitter:image', content: DEFAULT_IMAGE }],
      )

      // 文章类型额外标签
      if (frontmatter.date) {
        head.push(
          ['meta', { property: 'article:published_time', content: String(frontmatter.date) }],
          ['meta', { property: 'article:author', content: SITE_NAME }],
        )
        if (frontmatter.category) {
          head.push(['meta', { property: 'article:section', content: String(frontmatter.category) }])
        }
        if (frontmatter.tag) {
          const tags = Array.isArray(frontmatter.tag) ? frontmatter.tag : [frontmatter.tag]
          tags.forEach((t: string) => {
            head.push(['meta', { property: 'article:tag', content: String(t) }])
          })
        }
      }

      // JSON-LD 结构化数据
      if (isHome) {
        head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description: 'Codex CLI 中文指南',
        })])
      } else if (frontmatter.date) {
        head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: pageTitle,
          description: pageDescription,
          image: frontmatter.cover || DEFAULT_IMAGE,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
          },
          datePublished: String(frontmatter.date),
          dateModified: String(frontmatter.updated || frontmatter.date),
          url: canonicalUrl,
        })])
      }

      // BreadcrumbList（所有页面）
      const segments = pageUrl.replace(/\/index\.html$/, '/').replace(/\.html$/, '').split('/').filter(Boolean)
      const breadcrumbItems = [
        { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
      ]
      let currentPath = SITE_URL
      segments.forEach((seg, i) => {
        currentPath += `/${seg}`
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: i + 2,
          name: decodeURIComponent(seg),
          item: i === segments.length - 1 ? canonicalUrl : currentPath,
        })
      })
      if (breadcrumbItems.length > 1) {
        head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems,
        })])
      }

      return head
    },

    markdown: {
      math: true,
      languageAlias: {
        django: 'jinja',
        env: 'dotenv',
        gitignore: 'txt',
        redis: 'txt',
      },
      config: (md) => {
        md.use(disableUrlEncode)
        // Disable raw HTML in markdown to prevent Vue template compilation errors
        md.set({ html: false })

        const fence = md.renderer.rules.fence?.bind(md.renderer.rules)
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const lang = tokens[idx].info.trim().split(/\s+/)[0]
          if (CODE_LANG_FALLBACKS[lang]) {
            tokens[idx].info = tokens[idx].info.replace(lang, CODE_LANG_FALLBACKS[lang])
          }
          return fence ? fence(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options)
        }

        // Escape {{ }} in markdown to prevent Vue template interpolation errors
        md.renderer.rules.text = (tokens: any, idx: any) => {
          const content = tokens[idx].content
          return content.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;')
        }
      },
      image: {
        lazyLoading: true,
      },
      theme: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },

    themeConfig: {
      logo: '/logo.png',
      nav,
      sidebar,

      outline: {
        level: [2, 3],
        label: '目录',
      },

      docFooter: {
        prev: '上一篇',
        next: '下一篇',
      },

      darkModeSwitchLabel: '深浅模式',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '返回顶部',

      search: {
        provider: 'local',
        options: {
          miniSearch: {
            _splitIntoSections: (_path, html) => splitSearchSections(html),
          },
          translations: {
            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
            },
          },
        },
      },
    },

    vite: {
      build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          maxParallelFileOps: 3,
        },
      },
      resolve: {
        alias: {
          '/images': path.resolve(__dirname, '../public/images'),
          '/assets': path.resolve(__dirname, '../public/assets'),
        },
      },
      plugins: [
        {
          // 处理含非 ASCII 字符（如中文）的 /images/、/assets/ 路径 import 解析
          name: 'resolve-unicode-public-assets',
          resolveId(id: string) {
            if (!id.startsWith('/images/') && !id.startsWith('/assets/')) return
            const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.avif'])
            if (!IMAGE_EXTS.has(path.extname(id).toLowerCase())) return
            // 先尝试 docs/public（alias 目标），再尝试 .vitepress/public
            const candidates = [
              path.resolve(__dirname, '../public' + id),
              path.resolve(__dirname, 'public' + id),
            ]
            for (const candidate of candidates) {
              try {
                if (statSync(candidate).isFile()) return candidate
              } catch {}
            }
          },
        },
        {
          name: 'fix-md-content',
          enforce: 'pre',
          transform(code, id) {
            if (!id.endsWith('.md')) return
            let result = code
            // Escape {{ }} globally - both real newlines and escaped \n in JSON content
            result = result.replace(/\{\{/g, '\\{\\{').replace(/\}\}/g, '\\}\\}')
            // Escape HTML-like tags outside code fences
            const segments = result.split(/(```[\s\S]*?```|`[^`\n]*`)/g)
            result = segments.map((seg, idx) => {
              if (idx % 2 === 1) return seg
              let escaped = seg
              escaped = escaped.replace(/<([A-Za-z][A-Za-z0-9_.-]*(?:\s[^>]*)?)>/g, (match, inner) => {
                const tag = inner.split(/[\s/]/)[0].toLowerCase()
                if (ALLOWED_OPEN_TAGS.includes(tag)) return match
                return `&lt;${inner}&gt;`
              })
              escaped = escaped.replace(/<\/([A-Za-z][A-Za-z0-9_.-]*)>/g, (match, tag) => {
                if (VUE_GLOBAL_COMPONENTS.includes(tag.toLowerCase())) return match
                return `&lt;/${tag}&gt;`
              })
              return escaped
            }).join('')
            if (result !== code) {
              return { code: result, map: null }
            }
          },
        },
      ],
    },
  })
)
