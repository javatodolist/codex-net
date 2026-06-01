---
date: 2026-05-14
tags:
  - Codex
  - OpenAI
  - CLI
  - IDE
  - 安装教程
---

# Codex 安装与使用

![Banner](/images/localized/5feb46d988eaa657.svg)

## 写在前面

Codex 可以通过多种方式使用。不同入口适合不同使用习惯，比如直接在网页里用、在终端里用、在 IDE 里用，或者在 macOS 上通过 Homebrew 安装。

这篇按照安装方式逐项整理，保留原有步骤、命令和图片，方便你按自己的环境直接操作。

---

## Codex 的几种使用方式

Codex 可以通过多种方式使用。按开发者常见习惯，大致可以分成下面五种：

| 安装方式 | 使用场景 | 推荐程度 |
| --- | --- | --- |
| Codex 应用 | 直接下载 Codex 应用 | ⭐⭐⭐⭐ |
| Codex CLI | 在终端使用 | ⭐⭐⭐⭐⭐ |
| IDE 插件 | 在 VS Code / Cursor 使用 | ⭐⭐⭐⭐ |
| Homebrew 安装 | Mac 用户 | ⭐⭐⭐⭐ |
| GitHub Release 二进制 | 手动安装 | ⭐⭐⭐ |

![Codex 五种使用方式](/images/localized/5feb46d988eaa657.svg)

接下来分别介绍。

---

## 1、Codex 应用

最简单的方式就是 **直接使用 Codex 应用**，前提是网络连接要顺。

访问：<https://chatgpt.com/codex>

下载应用：

![Codex 应用下载](/images/localized/21a3e53cd8ebd33c.png)

登录 ChatGPT 账号即可使用。

界面说明：

![Codex 应用界面](/images/localized/1e18af2ccb5f12f8.png)

然后可以在输入框里直接输入需求：

![Codex 输入需求示例](/images/localized/b643062e044720ff.png)

支持计划：

- ChatGPT Plus
- ChatGPT Pro
- ChatGPT Business
- ChatGPT Edu
- ChatGPT Enterprise

Web 版的特点：

- 不需要本地环境
- 直接连接 GitHub
- 任务在云端运行
- 可以自动创建 PR

适合：

- 快速体验 Codex
- 代码审查
- 代码库分析


---

## 2、Codex CLI

开发者最常用的方式是 **Codex CLI**。

CLI 是一个运行在终端中的 AI 编程代理，可以：

- 阅读代码
- 修改代码
- 执行 shell 命令
- 自动修复 bug

Codex CLI 在本地运行，因此代码不会被上传到云端，只有 prompt 和必要的上下文会发送给模型。

### 安装 Codex CLI

使用 npm 安装：

```bash
sudo npm install -g @openai/codex

# 使用国内镜像安装更快
sudo npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

安装完成后运行：

```bash
codex
```

即可启动 Codex。

### 登录 Codex

首次运行需要登录。

有两种方式：

#### 方法一：ChatGPT 登录（推荐）

```bash
codex
```

选择：

```text
Sign in with ChatGPT
```

然后浏览器会打开登录页面。

登录完成即可使用。

#### 方法二：API Key 登录

如果你是开发者模式，可以使用 API Key：

```bash
# macOS / Linux - 临时设置（仅当前终端会话有效）
export OPENAI_API_KEY="sk-你的API密钥"

# 永久配置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export OPENAI_API_KEY="sk-你的API密钥"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell
$env:OPENAI_API_KEY="sk-你的API密钥"

# 配置后启动（指定模型）
codex --model gpt-5-codex
```

然后运行：

```bash
codex
```

#### 方式三：`auth.json` 文件配置

手动编辑认证文件，先创建目录：

```bash
mkdir -p ~/.codex
```

写入 API key：

```bash
cat > ~/.codex/auth.json << 'EOF'
{
  "OPENAI_API_KEY": "sk-你的API密钥"
}
EOF
```

### 第一次运行 Codex

进入项目目录：

```bash
cd my-project
```

启动 Codex：

```bash
codex
```

然后输入：

```text
分析下当前的项目结构
```

Codex 会自动：

1. 扫描代码库
2. 分析项目结构
3. 输出系统架构说明

例如，我们创建一个目录：

```bash
mkdir codex-runoob-test
```

进入目录：

```bash
cd codex-runoob-test
```

新建 `test.py` 文件，代码如下：

```python
print("Hello Runoob!")
```

启动 Codex：

```bash
codex
```

选第一个 `Yes, continue` 回车，这样就可以开始使用 Codex CLI 写代码了：

![Codex CLI 首次运行](/images/localized/cf4ecf12175f958c.png)

### Codex 的三种运行模式

Codex CLI 提供三种安全模式：

| 模式 | 功能 |
| --- | --- |
| Suggest | 只建议修改 |
| Auto Edit | 自动修改文件 |
| Full Auto | 自动执行所有操作 |

默认模式：

```text
Suggest
```

切换模式：

```bash
codex --auto-edit
```

或者：

```bash
codex --full-auto
```

`Full Auto` 模式可以自动执行代码修复和任务。

### 更新与卸载

```bash
# 更新到最新版本
npm update -g @openai/codex

