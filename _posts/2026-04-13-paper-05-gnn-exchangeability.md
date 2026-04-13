---
# ============================================================
# 博客文章配置（YAML Front Matter）
# ============================================================
# 这是您的第一篇示例博客文章
# 复制此文件来创建新文章，修改文件名和以下内容

layout: post                          # 使用文章布局模板
title: "论文 #5: Exchangeability of GNN Representations - 阅读报告"               # 文章标题
date: 2026-04-13 23:00:00 +0800      # 发布日期和时间（格式：YYYY-MM-DD HH:MM:SS +时区）
categories:                          # 文章分类（可选）
  - 生活
  - 技术
tags:                                # 文章标签（可选）
  - 入门
  - github
  - jekyll
description: "论文 #5: Exchangeability of GNN Representations - 阅读报告"  # 文章描述，用于 SEO 和列表页显示
author: "你的名字"                    # 文章作者（可选，覆盖全局设置）
---


# 论文 #5: Exchangeability of GNN Representations - 阅读报告

## 基本信息
- **标题**: Exchangeability of GNN Representations with Applications to Graph Retrieval
- **作者**: Kartik Nair, Indradyumna Roy, Soumen Chakrabarti, Anirban Dasgupta, Abir De
- **发表日期**: 2026 年 1 月 26 日
- **主要领域**: learning on graphs and other geometries & topologies
- **Submission Number**: 24538

## 关键词
GNN, Locality sensitive hashing

## TL;DR
发现图表示是可交换随机变量，可用于图上的 LSH（局部敏感哈希）

## 摘要
在这项工作中，我们发现了图神经网络（GNN）中的一种概率对称性，称为可交换性。

具体来说，我们表明使用大量 GNN 家族在标准优化工具下学习计算的训练节点嵌入是可交换随机变量。这意味着节点嵌入的概率密度在应用于其维度轴的排列下保持不变。这导致图表示元素之间的分布相同。

这种特性使得能够通过顺序统计量之间的欧几里得相似性来近似基于传输的图相似性。

利用这种简化，我们提出了一个统一的局部敏感哈希（LSH）框架，支持多种相关性度量，包括子图匹配和图编辑距离。

实验表明，我们的方法比基线更有效地进行 LSH。

## 核心贡献
1. **理论发现**: GNN 节点嵌入是可交换随机变量
2. **数学性质**: 嵌入概率密度在维度排列下不变
3. **LSH 框架**: 基于可交换性构建统一的局部敏感哈希框架
4. **多度量支持**: 支持子图匹配、图编辑距离等多种相关性度量
5. **实验验证**: 在图检索任务上优于基线方法

## 研究意义
- 揭示了 GNN 表示的深层数学性质
- 为高效图检索提供了理论基础
- 统一的 LSH 框架可应用于多种图相似性度量
- 对大规模图数据库检索有实用价值

## 阅读笔记
- 核心贡献是理论性的：发现 GNN 表示的可交换性
- 这个性质使得可以用更简单的方法近似复杂的图相似性
- LSH 框架对于大规模图检索非常实用
- 论文结合了理论分析和实际应用
- 对于需要高效图搜索的应用（如分子数据库、社交网络）有价值

---
*报告生成时间: 2026-04-13*
*OpenReview 链接: https://openreview.net/forum?id=HQcCd0laFq*
