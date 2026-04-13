---
# ============================================================
# 博客文章配置（YAML Front Matter）
# ============================================================
# 这是您的第一篇示例博客文章
# 复制此文件来创建新文章，修改文件名和以下内容

layout: post                          # 使用文章布局模板
title: "论文 #1: Common Corpus - 阅读报告"               # 文章标题
date: 2026-04-13 23:00:00 +0800      # 发布日期和时间（格式：YYYY-MM-DD HH:MM:SS +时区）
categories:                          # 文章分类（可选）
  - 生活
  - 技术
tags:                                # 文章标签（可选）
  - 入门
  - github
  - jekyll
description: "论文 #1: Common Corpus - 阅读报告"  # 文章描述，用于 SEO 和列表页显示
author: "你的名字"                    # 文章作者（可选，覆盖全局设置）
---


# 论文 #1: Common Corpus - 阅读报告

## 基本信息
- **标题**: Common Corpus: The Largest Collection of Ethical Data for LLM Pre-Training
- **作者**: Pierre-Carl Langlais, Pavel Chizhov, Catherine Arnett, Carlos Rosas Hinostroza, Mattia Nee, Eliot Krzysztof Jones, Irène Girard, David Mach, Anastasia Stasenko, Ivan P. Yamshchikov
- **发表日期**: 2026 年 1 月 26 日
- **主要领域**: datasets and benchmarks
- **Submission Number**: 25369

## 关键词
dataset, pre-training, large language models, open data, open science, multilingual

## TL;DR
我们组装并发布了最大的真正开放的多语言 LLM 预训练数据集，包含 2 万亿 tokens

## 摘要
大型语言模型（LLM）是在来自不同来源和领域的大型数据上预训练的。这些数据集通常包含数万亿 tokens，包括大量受版权保护或专有内容，这引发了关于这些模型合法使用的问题。这凸显了对真正符合数据安全法规的开放预训练数据的需求。

在本文中，我们介绍了 Common Corpus，这是最大的开放 LLM 预训练数据集。Common Corpus 中汇编的数据要么没有版权，要么采用宽松许可，总计约 2 万亿 tokens。该数据集包含多种语言，从高资源的欧洲语言到预训练数据集中很少代表的一些低资源语言。此外，它还包括大量代码数据。

数据来源在覆盖领域和时间段方面的多样性为不同知识领域的研究和创业需求开辟了道路。在本文中，我们介绍了数据组装的详细来源以及数据集过滤和整理的细节。我们在 Common Corpus 上训练了两个小语言模型，发现它们的表现与其他同规模模型相当，表明我们的数据集适合多语言预训练。Common Corpus 代表了对大型语言模型开放科学生态系统的关键贡献。

## 核心贡献
1. **最大的开放预训练数据集**: 2 万亿 tokens，完全开放且符合数据安全法规
2. **多语言覆盖**: 从高资源欧洲语言到低资源语言
3. **代码数据**: 包含大量代码数据
4. **数据透明度**: 提供详细的数据来源、过滤和整理过程
5. **实证验证**: 训练的小模型表现与同规模其他模型相当

## 研究意义
- 解决了 LLM 预训练数据的版权和合法性问题
- 为开放科学研究提供了关键基础设施
- 支持多语言 AI 研究，包括低资源语言
- 促进数据安全和合规的 AI 发展

## 阅读笔记
- 这是一个数据集论文，重点在于数据收集、整理和发布
- 强调"真正开放"（truly open）的概念，与许多声称开放但实际包含专有数据的数据集形成对比
- 2 万亿 tokens 的规模与当前主流预训练数据集相当
- 对于研究数据合规性和开放科学的团队非常有价值

---
*报告生成时间: 2026-04-13*
*OpenReview 链接: https://openreview.net/forum?id=0wSlFpMsGb*
