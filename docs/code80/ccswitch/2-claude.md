---
title: Claude Code配置
shortTitle: Claude Code
description: 介绍如何在 Code80 中完成「Claude Code配置」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# Claude Code配置

1. 打开已安装的 CC Switch，你会看到如下图所示的初始界面

![步骤截图](/images/code80/CC-Switch/guide/003.jpg)

2. 在顶部应用切换栏中选择 **Claude Code**

![步骤截图](/images/code80/CC-Switch/guide/004.jpg)![步骤截图](/images/code80/CC-Switch/guide/005.jpg)

3. 点击右上角 `+`，在预设供应商中选择 **Code80**

![步骤截图](/images/code80/CC-Switch/guide/006.jpg)

4. 回顾 [创建 API 令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，然后复制 API Key

![步骤截图](/images/code80/CC-Switch/guide/007.jpg)

5. 在供应商配置中找到 `API Key`，填入刚才复制的 API Key，再点击右下角 **添加**

![步骤截图](/images/code80/CC-Switch/guide/008.jpg)

6. 添加成功后，回到主界面找到刚配置的 Code80，点击右侧 **启用** ；显示 **使用中** 即表示切换成功

![步骤截图](/images/code80/CC-Switch/guide/009.jpg)

7. 点击左上角 **设置** ，在通用页面找到 `跳过 Claude Code 初次安装确认`，务必开启

![步骤截图](/images/code80/CC-Switch/guide/010.jpg)

8. 在终端运行 `claude`，看到对话界面并能正常回复，即表示配置完成

![步骤截图](/images/code80/CC-Switch/guide/011.jpg)

::: tip 使用提醒
如果你使用的是 [CC分组](/code80/token/2-group)，请注意该分组**不支持第三方接入** ，因此无法在 CC Switch 中完成完整的调用测试。

这类配置是否生效，请直接以 Claude Code 内的实际对话结果为准，并在 Claude Code 中完成最终测试。
:::
