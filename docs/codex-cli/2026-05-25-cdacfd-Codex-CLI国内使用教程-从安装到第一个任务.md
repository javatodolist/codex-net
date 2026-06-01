---
title: "Codex CLI 国内使用教程：从安装到第一个任务"
description: "适用版本：Codex CLI v0.131.0+。本文面向想在国内环境中使用 Codex CLI 的开发者，重点讲安装、配置、验证和第一个实际任务。"
date: 2026-05-25
category: "Codex CLI"
tag:
  - Codex CLI
  - AI编程
  - ChatGPT
---
# Codex CLI 国内使用教程：从安装到第一个任务

> 适用版本：Codex CLI v0.131.0+。本文面向想在国内环境中使用 Codex CLI 的开发者，重点讲安装、配置、验证和第一个实际任务。

![](/images/localized/ae2d956e7db2e60a.jpg)

Codex CLI 是运行在终端里的 AI 编程智能体，可以读取项目文件、执行命令、修改代码，并在需要高风险操作时等待确认。它的优势是轻量、开源、适合脚本化和大型代码库分析。

国内使用 Codex CLI 的关键不在命令本身，而在 API 端点配置：默认端点访问不稳定，需要改为兼容 OpenAI 协议、国内可访问的 Base URL。

## Codex CLI 能做什么

Codex CLI 的典型能力包括：

- 理解项目结构，跨文件阅读和修改代码
- 执行测试、构建、格式化、Git 等终端命令
- 拆解复杂任务，逐步完成代码修改
- 使用 `config.toml` 切换模型、沙盒模式和审批策略
- 在脚本中以非交互方式执行一次性任务

适合的任务包括代码审查、单元测试补齐、重构、错误定位、脚本生成、文档提取等。

## 第一步：安装 Codex CLI

### npm 安装

```bash
npm install -g @openai/codex
```

如果出现权限错误，建议先安装 nvm，再重新执行 npm 安装。

### Homebrew 安装

```bash
brew install --cask codex
```

适合 macOS 用户。Intel Mac 如果遇到架构问题，可改用 GitHub Releases 的 x86_64 二进制。

### 直接下载二进制

网络受限、系统较旧或 npm 安装失败时，直接下载二进制更稳。

```bash
# macOS Apple Silicon
curl -L https://github.com/openai/codex/releases/download/rust-v0.131.0/codex-aarch64-apple-darwin.tar.gz | tar -xz
sudo mv codex /usr/local/bin/

# macOS Intel
curl -L https://github.com/openai/codex/releases/download/rust-v0.131.0/codex-x86_64-apple-darwin.tar.gz | tar -xz
sudo mv codex /usr/local/bin/

# Linux x86_64，兼容性优先推荐 musl
curl -L https://github.com/openai/codex/releases/download/rust-v0.131.0/codex-x86_64-unknown-linux-musl.tar.gz | tar -xz
sudo mv codex /usr/local/bin/
```

验证安装：

```bash
codex --version
```

能输出版本号，就说明命令已安装成功。

## 第二步：创建配置文件

Codex CLI 的配置文件位于：

```bash
~/.codex/config.toml
```

先创建目录：

```bash
mkdir -p ~/.codex
```

然后写入基础配置：

```toml
#:schema https://developers.openai.com/codex/config-schema.json

openai_base_url = "https://code.ai80.vip/v1"
model = "deepseek-v4-pro"
sandbox_mode = "workspace-write"
approval_policy = "on-request"
web_search = "disabled"
```

字段解释：

| 字段 | 作用 | 建议 |
| --- | --- | --- |
| `openai_base_url` | 替换默认 OpenAI API 端点 | 国内环境使用可访问的兼容端点 |
| `model` | 指定模型名称 | 以平台实际支持名称为准 |
| `sandbox_mode` | 控制文件读写权限 | 日常开发用 `workspace-write` |
| `approval_policy` | 控制何时需要确认 | 推荐 `on-request` |
| `web_search` | 是否启用联网搜索 | 国内网络不稳时关闭 |

Code80 提供兼容 OpenAI 协议的统一入口，可用于 Codex CLI、Trae、Cursor 等支持自定义 Base URL 的工具，配置时注意 Base URL 不要多写尾部斜杠。

## 第三步：设置 API Key

把 API Key 放到环境变量中，不要写进项目代码。

zsh 用户：

```bash
echo 'export OPENAI_API_KEY="你的 API Key"' >> ~/.zshrc
source ~/.zshrc
```

bash 用户：

