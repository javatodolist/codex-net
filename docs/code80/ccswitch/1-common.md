---
title: 通用步骤
shortTitle: 通用步骤
description: 通用步骤。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# 通用步骤

### CC-Switch介绍

### Claude Code / Codex 全方位辅助工具

[![Version](https://img.shields.io/badge/version-3.7.1-blue.svg)](https://github.com/farion1231/cc-switch/releases)
[![Trending](https://img.shields.io/badge/🔥_TypeScript_Trending-Daily | Weekly | Monthly-ff6b6b.svg)](https://github.com/trending/typescript)
[![Platform](https://img.shields.io/badge/platform-Windows | macOS | Linux-lightgrey.svg)](https://github.com/farion1231/cc-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built with-Tauri 2-orange.svg)](https://tauri.app/)
[![Downloads](https://img.shields.io/endpoint?url=https://api.pinstudios.net/api/badges/downloads/farion1231/cc-switch/total)](https://github.com/farion1231/cc-switch/releases/latest)

[![farion1231%2Fcc-switch | Trendshift](https://trendshift.io/api/badge/repositories/15372)](https://trendshift.io/repositories/15372)

[更新日志](https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md) | [下载地址](https://github.com/farion1231/cc-switch/releases/latest)

**从供应商切换器到 AI CLI 一体化管理平台**

**统一管理 Claude Code、Codex 等 CLI 的供应商配置、MCP 服务器、Skills 扩展和系统提示词。**

使用 CC-Switch，您可以：

* ✅ 一键切换 API 配置 - 在多个 API 提供商之间快速切换
* ✅ 可视化配置管理 - 通过图形界面轻松管理所有配置
* ✅ 内置 Code80 模板 - 预设了 Code80 的配置模板
* ✅ MCP 服务器管理 - 管理 Model Context Protocol 服务器
* ✅ 系统托盘快捷操作 - 通过托盘菜单快速切换

::: tip 温馨提示
CC-Switch 已经内置了 Code80 的快捷配置模板，无需手动编辑配置文件！
:::

### 软件下载

### Windows

1. 点击下载链接→[传送门](https://github.com/farion1231/cc-switch/releases/latest)←，进入 CC-Switch 的 GitHub Releases 页面

2. 鼠标滚动到页面底部，在 `Assets` 中选择适合自己系统的安装包。Windows 系统推荐下载普通 `.msi` 安装包

![步骤截图](/images/code80/CC-Switch/guide/001.jpg)![步骤截图](/images/code80/CC-Switch/guide/002.jpg)

3. 安装后运行 CC-Switch 主程序，界面如下

![步骤截图](/images/code80/CC-Switch/guide/003.jpg)

### MacOS

* MacOS安装推荐使用HomeBrew

* 开启终端后，分别运行以下命令：

```bash
# 添加 tap 源
brew tap farion1231/ccswitch

# 安装 CC-Switch
brew install --cask cc-switch
```

* 安装完成后，在“启动台”或“应用程序”文件夹中找到 CC-Switch 并启动。

![步骤截图](/images/code80/CC-Switch/guide/003.jpg)

### Linux

::: warning 重要
以下命令中的文件名包含占位符版本号 x.x.x，请访问[GitHub Releases](https://github.com/farion1231/cc-switch/releases/latest) 页面查看最新版本，并替换为实际的版本号和完整文件名。

Debian/Ubuntu 系统：

```bash
# 下载 .deb 包
wget https://github.com/farion1231/cc-switch/releases/latest/download/cc-switch_x.x.x_amd64.deb

# 安装
sudo dpkg -i cc-switch_x.x.x_amd64.deb
```
:::

### 环境检查

::: warning 注意
**请你最好进行此步的环境检查步骤！！！**
如果你有经验，能确认你的 Nodejs 环境以及 Claude Code、Codex 的 CLI 安装没问题，配置目录也都存在，可以忽略这一步，直接进入后续的 CC Switch 配置

点击右侧传送门查看 [如何进行环境检查？](/code80/cli/1-env)
:::

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
