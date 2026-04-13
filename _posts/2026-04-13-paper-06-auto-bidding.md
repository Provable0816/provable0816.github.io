---
# ============================================================
# 博客文章配置（YAML Front Matter）
# ============================================================
# 这是您的第一篇示例博客文章
# 复制此文件来创建新文章，修改文件名和以下内容

layout: post                          # 使用文章布局模板
title: "论文 #6: Enhancing Generative Auto-bidding - 阅读报告"               # 文章标题
date: 2026-04-13 23:00:00 +0800      # 发布日期和时间（格式：YYYY-MM-DD HH:MM:SS +时区）
categories:                          # 文章分类（可选）
  - 生活
  - 技术
tags:                                # 文章标签（可选）
  - 入门
  - github
  - jekyll
description: "论文 #6: Enhancing Generative Auto-bidding - 阅读报告"  # 文章描述，用于 SEO 和列表页显示
author: "你的名字"                    # 文章作者（可选，覆盖全局设置）
---


# 论文 #6: Enhancing Generative Auto-bidding - 阅读报告

## 基本信息
- **标题**: Enhancing Generative Auto-bidding with Offline Reward Evaluation and Policy Search
- **作者**: Zhiyu Mou, Yiqin Lv, Miao Xu, Cheems Wang, Yixiu Mao, Jinghao Chen, Qichen Ye, Chao Li, Rongquan Bai, Chuan Yu, Jian Xu, Bo Zheng
- **发表日期**: 2026 年 1 月 26 日
- **主要领域**: applications to robotics, autonomy, planning
- **Submission Number**: 24514

## 关键词
auto-bidding, offline reinforcement learning, generative decision making

## 摘要
自动竞价是广告主提高广告性能的关键工具。最近的进展表明，AI 生成竞价（AIGB）从离线数据学习条件生成规划器，相比典型的离线强化学习（RL）自动竞价方法实现了更优越的性能。

然而，现有 AIGB 方法仍面临性能瓶颈，因为它们固有的无法在静态数据集之外进行探索并获得反馈。

为解决这个问题，我们提出了 AIGB-Pearl（Planning with EvaluAtor via RL），一种整合生成规划和策略优化的新方法。

AIGB-Pearl 的核心在于构建轨迹评估器来评估生成分数的质量，并设计可证明可靠的 KL-Lipschitz 约束分数最大化方案，以确保在离线数据集之外进行安全高效的探索。

进一步开发了一种结合同步耦合技术的实用算法，以确保所提出方案所需的模型规律性。

在模拟和真实广告系统上的大量实验证明了我们方法的最先进性能。

## 核心贡献
1. **AIGB-Pearl 方法**: 整合生成规划和策略优化的自动竞价方法
2. **轨迹评估器**: 评估生成竞价轨迹的质量
3. **KL-Lipschitz 约束**: 确保探索的安全性和效率
4. **同步耦合算法**: 实用的训练算法，确保模型规律性
5. **真实系统验证**: 在真实广告系统上验证有效性

## 研究意义
- 解决了生成式自动竞价的探索瓶颈问题
- 提供了安全的离线 RL 探索方案
- 对在线广告系统有直接应用价值
- 展示了生成式决策与 RL 结合的有效性

## 阅读笔记
- 这是一个工业应用导向的研究，来自广告技术领域
- 核心挑战是如何在离线数据基础上安全地探索更好的策略
- KL-Lipschitz 约束是理论保证的关键
- 在真实广告系统上的验证增加了方法的可信度
- 对于其他离线 RL 应用场景也有借鉴意义

---
*报告生成时间: 2026-04-13*
*OpenReview 链接: https://openreview.net/forum?id=kMuQBgPIdg*
