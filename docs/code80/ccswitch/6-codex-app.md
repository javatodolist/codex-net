---
title: ChatGPT 接入
shortTitle: ChatGPT 接入
description: ChatGPT 接入。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# ChatGPT 接入

完成 [Codex 配置](/code80/ccswitch/3-codex) 后，ChatGPT 通常可以直接复用 Codex CLI 的供应商配置。

## 直接使用现有配置

1. 先确认 Codex CLI 已经通过 CC Switch 切换到 Code80，并且在终端中可以正常对话。

2. 安装并打开 ChatGPT。应用读取到现有 Codex CLI 配置后，即可直接开始使用。

![步骤截图](/images/code80/CC-Switch/guide/023.jpg)

## 首次启动出现登录页面

如果应用仍显示 **登录 ChatGPT** ，请先关闭应用，再确认 Codex CLI 配置有效，然后重新打开 ChatGPT。

仍然出现登录页面时，可以按以下步骤继续：

1. 点击 **使用其他方式登录** 。

![步骤截图](/images/code80/CC-Switch/guide/024.jpg)

2. 将 Code80 的 **Codex 分组 API Key** 粘贴到 `OpenAI API 密钥`，点击 **继续** 。

![步骤截图](/images/code80/CC-Switch/guide/025.jpg)

3. 进入应用后发送一条测试消息，能够正常回复即表示配置生效。

![步骤截图](/images/code80/CC-Switch/guide/026.jpg)

## 切换供应商后完全重启

CC Switch 中的 Codex 配置发生变更后，需要完全退出并重新打开 ChatGPT。只关闭窗口可能让应用继续驻留后台。

在菜单栏选择 **文件 → Quit ChatGPT** ，或使用快捷键 `Ctrl + Q` 完全退出，再重新启动应用。

![步骤截图](/images/code80/CC-Switch/guide/027.jpg)

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
