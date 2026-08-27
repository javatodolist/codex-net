---
title: Grok Build配置
shortTitle: Grok Build
description: 介绍如何在 Code80 中完成「Grok Build配置」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# Grok Build配置

Grok Build 是 xAI 推出的终端编码助手。按照官方文档，它的主要配置文件是 `~/.grok/config.toml`，我们可以把模型请求接入 Code80 的 OpenAI 兼容端点。

::: tip 不要把真实 Key 发给别人
下面示例里的 `xxx` 只是占位符。请用你在 Code80 控制台创建的令牌替换它，不要在截图、聊天记录、公开仓库或工单里展示真实 API Key。
:::

## 安装 Grok Build

### Windows

1. 打开 PowerShell，执行官方安装命令：

```bash
irm https://x.ai/cli/install.ps1 | iex
```

2. 安装完成后，重新打开终端，执行以下命令确认可用：

```bash
grok --version
```

### MacOS / Linux / WSL

1. 打开终端，执行官方安装命令：

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

2. 安装完成后，重新打开终端，执行以下命令确认可用：

```bash
grok --version
```

## 配置 Code80 网关

### Windows

1. 键盘按下“Win+R”，输入以下路径后回车，打开 Grok Build 配置目录：

```bash
%userprofile%\.grok
```

2. 如果目录中没有 `config.toml`，请手动创建一个同名文件。

3. 将以下内容写入 `config.toml`：

```toml
[models]
default = "grok-4.6"
web_search = "grok-4.6"

[endpoints]
models_base_url = "https://code.ai80.vip/v1"

[model."grok-4.6"]
model = "grok-4.6"
name = "Grok 4.6"
description = "Grok 4.6 via Code80"
api_key = "xxx"
api_backend = "responses"
context_window = 500000
supports_reasoning_effort = true   # 开启后可用 /effort 调整思考等级
supports_backend_search = false    # 关闭后端搜索，避免网关不支持时报错
```

4. 回顾 [创建 API 令牌](/code80/register/4-token)，在 Code80 中创建可用于 Grok / OpenAI 兼容接口的令牌，并将上方 `xxx` 替换为你的令牌。

### MacOS / Linux / WSL

1. 在终端执行以下命令，创建 Grok Build 配置目录：

```bash
mkdir -p ~/.grok
```

2. 打开或创建配置文件：

```bash
nano ~/.grok/config.toml
```

3. 将以下内容写入 `config.toml`：

```toml
[models]
default = "grok-4.6"
web_search = "grok-4.6"

[endpoints]
models_base_url = "https://code.ai80.vip/v1"

[model."grok-4.6"]
model = "grok-4.6"
name = "Grok 4.6"
description = "Grok 4.6 via Code80"
api_key = "xxx"
api_backend = "responses"
context_window = 500000
supports_reasoning_effort = true   # 开启后可用 /effort 调整思考等级
supports_backend_search = false    # 关闭后端搜索，避免网关不支持时报错
```

4. 回顾 [创建 API 令牌](/code80/register/4-token)，在 Code80 中创建可用于 Grok / OpenAI 兼容接口的令牌，并将上方 `xxx` 替换为你的令牌。

## 配置项说明

* `[models] default`：新会话默认使用的模型。
* `[models] web_search`：Grok Build 内置 web_search 工具使用的模型。
* `[endpoints] models_base_url`：统一模型网关入口。这里填写 Code80 的 OpenAI 兼容端点 `https://code.ai80.vip/v1`。
* `[model."grok-4.6"] api_key`：当前模型使用的 Code80 令牌。直接写在配置文件时使用 `api_key`。
* `api_backend = "responses"`：Grok 4.6 按 xAI 示例使用 Responses API。
* `supports_reasoning_effort = true`：声明当前模型支持调整思考等级（reasoning effort）。不写这一行时，`/effort` 命令与 `--effort` 参数对该模型不可用。
* `supports_backend_search = false`：声明当前模型不支持 Grok 后端搜索（backend search）。Code80 网关不提供该能力，设为 `false` 可避免请求被自动附加后端搜索参数而报错。
* `[workflows] enabled = false`：关闭 Grok Build 的 workflows 功能。接入 Kimi-K3 等非 Grok 模型时需要关闭，否则无法正常对话。

::: tip 也可以使用环境变量保存 Key
如果你不想把令牌直接写进 `config.toml`，可以把 `api_key = "xxx"` 改成：

```toml
env_key = "CODE80_API_KEY"
```

然后在系统环境变量中配置 `CODE80_API_KEY`。注意：`env_key` 填的是环境变量名，不是 API Key 本身。
:::

## 添加 Kimi-K3 等模型

如果要在 Grok Build 中使用 Kimi-K3 等非 Grok 模型，除了按同样的方式添加 `[model."kimi-k3"]` 配置块外，还**必须** 关闭 workflows 功能，否则无法正常对话：

```toml
[workflows]
enabled = false

[model."kimi-k3"]
model = "kimi-k3"
name = "Kimi K3"
description = "Kimi K3 via Code80"
api_key = "xxx"
api_backend = "chat_completions"
context_window = 262144
supports_backend_search = false
```

要点说明：

* `[workflows] enabled = false`：workflows 是 Grok 模型专属的工作流能力，Kimi-K3 等第三方模型不支持，必须关闭才能正常对话。
* `api_backend` 按模型实际接口填写，Kimi 系列模型一般使用 `chat_completions`。
* `model = "kimi-k3"` 需与 Code80 控制台中的模型名称一致。

## 调整思考等级

模型配置里加上 `supports_reasoning_effort = true` 后，就可以随时调整思考等级（reasoning effort），让模型在“快速回答”和“深入思考”之间切换。

* 在 TUI 会话中，使用 `/effort` 命令调整当前模型的思考等级：

```bash
/effort low       # 低思考，响应更快
/effort medium
/effort high
/effort xhigh     # 极高思考，推理更深入
```

* 切换模型时也可以直接带上思考等级，例如 `/model grok-4.6 high`。
* 在无头模式（`-p`）下，使用 `--effort` 参数：

```bash
grok -p "只回复 ok" -m grok-4.6 --effort high
```

::: tip 思考等级需要模型本身支持
`/effort` 只在当前模型声明了 `supports_reasoning_effort = true` 时才生效；不同模型支持的等级范围可能不同，具体以模型菜单里展示的为准。
:::

## 测试配置

1. 检查 Grok Build 是否读取到了配置文件：

```bash
grok inspect
```

2. 发送一次最小测试请求：

```bash
grok -p "只回复 ok" -m grok-4.6
```

如果输出类似下面内容，说明配置已经生效：

```bash
ok
```

更多排查问题请参考 [Grok Build 常见问题](/code80/faq/GrokBuild)。
