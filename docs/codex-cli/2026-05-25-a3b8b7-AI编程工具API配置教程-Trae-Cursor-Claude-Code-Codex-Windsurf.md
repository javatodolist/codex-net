---
title: "AI 编程工具 API 配置教程：Trae、Cursor、Claude Code、Codex、Windsurf"
description: "AI 编程工具 API 配置教程：Trae、Cursor、Claude Code、Codex、Windsurf"
date: 2026-05-25
category: "Codex CLI"
tag:
  - Codex CLI
  - AI编程
  - ChatGPT
---
# AI 编程工具 API 配置教程：Trae、Cursor、Claude Code、Codex、Windsurf

> 面向国内开发者的配置指南，覆盖 Trae、Cursor、Claude Code、Codex CLI 和 Windsurf。重点是各工具在哪里填 API Key、Base URL、模型名，以及哪些能力不会被自定义 API 覆盖。

![](/images/localized/fa549bbf5dd883bc.jpg)

2026 年，AI 编程工具已经从“代码补全插件”演进为 IDE、CLI、云端 Agent 混合形态。Trae、Cursor、Claude Code、Codex CLI、Windsurf 都能提升开发效率，但它们配置自定义 API 的方式差异很大。

国内用户最容易踩坑的地方有三个：

- 把 API Key 填对了，但 Base URL 没填或填错
- 以为自定义 Key 会覆盖所有功能，实际只覆盖 Chat，不覆盖补全
- 把 OpenAI 兼容协议和 Anthropic 协议混用

下面按工具逐一说明。

## 五款工具配置方式速览

| 工具 | 配置入口 | 是否支持 OpenAI 兼容 Base URL | 适合人群 |
| --- | --- | --- | --- |
| Trae | GUI 设置 | 支持 | 想快速配置的用户 |
| Cursor | Settings → Models | 部分支持 | IDE 重度用户 |
| Claude Code | 环境变量 | 需 Anthropic 兼容端点 | CLI Agent 用户 |
| Codex CLI | `~/.codex/config.toml` | 支持 | 终端自动化与代码库任务 |
| Windsurf | 网页 BYOK | 通常不支持自定义 Base URL | 使用官方 Provider Key 的用户 |

## 一、Trae：GUI 三步配置

Trae 支持在界面中配置自定义模型，不需要手写配置文件。

### 配置步骤

进入：

```text
Settings → Model → Custom
```

填写：

| 字段 | 填写内容 |
| --- | --- |
| API Key | 你的 API Key |
| Base URL | OpenAI 兼容接口地址，例如 `https://code.ai80.vip/v1` |
| Model Name | 模型标识符，例如 `deepseek-v4-pro` |

保存后，在对话或模型选择区域切换到该自定义模型。

### 注意事项

- Base URL 通常要以 `/v1` 结尾
- 不要额外加尾部斜杠
- Model Name 多数情况下需要手动输入
- 同一 Base URL 下切换模型，只需改 Model Name

常见模型分工：

```text
deepseek-v4-pro     日常代码生成、重构
claude-sonnet-4-6   复杂分析、多模态任务
kimi-k2             长上下文阅读
```

## 二、Cursor：Chat 可用自定义 Key，Tab 补全通常不受影响

Cursor 是 AI 优先 IDE，模型配置入口在：

```text
Cursor Settings → Models
```

### 使用官方 Provider Key

你可以分别填入 OpenAI、Anthropic、Google、Azure、AWS Bedrock 等 Provider 的 API Key，然后点击 Verify 验证。

### 使用 OpenAI 兼容服务

如果要接入 OpenAI 兼容接口，通常在 OpenAI 提供商配置中：

1. 填入 API Key
2. 找到 Override OpenAI Base URL
3. 输入 Base URL
4. Verify 后保存

示例：

```text
Base URL: https://code.ai80.vip/v1
Model: deepseek-v4-pro
```

### 关键限制

Cursor 的自定义 API Key 通常只影响 Chat、Composer 等对话/Agent 功能；Tab 自动补全可能仍使用 Cursor 自有模型和基础设施。

如果你的核心需求是低延迟 Tab 补全，自定义 API Key 并不能完全替代 Cursor 订阅。

## 三、Claude Code：通过环境变量切换端点

Claude Code 是终端 AI 编程 Agent，主要通过环境变量配置。

### 官方 API Key

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-xxxx"
```

### 自定义 Anthropic 兼容端点

Claude Code 使用 Anthropic Messages API 协议，不是 OpenAI Chat Completions 协议。要替换端点，需要服务端兼容 Anthropic API 格式。

```bash
export ANTHROPIC_BASE_URL="https://code.ai80.vip"
export ANTHROPIC_API_KEY="你的 API Key"
```

永久写入：

```bash
echo 'export ANTHROPIC_BASE_URL="https://code.ai80.vip"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="你的 API Key"' >> ~/.zshrc
source ~/.zshrc
```

### 验证

启动 Claude Code 后，可在会话中查看状态：

```text
/status
```

### 注意协议差异

不要把只兼容 OpenAI 的 `/v1/chat/completions` 地址直接填给 Claude Code。除非网关明确支持 Anthropic Messages API，否则会出现鉴权、路径或响应格式错误。

## 四、Codex CLI：config.toml 配置最直接

Codex CLI 对 OpenAI 兼容接口较友好，核心配置在：

```bash
~/.codex/config.toml
```

### 基础配置

```bash
mkdir -p ~/.codex
```

写入：

```toml
#:schema https://developers.openai.com/codex/config-schema.json

