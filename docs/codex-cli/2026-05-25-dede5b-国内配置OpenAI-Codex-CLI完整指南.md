---
title: "国内配置 OpenAI Codex CLI 完整指南"
description: "适合已经了解 Codex CLI、但不知道如何在国内网络环境中稳定调用模型的开发者。重点讲 openaibaseurl、Provider、多模型切换和排错。"
date: 2026-05-25
category: "Codex CLI"
tag:
  - Codex CLI
  - AI编程
  - ChatGPT
---
# 国内配置 OpenAI Codex CLI 完整指南

> 适合已经了解 Codex CLI、但不知道如何在国内网络环境中稳定调用模型的开发者。重点讲 `openai_base_url`、Provider、多模型切换和排错。

![](/images/localized/fdb43ca1f11f1189.jpg)

OpenAI Codex CLI 是终端里的 AI 编程 Agent，可以读取代码、执行命令、生成补丁并协助完成多步骤开发任务。它与早期的 Codex 代码生成模型不是一回事：现在的 Codex CLI 是一个工具形态，核心体验在终端和项目工作区中。

国内使用时，最常见的问题不是安装，而是默认 API 端点无法稳定访问。解决思路是：把 Codex CLI 的后端地址改成兼容 OpenAI 协议、国内可访问的 API 端点。

## 配置思路总览

Codex CLI 有三种常见接入方式：

| 方式 | 适合场景 | 特点 |
| --- | --- | --- |
| `openai_base_url` | 单一 API 服务 | 最简单，配置少 |
| `model_providers` | 多服务、多 Key 切换 | 更灵活，适合团队或多模型评测 |
| 环境变量临时覆盖 | 脚本、CI、一次性任务 | 不污染全局配置 |

如果你只是想快速跑通，优先使用 `openai_base_url`。

## 方案一：用 openai_base_url 快速接入

### 1. 安装 Codex CLI

```bash
npm install -g @openai/codex
```

macOS 也可以使用：

```bash
brew install --cask codex
```

验证：

```bash
codex --version
```

### 2. 创建配置文件

```bash
mkdir -p ~/.codex
```

编辑 `~/.codex/config.toml`：

```toml
#:schema https://developers.openai.com/codex/config-schema.json

openai_base_url = "https://code.ai80.vip/v1"
model = "deepseek-v4-pro"
sandbox_mode = "workspace-write"
approval_policy = "on-request"
web_search = "disabled"
```

这里的 `openai_base_url` 必须是 OpenAI 兼容协议入口，通常包含 `/v1`，并且不要额外添加尾部斜杠。

### 3. 设置 API Key

```bash
echo 'export OPENAI_API_KEY="你的 API Key"' >> ~/.zshrc
source ~/.zshrc
```

如果你使用 bash：

```bash
echo 'export OPENAI_API_KEY="你的 API Key"' >> ~/.bashrc
source ~/.bashrc
```

### 4. 启动 Codex

```bash
cd ~/your-project
codex
```

建议第一次输入只读任务：

```text
请阅读这个项目的目录结构，说明主要模块职责，不要修改文件。
```

确认文件读取、模型响应都正常后，再执行修改任务。

## 方案二：配置多个 Provider

如果你需要在多个服务之间切换，例如一个用于日常代码生成，一个用于复杂推理，一个作为备用，可以使用 `model_providers`。

```toml
#:schema https://developers.openai.com/codex/config-schema.json

[model_providers.primary]
base_url = "https://code.ai80.vip/v1"
env_key = "OPENAI_API_KEY"
name = "primary-openai-compatible"

[model_providers.deepseek]
base_url = "https://api.deepseek.com/v1"
env_key = "DEEPSEEK_API_KEY"
name = "deepseek-official"

model_provider = "primary"
model = "deepseek-v4-pro"

sandbox_mode = "workspace-write"
approval_policy = "on-request"
web_search = "disabled"
```

对应环境变量：

```bash
export OPENAI_API_KEY="你的主服务 Key"
export DEEPSEEK_API_KEY="你的 DeepSeek Key"
```

切换服务时只需要修改：

```toml
model_provider = "deepseek"
model = "deepseek-chat"
```

这种方式适合团队评估不同模型，或在某个服务限流时快速切换备用端点。

## 方案三：用环境变量临时运行

如果不想修改全局配置，可以在单次命令中设置环境变量：

```bash
OPENAI_BASE_URL="https://code.ai80.vip/v1" \
OPENAI_API_KEY="你的 API Key" \
codex -q "帮我给这个项目补充单元测试"
```

这适合 CI/CD、脚本自动化或临时测试。缺点是每次运行都要显式传入配置。

