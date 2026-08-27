---
title: CLI配置教程
shortTitle: CLI 教程
description: CLI配置教程。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# CLI配置教程

## 环境检查(通用步骤)

### （1）确认Nodejs环境已安装

1. 在windows或MacOS终端输入以下命令

```bash
npm list -g --depth-0
```

正常情况应该是如下图所示（没有任何内容也没关系），如果提示“命令未找到”，则说明你没有安装Nodejs，你需要按 [此教程](https://www.runoob.com/nodejs/nodejs-install-setup.html) 来安装运行 Claude Code、Codex 等 CLI 所需的环境

![步骤截图](/images/code80/Cli/001.webp)

2. 如果你发现自己没有安装Nodejs，并且跟着教程目前已经安装完毕，请你重新执行上述提到的命令，如果不再提示“命令未找到”，则说明安装成功

### （2）安装CLI

1. 在windows或MacOS终端输入以下命令，安装 Claude Code 与 Codex

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
```

![步骤截图](/images/code80/Cli/002.webp)

### （3）测试安装成功

::: warning 重要
**这一步很重要，请你务必运行命令进行测试，因为这一步运行命令后，你的用户目录下才会生成各CLI的配置目录，方便后续操作！**
:::

### Claude Code

在windows或MacOS终端输入以下命令，若出现图示内容，或出现选项让你选择，则Claude code安装成功

```bash
claude
```

![步骤截图](/images/code80/Cli/003.webp)

::: warning 重要
**第二步十分重要，请你务必跳转链接后运行命令进行配置**
:::

2. 点击 [claude code 无法连接到 Anthropic 服务](/code80/faq/CC) 跳转，务必根据教程运行命令，然后再继续阅读之后单独CLI的配置教程

### Codex

在windows或MacOS终端输入以下命令，若出现图示内容，或出现选项让你选择，则Codex安装成功

```bash
codex
```

![步骤截图](/images/code80/Cli/004.webp)

## Claude Code配置

### Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开Claude Code配置目录

```bash
%userprofile%\.claude
```

![步骤截图](/images/code80/Cli/013.webp)

2. 目录内容如图所示，如果目录中没有 `settings.json`，你需要手动创建后打开

* **settings.json** ：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![步骤截图](/images/code80/Cli/014.webp)

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![步骤截图](/images/code80/Cli/015.webp)

4. 回顾 [创建API令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，替换上方 `xxx`部分

![步骤截图](/images/code80/Cli/025.webp)

5. 在windows终端运行 `claude`，出现对话界面后进行对话测试，能收到回复即表示配置成功

![步骤截图](/images/code80/Cli/016.webp)

### MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径后回车，打开配置目录

```bash
~/.claude
```

![步骤截图](/images/code80/Cli/017.webp)

2. 若目录不存在 `settings.json`，需要你手动进行创建

* **settings.json** ：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![步骤截图](/images/code80/Cli/018.webp)

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![步骤截图](/images/code80/Cli/015.webp)

4. 回顾 [创建API令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，替换上方 `xxx`

![步骤截图](/images/code80/Cli/025.webp)

5. 在终端运行 `claude`，看到对话界面并能正常回复即表示配置完成

![步骤截图](/images/code80/Cli/016.webp)

更多环境变量含义与可选配置，见 [Claude Code配置](/code80/cli/2-claude)。

::: warning 重要
**注意，如果配置完仍然有报错问题，提示你需要登录，请看如下链接解决**
[claude-code-无法连接到-anthropic-服务](/code80/faq/CC)
:::

## Codex配置

### Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开你的codex配置目录

```bash
%userprofile%\.codex
```

![步骤截图](/images/code80/Cli/006.webp)

2. 你的目录中可能会存在以下文件，不过我们用到的文件只有三个，需要配置的只有两个

![步骤截图](/images/code80/Cli/007.webp)

* **config.toml** ：Codex的**核心配置** 文件，中转服务与MCP等都在此文件配置

* **auth.json** ：用来配置你在中转站获取的ApiKey秘钥

* **`AGENTS.md`** ：用来设置codex全局工作的提示词

::: warning 重要
**很多人刚安装可能没有这三个文件，你需要手动去创建这三个文件，然后写入内容**
:::

3. 配置 Config.toml

将以下配置文本复制到你的 config.toml文件中保存

```toml
disable_response_storage = true
model = "gpt-5.5"
model_provider = "code80"
model_reasoning_effort = "xhigh"
model_verbosity = "high"

[features]
web_search_request = true

[model_providers.code80]
base_url = "https://code.ai80.vip/v1"
name = "code80"
requires_openai_auth = true
wire_api = "responses"
```

::: warning 重要
`gpt-5.3-codex` 及其以下版本已被官方删除。请根据 [Codex分组](/code80/token/2-group) 中实时展示的可用模型 ID 填写 `model`。
:::

4. 配置ApiKey

将以下配置文本复制到你的 auth.json文件中

```json
{
  "OPENAI_API_KEY": "xxx"
}
```

![步骤截图](/images/code80/Cli/008.webp)

回顾 [创建API令牌](/code80/register/4-token) 这一步教程，我们需要在Code80中创建 **Codex** 分组的令牌，然后点击右侧的复制按钮，将key填入“xxx”部分后保存

![步骤截图](/images/code80/Cli/009.webp)

5. 测试对话

在windows终端输入以下命令，出现图示内容，进行对话测试，如果有回复，则配置成功，开始你的Codex使用之旅~

```bash
codex
```

![步骤截图](/images/code80/Cli/010.webp)

### MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径并回车，打开 Codex 配置目录

```bash
~/.codex
```

![步骤截图](/images/code80/Cli/011.webp)

2. 你的目录中可能会存在以下文件，不过我们用到的文件只有三个，需要配置的只有两个，其它文件可忽略

![步骤截图](/images/code80/Cli/012.webp)

* **config.toml** ：Codex 的核心配置文件，中转服务与 MCP 等都在此文件配置

* **auth.json** ：存放中转站获取的 ApiKey 秘钥

* **`AGENTS.md`** ：Codex 全局工作的提示词

::: warning 重要
初次安装若未自动生成，需要手动创建上述三个文件并写入内容
:::

3. 配置 Config.toml

将以下内容保存到 `config.toml`

```toml
model_provider = "code80"
model = "gpt-5.1-codex"
model_reasoning_effort = "high"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.code80]
name = "code80"
base_url = "https://code.ai80.vip/v1"
wire_api = "responses"
requires_openai_auth = true
```

4. 配置 ApiKey

将以下配置文本复制到你的 auth.json文件中

```json
{
  "OPENAI_API_KEY": "xxx"
}
```

![步骤截图](/images/code80/Cli/008.webp)

回顾 [创建API令牌](/code80/register/4-token) 这一步教程，我们需要在Code80中创建 **Codex** 分组的令牌，然后点击右侧的复制按钮，将key填入“xxx”部分后保存

![步骤截图](/images/code80/Cli/009.webp)

5. 测试对话

在 MacOS 终端执行以下命令，出现对话界面并能收到回复即表示配置成功

```bash
codex
```

![步骤截图](/images/code80/Cli/010.webp)

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
