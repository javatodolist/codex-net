---
title: Claude Desktop配置
shortTitle: CCS Desktop
description: 介绍如何在 Code80 中完成「Claude Desktop配置」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# Claude Desktop配置

::: tip 和上面的"Claude Code配置"是两回事
Claude Desktop（桌面客户端）和 Claude Code（命令行/VSCode 插件）在 CC Switch 里是两个独立入口，配置文件互不相通，需要分别配置。这一页说的是桌面客户端。
:::

## 第一步：切换到 Claude Desktop 面板

打开 CC Switch，在左侧应用切换器中选择 **Claude Desktop** 入口。

如果找不到这个入口，去 `设置 → 通用 → 应用可见性` 里确认没有被隐藏。

## 第二步：导入或添加供应商

### 方式一（推荐）：从 Claude Code 一键导入

如果你已经按 [Claude Code配置](/code80/ccswitch/2-claude) 配好了 CC Switch，首次进入 Claude Desktop 面板时，点击 **"将 Claude Code 中已有的供应商导入"** 按钮，就能一次性把配置带过来，不用重新填一遍地址和 Key。

::: tip 导入后务必检查一遍
* 已存在同 ID 的供应商不会被覆盖
* 无法判断模型映射方式的供应商会被跳过，需要你手动补充
* 导入完，建议逐一打开检查每个供应商的模型映射是否正确，尤其是非 Claude 模型（比如 Kimi、DeepSeek 等）
:::

### 方式二：手动添加

点击右上角 `+` 按钮，添加 Code80 的供应商：

1. 名称随意填写
2. 接口地址填入 `https://code.ai80.vip`
3. API Key 填入你在 Code80 创建的 **CC** 分组令牌（回顾 [创建API令牌](/code80/register/4-token)）
4. 保持"需要模型映射"关闭即可

## 第三步：启用并重启

在供应商卡片上点击 **启用** 。

::: tip 一定要完全重启 Claude Desktop
Claude Desktop **不会像 Claude Code 那样热重载配置** ，每次切换供应商后，都必须彻底退出 Claude Desktop（不是关窗口，是退出程序），再重新打开才会生效。
:::

## 不要点测试连接，忽略即可

::: tip 千万不要点测试！几乎 100% 失败
CC Switch 的 Claude Desktop 面板**没有"测试连接"按钮** ，但部分版本可能在供应商卡片上有个"测试"入口。**点了必失败** ——Code80 的 CC 分组走网关转发模式，不存在官方那种登录校验式的连接测试，测试只会报错，而且报错信息毫无参考价值。

**结论：完全忽略测试功能，配好直接用。**
:::

## 对话页面的两个警告：忽略，直接开聊

完全重启并打开 Claude Desktop 后，对话页面可能会弹出两个警告条——**不用管，直接关掉或忽略，正常发消息就行** ：

* 一个是关于"配置"的警告，说配置有问题或未验证
* 另一个可能是关于"连接"或"网络"的警告

这两个警告是 CC Switch 的网关模式触发的"常规误报"，不影响实际使用。只要消息能正常发送和回复，就说明配置是生效的。

::: tip 判断生效与否的唯一标准
**能否正常收到回复。** 能 → 生效了。不能 → 按下面几条排查。

如果发消息没反应或报错，再按顺序排查：

* CC Switch 有没有在运行
* API Key 和接口地址填对没
* 模型映射有没有留空
* 是不是忘了完全重启
:::

## 其它注意事项

* 暂不支持在 Linux 上写入 Claude Desktop 的第三方配置
* 配置文件由 CC Switch 自动维护，不建议手动编辑
* 想恢复官方登录，随时可以切换回 `Claude Desktop Official`，这时不需要 API Key
