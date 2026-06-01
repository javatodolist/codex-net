---
title: "保姆级教程，快速在国内使用Claudecode、Codex！"
description: "国内用 AI 编程工具，最难的往往不是命令本身，而是账号、网络和稳定性这三件事。工具再强，一旦中途断线、掉授权、卡额度，开发节奏就会被直接打碎。"
date: 2026-05-05
category: "Codex CLI"
tag:
  - Codex CLI
  - AI编程
  - ChatGPT
---
# 保姆级教程，快速在国内使用Claudecode、Codex！

![Banner](/images/localized/9bd9285080c20793.png)

## 写在前面

国内用 AI 编程工具，最难的往往不是命令本身，而是账号、网络和稳定性这三件事。工具再强，一旦中途断线、掉授权、卡额度，开发节奏就会被直接打碎。

这篇教程把 Claude Code、Codex、Gemini CLI 三条路放在一起讲，目的很简单：让你先跑通，再谈体验。只要入口稳定，后面无论是终端、桌面端还是 API 接入，工作流都能顺下来。

你会看到两种常见玩法：一种是改版客户端，装上就能用；另一种是原版客户端配 API，保留官方体验的同时，把环境配置尽量收拢到最少。

---

## 1. 方案概览

这类国内使用方案，核心就两种思路：

| 方案 | 适合谁 | 特点 |
|---|---|---|
| 改版客户端 | 新手用户，想要简单上手 | 安装即用、配置少、流程短 |
| 原版 + API | 高级用户，想保留官方体验 | 仍然是官方客户端，只是把接口换成可用的国内入口 |

两种方式的目标都一样：尽量少折腾，尽量别让网络和授权问题打断写代码的节奏。

![方案概览](/images/localized/b207ff8bf638811b.png)

### Claude Code 这条线怎么选

如果你更在意“先跑起来”，改版客户端会更省事，典型优势就是安装后直接进主流程，不需要你反复处理鉴权和 endpoint。

如果你更在意“和官方保持一致”，那就走原版 + API。这样做的好处是，后面无论是升级、切换模型，还是和别的工具统一配置，都更顺手。

### Codex 这条线怎么选

Codex 现在已经不只是一个命令行工具，而是能在 App、CLI、Web、IDE 里来回切换的一套工作流。你选它，重点不在于“在哪打开”，而在于“怎么让它持续接住任务”。

### Gemini CLI 这条线怎么选

Gemini CLI 的思路更偏终端工具化，适合已经习惯命令行的人。它的强项是轻量、直接、可脚本化，适合做批量任务和快速验证。

![Claude Code 配置国产模型](/images/localized/cd559870bfbb4d86.png)

---

## 2. Claude Code 使用方案

### 方案 A：改版客户端

这条路最适合想省事的人。核心逻辑很简单，直接装改版客户端，然后按提示完成绑定。

安装命令通常长这样：

```bash
npm install -g https://code.ai80.vip/claudecode/install --registry=https://registry.npmmirror.com
```

启动时进入项目目录，再拉起客户端即可：

```bash
cd your-project-folder
claude
```

如果网络链路有问题，常见做法是切换线路：

```bash
claude --pick-relay
```

改版客户端的价值，不在于花哨，而在于把“能不能用”这件事先解决掉。只要能稳定进会话，后面就是让它帮你干活。

### 方案 B：原版 + API

如果你更偏向官方客户端，那就保留原版 Claude Code，只把 API 入口换掉。

先安装官方版本：

```bash
npm install -g @anthropic-ai/claude-code
```

如果之前装过改版，先卸掉再来：

```bash
npm uninstall -g @anthropic-ai/claude-code
rm -rf ~/.claude*
```

然后配置环境变量：

```bash
export ANTHROPIC_API_TOKEN=""
export ANTHROPIC_API_KEY=你的api_key
export ANTHROPIC_BASE_URL=https://code.ai80.vip/
```

Windows 下可以用 `setx` 写入同样的变量。这样做的好处是，你的主流程不用变，变的只是入口。

![官方原版 + API](/images/localized/cd559870bfbb4d86.png)

#### 怎么判断这条路适不适合你

- 想快：选改版客户端
- 想稳：选原版 + API
- 想长期统一工作流：选原版 + API

