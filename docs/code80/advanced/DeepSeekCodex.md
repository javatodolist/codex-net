---
title: DS接入Codex
shortTitle: DS 接入 Codex
description: DS接入Codex。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# DS接入Codex

本教程用于通过 CC Switch 将 Code80 的 `deepseek-officially` 分组接入 Codex CLI 和 ChatGPT。

::: tip 兼容性提醒
Codex 原生面向 OpenAI 模型。接入 DeepSeek 后可能出现模型元数据缺失等提示，部分能力或性能可能受到影响。请以实际对话结果和 Code80 当前支持的模型为准。
:::

## 创建并启用供应商

1. 打开 CC Switch，在顶部应用切换栏中选择 **Codex** 。

![步骤截图](/images/code80/CC-Switch/guide/028.jpg)

2. 点击右上角 `+`，在 Codex 预设供应商中选择 **Code80** 。

![步骤截图](/images/code80/CC-Switch/guide/029.jpg)

3. 回顾 [创建 API 令牌](/code80/register/4-token)，在 Code80 中创建 `deepseek-officially` 分组的令牌，然后复制 API Key。

![步骤截图](/images/code80/CC-Switch/guide/030.jpg)

4. 在 Code80 供应商配置中填写以下内容：

* **官网链接** ：`https://code.ai80.vip`
* **API Key** ：刚才创建的 `deepseek-officially` 分组 API Key
* **API 请求地址** ：`https://code.ai80.vip/v1`
* **默认模型** ：`deepseek-v4-flash`

![步骤截图](/images/code80/CC-Switch/guide/031.jpg)

5. 点击右下角 **添加** ，返回供应商列表后启用新建的 Code80 供应商。

![步骤截图](/images/code80/CC-Switch/guide/032.jpg)

6. 完全退出并重新打开正在运行的 Codex CLI 或 ChatGPT，使新的供应商配置生效。

## 验证配置

在终端运行 `codex` 并发送一条测试消息。界面顶部显示 `deepseek-v4-flash` 且能够正常回复，即表示 Codex CLI 已经接入成功。

![步骤截图](/images/code80/CC-Switch/guide/033.jpg)

如果使用 ChatGPT，同样发送一条测试消息；能够正常回复即表示应用侧配置生效。

![步骤截图](/images/code80/CC-Switch/guide/034.jpg)

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
