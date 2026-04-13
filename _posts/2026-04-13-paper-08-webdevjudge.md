---
# ============================================================
# 博客文章配置（YAML Front Matter）
# ============================================================
# 这是您的第一篇示例博客文章
# 复制此文件来创建新文章，修改文件名和以下内容

layout: post                          # 使用文章布局模板
title: "论文 #8: WebDevJudge - 阅读报告"               # 文章标题
date: 2026-04-13 23:00:00 +0800      # 发布日期和时间（格式：YYYY-MM-DD HH:MM:SS +时区）
categories:                          # 文章分类（可选）
  - 生活
  - 技术
tags:                                # 文章标签（可选）
  - 入门
  - github
  - jekyll
description: "论文 #8: WebDevJudge - 阅读报告"  # 文章描述，用于 SEO 和列表页显示
author: "你的名字"                    # 文章作者（可选，覆盖全局设置）
---

# 论文 #8: WebDevJudge - 阅读报告

## 基本信息
- **标题**: WebDevJudge: Evaluating (M)LLMs as Critiques for Web Development Quality
- **作者**: Chunyang Li, Yilun Zheng, Xinting Huang, Tianqing Fang, Jiahao Xu, Lihui Chen, Yangqiu Song, Han Hu
- **发表日期**: 2026 年 1 月 26 日
- **主要领域**: datasets and benchmarks
- **Submission Number**: 24064

## 关键词
large language models, evaluation, LLM-as-a-judge, benchmark

## TL;DR
一个用于评估 LLM-as-a-judge 在 Web 开发上下文中的元评估基准

## 摘要
LLM-as-a-judge 范式正在成为人类评估的可扩展和高效替代方案，在定义明确的任务上表现出强劲性能。然而，其在具有动态环境和复杂交互的开放式任务中的可靠性尚未探索。

为填补这一空白，我们引入了 WebDevJudge，一个用于评估 LLM-as-a-judge 在 Web 开发中性能的系统基准，支持基于静态观察的非交互式评估和具有动态 Web 环境的连续交互式评估。

WebDevJudge 包含成对 Web 实现的人类偏好标签，并使用结构化和查询基础的规则进行标注，以确保高质量的真值。

使用这个基准，我们全面评估了各种评估器，包括 LLM、MLLM 和代理工作流。我们系统研究了不同范式和指导机制的影响。

我们的实验揭示了 LLM 法官与人类专家之间的显著差距。深入分析表明，这一差距源于基本模型限制，包括无法识别功能等价性、验证任务可行性和减轻偏见。

总体而言，WebDevJudge 对 LLM-as-a-judge 提出了重大挑战，为未来研究提供了见解，以指导开发更可靠和有能力的自动化评估器用于复杂场景。

## 核心贡献
1. **WebDevJudge 基准**: 首个 Web 开发领域的 LLM-as-a-judge 评估基准
2. **双模式评估**: 支持静态非交互和动态交互式评估
3. **高质量标注**: 使用结构化规则确保标注质量
4. **系统评估**: 评估 LLM、MLLM 和代理工作流
5. **深入分析**: 揭示 LLM 法官的根本局限性

## 研究意义
- 填补了 LLM-as-a-judge 在开放式任务评估中的空白
- 为 Web 开发质量评估提供了标准基准
- 揭示了当前 LLM 评估能力的局限性
- 为改进自动化评估器提供了方向

## 阅读笔记
- 这是一个评估基准论文，关注 LLM-as-a-judge 的可靠性
- 核心发现是 LLM 法官与人类专家之间存在显著差距
- 差距的根本原因包括功能等价性识别、任务可行性验证和偏见减轻
- 对于使用 LLM 进行代码/网页评估的研究和应用有重要启示
- 基准支持交互式评估是一个重要特点

---
*报告生成时间: 2026-04-13*
*OpenReview 链接: https://openreview.net/forum?id=CCSPm6V5EF*
