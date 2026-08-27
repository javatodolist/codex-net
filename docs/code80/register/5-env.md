---
title: 环境检查
shortTitle: 环境检查
description: 介绍如何在 Code80 中完成「环境检查」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# 环境检查

在配置 Codex 之前，请先确认本机已经正确安装 Node.js。

## 检查 Node.js 环境

在 Windows、macOS 或 Linux 终端中执行：

```bash
npm list -g --depth-0
```

如果命令可以正常执行，说明 Node.js 与 npm 已经可用。即使输出中没有安装任何全局包，也不影响后续配置。

如果提示“命令未找到”或类似错误，说明当前环境还没有安装 Node.js，或安装后没有正确加入系统环境变量。请先完成 Node.js 安装，再重新执行上面的命令确认。

::: warning 必须先完成环境检查
CLI 工具依赖 Node.js 和 npm。环境没有准备好时，后续安装 Codex 可能失败。
:::

## 继续安装 CLI

环境检查通过后，可以继续阅读 [配置 CLI 工具](/code80/register/6-cli)。如果你想看更完整的环境安装说明，也可以参考 [CLI 环境检查通用步骤](/code80/cli/1-env)。
