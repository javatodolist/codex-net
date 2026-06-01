---
title: "IDEA 不只接 Claude 和 Codex：本地模型和第三方 API 也能直接用"
description: "IDEA 不只接 Claude 和 Codex：本地模型和第三方 API 也能直接用"
date: 2026-05-25
category: "Codex CLI"
tag:
  - Codex CLI
  - AI编程
  - ChatGPT
---
# IDEA 不只接 Claude 和 Codex：本地模型和第三方 API 也能直接用

![Banner](/images/localized/4cea40612b5e61a2.png)

## 写在前面

IntelliJ IDEA 这两年对 AI 的态度很明确：不再只是加一个聊天插件，而是把 AI 编程助手、本地模型、第三方 API 都放进 IDE 工作流里。

如果你已经在 IDEA 里用过 Claude Code 或 Codex，会发现它们适合 Agent 编程和工程任务。但真实开发里，团队往往不只用一种模型：有的人接 OpenAI，有的人用 Anthropic，有的人走 OpenAI 兼容中转，有的人还想把 Ollama 本地模型接进来。

IDEA 的 AI Assistant 配置入口，正是为这种多模型、多供应商、多工具共存准备的。你可以在一个 IDE 里安装不同 AI Agent，也可以接入第三方 API，甚至使用自己的本地模型。

---

## IDE 正在变成 AI 编程入口

过去的 AI 编程工具大多是“外置”的：网页聊天、独立终端、单独客户端。开发者要在 IDE、浏览器、终端之间来回切换。

现在趋势变了。IDE 正在变成统一入口：

- 代码上下文在 IDE 里；
- 项目结构在 IDE 里；
- 调试、运行、测试在 IDE 里；
- AI Chat 和 Agent 也逐渐进入 IDE；
- 第三方 API 和本地模型可以统一配置。

对 Java 开发者来说，这个变化尤其明显。IntelliJ IDEA 本来就是主力工程环境，如果 AI 能直接接进 IDEA，就不用频繁复制代码、切窗口、手动同步上下文。

---

## 在 IDEA 中接入 AI 编程助手

进入 IDEA 的配置路径：

```text
Settings - Tools - AI Assistant - Agents
```

![AI Assistant Agents](/images/localized/1be075450fdd3f92.png)

在这个界面里，可以扫描并安装自己想用的 AI 编程助手插件。

安装完成后，打开 AI Chat 面板，选择对应 Agent 即可。

![选择 Agent](/images/localized/2f7e0ae61f9db119.png)

在这里还可以切换不同模型，然后像普通 AI 编程助手一样提问、解释代码、生成实现方案，或者让它参与项目开发。

这一步适合想在 IDEA 里使用 Claude Code、Codex 或其他 AI Agent 的用户。

---

## 接入第三方 AI 供应商

如果你有大模型 API 地址，或者想接入自己的模型服务，可以走 Providers & API keys。

路径是：

```text
Settings - Tools - AI Assistant - Providers & API keys
```

![Providers & API keys](/images/localized/31328b427672c8f0.png)

这里可以选择 Anthropic、OpenAI，也可以选择 OpenAI 兼容 API，或者选择 Ollama 接入本地模型。

### OpenAI 兼容接口怎么配

如果你的服务提供 OpenAI 兼容接口，只需要填 API URL 和 Key。

![OpenAI 兼容接口配置](/images/localized/0baa01aa2949c044.png)

这种方式的好处是迁移成本低。很多国内模型平台、API 网关、中转服务都会提供 OpenAI 兼容格式，你不用为每家模型单独适配一套 SDK。

它也适合做账号池或模型网关：IDEA 只配置一个 API URL，后端根据额度、模型、延迟和可用性做切换。

---

## 接入 AI 本地模型：Ollama 是关键入口

如果你有自己的本地模型，也可以通过 IDEA 接入。

IDEA 接本地模型主要通过 Ollama。Ollama 是一个开源本地大模型部署工具，可以在本机部署各种模型，并提供 API 服务。

配置方式是选择 Ollama，然后填入本地模型名称和 API 地址。

![Ollama 本地模型配置](/images/localized/b4b45399f0271326.png)

本地模型的优势很明确：

- 数据不出本机，隐私更可控；
- 可以根据团队需求定制模型；
- 不依赖海外网络；
- 适合处理内部代码、私有文档和敏感业务逻辑；
- 对高频轻量任务，成本更可控。

