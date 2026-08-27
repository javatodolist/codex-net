---
title: Claude Code配置
shortTitle: Claude Code
description: 介绍如何在 Code80 中完成「Claude Code配置」。步骤与原文一致，接口与控制台均指向 Code80。
layout: doc
---

# Claude Code配置

### Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开Claude Code配置目录

```bash
%userprofile%\.claude
```

![步骤截图](/images/code80/Cli/013.webp)

2. 目录内容如图所示，如果目录中没有 `settings.json`，你需要手动创建后打开

* **settings.json** ：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![步骤截图](/images/code80/Cli/014.webp)

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![步骤截图](/images/code80/Cli/015.webp)

4. 回顾 [创建API令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，替换上方 `xxx`部分

![步骤截图](/images/code80/Cli/025.webp)

5. 在windows终端运行 `claude`，出现对话界面后进行对话测试，能收到回复即表示配置成功

![步骤截图](/images/code80/Cli/016.webp)

### MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径后回车，打开配置目录

```bash
~/.claude
```

![步骤截图](/images/code80/Cli/017.webp)

2. 若目录不存在 `settings.json`，需要你手动进行创建

* **settings.json** ：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![步骤截图](/images/code80/Cli/018.webp)

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://code.ai80.vip",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![步骤截图](/images/code80/Cli/015.webp)

4. 回顾 [创建API令牌](/code80/register/4-token)，在 Code80 中创建 **CC** 分组的令牌，替换上方 `xxx`

![步骤截图](/images/code80/Cli/025.webp)

5. 在终端运行 `claude`，看到对话界面并能正常回复即表示配置完成

![步骤截图](/images/code80/Cli/016.webp)

## 配置项说明

### 必填项

| 配置项 | 说明 |
| --- | --- |
| `ANTHROPIC_BASE_URL` | 中转站地址，固定为 `https://code.ai80.vip` |
| `ANTHROPIC_AUTH_TOKEN` | Code80 中 **CC** 分组的 API 令牌，替换示例中的 `xxx` |

### env 完整说明

| 环境变量 | 推荐值 | 作用 |
| --- | --- | --- |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | `"1"` | 关闭非必要网络请求，降低异常流量 |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | `"1"` | 禁止修改终端标题 |
| `CLAUDE_CODE_NEW_INIT` | `"1"` | 启用新版初始化流程 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `"1"` | 启用实验性 Agent Teams |
| `DISABLE_AUTOUPDATER` | `"1"` | 关闭自动更新，避免更新检查走官方通道 |
| `DISABLE_TELEMETRY` | `"1"` | 关闭遥测上报 |
| `DISABLE_BUG_COMMAND` | `"1"` | 禁用内置 bug 反馈命令 |
| `DISABLE_ERROR_REPORTING` | `"1"` | 关闭错误自动上报 |
| `ENABLE_TOOL_SEARCH` | `"false"` | 关闭 Tool Search（按需开启可改为 `"true"`） |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | `"1"` | 关闭实验性 Beta 能力，提升稳定性 |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | `"1"` | 关闭内置 Git 相关系统指令 |

### 其它常用顶层配置

| 配置项 | 推荐值 | 作用 |
| --- | --- | --- |
| `includeCoAuthoredBy` | `false` | 提交信息中不自动附加 Claude 共同作者标记 |
| `language` | `"Chinese-simplified"` | 界面与回复倾向简体中文 |

::: tip 最小可用配置
如果只想先跑通，至少保留 `ANTHROPIC_BASE_URL` 与 `ANTHROPIC_AUTH_TOKEN` 两项即可；其余项为推荐增强，可按需增减。
:::

::: warning 重要
**注意，如果配置完仍然有报错问题，提示你需要登录，请看如下链接解决**
[claude-code-无法连接到-anthropic-服务](/code80/faq/CC)
:::
