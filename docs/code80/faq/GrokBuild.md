---
title: Grok Build相关问题
shortTitle: Grok Build
description: Grok Build 常见问题：env_key 用法、模型不存在、effort 不生效、第三方模型需关闭 workflows。本文属于Codex CLI专题，面向国内用户梳理 Code80 接入与配置步骤。
date: 2026-08-27
category: Codex CLI
tag:
  - Code80
  - AI编程
  - Codex CLI
---

# Grok Build相关问题

### 把 Key 写到 env_key 后无法使用

`env_key` 只能填写环境变量名，例如 `CODE80_API_KEY`，不能填写真实 API Key。

如果你想直接把令牌写在配置文件里，请使用：

```toml
api_key = "xxx"
```

### 提示模型不存在或无权限

请检查以下几项：

1. Code80 令牌分组是否支持你填写的模型。
2. `models_base_url` 是否填写为 `https://code.ai80.vip/v1`。
3. `model = "grok-4.6"` 是否和 Code80 控制台模型名称一致。
4. API Key 是否复制完整，前后不要带多余空格。

### /effort 调整思考等级不生效

请确认该模型的 `[model."grok-4.6"]` 配置块中是否写入了 `supports_reasoning_effort = true`。只有声明了这一行，`/effort` 命令和 `--effort` 参数才会对该模型生效。修改配置后需要重启 Grok Build 才会重新加载。

### 使用 Kimi-K3 等模型时无法正常对话

接入 Kimi-K3 等非 Grok 模型时，必须在配置文件中关闭 workflows 功能：

```toml
[workflows]
enabled = false
```

workflows 是 Grok 模型专属能力，第三方模型不支持，开启状态下会导致对话失败。修改配置后需要重启 Grok Build 才会重新加载。

## 本站相关栏目

- [Codex CLI](/codex-cli/)
- [Codex 国内使用](/codex-domestic/)