```bash
echo 'export OPENAI_API_KEY="你的 API Key"' >> ~/.bashrc
source ~/.bashrc
```

检查是否生效：

```bash
echo $OPENAI_API_KEY
```

如果为空，说明 shell 配置没有加载成功，需要重新 `source` 或重启终端。

## 第四步：用 codex doctor 验证

新版本 Codex CLI 提供诊断命令：

```bash
codex doctor
```

它通常会检查：

- 二进制与运行环境是否正常
- API Key 是否存在
- `config.toml` 格式是否正确
- Base URL 是否可连接
- 沙盒配置是否有效

如果诊断结果中有红色错误，优先修复配置文件、环境变量和网络连通性，再进入项目使用。

## 第五步：启动第一个任务

进入项目目录：

```bash
cd ~/your-project
codex
```

可以从低风险任务开始，例如：

```text
检查这个项目里有没有明显的 Bug 或安全问题，列出 Top 5，不要修改文件。
```

确认工具能正确读取项目后，再尝试修改类任务：

```text
为 src/auth.py 的 login() 函数添加速率限制，每个 IP 每分钟最多 10 次请求，并补充单元测试。
```

如果你只想执行一次任务，不进入交互界面：

```bash
codex -q "为所有 Python 文件的公开函数添加类型注解"
```

如果要把输出接到管道或文件中，可以使用纯净输出模式：

```bash
codex -z "列出这个项目的所有 TODO 注释" > todos.txt
```

## 用 @ 提及文件或目录

在支持的版本中，可以在提示词中用 `@` 指定文件或目录：

```text
对比 @src/old_parser.py 和 @src/new_parser.py 的性能差异，给出优化建议。
```

这种方式比自然语言描述路径更准确，适合大型项目中定位具体文件。

## 沙盒模式怎么选

`sandbox_mode` 决定 Codex 能操作哪些文件。

| 模式 | 权限 | 适合场景 |
| --- | --- | --- |
| `read-only` | 只能读，不能写 | 代码审查、架构分析 |
| `workspace-write` | 可修改当前工作区 | 日常开发推荐 |
| `danger-full-access` | 可访问更大系统范围 | 本地临时调试，谨慎使用 |

日常建议：

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
```

这样 Codex 可以修改项目文件，但遇到删除、迁移、系统级命令等高风险操作时会暂停确认。

## 切换模型

如果你的 API 服务提供多个模型，只需修改 `model` 字段：

```toml
model = "deepseek-v4-pro"
```

复杂推理任务可使用推理增强模型，长上下文项目可使用长上下文模型，带截图或 UI 分析的任务则可使用多模态能力更强的模型。模型名称必须与服务商支持的标识符完全一致。

![](/images/localized/b7edf92929d33904.jpg)

## 常用命令速查

```bash
# 进入交互式会话
codex

# 单次任务
codex -q "任务描述"

# 纯净输出
codex -z "任务描述"

# 临时切换模型
codex --model deepseek-r1 -q "分析这个算法的时间复杂度"

# 诊断环境和配置
codex doctor

# 查看帮助
codex --help
```

会话内常见斜杠命令：

| 命令 | 作用 |
| --- | --- |
| `/help` | 查看帮助 |
| `/model` | 查看或切换模型 |
| `/clear` | 清空上下文 |
| `/status` | 查看状态 |
| `/quit` | 退出 |

## 常见问题

### API 连接超时怎么办

先执行：

```bash
codex doctor
```

再检查 `openai_base_url` 是否多了尾部斜杠。通常应写成：

```toml
openai_base_url = "https://code.ai80.vip/v1"
```

不要写成：

```toml
openai_base_url = "https://code.ai80.vip/v1/"
```

### model not found 怎么办

模型名称不匹配。到你使用的 API 平台查看准确模型标识符，确认大小写、版本号和后缀完全一致。

### Codex 会不会自动删除文件

默认 `approval_policy = "on-request"` 时，高风险命令会等待确认。不要在不了解影响的情况下使用 `approval_policy = "never"` 或全权限模式。

### 支持中文提示词吗

支持。可以直接用中文描述任务。如果希望长期用中文回复，可在配置或项目说明中写明回复语言偏好。

## 总结

国内使用 Codex CLI 的完整路径是：安装命令行工具，创建 `~/.codex/config.toml`，配置可访问的 OpenAI 兼容 Base URL，设置 API Key，运行 `codex doctor` 验证，最后进入项目目录启动任务。只要把端点、模型名和环境变量三件事配置正确，Codex CLI 就能成为一个轻量、可脚本化的终端 AI 编程助手。