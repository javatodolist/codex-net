---
title: OpenClaw
shortTitle: OpenClaw
description: OpenClaw。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# OpenClaw

::: tip 提示
**此教程适合Linux云服务器、MacOS系统用户**
:::

## 安装与初始化

1. 登录服务器SSH，或在MacOS打开你的终端程序，输入以下命令开始安装，耐心等待安装流程结束。等出现以下界面提示后，选择 `yes` 选项回车确认

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

![步骤截图](/images/code80/Advanced/OpenClaw/01.webp)

2. 之后我们选择 `QuickStart` 回车确认

![步骤截图](/images/code80/Advanced/OpenClaw/02.webp)

3. 在选择供应商部分我们先选择 `Skip for now` 回车确认，跳过设置

![步骤截图](/images/code80/Advanced/OpenClaw/03.webp)

4. 在适配器选择部分，选择 `anthropic`

![步骤截图](/images/code80/Advanced/OpenClaw/04.webp)

5. 在模型选择部分，我们选择 `opus-4.5`

![步骤截图](/images/code80/Advanced/OpenClaw/05.webp)

6. 这里选择社交软件适配器，看个人需要，我们测试选择 `Telegram`

![步骤截图](/images/code80/Advanced/OpenClaw/06.webp)

7. 输入Bot Token，然后回车

8. 这里选择安装Skill，这个先跳过，后续可以通过网页进行安装

![步骤截图](/images/code80/Advanced/OpenClaw/07.webp)

9. 这里选择Hook，使用空格键全选，然后回车确认，之后过程会有GateWay安装，请耐心等待

![步骤截图](/images/code80/Advanced/OpenClaw/08.webp)

10. 打开方式这里，这里我们先选择跳过

![步骤截图](/images/code80/Advanced/OpenClaw/09.webp)

11. 安装Shell补全脚本，这里选择 `yes` 回车确认，至此我们完成安装

![步骤截图](/images/code80/Advanced/OpenClaw/10.webp)

## 渠道与模型配置

::: tip 提示
Code80专门为OpenClaw配置写了一个配置脚本，Github地址为：[openclaw-configurator](https://github.com/packyme/openclaw-configurator)，通过此脚本，可以快速帮助我们配置Code80的API。

目前脚本还不支持配置Gemini渠道，正在施工中~~~
:::

1. 在你的SSH控制台，或者MacOS终端输入以下命令安装配置器

```bash
curl -fsSL https://github.com/packyme/openclaw-configurator/releases/latest/download/index.js -o /tmp/openclaw-config.js && node /tmp/openclaw-config.js
```

2. 选择 `添加供应商`，然后选择 `Code80`

![步骤截图](/images/code80/Advanced/OpenClaw/11.webp)

3. 这里以Opus为例，在获取的模型中选择 `Claude Opus 4.5`

![步骤截图](/images/code80/Advanced/OpenClaw/12.webp)

4. 输入 [创建API令牌](/code80/register/4-token) 一节中你创建的相关分组的令牌，复制后填入

::: tip 提示
**目前推荐在OpenClaw使用的分组：**

* **GPT：[codex分组](/code80/token/2-group)、[gpt-officially分组](/code80/token/2-group)**

* **Claude：[aws-q分组](/code80/token/2-group)、[aws分组](/code80/token/2-group)、[claude-officially分组](/code80/token/2-group)**

* **Gemini** ：[gemini-slb分组](/code80/token/2-group)

**请您创建正确分组的APIKEY后填入**
:::

![步骤截图](/images/code80/Advanced/OpenClaw/13.webp)

5. 选择 `选择模型`，然后选中我们刚才配置的模型，回车确认

![步骤截图](/images/code80/Advanced/OpenClaw/14.webp)

6. 选择 `退出`，回到我们的控制台

7. 在控制台输入以下命令，重启GateWay

```bash
openclaw gateway restart
```

![步骤截图](/images/code80/Advanced/OpenClaw/15.webp)

8. 重启成功后，控制台输入以下命令，进入TUI界面，测试模型是否能正常输出。测试正常则输入 `/quit` 退出TUI界面

```bash
openclaw tui
```

![步骤截图](/images/code80/Advanced/OpenClaw/16.webp)

## 浏览器访问

1. 在控制台输入以下命令，获取 `Dashboard URL`，在浏览器进行访问

::: tip 提示
**如何你是在服务器运行，请使用nginx或其他反向代理工具来反代服务，并设置SSL证书**

另外需要修改 `~/.openclaw` 下的 `openclaw.json`文件，在 `gateway` 字段下添加以下内容

```bash
"controlUi":{
    "allowInsecureAuth":true
}
```
:::

![步骤截图](/images/code80/Advanced/OpenClaw/17.webp)

修改完毕后回到控制台输入以下命令重启网关

```bash
openclaw gateway restart
```

2. 访问带有Token的 `Dashboard URL` 链接，进入后台界面

![步骤截图](/images/code80/Advanced/OpenClaw/18.webp)

## 配置Telegram Bot访问权限

1. 回到之前创建机器人的 @BotFather 的对话中，点击我们的机器人链接，进行对话

2. 首次对话拿到我们所需的 `Pairing code`

![步骤截图](/images/code80/Advanced/OpenClaw/19.webp)

3. 在控制台输入以下命令允许您跟Bot进行互动

```bash
openclaw pairing approve telegram 你的Pairing code
```

![步骤截图](/images/code80/Advanced/OpenClaw/20.webp)

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