# 或强制重装最新版
npm install -g @openai/codex@latest

# 卸载
npm uninstall -g @openai/codex

# Homebrew 卸载
brew uninstall --cask codex
```


---

## 3、Homebrew 安装（Mac 推荐）

Mac 用户可以使用 Homebrew 安装。

```bash
brew install --cask codex
```

安装完成后运行：

```bash
codex
```

即可启动。

这种方式适合：

- Mac 开发者
- 不想安装 Node.js 的用户


---

## 4、GitHub Release 安装（二进制）

如果不想使用 npm，也可以直接下载二进制版本。

下载地址：<https://github.com/openai/codex/releases>

常见版本：

Mac Apple Silicon：

```text
codex-aarch64-apple-darwin.tar.gz
```

Mac Intel：

```text
codex-x86_64-apple-darwin.tar.gz
```

Linux：

```text
codex-x86_64-unknown-linux-musl.tar.gz
```

下载后解压：

```bash
tar -xzf codex-xxx.tar.gz
```

重命名：

```bash
mv codex-x86_64-unknown-linux-musl codex
```

加入 PATH：

```bash
sudo mv codex /usr/local/bin
```

然后运行：

```bash
codex
```

即可使用。


---

## 5、IDE 插件安装

Codex 还可以在 IDE 中使用，例如：

- VS Code
- Cursor
- Windsurf
- VS Code forks

安装方式：

1. 打开 IDE 插件市场
2. 搜索 **Codex**
3. 安装插件
4. 登录 ChatGPT 账号

![Codex IDE 插件安装](/images/localized/7a4bbde915c8552e.png)

这样就可以在 IDE 内直接使用 Codex。

例如：

- 自动修复代码
- 自动生成函数
- 自动重构代码


---

## 6、更新 Codex

Codex CLI 更新非常简单：

```bash
codex --upgrade
```

或者：

```bash
npm update -g @openai/codex
```

```bash
codex --version
```

Codex CLI 目前支持：

| 系统 | 支持情况 |
| --- | --- |
| macOS | 完整支持 |
| Linux | 完整支持 |
| Windows | 实验支持（建议 WSL） |

Windows 当前还是实验支持，建议优先使用 WSL。

---

## Codex 到底是什么，为什么很多开发者会优先看 CLI

如果你还没真正上手过 Codex，可以把它理解成 OpenAI 面向开发工作流做的一套 AI 编程入口集合。网页、应用、CLI、插件只是不同壳，核心目标是一致的：让模型不只是给你代码建议，而是直接介入真实项目任务。

其中最有代表性的还是 CLI，因为它直接运行在终端里，可以读取项目、改代码、跑命令、配合本地工作流推进任务。这也是为什么很多开发者最终还是会回到 CLI：它离真实工程环境最近。

官方常见的使用方式，一类是直接用 ChatGPT 账号登录，另一类是走 API Key。前者适合已经有 ChatGPT Plus 或 Pro 的人，后者更适合本来就习惯 API 工作流、想把 Codex 接进自己的终端和项目环境的人。

不过说实话，官方订阅和登录链路对国内用户不算特别省心——需要海外支付方式，网络环境也得自己处理。如果你只是想更顺一点把这类 AI 编程工具接进本地工作流，可以看看 [Code80](https://code.ai80.vip/home)。真实订阅帐号转 API，换个 endpoint 就能直接用，体验会更接近你熟悉的开发者接入方式。详情可以到官网了解：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

### 1. 我第一次用 Codex，最推荐从哪个入口开始？

如果你只是想快速看看效果，先从网页或应用入口开始最轻；如果你本来就是开发者，最终大概率还是会回到 CLI，因为它最接近真实工程工作流。

### 2. 为什么很多人更推荐 Codex CLI？

因为它不只是聊天，而是能在终端里直接读代码、改文件、跑命令、修 bug。对开发者来说，这种形态的效率通常更高。

### 3. Mac 上装 Codex，npm 和 Homebrew 该选哪个？

如果你已经有 Node.js 环境，npm 直接装就行；如果你想少碰依赖，Homebrew 一般更省事。

### 4. Windows 为什么建议 WSL？

因为当前 Windows 还是实验支持，很多命令行场景下，WSL 的兼容性和稳定性通常更好。

### 5. API Key 登录和 ChatGPT 登录怎么选？

已经有 ChatGPT 订阅就直接走账号登录，更省事；如果你本来就按 API 工作流来用工具，API Key 会更灵活。

### 6. 国内用户怎么更方便地把 Codex 这类工具接进自己的工作流？

如果你更习惯 API 接入方式，国内用户可以通过 [Code80](https://code.ai80.vip/home) 更方便地使用。