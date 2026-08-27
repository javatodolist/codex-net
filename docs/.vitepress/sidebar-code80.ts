import type { DefaultTheme } from 'vitepress'

export const code80Sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '快速开始',
    collapsed: false,
    items: [
      { text: '快速开始', link: '/code80/' },
      { text: '注册账号', link: '/code80/register/1-register' },
      { text: '登录账号', link: '/code80/register/2-login' },
      { text: '购买额度', link: '/code80/register/3-quota' },
      { text: '创建 API 令牌', link: '/code80/register/4-token' },
      { text: '环境检查', link: '/code80/register/5-env' },
      { text: '配置 CLI 工具', link: '/code80/register/6-cli' },
    ],
  },
  {
    text: 'CLI配置教程',
    collapsed: false,
    items: [
      { text: 'CLI配置教程', link: '/code80/cli/' },
      { text: '环境检查(通用步骤)', link: '/code80/cli/1-env' },
      { text: 'Codex配置', link: '/code80/cli/3-codex' },
    ],
  },
  {
    text: 'CC-Switch',
    collapsed: false,
    items: [
      { text: 'CC-Switch使用教程', link: '/code80/ccswitch/' },
      { text: '通用步骤', link: '/code80/ccswitch/1-common' },
      { text: 'Codex配置', link: '/code80/ccswitch/3-codex' },
      { text: '用量查询配置', link: '/code80/ccswitch/4-usage-query' },
      { text: 'CC Switch CLI 使用', link: '/code80/ccswitch/5-ccs_cli' },
      { text: 'ChatGPT 接入', link: '/code80/ccswitch/6-codex-app' },
    ],
  },
  {
    text: '进阶工具',
    collapsed: false,
    items: [
      { text: 'DS接入Codex', link: '/code80/advanced/DeepSeekCodex' },
      { text: 'GPT-Image-2 绘图教程', link: '/code80/paint/GPTImage' },
    ],
  },
  {
    text: '令牌分组',
    collapsed: false,
    items: [
      { text: '令牌分组查看', link: '/code80/token/1-intro' },
      { text: '令牌分组介绍', link: '/code80/token/2-group' },
    ],
  },
  {
    text: '常见问题',
    collapsed: false,
    items: [
      { text: '常见问题', link: '/code80/faq/' },
      { text: 'Codex', link: '/code80/faq/Codex' },
    ],
  },
]
