---
title: "OpenAI Codex CLI 新手指南：安装、审批模式和项目规则"
description: "OpenAI Codex CLI 是一个运行在本地终端里的编程 Agent。它和网页聊天最大的区别是：不只是给你代码片段，而是可以直接在项目目录中读文件、修改文件、执行命令，并根据结果继续推进任务。"
date: 2026-05-25
category: "Codex CLI"
tag:
  - Codex CLI
  - AI编程
  - ChatGPT
---
# OpenAI Codex CLI 新手指南：安装、审批模式和项目规则

OpenAI Codex CLI 是一个运行在本地终端里的编程 Agent。它和网页聊天最大的区别是：不只是给你代码片段，而是可以直接在项目目录中读文件、修改文件、执行命令，并根据结果继续推进任务。

如果说 ChatGPT 更像“代码顾问”，Codex CLI 更像“坐在终端里的结对工程师”。但因为它能动手，权限控制、项目规则和回滚机制就变得非常重要。

## Codex CLI 适合解决什么问题

Codex CLI 适合处理需要接触真实代码库的任务，例如：

- 给现有函数补单元测试；
- 修复构建错误；
- 解释陌生项目结构；
- 重构重复代码；
- 执行 lint、test、type-check；
- 在多个文件之间同步修改接口。

它不适合只做泛泛问答。如果你只是想问“React useEffect 怎么用”，网页对话就够了；如果你要它修改 `src/auth.ts` 并跑测试，CLI 才是更合适的形态。

## 安装 Codex CLI

常见安装方式有三种。

### 方式一：npm 全局安装

```bash
npm install -g @openai/codex
```

适合已经安装 Node.js 的用户，也是最直接的方式。

### 方式二：Homebrew

```bash
brew install --cask codex
```

适合 macOS 用户。

### 方式三：下载二进制文件

可以从 GitHub Releases 下载对应平台的压缩包，解压后把 `codex` 放到 PATH 目录中。

安装后运行：

```bash
codex
```

首次启动会引导你完成登录或 API Key 配置。

## 登录和认证方式

Codex CLI 通常有两种认证路径：

### 1. 使用 ChatGPT 账号登录

适合新手。登录流程更直观，适合已经有 ChatGPT Plus、Pro、Business 或 Enterprise 账号的用户。

### 2. 使用 OpenAI API Key

适合开发者和团队，便于按调用量计费、记录成本和接入自动化流程。

```bash
export OPENAI_API_KEY="sk-your-api-key"
codex
```

如果团队在国内网络环境下统一接入 OpenAI、Claude 或其他模型，建议提前规划 API Key 管理、代理、统一入口和调用审计，不要让每个成员各自配置一套不可追踪的密钥。

## 三种审批模式：决定 AI 能动到什么程度

Codex CLI 的核心设计之一是审批模式。它决定 Agent 能否自动改文件、能否自动执行命令。

| 模式 | 适合场景 | 风险 |
| --- | --- | --- |
| suggest | 新手、陌生代码库 | 最低，改动前需要确认 |
| auto-edit | 熟悉项目后的小改动 | 中等，文件会自动改，命令需确认 |
| full-auto | 隔离环境、自动化任务 | 最高，文件和命令都可能自动执行 |

示例：

```bash
codex
codex "给 auth.py 的所有函数补单元测试"
codex --approval-mode full-auto "重构 utils 目录，消除重复代码"
```

推荐路径是：先用 suggest 看它如何理解项目，再切 auto-edit 提升效率，最后只在干净 Git 工作区或隔离环境里使用 full-auto。

## 为什么一定要配合 Git 使用

Codex CLI 能修改文件，也可能改错文件。Git 是最重要的安全网。

使用前建议：

```bash
git status
git diff
git commit -m "保存当前稳定状态"
```

任务完成后再检查：

```bash
git diff
git status
```

如果 full-auto 走偏，至少可以通过 diff 看清楚它动了哪里，再决定回滚或保留。不要在一堆未提交改动中开启高权限自动模式。

## AGENTS.md 和 codex.md：把规则写给 Agent

Codex CLI 的长期效率来自项目规则文件。它们的作用类似“上岗说明书”，让 Agent 每次进入项目都知道边界。

### codex.md

适合放全局或项目通用规则：

```text
# 项目规范
- 所有 Python 函数必须有类型注解。
- 测试文件放在 tests/ 目录。
- 提交前运行 ruff check .。
- 不要修改 legacy/ 目录。
```

### AGENTS.md

适合做目录级规则。例如在 `api/AGENTS.md` 中写：

```text
# API 目录规则
- 所有 API 响应必须包含 request_id。
- 禁止修改 routes/auth.py。
- 用户输入必须在服务端校验。
```

规则要短、具体、可执行。不要写“代码要优雅”这种无法验证的要求。

## 安全使用习惯

Codex 会把必要的代码上下文发送给模型处理，因此敏感信息管理很重要：

- 不要把 `.env`、密钥、证书交给 Agent 读取；
- 在规则文件中明确禁止修改敏感目录；
- 使用 suggest 模式审查首次任务；
- 在 full-auto 前确保工作区干净；
- 企业代码库要确认数据处理协议和合规要求。

如果项目包含客户数据、内部凭证或未公开代码，不能只看工具是否好用，还要看数据边界是否符合团队规则。

## Codex CLI、Claude Code 和 Cursor 怎么选

| 工具 | 更适合 |
| --- | --- |
| Codex CLI | 终端用户、OpenAI 生态、喜欢开源工具的人 |
| Claude Code | 长上下文代码理解、Anthropic 生态、复杂工程任务 |
| Cursor | 偏好 IDE 图形界面、希望边写边改的新手和前端开发者 |

选择工具时，不要只看模型名。更重要的是：你习惯在哪里工作，工具能否读懂你的项目，权限能否控制，结果能否回滚。

## 国内开发者的 API 接入补充

如果团队需要在同一套开发流程里同时测试 Codex、Claude Code、国产模型或其他编程模型，可以把模型调用抽象为统一入口。这样做的好处是减少重复配置，统一账单和限流，也方便在不同模型之间做 A/B 测试。

在 API 价格、模型覆盖和国内使用之间权衡时，可将 Code80（https://code.ai80.vip）作为统一入口备选之一。评估时重点看协议兼容、模型列表、调用稳定性、日志策略和成本明细。

## FAQ

**Q：Codex CLI 免费吗？**
工具本身可以安装使用，但模型调用通常依赖 ChatGPT 账号权益或 OpenAI API Key，实际成本取决于账号计划和调用量。

**Q：Windows 能用吗？**
通常建议通过 WSL2 使用，体验更接近 Linux。原生 PowerShell 场景要注意兼容性。

**Q：full-auto 模式安全吗？**
它效率高，但风险也高。只建议在干净 Git 工作区、测试仓库或隔离环境中使用。

**Q：AGENTS.md 写得越详细越好吗？**
不是。规则越多，越容易稀释重点。只写 AI 容易犯错且项目确实需要遵守的规则。

## 总结

Codex CLI 的价值不在于“自动写代码”这四个字，而在于它把模型能力放进了真实开发循环：读代码、改文件、跑命令、看结果、继续修正。

新手最稳妥的上手方式是：先在干净 Git 仓库中用 suggest 模式探索项目，再尝试 auto-edit 处理小任务，最后才在可回滚环境里使用 full-auto。只要权限边界和项目规则设置得当，Codex CLI 可以成为高效而可控的终端编程助手。