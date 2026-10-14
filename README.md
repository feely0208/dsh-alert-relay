# @deepwhale-cn/dsh-alert-relay

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/plugins/feely0208/dsh-alert-relay)


**关键词**：告警外发 · 告警配置 · 应急响应 · 敏感信息外泄 · webhook 安全 · 告警链路 · 应急
**Keywords**: alert relay · alerting · incident response · webhook security · sensitive data in alerts
**告警外发** —— 检查告警链路：有没有告警、发到哪、有没有把敏感信息一起发出去。

## 不装它会怎样

出事时你的告警是这么发的：

```js
post(webhook, { text: err.stack + JSON.stringify(req.body) })
```

**告警通道通常是整个系统里管控最弱的一条出口**：

```
数据库：内网、有审计、有权限控制
告警 webhook：一个 URL，谁拿到谁就能发
```

把 `err.stack`、完整请求体、用户数据塞进去，等于**把敏感信息复制到一个管控更弱的地方**。

## 它查什么

| 级别 | 内容 |
|---|---|
| 🔴 高 | 告警内容带敏感信息 · webhook 明文 http:// |
| 🟡 中 | 把带密钥的告警 URL 打进日志 · 找不到任何告警配置 |

## 正确做法

```
❌ post(webhook, { text: err.stack + JSON.stringify(req.body) })
✅ post(webhook, { text: `[ERROR] trace=${traceId}` })
```

**只发摘要 + trace id**，细节放在有权限控制的地方。

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-alert-relay
# 或纯 CLI
npx @deepwhale-cn/dsh-alert-relay
```

## 用法

```bash
dsh-alert-relay --demo
dsh-alert-relay --list-rules
dsh-alert-relay --html r.html
```

![dsh-alert-relay 检查报告示例](https://www.deepwhale.org.cn/plugin-assets/dsh-alert-relay/report.png)

![dsh-alert-relay 演示模式输出](https://www.deepwhale.org.cn/plugin-assets/dsh-alert-relay/demo.png)

![dsh-alert-relay 规则与依据](https://www.deepwhale.org.cn/plugin-assets/dsh-alert-relay/rules.png)

## 边界

- **不验证告警真能发出去** —— 只看配置与代码。
- **「找不到告警配置」是弱信号** —— 可能由部署层统一做，报出来是提示你确认。
- 与 [dsh-cn-log-retention](https://github.com/feely0208/dsh-cn-log-retention) 分工：那个查日志留多久，这个查告警发去哪。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**


---

## 深鲸网安守护系列（共 22 个）

> 一个插件做一件事。**安全问题是链式的** —— 配套用才完整。

**国内合规** ｜ [等保对照](https://github.com/feely0208/dsh-cn-mlps) · [日志留存](https://github.com/feely0208/dsh-cn-log-retention) · [备案公示](https://github.com/feely0208/dsh-cn-filing) · [用户同意](https://github.com/feely0208/dsh-consent-guard) · [个人信息权利](https://github.com/feely0208/dsh-data-rights) · [未成年人保护](https://github.com/feely0208/dsh-minor-guard) · [影响评估](https://github.com/feely0208/dsh-pipia) · [数据分类分级](https://github.com/feely0208/dsh-data-classify) · [算法备案](https://github.com/feely0208/dsh-algorithm-filing) · [数据出境](https://github.com/feely0208/dsh-cn-data-export)

**AI 与 Agent 治理** ｜ [AI 输出信任](https://github.com/feely0208/dsh-ai-output-trust) · [外部内容信任](https://github.com/feely0208/dsh-content-trust) · [MCP 安全](https://github.com/feely0208/dsh-mcp-audit) · [Agent 权限](https://github.com/feely0208/dsh-agent-scope)

**数据与凭据** ｜ [敏感数据](https://github.com/feely0208/dsh-data-scan) · [密钥轮换](https://github.com/feely0208/dsh-key-rotate)

**供应链与构建** ｜ [开源许可](https://github.com/feely0208/dsh-license-guard) · [依赖投毒](https://github.com/feely0208/dsh-dep-audit) · [CI 安全](https://github.com/feely0208/dsh-ci-guard)

**权限与应急** ｜ [最小权限](https://github.com/feely0208/dsh-least-privilege) · [**告警外发**](https://github.com/feely0208/dsh-alert-relay) · [应急证据包](https://github.com/feely0208/dsh-incident-package)

都在 DSH 插件市场（dsh-plugin.org）和 npm 上，`dsh plugin --profile web add <包名>` 即可安装。

## License

MIT © 深鲸 DeepWhale