openai_base_url = "https://code.ai80.vip/v1"
model = "deepseek-v4-pro"
sandbox_mode = "workspace-write"
approval_policy = "on-request"
web_search = "disabled"
```

设置 Key：

```bash
echo 'export OPENAI_API_KEY="你的 API Key"' >> ~/.zshrc
source ~/.zshrc
```

验证：

```bash
codex doctor
```

### 多 Provider 切换

```toml
[model_providers.primary]
base_url = "https://code.ai80.vip/v1"
env_key = "OPENAI_API_KEY"
name = "primary"

[model_providers.backup]
base_url = "https://code.ai80.vip/v1"
env_key = "OPENAI_API_KEY"
name = "backup"

model_provider = "primary"
model = "deepseek-v4-pro"
```

如果你希望 Trae、Cursor 和 Codex CLI 尽量共用一套模型与 Key，可选择 [Code80](https://code.ai80.vip) 这类 OpenAI 兼容统一入口，减少多工具重复配置成本。

## 五、Windsurf：BYOK 更偏官方 Key

Windsurf 支持 BYOK（Bring Your Own Key），入口通常在账号订阅或 Provider API Key 页面。

### 配置步骤

1. 登录 Windsurf 账号
2. 进入 Provider API Keys 设置页
3. 选择 Provider，例如 Anthropic、OpenAI、DeepSeek、Google 等
4. 填入对应 API Key
5. 保存后在编辑器中切换模型

### 需要注意

- BYOK 费用通常从你的 Provider 账户扣除
- 是否支持自定义 Base URL 取决于当前版本能力
- 如果不支持自定义 Base URL，就只能使用各 Provider 官方 API Key

![](/images/localized/58fb9d5d7c6e505d.jpg)

## 统一配置时的模型建议

不同任务不一定要用同一个模型：

| 任务 | 推荐模型类型 | 原因 |
| --- | --- | --- |
| 日常代码编写 | 代码能力强、速度快的模型 | 响应快，成本可控 |
| 复杂 Bug 分析 | 推理增强模型 | 能逐步分析调用链和边界条件 |
| 大型代码库阅读 | 长上下文模型 | 能容纳更多文件和文档 |
| UI 截图问题 | 多模态模型 | 能理解图片与界面状态 |
| 批量脚本任务 | 低成本模型 | 自动化调用量大，成本敏感 |

## 常见错误排查

### Base URL 多了尾部斜杠

很多工具对尾部斜杠敏感。优先写成：

```text
https://code.ai80.vip/v1
```

不要写成：

```text
https://code.ai80.vip/v1/
```

### 模型名填了展示名

API 调用需要模型标识符，不一定等于网页展示名。确认是否需要类似 `deepseek-v4-pro`、`claude-sonnet-4-6` 这样的精确标识。

### OpenAI 与 Anthropic 协议混用

- OpenAI 兼容工具通常需要 `/v1/chat/completions` 类接口
- Claude Code 需要 Anthropic Messages API 兼容格式
- 支持“Claude 模型”不等于支持“Claude Code 协议”

### API Key 泄露风险

不要把 Key 写进仓库。建议：

- 用环境变量
- `.env` 加入 `.gitignore`
- 团队使用最小权限 Key
- 泄露后立即撤销并重建

## FAQ

### 哪个工具对国内用户配置最简单

如果只看自定义 OpenAI 兼容接口，Trae 和 Codex CLI 最直接：一个是 GUI 填写，一个是 TOML 配置。Cursor 功能强，但需要理解哪些能力受自定义 Key 影响。Claude Code 要特别注意 Anthropic 协议兼容性。

### Cursor Tab 补全能不能走自定义 API

通常不能完全替换。自定义 API 多用于 Chat、Composer 或 Agent，对 Tab 补全不一定生效。

### Claude Code 能不能直接填 OpenAI 兼容地址

不能简单等同。Claude Code 需要 Anthropic API 格式兼容端点，直接填 OpenAI Chat Completions 地址通常无法工作。

### 五款工具能同时安装吗

可以。IDE 工具和 CLI 工具互不冲突。常见组合是一个 IDE 负责日常编码，一个 CLI Agent 负责大范围分析和批量修改。

## 总结

配置 AI 编程工具 API 的关键不是“哪里填 Key”这么简单，而是要看工具支持什么协议、哪些功能会走自定义端点、模型名是否准确、Base URL 是否符合格式。Trae 和 Codex CLI 对 OpenAI 兼容接口最直接，Cursor 适合 IDE 深度工作流，Claude Code 适合终端 Agent 但需要 Anthropic 兼容端点，Windsurf 更偏 BYOK 官方 Provider。配置完成后，先用低风险任务验证，再逐步放到真实项目中使用。