## 推荐的基础配置

日常开发可从这份配置开始：

```toml
openai_base_url = "https://code.ai80.vip/v1"
model = "deepseek-v4-pro"
sandbox_mode = "workspace-write"
approval_policy = "on-request"
web_search = "disabled"

[shell_environment_policy]
include_only = ["PATH", "HOME", "OPENAI_API_KEY", "OPENAI_BASE_URL"]
```

为什么这样配置：

- `workspace-write` 允许 Codex 修改当前项目，但不鼓励越界操作
- `on-request` 会在高风险命令前暂停确认
- `web_search = "disabled"` 可以减少国内环境中搜索 API 超时带来的干扰
- `shell_environment_policy` 限制传入子进程的环境变量，降低密钥误暴露风险

## 国内 API 选择时看什么

![](/images/localized/a1e776bc12373559.jpg)

选择 OpenAI 兼容 API 时，建议重点看五件事：

| 维度 | 为什么重要 |
| --- | --- |
| 协议兼容性 | Codex CLI 依赖 Chat Completions 等接口行为 |
| 模型覆盖 | 是否支持代码、推理、长上下文、多模态等不同任务 |
| 稳定性 | Agent 工具会多轮调用，稳定性比单次问答更重要 |
| 计费透明度 | 便于控制自动化任务成本 |
| 国内访问质量 | 直接影响终端交互延迟 |

如果你希望用一个入口接入多类模型，可选择 [Code80](https://code.ai80.vip) 这类统一 API 服务，减少在多个平台之间管理 Key 和 Base URL 的成本。

## IDE 插件与 CLI 的关系

Codex CLI 主要工作在终端，但也可以与编辑器配合使用。常见组合是：

- IDE 负责日常编辑、跳转、调试
- Codex CLI 负责跨文件分析、批量修改、测试执行
- Git 管理变更，人工 review 最终 diff

如果你在 VS Code、Cursor、Windsurf 等工具中使用自定义模型，也要分别检查它们是否读取全局 Codex 配置。有些工具读取自己的配置，不会自动继承 `~/.codex/config.toml`。

## 常见报错与处理

### Connection refused 或 timeout

检查 Base URL：

```toml
# 推荐
openai_base_url = "https://code.ai80.vip/v1"

# 不推荐：多了尾部斜杠
openai_base_url = "https://code.ai80.vip/v1/"
```

再检查网络和 Key：

```bash
echo $OPENAI_API_KEY
codex doctor
```

### Unauthorized / 401

通常是 API Key 没有生效、填错、过期或权限不足。

```bash
echo $OPENAI_API_KEY
```

如果输出为空，重新加载 shell 配置：

```bash
source ~/.zshrc
```

### model not found

模型名必须与服务商支持的标识符完全一致。常见错误包括：

- 大小写不一致
- 多写或少写版本后缀
- 把展示名称当成 API 标识符
- 当前 Key 没有该模型权限

### web_search 触发超时

在国内环境中，联网搜索能力可能引入额外不稳定因素。可以先关闭：

```toml
web_search = "disabled"
```

等基础对话和代码修改稳定后，再按需开启。

## FAQ

### 只有 ChatGPT Plus 账号，没有 API Key，能改 Base URL 吗

账号登录和 API Key 是两条路径。通过 ChatGPT 账号登录时通常走官方服务，未必能替换 Base URL。国内环境更建议使用 API Key + 兼容端点。

### 可以同时配置 openai_base_url 和 model_providers 吗

可以，但如果设置了 `model_provider`，会优先使用指定 Provider。为了减少混乱，建议单服务用 `openai_base_url`，多服务才用 `model_providers`。

### Windows 上怎么用

更推荐 WSL2。Codex CLI 的很多示例命令、路径和权限模型都更贴近 Linux/macOS，WSL2 能减少 Windows 原生沙盒、路径和编码问题。

### Codex CLI 和 Claude Code 该选哪个

两者都是终端 AI 编程工具。Codex CLI 更偏 OpenAI 生态和 OpenAI 兼容协议；Claude Code 更偏 Anthropic 生态。实际选择取决于你常用模型、预算、团队工具链和端点可用性。

## 总结

国内配置 Codex CLI 的核心是三步：安装 CLI，配置 `~/.codex/config.toml`，设置 API Key。最简单的方案是使用 `openai_base_url` 指向国内可访问的 OpenAI 兼容端点；如果要多模型、多服务切换，再使用 `model_providers`。配置完成后先跑 `codex doctor`，再从只读任务开始验证，最后逐步交给它处理真实开发任务。