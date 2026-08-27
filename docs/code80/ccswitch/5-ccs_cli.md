---
title: CC Switch CLI 使用
shortTitle: CCS CLI
description: 介绍如何在 Code80 中完成「CC Switch CLI 使用」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# CC Switch CLI 使用

::: tip 提示
CC Switch CLI 适合服务器、SSH、macOS 终端和自动化场景使用。如果你更习惯图形界面，可以继续使用前面的 CC-Switch 教程。
:::

# CC-Switch CLI

[![Version](https://img.shields.io/github/v/release/saladday/cc-switch-cli?label=version)](https://github.com/saladday/cc-switch-cli/releases/latest)
[![Platform](https://img.shields.io/badge/platform-Windows | macOS | Linux-lightgrey.svg)](https://github.com/saladday/cc-switch-cli/releases)
[![Built with Rust](https://img.shields.io/badge/built with-Rust-orange.svg)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/saladday/cc-switch-cli/blob/main/LICENSE)

**Claude Code、Codex、OpenCode 与 OpenClaw 的命令行管理工具**

统一管理多个 AI 编码 CLI 的供应商配置，并支持 MCP、Skills、提示词、本地代理和环境检查等功能。


## CC-Switch CLI 是什么

CC-Switch CLI 是 CC-Switch 的命令行版本，适合服务器、SSH、macOS 终端和自动化场景使用。

它包含两部分：

* **完整 CLI 命令** ：可以用命令完成 Provider 列表查看、切换、环境检查、MCP 同步、Skills 管理、提示词管理、本地代理等操作。
* **完整 TUI 界面** ：运行 `cc-switch` 后进入终端图形界面，可以像使用桌面版一样新增 Provider、选择 Code80 模板、填写 API Key、保存并切换配置。

如果你只是第一次配置 Code80，推荐先用 TUI。配置完成后，日常切换、检查和排错可以直接用 CLI 命令完成。

## 安装 CC-Switch CLI

macOS 和 Linux 推荐使用一键安装脚本：

```bash
curl -fsSL https://github.com/SaladDay/cc-switch-cli/releases/latest/download/install.sh | bash
```

默认会安装到 `~/.local/bin`。如果终端提示找不到 `cc-switch`，请确认 `~/.local/bin` 已加入 `PATH`。

手动安装

### macOS

```bash
curl -LO https://github.com/saladday/cc-switch-cli/releases/latest/download/cc-switch-cli-darwin-universal.tar.gz
tar -xzf cc-switch-cli-darwin-universal.tar.gz
chmod +x cc-switch
sudo mv cc-switch /usr/local/bin/

# 如遇 “无法验证开发者” 提示
xattr -cr /usr/local/bin/cc-switch
```

### Linux x64

```bash
curl -LO https://github.com/saladday/cc-switch-cli/releases/latest/download/cc-switch-cli-linux-x64-musl.tar.gz
tar -xzf cc-switch-cli-linux-x64-musl.tar.gz
chmod +x cc-switch
sudo mv cc-switch /usr/local/bin/
```

### Linux ARM64

```bash
curl -LO https://github.com/saladday/cc-switch-cli/releases/latest/download/cc-switch-cli-linux-arm64-musl.tar.gz
tar -xzf cc-switch-cli-linux-arm64-musl.tar.gz
chmod +x cc-switch
sudo mv cc-switch /usr/local/bin/
```

### Windows

前往 [GitHub Releases](https://github.com/saladday/cc-switch-cli/releases/latest) 下载 `cc-switch-cli-windows-x64.zip`，解压后将 `cc-switch.exe` 放到 PATH 目录中，或直接在当前目录运行：

```bash
.\cc-switch.exe
```

## 两种使用方式

### 进入 TUI 界面

```bash
cc-switch
```

如果要直接配置某个应用，可以加 `--app`：

```bash
cc-switch --app codex
```

TUI 适合第一次配置。你可以在里面选择 Code80 模板，填入 API Key，然后保存并切换到该 Provider。

### 使用 CLI 命令

```bash
cc-switch provider list
cc-switch provider current
cc-switch provider switch <id>
cc-switch env tools
cc-switch env check
```

`claude` 是默认应用。管理其他应用时使用 `--app`：

```bash
cc-switch --app codex provider list
cc-switch --app codex provider current
```

CLI 命令适合服务器、脚本和日常排错，也适合交给 Claude Code / Codex 直接执行。

## 配置前准备

请先确认目标 CLI 已经安装：

```bash
cc-switch env tools
```

建议先运行一次目标 CLI 或帮助命令，让它创建自己的配置目录：

```bash
codex --help
```

然后在 Code80 创建对应分组的令牌：

* Codex：创建 **Codex 分组** 令牌

## 配置 Code80

第一次配置推荐使用 TUI，因为它会展示 Code80 模板和需要填写的字段。

::: tip 提示
下面以 Codex 为例。进入 TUI 时请使用 `--app codex`。Claude Code 配置见 [Claude 站点](https://claude.it8090.cn/code80/ccswitch/5-ccs_cli)。
:::

1. 运行以下命令进入交互界面：

```bash
cc-switch
```

如果要直接配置 Codex，可以这样进入：

```bash
cc-switch --app codex
```

2. 在左侧选择 `Providers`，进入供应商管理页面，然后新增供应商。

![步骤截图](/images/code80/CC-Switch/019.webp)

3. 在模板中选择 `* Code80`。

![步骤截图](/images/code80/CC-Switch/020.webp)

4. 在 `API Key` 中填入你从 Code80 复制的令牌，然后保存。

![步骤截图](/images/code80/CC-Switch/021.webp)

5. 回到供应商列表，确认当前选中的是刚刚添加的 Code80 Provider。

![步骤截图](/images/code80/CC-Switch/022.webp)

6. 打开 Codex 测试是否可以正常对话：

```bash
codex
```

## 常用命令

```bash
cc-switch                         # 进入交互界面
cc-switch env tools               # 检查本地 CLI 是否安装
cc-switch env check               # 检查环境变量冲突

cc-switch --app codex provider list
cc-switch --app codex provider current
cc-switch --app codex provider switch <id>

cc-switch --app codex provider list

cc-switch provider stream-check <id> # 检查供应商流式响应
cc-switch provider fetch-models <id> # 拉取远端模型列表
cc-switch update                     # 更新 CC-Switch CLI
```

管理 Codex、OpenCode 或 OpenClaw 时，请使用全局参数 `--app` 指定目标应用。

## 高级玩法：让 AI 助手操作 CC-Switch CLI

如果你已经在 Claude Code 或 Codex 中工作，也可以直接让它们调用 `cc-switch` 命令来检查和切换配置。

例如你可以这样说：

```bash
帮我运行 cc-switch --app codex provider list，看一下当前有哪些 Codex Provider。
```

```bash
帮我运行 cc-switch --app codex provider current，确认 Codex 当前是不是 Code80。
```

```bash
帮我运行 cc-switch env check --app codex，检查有没有环境变量覆盖配置。
```

```bash
帮我切换到 Code80 provider，然后运行 codex 测试是否能正常回复。
```

这种方式适合已经熟悉终端的人。AI 助手负责执行命令和解释结果，你只需要确认关键操作，比如切换 Provider、覆盖配置文件或删除配置。

## 常见问题

### 切换 Provider 后没有生效

请先确认目标 CLI 已经初始化配置目录。可以运行一次：

```bash
codex --help
```

然后重新切换一次 Provider。

### 环境变量覆盖了配置

如果系统里设置了 `ANTHROPIC_API_KEY`、`OPENAI_API_KEY` 等环境变量，目标 CLI 可能会优先读取环境变量，导致 CC-Switch CLI 写入的配置没有生效。

可以运行：

```bash
cc-switch env check --app claude
cc-switch env check --app codex
```
