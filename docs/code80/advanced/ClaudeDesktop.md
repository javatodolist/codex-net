---
title: Claude Desktop
shortTitle: Claude Desktop
description: 介绍如何在 Code80 中完成「Claude Desktop」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# Claude Desktop

## 软件下载

1. 点击 [Claude Desktop下载链接](https://claude.com/download) ，进入下载页面

![步骤截图](/images/code80/Advanced/ClaudeDesktop/01.webp)

2. 在如上图 `Desktop` 一块，根据自己的系统，下载对应的安装包

## 软件安装

### Windows

1. Windows系统下软件安装需要请求Anthropic官方，需要你用梯子挂 **全局服务（TUN模式）** ，或是用命令行来运行安装程序，使其强制走代理，否则会出现以下报错

![步骤截图](/images/code80/Advanced/ClaudeDesktop/02.webp)

2. 如果出现以上报错无法安装，请在 Claude Desktop安装程序所在目录运行 `cmd` 命令行

3. 确认你当前使用梯子的端口号，比如我使用的是 `Clash Verge` ，则端口号为 `7897`

![步骤截图](/images/code80/Advanced/ClaudeDesktop/03.webp)

4. 在命令行中分别输入以下命令，运行安装程序，此时能够正常安装

```bash
set HTTP_PROXY=http://127.0.0.1:7897
set HTTPS_PROXY=http://127.0.0.1:7897
"Claude Setup.exe"
```

![步骤截图](/images/code80/Advanced/ClaudeDesktop/04.webp)

5. 正常安装

![步骤截图](/images/code80/Advanced/ClaudeDesktop/05.webp)

### MacOS

1. MacOS系统下直接正常安装即可

![步骤截图](/images/code80/Advanced/ClaudeDesktop/06.webp)

## 绕过登录并配置第三方接口

::: tip 嫌手动配置麻烦？可以用 CC Switch 代劳
下面这套"开发者模式 + Configure third-party inference"的手动流程比较绕，还容易在测试连接这一步卡住。

如果你已经装了 [CC Switch](/code80/ccswitch/)，可以直接用它自带的 Claude Desktop 面板来配置，支持一键从 Claude Code 导入、切换更方便，也不用记这些菜单路径。具体步骤见 [CC Switch · Claude Desktop 配置](/code80/ccswitch/4-claude-desktop)。

不想装额外软件的话，继续看下面的手动配置流程即可。
:::

1. 打开软件进入登录界面

![步骤截图](/images/code80/Advanced/ClaudeDesktop/07.webp)

2. 开启开发者模式

### Windows

1. 鼠标点击邮件输入框获取焦点，键盘tab跳到左上角菜单，按下回车依次进入 –> help → troubleshooting → enable developer mode

![步骤截图](/images/code80/Advanced/ClaudeDesktop/08.webp)

2. 开启 `enable developer mode`

![步骤截图](/images/code80/Advanced/ClaudeDesktop/09.webp)

### MacOS

1. 直接在左上角菜单中依次进入 –> help → troubleshooting → enable developer mode

![步骤截图](/images/code80/Advanced/ClaudeDesktop/10.webp)

2. 开启 `enable developer mode`

![步骤截图](/images/code80/Advanced/ClaudeDesktop/09.webp)

3. 等待软件重启

## 配置第三方API

1. 同样的方法打开菜单，依次进入 Developer → Configure third-party inferenc

![步骤截图](/images/code80/Advanced/ClaudeDesktop/11.webp)

2. 在Gateway base URL填入 `https://code.ai80.vip`

3. 将Gateway auth scheme更改为 `x-api-key`

4. Gateway API key请填入生成的 CC分组 的APIKEY

5. 打开最下方 `Skip login-mode chooser` 选项

![步骤截图](/images/code80/Advanced/ClaudeDesktop/12.webp)

6. 点击右下角 `Apply locally` 按钮使配置生效

7. 进行愉快的对话吧~

::: tip 不要指望这里能"测试通过"
这个配置页面走的是第三方网关模式，不是 Anthropic 官方账号登录校验，所以**不会有、也不用等一个"连接成功/测试通过"的提示** 。

点完 `Apply locally` 后不用再折腾测试，直接回到对话框发一条消息，**能收到正常回复就说明配置生效了** ，跟测试按钮没关系。
:::

::: tip 提示
新建对话、发第一条消息后，你可能会在消费记录里看到一笔和你选的模型不一样的小额调用——这是软件自己在帮你给对话起标题，钱很少，正常现象，不用管。详细说明见 [Claude Code 相关问题](/code80/faq/CC)。
:::

![步骤截图](/images/code80/Advanced/ClaudeDesktop/13.webp)