说白了，改版客户端更像“开箱即用”，原版 + API 更像“把主干道修通”。

---

## 3. Codex 安装与使用

Codex 这部分也分两条路：一条是改版安装，一条是官方客户端 + API。

### 方案 A：站内包授权版

适合希望快速上手的人。安装命令如下：

```bash
npm install -g https://code.ai80.vip/codex/install
```

启动后直接运行：

```bash
codex
```

第一次运行通常会自动做几件事：下载程序、完成登录、写入配置。只要这一步顺利，后面基本就是持续使用。

### 方案 B：官方 Codex 客户端 + API

如果你想保留官方客户端，可以直接改配置文件：

```toml
profile = "gac"

[model_providers.gac]
name = "gac"
base_url = "https://code.ai80.vip/"
wire_api = "responses"
env_key = "CODEX_API_KEY"

[profiles.gac]
model_provider = "gac"
model = "gpt-5"
model_reasoning_effort = "medium"
approval_policy = "on-request"
```

再把 API Key 配进去：

```bash
export CODEX_API_KEY="你的Key字符串"
```

这条路最关键的不是“多装了什么”，而是“少改了什么”——原版客户端保留住了，后面切模型、切权限、切工作流都更顺。

![Codex 安装与配置](/images/localized/c0e450fbeacf7317.png)

### Codex 里几个容易踩的点

1. `profile` 不写对，启动后就找不到你想要的模型配置
2. `base_url` 不统一，CLI、App、IDE 会各配各的，后面很难维护
3. 环境变量写完没重启，配置看着在，实际上没生效

---

## 4. Gemini CLI 安装和使用

Gemini CLI 的玩法更直接，核心就是装好 Node.js，再拉起客户端。

先检查环境：

```bash
node --version
npm --version
```

然后安装：

```bash
npm install -g https://code.ai80.vip/gemini/install
```

启动：

```bash
gemini
```

如果你想切模型，可以这样写：

```bash
gemini --set-model gemini-3-pro-preview
```

如果想恢复默认：

```bash
gemini --set-model
```

它的优点是很适合跑命令、跑脚本、做快速任务；缺点是如果你更习惯图形界面，刚开始可能会觉得信息密度太高。

![Gemini CLI 使用](/images/localized/4327d6bbf4a5a206.png)

---

## 5. 这类官方工具到底值不值得用

如果只看能力，Claude Code、Codex、Gemini CLI 都已经不是“能不能写代码”的阶段了，而是更像“你要不要把重复活交出去”。

你真正要考虑的是三件事：

- 入口稳不稳
- 工作流能不能持续
- 出问题之后好不好排查

官方路线的优势在于长期一致性更好；国内入口的价值在于把落地门槛压下去。对大多数开发者来说，先让工具稳定跑起来，比纠结“最正宗的方式”更重要。

### 官方订阅和费用怎么理解

官方原版通常涉及订阅或按量计费，具体以各自官方页面为准。真正要注意的是，不要为了省一点时间，在入口上反复折腾半天，最后把工作流切碎了。

不过说实话，官方订阅和 API 在国内经常会卡在支付和网络上。如果你只想要一个更省事的入口，可以把 API endpoint 直接统一到 [Code80](https://code.ai80.vip/home) 这一类国内可用地址，主程序基本不用改。

---

## 常见问题

### 1. 改版客户端和原版客户端，最大区别是什么？

改版客户端更适合快速上线，原版客户端更适合长期维护和统一工作流。

### 2. 为什么总是提示登录失败？

通常是网络、账号状态或环境变量没生效。先重启终端，再检查 `base_url` 和 `API_KEY`。

### 3. 这几套工具能不能共用一套配置？

可以。最关键的是把 endpoint 和 key 的管理统一起来，不要每个工具都各写一遍。

### 4. 国内用户怎么更省事地用上官方 API？

如果不想自己处理海外支付和网络问题，可以直接把 endpoint 统一到 [Code80](https://code.ai80.vip/home) 这类入口，少掉很多中间步骤。

### 5. 先学哪一个最好？

新手先学改版客户端，熟悉后再切原版 + API；如果你主要写脚本，Gemini CLI 也值得直接试。

### 6. 这三套工具要一起装吗？

不用。先选一个跑通，再按需要补第二个、第三个。
