---
title: WorkBuddy
shortTitle: WorkBuddy
description: WorkBuddy。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# ![步骤截图](/images/code80/icon/workbuddy.png)WorkBuddy

## 产品介绍

[WorkBuddy](https://www.codebuddy.cn/work/) 是腾讯出品的全场景 AI 办公工作台。用户可以通过自然语言下达任务，由 AI 自主拆解步骤、调用工具并交付文档、表格、PPT、数据分析等完整成果。

WorkBuddy 的主要特点包括：

* 覆盖运营、设计、数据、开发等多种办公场景，支持多专家协同执行任务。
* 支持桌面端、主流 IM 和小程序，可在不同终端发起和跟进任务。
* 支持 MCP 生态与自定义 Skills，可按需扩展工具和工作流。
* 支持在图形界面中添加第三方模型，配置 URL、API Key 和模型名称。

更多产品信息可查看 [WorkBuddy 官方介绍](https://www.workbuddy.cn/docs/workbuddy/Overview) 和 [模型配置说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model)。

## 配置 Code80

### 准备工作

开始配置前，请先完成以下准备：

1. 安装并登录 WorkBuddy。
2. 参考 [创建 API 令牌](/code80/register/4-token)，在 Code80 网站创建 API Key。
3. 确认 API Key 所属分组支持需要使用的模型，并记录对应的模型名称。

目前支持接入 WorkBuddy 的令牌分组如下：

* `cc-sale`
* `deepseek-officially`
* `gemini-officially`
* `grok-officially`
* `mimo-officially`
* `minimax-officially`
* `zai-officially`
* `hunyuan-officially`
* `bailian`

::: warning 重要
API Key 所属分组决定了可用的模型。配置时填写的模型名称必须与该分组实际提供的模型 ID 完全一致，具体可在 [模型广场](/code80/token/1-intro) 或 [令牌分组介绍](/code80/token/2-group) 中查询。

请勿分享或公开展示 API Key。截图、录屏或寻求帮助时，应先确认密钥已经完整遮挡。
:::

### 配置步骤

1. 在 WorkBuddy 主界面点击左下角的账户区域展开菜单，然后点击 **设置** 。

![步骤截图](/images/code80/Advanced/WorkBuddy/01.jpg)

2. 进入设置界面后，在左侧导航栏中选择 **模型** 。

![步骤截图](/images/code80/Advanced/WorkBuddy/02.jpg)

3. 在自定义模型区域点击右上角的 **添加模型** 。

![步骤截图](/images/code80/Advanced/WorkBuddy/03.jpg)

4. 展开 **提供商** 列表，在 **其他** 分类中选择 **自定义 / Custom** 。

![步骤截图](/images/code80/Advanced/WorkBuddy/04.jpg)

5. 按照以下说明填写模型配置：

* **接口地址** ：填写 `https://code.ai80.vip/v1`
* **API Key** ：粘贴在 Code80 网站创建的 API Key。
* **模型名称** ：填写 API Key 所属分组下的模型 ID。下图以 `cc-sale` 分组的 `claude-opus-4-8` 为例。
* **高级配置** ：按照所选模型的实际能力勾选。下图示例启用了工具调用、思考模式和允许关闭思考，其余配置保持图中状态即可。

确认配置无误后，点击右下角的 **保存** 。WorkBuddy 会将配置写入本地的 `~/.workbuddy/models.json` 文件。

![步骤截图](/images/code80/Advanced/WorkBuddy/05.jpg)

6. 返回任务对话界面，点击输入框右下角的模型选择器，选择刚刚配置的模型。发送一条消息并正常收到回复，即表示 Code80 接入成功。

![步骤截图](/images/code80/Advanced/WorkBuddy/06.jpg)

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
