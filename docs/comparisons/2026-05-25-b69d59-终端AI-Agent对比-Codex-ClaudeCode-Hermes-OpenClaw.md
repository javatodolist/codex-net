---
title: "终端 AI Agent 对比：Codex、Claude Code、Hermes、OpenClaw 如何选"
description: "终端 AI Agent 对比：Codex、Claude Code、Hermes、OpenClaw 如何选"
date: 2026-05-25
category: "横评与选型"
tag:
  - 横评与选型
  - AI编程
  - 工具横评
  - 模型选型
---
# 终端 AI Agent 对比：Codex、Claude Code、Hermes、OpenClaw 如何选

终端类 AI Agent 正在分化成两条路线：一类专注编码，让模型在仓库里读文件、改代码、跑测试；另一类更像个人或通用 Agent，强调多通道、Skills、记忆和自动化扩展。Codex、Claude Code、Hermes Agent 与 OpenClaw 分别代表这四种取向。

![](/images/localized/9bd4fe9330347ae5.jpg)

## 一句话区分四款工具

- **Codex**：OpenAI 生态中的轻量终端编码 Agent，强调快速启动和编码任务执行。
- **Claude Code**：Anthropic 的终端优先编码 Agent，强调理解代码库、执行命令和工程闭环。
- **Hermes Agent**：Nous Research 推出的开源通用 Agent，强调自进化、Skills 和研究扩展。
- **OpenClaw**：面向个人使用的多通道 AI 助手，强调跨平台、消息入口和消费级体验。

如果你的核心任务是写代码，优先看 Codex 与 Claude Code；如果你要做个人助理、自动化研究、跨平台消息处理，再看 Hermes 与 OpenClaw。

## 定位与用户群对比

| 维度 | Codex | Claude Code | Hermes Agent | OpenClaw |
| --- | --- | --- | --- | --- |
| 核心定位 | 终端编码 Agent | 终端/IDE 编码 Agent | 通用自进化 Agent | 个人 AI 助手 |
| 主要生态 | OpenAI | Anthropic | 多 Provider | 多 Provider |
| 默认任务 | 写代码、修 Bug | 理解仓库、改代码、跑测试 | 自动化、研究、Skills | 多通道助理、语音、Canvas |
| 是否偏厂商绑定 | 较强 | 较强 | 弱 | 弱 |
| 扩展重点 | CLI 与订阅生态 | MCP、Hooks、Skills、CI | 自进化 Skills、RL 数据 | 消息通道、个人工作流 |
| 适合人群 | ChatGPT 用户、轻量编码 | 后端、DevOps、工程团队 | Agent 研究者、进阶用户 | 个人助理需求用户 |

Codex 与 Claude Code 的产品边界更清晰：它们就是为了“让 AI 在开发环境中干活”。Hermes 和 OpenClaw 则更开放，也更需要用户自己设计工作流。

## 技术栈和部署方式

Codex 使用 Rust 构建，天然适合低延迟、本地二进制和轻量 CLI。Claude Code 采用 Shell、Python、TypeScript 等多技术组合，更像一个协调器，把模型、文件系统、命令行和插件体系串起来。

Hermes Agent 以 Python 为主，适合研究、二次开发和快速试验。OpenClaw 基于 TypeScript/Node，更贴近前端与全栈开发者的生态。

安装方式上，四者都倾向“一行命令启动”，但长期维护成本不同：

- Codex：适合追求简单、轻量、低本地资源占用的用户。
- Claude Code：适合希望接入 IDE、GitHub/GitLab、MCP 和 CI/CD 的团队。
- Hermes：适合 Python 环境、Docker、远程后端和 Serverless 场景。
- OpenClaw：适合 Node 生态、手机节点、消息通道和个人设备联动。

## 命令体系：CLI 只是入口，Slash 命令才是工作台

终端 Agent 通常有两层交互：

1. **CLI 命令**：用于启动、一次性执行 prompt、配置鉴权和环境。
2. **会话内 slash 命令**：用于切模型、压缩上下文、查看用量、创建子 Agent、管理权限。

Claude Code 的 slash 命令体系偏工程化，包括初始化、权限、压缩、子 Agent、Hooks 等；Hermes 更强调目标、队列、分支、模型切换和多 Profile；OpenClaw 则围绕状态、重置、激活、用量和个人助理体验展开。

这意味着选择工具时不要只看“能不能问问题”，还要看它是否能在长会话中管理上下文、预算、权限和子任务。

## Skills、记忆与扩展生态

![](/images/localized/d1d1ebf687a02783.jpg)

四款工具都在向“可扩展 Agent”演进，但抽象层次不同：

