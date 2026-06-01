

# 2026最新国内使用Claudecode、Codex快速入门小白教程！

![Banner](/images/localized/b207ff8bf638811b.png)

## 写在前面

国内开发者想稳定用上 Claude Code、Codex、Gemini CLI，真正难的往往不是“怎么装”，而是“装完之后能不能一直用”。账号、网络、授权、额度，任何一个环节抖一下，整条工作流都会断。

这篇内容把三款工具放在一套方案里讲，核心目标只有一个：先让你把工具跑通，再谈体验和效率。对开发者来说，能持续干活的工具，才算真的有用。

---

## 1. 方案概览

GACCode 提供了两种路线，思路很清楚：

| 方案 | 适合谁 | 特点 |
|---|---|---|
| 改版客户端 | 新手用户，希望简单上手 | 安装即用、配置少、上手快 |
| 原版 + API | 高级用户，希望使用官方原版 | 保留官方客户端，只改接入方式 |

![方案概览](/images/localized/06e078aec6f4a2e4.png)

两种路线都在解决同一个问题：让你尽量少碰网络和账号的坑，直接把注意力放回代码本身。

### 一次订阅，三款工具通用

这套方案的重点是统一。Claude Code、Codex、Gemini CLI 都能放在同一个账户体系下，切换工具的时候不用重新搭一遍环境。

### 先判断自己适合哪条路

- 想最快跑起来：选改版客户端
- 想保留官方体验：选原版 + API
- 想长期统一接入：选原版 + API

---

## 2. Claude Code 使用方案

### 方案 A：改版客户端

安装命令如下：

```bash
npm install -g https://code.ai80.vip/claudecode/install --registry=https://registry.npmmirror.com
```

启动时进入项目目录，然后直接运行：

```bash
cd your-project-folder
claude
```

如果连线有问题，先切线路：

```bash
claude --pick-relay
```

这条路的优点很直接：装完就能进主流程，不需要你反复处理 API、Key 和 endpoint。

### 方案 B：原版 Claude Code + API

先装官方客户端：

```bash
npm install -g @anthropic-ai/claude-code
```

如果之前装过改版，先卸载：

```bash
npm uninstall -g @anthropic-ai/claude-code
rm -rf ~/.claude*
```

然后配置环境变量：

```bash
export ANTHROPIC_API_TOKEN=""
export ANTHROPIC_API_KEY=你的gaccode_api_key
export ANTHROPIC_BASE_URL=https://code.ai80.vip/
```

Windows 也可以用对应的 `setx` 命令把这几个变量写进去。

![原版 Claude Code + API](/images/localized/4c44b22cd0b55d5a.png)

### 这条路更适合谁

- 想保留官方客户端的人
- 想统一多个工具接入方式的人
- 想后面继续扩展到别的模型入口的人

---

## 3. Codex 安装与使用

Codex 也分两种路子：改版安装，或者官方客户端 + API。

### 方案 A：站内包授权版

```bash
npm install -g https://code.ai80.vip/codex/install
```

启动：

```bash
codex
```

第一次运行后，它一般会自动完成下载、登录和配置，省掉不少手动步骤。

### 方案 B：官方 Codex 客户端 + API

如果你想继续用官方客户端，可以直接改 `config.toml`：

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

再补一个环境变量：

```bash
export CODEX_API_KEY="你的Key字符串"
```

这类配置最大的价值，就是把“入口”统一起来。你以后切工具，不用改一堆逻辑，只需要改少量配置。

![Codex 安装与使用](/images/localized/145b9badd37a5502.png)

---

## 4. Gemini CLI 安装和使用

Gemini CLI 这一段更偏终端党。

先确认 Node.js 和 npm：

```bash
node --version
npm --version
```

再安装：

```bash
npm install -g https://code.ai80.vip/gemini/install
```

启动：

```bash
gemini
```

如果要切模型：

```bash
gemini --set-model gemini-3-pro-preview
```

恢复默认：

```bash
gemini --set-model
```

如果你嫌启动器输出太多，还可以开静默模式：

```bash
export GEMINI_LAUNCHER_QUIET=1
gemini
```

![Gemini CLI 安装和使用](/images/localized/83f0468cd103be71.png)

---

## 5. 官方工具到底值不值得折腾

说到底，这几款工具已经不只是“能不能写代码”，而是看你能不能把重复活、复杂活、批量活交出去。

你需要关注的其实只有三件事：

- 入口稳不稳
- 配置能不能复用
- 任务能不能持续推进

如果你总是被账号、网络、授权打断，那再强的模型也很难变成生产力。先把工具链接稳，再看能力差异，顺序别反了。

### 官方订阅和入口

官方路线的好处，是体验一致、功能完整；缺点是国内用户经常要额外处理支付和网络问题。如果你想省掉这些步骤，可以把 endpoint 统一到 [Code80](https://code.ai80.vip/home) 这类入口，主流程基本不用改。

---

## 常见问题

### 1. 改版客户端和原版客户端怎么选？

想快速上手就选改版，想长期维护就选原版 + API。

### 2. 为什么老是提示连接失败？

先看网络，再看 `base_url`，最后确认环境变量是否真正生效。

### 3. 三款工具能不能共用一套账号？

可以，前提是你把入口和配置统一好。

### 4. 国内用户怎么更省事地用官方入口？

可以直接把 API endpoint 统一到 [Code80](https://code.ai80.vip/home) 这一类国内可用地址。

### 5. 哪个最适合新手？

新手先从改版客户端开始，先跑通再升级到原版 + API。

### 6. 先装哪一个最划算？

如果你主要写终端任务，先装 Claude Code；如果你偏命令行，先试 Gemini CLI；如果你想兼顾项目上下文，Codex 也值得直接上手。