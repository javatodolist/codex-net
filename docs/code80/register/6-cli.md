---
title: 配置 CLI 工具
shortTitle: 配置 CLI
description: 介绍如何在 Code80 中完成「配置 CLI 工具」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# 配置 CLI 工具

Code80 支持在命令行中使用 Codex。

## 基础条件

开始配置 CLI 前，请先完成以下步骤：

1. 完成 [环境检查](/code80/register/5-env)，确保 Node.js 和 npm 可以正常使用。
2. 完成 [安装 CLI](/code80/cli/1-env)，安装 Codex。

## API 端点说明

登录控制台后，可以在“数据看板”右侧查看当前可用的 API Endpoint。

![步骤截图](/images/code80/QuickStart/009.webp)

* 主站 Endpoint：`https://code.ai80.vip`，稳定可靠，适合生产环境。

::: tip OpenAI 兼容端点需要添加 `/v1`
如果你使用的是 OpenAI 兼容格式的客户端或工具，例如 Codex、OpenAI SDK、Cherry Studio 的 OpenAI 兼容配置，请在 API 地址后添加 `/v1`：

```
https://code.ai80.vip/v1
```
:::

::: tip 推荐配置
为了让配置过程进行轻便简单，我们**极力推荐** 使用 Github 开源项目 [CC-Switch](https://github.com/farion1231/cc-switch) 来对使用环境进行配置。

[CC-Switch 配置 Codex 教程](/code80/ccswitch/)

如果你是老鸟，或者不愿意使用此工具，可以参考以下 CLI 配置教程文档，**但我们还是极力推荐使用此工具，能省很多时间！**
:::

::: tip CLI 手动配置教程传送门
注意：配置 Codex 时，请一定先完成上方基础条件，确保 Node.js、npm 和 Codex CLI 都可以正常使用。

[Codex配置教程](/code80/cli/3-codex)

:::