| 能力 | Codex | Claude Code | Hermes Agent | OpenClaw |
| --- | --- | --- | --- | --- |
| 项目记忆 | 较轻 | CLAUDE.md、自动记忆、Hooks | 用户建模、全文检索、Skill 沉淀 | 多文件身份与记忆注入 |
| Skills | 有基础机制 | Plugins + Skills | 自动生成与维护 | ClawHub/AgentSkills |
| MCP | 部分支持 | 重要能力 | 可双向接入 | 插件体系接入 |
| 子 Agent | 较有限 | 支持 | 支持多 Profile/任务板 | 支持路由与委派 |
| 触发器 | 较有限 | Hooks | Hooks/Webhook/Cron | Hooks/Webhook/Cron |

如果你只是要一个“更聪明的终端编程助手”，不必过度关注 Skills 生态；如果你要构建长期运行的自动化系统，Skills、记忆、Hooks、Cron 和 Webhook 才是核心。

## 模型支持与国内接入

Codex 默认围绕 OpenAI 模型体验优化，Claude Code 默认围绕 Claude 模型体验优化。Hermes 与 OpenClaw 更中立，通常支持更多 Provider，包括 OpenAI、Anthropic、Gemini、DeepSeek、Kimi、Ollama、云厂商模型等。

对国内开发者而言，模型访问稳定性和统一鉴权是现实问题。Codex 与 Claude Code 都可以在一定程度上通过 base_url 或兼容 Provider 连接到统一推理入口。若团队希望用同一套 API Key 测试 Claude、GPT、Gemini、DeepSeek 等模型，可以将兼容端点配置为 [Code80](https://code.ai80.vip)，再根据工具文档设置 OpenAI 或 Anthropic 协议参数。

## 典型场景怎么选

### 专职写代码：Codex 或 Claude Code

已有 ChatGPT 订阅、偏轻量终端体验，可以优先试 Codex。已有 Claude 订阅、希望深度理解代码库和 CI/CD，则优先 Claude Code。

### 团队自动化与 PR 审查：Claude Code

Claude Code 的优势在于工程化闭环：读仓库、改文件、跑测试、处理 Git、接入 CI/CD。团队越依赖自动化流程，它的价值越明显。

### 自进化 Agent 与研究：Hermes Agent

如果你关心自动生成 Skills、长期记忆、RL 数据、Serverless 后端，Hermes 比编码工具更适合做研究型 Agent 底座。

### 多通道个人助手：OpenClaw

如果需求不是“写代码”，而是把 AI 接到微信、QQ、飞书、Telegram、邮件、手机、语音等入口，OpenClaw 的产品形态更匹配。

### 多工具并用

重度用户并不需要四选一。常见组合是：Codex/Claude Code 处理编码，Hermes 跑研究或批处理，OpenClaw 承担个人助理和消息入口。

## 关键能力速查

| 能力 | 推荐工具 |
| --- | --- |
| 本地轻量终端编码 | Codex |
| 大型代码库理解 | Claude Code |
| CI/CD 与 PR 自动化 | Claude Code |
| 自进化 Skills | Hermes Agent |
| 多 Provider 灵活切换 | Hermes / OpenClaw |
| 微信、QQ、飞书等多通道 | OpenClaw |
| 研究与二次开发 | Hermes Agent |
| 低硬件占用 | Codex |

## FAQ

**Q：Codex 和 Claude Code 哪个写代码更强？**

二者的差异往往取决于底层模型、项目类型和工作流。Codex 更轻量，Claude Code 的工程集成更完整。建议用同一批真实 Issue 测试，而不是只看榜单。

**Q：Hermes 和 OpenClaw 都开源，区别是什么？**

Hermes 更像可编程 Agent 框架，适合研究、自进化和自动化；OpenClaw 更像个人 AI 助手产品，强调通道覆盖和消费级交互。

**Q：四款工具能共存吗？**

可以。它们的 CLI 入口、配置目录和运行方式不同，适合按任务组合使用。

**Q：国内开发者优先考虑什么？**

优先考虑模型访问稳定性、API Key 管理、数据合规和通道支持。编码工具可通过兼容 API 入口解决模型访问问题，个人助手则要看是否支持常用消息平台。

## 总结

Codex 与 Claude Code 是“编码 Agent”，Hermes 与 OpenClaw 是“通用 Agent/个人助手”。前者适合在代码仓库里完成工程任务，后者适合构建更开放的自动化系统。选型时按四个问题判断即可：主要场景是不是编码、是否已有模型订阅、是否需要多 Provider、是否需要消息通道和长期 Skills。