当然，本地模型也有门槛：设备要有足够算力和内存。如果想跑满血大模型，本地机器配置必须跟上，否则体验会明显受限。

还有一个细节要注意：如果 IDEA 登录了 Codex 账户，Codex 账户优先级会高于 API。想使用自定义 API 时，退出 Codex 账户即可。

---

## 使用方式：选择 Chat 模式，再切模型

API 接好后，使用方式和普通 AI Chat 类似，只是需要选择 Chat 模式。

![选择 Chat 模式](/images/localized/5bd0cf5a5c67f7e7.png)

然后在右下角选择 API 提供商对应的模型。

![选择 API 模型](/images/localized/f62f865a0b019034.png)

测试一下输出效果。

![API 调用测试](/images/localized/7facf7850d042864.png)

如果回复符合预期，就说明 API 接入成功。

这套流程的价值在于灵活：你可以把国外模型、国内模型、自建网关、本地模型统一放进 IDEA，而不是让每个工具各自为政。

---

## OpenAI 兼容接口适合哪些场景

OpenAI 兼容接口在 AI 编程里越来越重要，因为它已经变成很多模型服务的“共同语言”。

适合用它的场景包括：

| 场景 | 为什么适合 |
| --- | --- |
| 接入国内模型平台 | 很多平台支持 OpenAI 兼容格式，配置简单 |
| 接入模型网关 | 一个 API URL 后面可以挂多个模型和账号 |
| 管理多个 Codex / OpenAI 账号 | 后端可以根据额度和可用性切换 |
| 团队统一模型入口 | IDE 侧配置简单，权限和计费放到网关层 |
| 快速替换模型 | 只改 base URL、Key 或 model 名称 |

这也是现在很多团队搭建 AI 编程基础设施时的常见思路：前端工具不变，后端统一管理模型。

---

## Claude Code 到底是什么？和 IDEA 的 AI Assistant 有什么区别

Claude Code 是终端里的 AI 编程 Agent。它可以进入项目目录，读取文件、修改代码、执行命令、跑测试，再根据结果继续修复。

IDEA 的 AI Assistant 更像一个 IDE 内部的 AI 入口，可以接 Agent、API 供应商、本地模型和 Chat 模式。

两者不是替代关系，而是互补：

- Claude Code 适合做复杂工程任务、跨文件修改、命令执行和自动调试；
- IDEA AI Assistant 适合在 IDE 内快速提问、切模型、接 API、本地模型和多种 Agent；
- OpenAI 兼容 API 适合把不同模型统一接进 IDE；
- Ollama 适合处理本地隐私数据和轻量任务。

官方 Claude 订阅一般包括 Pro、Max 等方案，Pro 更适合个人轻中度使用，Max 面向更高额度需求；API 按量计费，适合接入自己的工具链。具体价格和额度会随官方政策变化，使用前最好以官方说明为准。

不过说实话，官方订阅对国内用户不太友好——支付、网络和账号稳定性都需要折腾。如果只是想更省事地接入 Claude，可以看看 [Code80](https://code.ai80.vip/home)，真实订阅帐号转 API，换个 endpoint 就能直接用，体验跟官方一样。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### 1. IDEA 能不能同时接多个 AI 编程助手？

可以。你可以在 Agents 里安装不同 AI 编程助手插件，也可以在 Providers & API keys 里配置不同供应商和 API。

### 2. IDEA 接本地模型一定要用 Ollama 吗？

IDEA 当前接本地模型的主要方式是 Ollama。你也可以把本地模型封装成 OpenAI 兼容服务，再通过 OpenAI Compatible API 接入。

### 3. OpenAI 兼容接口有什么好处？

它能让不同模型服务使用接近统一的调用格式。对 IDEA 这类工具来说，只要填 URL、Key 和模型名，就能切换不同供应商，迁移成本很低。

### 4. 登录 Codex 后为什么 API 不生效？

因为 Codex 账户优先级高于 API。如果想使用自定义 API，需要退出 Codex 账户，再选择对应 API Provider。

### 5. 国内用户怎么更方便地使用 Claude 相关能力？

能稳定访问官方并完成支付，可以直接走官方订阅或 API；如果不想折腾支付和网络，国内用户也可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。
