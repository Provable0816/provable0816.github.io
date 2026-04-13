---
# ============================================================
# 博客文章配置（YAML Front Matter）
# ============================================================
# 这是您的第一篇示例博客文章
# 复制此文件来创建新文章，修改文件名和以下内容

layout: post                          # 使用文章布局模板
title: "论文 #10: MedAgentGym - 阅读报告"               # 文章标题
date: 2026-04-13 23:00:00 +0800      # 发布日期和时间（格式：YYYY-MM-DD HH:MM:SS +时区）
categories:                          # 文章分类（可选）
  - 生活
  - 技术
tags:                                # 文章标签（可选）
  - 入门
  - github
  - jekyll
description: "论文 #10: MedAgentGym - 阅读报告"  # 文章描述，用于 SEO 和列表页显示
author: "你的名字"                    # 文章作者（可选，覆盖全局设置）
---

# 论文 #10: MedAgentGym - 阅读报告

## 基本信息
- **标题**: MedAgentGym: A Scalable Agentic Training Environment for Code-Centric Reasoning in Biomedical Data Science
- **作者**: Ran Xu, Yuchen Zhuang, Yishan Zhong, Yue Yu, Zifeng Wang, Xiangru Tang, Hang Wu, May Dongmei Wang, Peifeng Ruan, Donghan Yang, Tao Wang, Guanghua Xiao, Xin Liu, Carl Yang, Yang Xie, Wenqi Shi
- **发表日期**: 2026 年 1 月 26 日
- **主要领域**: datasets and benchmarks
- **Submission Number**: 23682

## 关键词
Medical Reasoning, LLM Agent, Code Generation

## TL;DR
MedAgentGym 是一个可扩展的交互式训练环境，旨在增强 LLM 代理中基于编码的生物医学推理能力

## 摘要
我们介绍了 MedAgentGym，一个可扩展和交互式的训练环境，旨在增强大型语言模型（LLM）代理中基于编码的生物医学推理能力。

MedAgentGym 包含来自 12 个真实世界生物医学场景的 129 个类别的 72,413 个任务实例。任务被封装在可执行的沙盒环境中，每个环境都具有详细的任务规范、交互式反馈机制、可验证的真值标注和可扩展的训练轨迹生成。

对 29 个 LLM 的广泛基准测试揭示了商业和开源 LLM 在生物医学数据科学方面的显著性能差异。

利用 MedAgentGym 中的高效多线程和多轮轨迹采样，Med-Copilot 通过离线和在线强化学习分别实现了 +43.02% 和 +45.28% 的性能提升，证明 MedAgentGym 是一个有效的训练场地，同时确立了其作为与专有 LLM（gpt-4o）竞争的具有成本效益、隐私保护的替代方案。

通过提供具有综合基准和可访问、可扩展训练资源的统一执行环境，MedAgentGym 为开发生物医学数据科学的高级 LLM 编码助手提供了一个集成平台。

## 核心贡献
1. **MedAgentGym 环境**: 72,413 个任务实例，129 个类别，12 个真实生物医学场景
2. **可执行沙盒**: 交互式反馈、可验证标注、可扩展轨迹生成
3. **大规模评估**: 29 个 LLM 的基准测试
4. **Med-Copilot**: 通过 RL 实现显著性能提升（+43-45%）
5. **成本效益**: 与 gpt-4o 竞争的开源替代方案

## 研究意义
- 为生物医学 AI 代理提供了大规模训练环境
- 降低了生物医学 AI 开发的成本和隐私风险
- 支持代码生成的生物医学推理
- 对医疗 AI 研究有重要实用价值

## 阅读笔记
- 这是一个大规模的训练环境和基准
- 72k+ 任务实例的规模非常可观
- 支持离线和在线 RL 训练
- 强调隐私保护和成本效益
- 对于开发生物医学 AI 助手非常有价值

---
*报告生成时间: 2026-04-13*
*OpenReview 链接: https://openreview.net/forum?id=jHDZEUgS4r*
