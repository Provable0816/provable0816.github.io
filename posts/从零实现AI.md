---
title: 从零实现AI
date: 2026-10-07
tags: xxx-from-scratch
---

# [Awesome From Scratch — AI 从零实现清单](https://github.com/Provable0816/awesome-from-scratch-ai)

<p align="center">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green.svg">
  <img alt="chapters" src="https://img.shields.io/badge/chapters-26-blue.svg">
  <img alt="repos" src="https://img.shields.io/badge/repos-250%2B-orange.svg">
  <img alt="updated" src="https://img.shields.io/badge/updated-2026--10-lightgrey.svg">
</p>

> 一份**「不讲原理，先把手弄脏」**的 AI 开源清单。
> 收录的项目不教你 `pip install` 之后怎么调 API，而是把**反向传播、注意力、Tokenizer、KV Cache、ReAct 循环、HNSW、脉动阵列、PDE 残差**这些黑盒逐行拆开重写一遍。

**26 个章节，250+ 个仓库**，覆盖从「手写一个神经元」到「在 FPGA 上焊一个 TPU」的完整光谱。

---

## 收录标准

一个仓库要进主清单，必须同时满足：

1. **真的从零写**：核心算法或系统由作者手写，而不是对 `torch.nn` / `diffusers` / `langchain` 的一层薄封装。判断法则：**把框架依赖去掉，这个仓库还剩多少自己的代码？**
2. **看得懂**：有 README、注释，或配套博客/视频/Notebook。

**关于「工业对照」小节**：某些方向（可解释性、搜索、编译器）真正的教学实现稀少，但存在代码可读性很高的工业级项目。这类项目放在各章末尾的 **「延伸：工业级对照实现」** 里，明确标注它们**不是**从零实现，而是用来对照「你自己写的和工业级差在哪」。请勿把它们当作教学材料。

## 关于 star 数

**这份清单刻意不写 star 数字。** star 会随时间快速变化，且大量中长尾仓库的 star 无法稳定核验。替代方案是形态标签：

| 标签 | 含义 | 标签 | 含义 |
| :--- | :--- | :--- | :--- |
| 🔥 | 社区公认高人气 | ⚙️ | 偏系统：引擎/算子/编译器/硬件 |
| 🧩 | 极简实现，核心代码数百行 | 🧪 | 可训练：单张消费级 GPU 能跑完 |
| 📖 | 书籍配套 | 📓 | 以 Notebook 讲解 |
| 🎓 | 系统课程，有分章结构 | 🆕 | 2025 年后新建或活跃更新 |
| ⚠️ | 经典但偏旧，依赖需迁移 | | |

---

## 目录

**Part I · 模型与算法**
- [新手起步](#新手起步9-个先看的仓库) · [1 聚合与学习路线](#1-聚合与学习路线) · [2 ML/DL 基础](#2-机器学习与深度学习基础) · [3 计算机视觉](#3-计算机视觉) · [4 自然语言处理](#4-自然语言处理) · [5 大语言模型](#5-大语言模型) · [6 Agent 与检索](#6-agent-与检索)

**Part II · 系统与工程层**
- [8 分布式训练与并行](#8-分布式训练与并行策略) · [9 压缩量化与蒸馏](#9-模型压缩量化与蒸馏) · [10 编译器与推理运行时](#10-ai-编译器与推理运行时) · [11 算子与 GPU 编程](#11-高性能算子与-gpu-编程) · [12 硬件与端侧加速](#12-硬件端侧与异构加速)

**Part III · 多模态与新兴模态**
- [13 多模态 VLM](#13-多模态与视觉语言模型) · [14 3D 与神经渲染](#14-3d-视觉与神经渲染) · [15 视频](#15-视频生成与视频理解) · [16 语音与音频](#16-语音与音频)

**Part IV · 方法论与横向能力**
- [17 生成式其他范式](#17-生成式模型的其他范式) · [18 自监督与表示学习](#18-自监督与表示学习) · [19 可解释性与 AI 安全](#19-可解释性可视化与-ai-安全) · [20 时序与表格](#20-时间序列与表格数据) · [21 搜索推荐与检索](#21-搜索推荐与信息检索) · [22 图与知识图谱](#22-图计算图神经网络与知识图谱) · [23 元学习与持续学习](#23-元学习少样本与持续学习) · [24 RL 决策与具身智能](#24-强化学习决策与具身智能) · [25 数据工程与评测](#25-数据工程评测与实验基础设施) · [26 数值与科学智能](#26-数值计算与科学智能)

- [27 趋势观察](#27-趋势观察20252026) · [贡献与许可](#贡献与许可)

---

## 新手起步：9 个先看的仓库

| 阶段 | 推荐仓库 | 你会得到什么 |
| :--- | :--- | :--- |
| ① 自动微分 | [karpathy/micrograd](https://github.com/karpathy/micrograd) | 几百行看懂计算图与反向传播 🔥🧩 |
| ② 神经网络 | [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | 从 MLP 一路写到 GPT，配视频 🔥🎓 |
| ③ 深度学习体系 | [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) | 中文教材，理论 + 可运行代码 🔥📖 |
| ④ 大模型（首选） | [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 逐章手写 GPT：数据 → 预训练 → 微调 📖🔥 |
| ⑤ 大模型（系统视角） | [karpathy/llama2.c](https://github.com/karpathy/llama2.c) | 一个 C 文件跑完 Llama 推理 🔥🧩 |
| ⑥ 大模型（全栈） | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 低成本训一个能对话的小模型 🧪🔥 |
| ⑦ Agent 入门 | [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) | 18 节课，从工具调用讲到多智能体 🎓 |
| ⑧ Agent 手写 | [sanzgiri/ai-agents-from-scratch](https://github.com/sanzgiri/ai-agents-from-scratch) | 不用框架、本地 LLM 手写 Agent 🆕🧩 |
| ⑨ 检索与向量库 | [SriPrarabdha/vector_db_from_scratch](https://github.com/SriPrarabdha/vector_db_from_scratch) | 纯 C++ 手写 HNSW / IVF / PQ ⚙️ |

---
---

# Part I · 模型与算法

## 1. 聚合与学习路线

这一节不是单一模型实现，而是把「从零实现」本身作为组织方式的清单、教材与课程。

- [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) — 从零重建一切的元清单：数据库、操作系统、编译器、网络、渲染，也含 AI 条目。这类清单的源头。 🔥
- [eriklindernoren/ML-From-Scratch](https://github.com/eriklindernoren/ML-From-Scratch) — 用 NumPy 从零实现线性回归、逻辑回归、决策树、聚类与浅层神经网络，最经典的「框架只是封装」证明。 🔥🧩
- [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) — 神经网络从零到英雄：micrograd → makemore（MLP/CNN/WaveNet）→ GPT + BPE，配套视频逐节对应。 🔥🎓
- [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) — 《动手学深度学习》中文版：从线性回归、MLP 到 Transformer，每个数学概念都配可运行代码。 📖🔥
- [d2l-ai/d2l-en](https://github.com/d2l-ai/d2l-en) — 英文原版，额外提供 PyTorch / JAX / TensorFlow 多框架实现。 📖
- [datawhalechina/happy-llm](https://github.com/datawhalechina/happy-llm) — 中文 LLM 教材：NLP 基础 → Transformer → LLaMA 训练 → SFT → LoRA，配套 PDF/PPT。 📖🎓
- [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) — 中文系统性智能体教程：Agent、ReAct、RAG、MCP、多智能体全部拆成可运行代码。 🎓📖
- [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) — 523 节课、20 个阶段、约 342 小时，覆盖数学 → ML → CV → NLP → Transformer → LLM → Agent → MCP → 生产部署，Python/TS/Rust/Julia 多语言。 🆕🎓
- [mhngu23/ai-architectures-from-scratch](https://github.com/mhngu23/ai-architectures-from-scratch) — 按周推进的个人复现计划（每周 4 小时）：Linear → 优化器 → Transformer → 扩散 → CNN → RNN/LSTM → GAN/ViT，依赖尽量只有 NumPy。 🆕
- [GokuMohandas/Made-With-ML](https://github.com/GokuMohandas/Made-With-ML) — 不止训练模型：把模型卡、实验追踪、评测、部署纳入同一学习闭环。 🎓
- [FazeelUsmani/Deep-Learning-from-Scratch](https://github.com/FazeelUsmani/Deep-Learning-from-Scratch) — CNN、RNN、注意力等逐模块拆分的深度学习从零实现合集。
- [GokuMohandas/AILearning](https://github.com/GokuMohandas/AILearning) — 从基础 ML/DL 到 LLM 应用的学习资料与实验合集，偏学习路径。
- [goodrahstar/llm-from-scratch](https://github.com/goodrahstar/llm-from-scratch) — Transformer、LLM 训练、推理与对齐的资源索引（注意：这是资源清单，不是 Raschka 的逐行实现）。
- [karthik578/Generative-AI-from-scratch](https://github.com/karthik578/Generative-AI-from-scratch) — 生成式 AI 教学实验合集，横跨神经网络、扩散与 LLM。
- [Mooli980/ai-from-scratch](https://github.com/Mooli980/ai-from-scratch) — 基础神经网络与生成模型的个人练习，路径清晰、规模小，适合刚起步的人。 🧩
- [om-Hex/ai-from-scratch](https://github.com/om-Hex/ai-from-scratch) — 个人 AI 算法实现与实验笔记，更接近学习日志而非课程。

---

## 2. 机器学习与深度学习基础

核心标准：是否显式展示模型、层、损失、优化器或训练循环的实现过程。

- [ddbourgin/numpy-ml](https://github.com/ddbourgin/numpy-ml) — 用 NumPy 实现神经网络、优化器、CNN、RNN、NLP 与强化学习，覆盖面接近一本小型 ML 教科书。 🔥
- [oreilly-japan/DeepLearning-from-Scratch](https://github.com/oreilly-japan/DeepLearning-from-Scratch) — 《深度学习从零开始》配套代码：层、优化器、CNN、RNN、生成模型，书籍与代码同步。 📖⚠️
- [AssemblyAI-Community/Machine-Learning-From-Scratch](https://github.com/AssemblyAI-Community/Machine-Learning-From-Scratch) — 用标准 Python（非框架）实现基础 ML 模型，强调把微积分与统计逻辑暴露出来。 🧩
- [zotroneneis/machine_learning_basics](https://github.com/zotroneneis/machine_learning_basics) — 回归、分类、聚类等基础算法的 from-scratch 实现，含手写神经网络前向传播与权重更新。 📓
- [tgjeon/NeuralNetwork-from-scratch](https://github.com/tgjeon/NeuralNetwork-from-scratch) — NumPy 神经网络、反向传播与常见层，适合作为书籍代码的对照材料。
- [kjaisingh/neural-networks-from-scratch](https://github.com/kjaisingh/neural-networks-from-scratch) — 感知机、MLP、CNN、RNN 按模型族组织，方便横向比较结构差异。
- [matt-szymczyk/numpy-neural-networks](https://github.com/matt-szymczyk/numpy-neural-networks) — 仅依赖 NumPy 的 MLP 训练框架，层 / 损失 / 优化器拆分清楚，适合逐文件讲解。 🧩
- [marcosfgv/mlp-neural-network-from-scratch](https://github.com/marcosfgv/mlp-neural-network-from-scratch) — MLP 的前向、反向与训练过程，极简到可以做单元测试。 🧩
- [DevNup/ml-gradient-descent-from-scratch](https://github.com/DevNup/ml-gradient-descent-from-scratch) — 线性回归 + 梯度下降 + 可视化，对零框架经验者最友好。 🧩
- [rasbt/python-machine-learning-book-3rd-edition](https://github.com/rasbt/python-machine-learning-book-3rd-edition) — 《Python 机器学习》第三版配套 Notebook，从经典算法到深度学习。 📓📖
- [chiphuyen/tf-stanford-tutorials](https://github.com/chiphuyen/tf-stanford-tutorials) — 斯坦福课程 TensorFlow 教程与练习，包含从零搭神经网络的内容。 ⚠️🎓

### 2.1 自动微分与微缩框架

想知道 `loss.backward()` 里面发生了什么，看这一节。

- [karpathy/micrograd](https://github.com/karpathy/micrograd) — 标量自动微分引擎 + 最小神经网络库，几百行讲透计算图、链式法则与反向传播。 🔥🧩
- [tinygrad/tinygrad](https://github.com/tinygrad/tinygrad) — 轻量张量计算、自动微分与多后端（CPU/GPU/Metal/CUDA/WebGPU）深度学习框架，可读性与工程野心兼具。 🔥⚙️
- [11NOel11/build_your_own_torch](https://github.com/11NOel11/build_your_own_torch) — 从零重建 PyTorch 核心概念：标量 autograd → 张量 autograd → Module → Optimizer 分阶段推进。 🧩🆕
- [bobtseng15/tensorlow](https://github.com/bobtseng15/tensorlow) — 类 TensorFlow 的微型计算图与自动微分框架，能看到静态图、Session、占位符这套历史 API 设计。 🧩
- [the-EL/zendar](https://github.com/the-EL/zendar) — 极简神经网络框架，适合研究计算图表达与训练 API 的设计权衡。 🧩

---

## 3. 计算机视觉

建议按「分类 → 生成 → 检测分割 → OCR」的顺序读。别一上来就调 `sample()`，先看懂噪声调度和 UNet。

**生成模型**

- [CompVis/latent-diffusion](https://github.com/CompVis/latent-diffusion) — Latent Diffusion（Stable Diffusion 前身）：在 VAE 潜空间里做扩散，可直接对照现代文生图管线。 🔥
- [openai/guided-diffusion](https://github.com/openai/guided-diffusion) — OpenAI 官方扩散模型参考实现：DDPM、噪声调度、classifier guidance。 🔥
- [wiseodd/generative-models](https://github.com/wiseodd/generative-models) — GAN、VAE、RBM、Helmholtz Machine 等生成模型集合，PyTorch/TensorFlow 双版本，适合理解生成模型谱系。 🔥
- [junyanz/pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix) — 图像翻译官方 PyTorch 实现，数据集、训练、推理流程齐全。 🔥
- [junyanz/CycleGAN](https://github.com/junyanz/CycleGAN) — 原论文官方实现（Lua/Torch），能完整看到循环一致性损失与训练流程。 ⚠️
- [phillipi/pix2pix](https://github.com/phillipi/pix2pix) — 条件对抗网络图像翻译的原始实现，图像翻译范式的起点。 ⚠️
- [carpedm20/DCGAN-tensorflow](https://github.com/carpedm20/DCGAN-tensorflow) — DCGAN 经典教学参考，卷积生成器/判别器与训练技巧讲得清楚。 ⚠️
- [Newmu/dcgan_code](https://github.com/Newmu/dcgan_code) — DCGAN 论文作者版实现，历史与复现价值高。 ⚠️
- [atandra2000/StableDiffusion](https://github.com/atandra2000/StableDiffusion) — 从零训练 Stable Diffusion 1.x 级别的潜扩散模型：UNet + DDPM/DDIM + VAE 数据管线 + CLIP 条件 + DDP 训练，明确不使用 `diffusers`。 🆕⚙️

**分类、检测与分割**

- [apandy02/vision](https://github.com/apandy02/vision) — 纯 PyTorch 手写迷你视觉库：LeNet、ResNet、FCN、MoE、ViT、GAN、DDPM、DDIM，展示个人复现如何长成小库。 🆕
- [Dovanvu09/Object_Detection](https://github.com/Dovanvu09/Object_Detection) — YOLOv1、Faster R-CNN、DETR 三种检测范式放在一处，对比单阶段 / 两阶段 / Transformer 路线。 📓
- [PedroFerreira03/YOLO_scratch](https://github.com/PedroFerreira03/YOLO_scratch) — YOLO 风格检测头：多 anchor、损失函数、IoU 分配，还补上了教学项目常省略的 mAP 评测。 🧪
- [szq0214/DSOD](https://github.com/szq0214/DSOD) — 论文原作：研究「检测器能否不依赖预训练骨干从零训练」这个问题本身。 ⚠️
- [FanChum360/OCR](https://github.com/FanChum360/OCR) — 手写数字识别：自定义 ANN + REST API + Web 界面，把模型实现延伸到可交互演示。 🧩
- [Fomys/neuralnetworksfromscratch](https://github.com/Fomys/neuralnetworksfromscratch) — NumPy 前向/反向传播用于图像分类，CV 入门的衔接材料。 🧩
- [Scicrop/llm-vision-basics](https://github.com/Scicrop/llm-vision-basics) — 从 RNN/LSTM、注意力到 CNN 与 DDPM 的教学 Notebook，一个仓库串起 NLP/CV/扩散。 📓

> **经典图像算法**（卷积、SIFT、配准、可微滤波）见 [§14 附注](#14-3d-视觉与神经渲染)与 [kornia](https://github.com/kornia/kornia)；超分与复原见 [§17](#17-生成式模型的其他范式)。

---

## 4. 自然语言处理

NLP 的正确阅读顺序是 **表示 → 序列 → 对齐 → 预训练**。跳过前两步直接看 Transformer，只会学到怎么对齐张量形状。

- [karpathy/minbpe](https://github.com/karpathy/minbpe) — 最小可读的 BPE tokenizer 实现，把「文本怎么变成 token id」这个黑盒前置环节彻底公开。 🔥🧩
- [explosion/tokenize-from-scratch](https://github.com/explosion/tokenize-from-scratch) — spaCy 团队出品：从字符串切分、词法分析到 token 化，理解工业分词器的边界规则。
- [pnugues/nlp_from_scratch](https://github.com/pnugues/nlp_from_scratch) — 用 PyTorch 重新实现经典论文 SENNA：词嵌入 + 前馈网络 + CNN + CRF 的组合。 📖
- [MorvanZhou/NLP-Tutorials](https://github.com/MorvanZhou/NLP-Tutorials) — 中文教程 + 单文件实现：TF-IDF、CBOW、Skip-Gram、seq2seq、注意力、ELMo、GPT、BERT。 📓
- [spro/practical-pytorch](https://github.com/spro/practical-pytorch) — 老牌 PyTorch NLP 教程：分类、RNN、seq2seq，历史路线的重要补充。 ⚠️📓
- [glample/fastText](https://github.com/glample/fastText) — 词向量与文本分类库，可对照理解词袋、n-gram、层次 softmax 的工业实现。 ⚙️
- [Gladiator07/Natural-Language-Processing](https://github.com/Gladiator07/Natural-Language-Processing) — 按「从 scratch 到 GPT-3」组织：Word2Vec、RNN/LSTM、seq2seq、注意力、Transformer。

**micro 系列：每个概念一个几百行的小仓库**（同一作者的 "Build AI From Scratch" 系列，纯 NumPy）

- [Jayluci4/micro-embedding](https://github.com/Jayluci4/micro-embedding) — Word2Vec/Skip-Gram 词向量，从共现到负采样逐一展示。 🧩🆕
- [Jayluci4/micro-rnn](https://github.com/Jayluci4/micro-rnn) — 最小 RNN 与训练循环，序列模型的 "Hello World"。 🧩🆕
- [Jayluci4/micro-lstm](https://github.com/Jayluci4/micro-lstm) — 最小 LSTM：遗忘门、输入门、输出门、候选状态拆开写。 🧩🆕
- [Jayluci4/micro-gru](https://github.com/Jayluci4/micro-gru) — 最小 GRU，适合与 micro-lstm 对比门控参数量差异。 🧩🆕
- [Jayluci4/micro-seq2seq](https://github.com/Jayluci4/micro-seq2seq) — 编码器—解码器结构，理解注意力为何被引入的关键一步。 🧩🆕
- [Jayluci4/micro-tokenizer](https://github.com/Jayluci4/micro-tokenizer) — 最小 BPE tokenizer，可与 minbpe 对照阅读。 🧩🆕
- [Jayluci4/micro-transformer](https://github.com/Jayluci4/micro-transformer) — 约 200 行的完整 Transformer：注意力 + FFN + LayerNorm + 残差，配架构图。 🧩🆕
- [Jayluci4/micro-diffusion](https://github.com/Jayluci4/micro-diffusion) — micro 系列中的扩散模型，用最少代码讲清楚加噪与去噪。 🧩🆕
- [jsbaan/transformer-from-scratch](https://github.com/jsbaan/transformer-from-scratch) — 带单元测试与类型检查的 vanilla Transformer，每个文件自带测试，配长文博客解释 7 个反直觉细节。 🧩

---

## 5. 大语言模型

LLM 是 from-scratch 最活跃的方向，分成四层：**教学型（解释算法）→ 系统型（解释执行）→ 现代训练栈（解释工程）→ 推理引擎（解释优化）**。后两层分别见 [§8](#8-分布式训练与并行策略) 与 [§10](#10-ai-编译器与推理运行时)。

### 5.1 Transformer 与 GPT 训练

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — 《Build a Large Language Model (From Scratch)》配套代码：数据采样 → BPE → 注意力 → GPT → 预训练 → 分类微调 → SFT → LoRA → DPO，逐章可运行。目前最完整的教材级 LLM 代码库。 🔥📖
- [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) — 极简 GPT 训练/微调模板，可复现 GPT-2 124M，被无数项目当作起点。 🔥🧪
- [karpathy/minGPT](https://github.com/karpathy/minGPT) — 约 300 行的极简 GPT，nanoGPT 的前身，适合对照阅读。 ⚠️🧩
- [jaymody/picoGPT](https://github.com/jaymody/picoGPT) — 极简 GPT 推理：权重加载、注意力、KV 缓存、token 生成，最小依赖链路，几十行看明白一次前向。 🧩
- [datawhalechina/happy-llm](https://github.com/datawhalechina/happy-llm) — 中文体系：Transformer → LLaMA 训练 → SFT → LoRA，配套 PDF/PPT。 📖🎓
- [raiyanyahya/how-to-train-your-gpt](https://github.com/raiyanyahya/how-to-train-your-gpt) — 现代 GPT 训练过程，逐行注释 + 概念解释，可当作 nanoGPT 的注释版。
- [theAIGuysCode/LLMTrainingFromScratch](https://github.com/theAIGuysCode/LLMTrainingFromScratch) — 小型 GPT 的训练、微调与部署拆成 Notebook，适合课堂演示。 📓
- [Jayluci4/micro-instruct](https://github.com/Jayluci4/micro-instruct) — 最小指令跟随 Transformer：RoPE、RMSNorm、合成指令数据、SFT，解释 GPT 如何变成能对话的模型。 🧩🆕

### 5.2 现代架构与推理

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) — 26M–64M 级 GPT：预训练、SFT、LoRA、DPO、蒸馏、MoE、多模态与推理服务全在一个项目里，个人 GPU 可训。 🔥🧪
- [karpathy/llama2.c](https://github.com/karpathy/llama2.c) — 单文件纯 C 推理 Llama 2 / TinyLlama：权重加载、前向计算、采样、部署一次讲清。 🔥🧩
- [karpathy/llm.c](https://github.com/karpathy/llm.c) — 不依赖 PyTorch 的 GPT-2/GPT-3 训练，纯 C/CUDA，同时维护 PyTorch 对照实现验证数值一致性。 🔥⚙️
- [karpathy/nanochat](https://github.com/karpathy/nanochat) — Karpathy 当前的重心项目：从 tokenizer、数据整理、训练到推理的完整小型聊天模型工程。 🆕⚙️
- [naklecha/llama3-from-scratch](https://github.com/naklecha/llama3-from-scratch) — 一个张量、一次矩阵乘地实现 Llama 3 8B 推理，从权重文件直接加载，是「逐行对照」式学习材料的代表。 📓
- [therealoliver/Deepdive-llama3-from-scratch](https://github.com/therealoliver/Deepdive-llama3-from-scratch) — 上者的增强版：补齐推导过程与代码注释，含 KV-Cache 推导与优化说明，中英双语文档。 📓
- [casinca/LLM-quest](https://github.com/casinca/LLM-quest) — 现代架构速查式实现：GPT-2、Llama 3.2、Qwen、MoE、DeepSeek MLA、ViT、DPO、GRPO、多模态。 🆕
- [NousResearch/llama.rs](https://github.com/NousResearch/llama.rs) — 用 Rust 从零推理 LLaMA，与 C 项目互补，展示内存安全语言的推理实现。 ⚙️
- [keyvank/femtoGPT](https://github.com/keyvank/femtoGPT) — Rust 生态里少见的最小 GPT 训练 + 推理实现，适合系统背景读者。 🧩⚙️

### 5.3 微调、对齐与强化学习

- [Jayluci4/micro-lora](https://github.com/Jayluci4/micro-lora) — 从矩阵分解视角解释 LoRA，避免把 PEFT 当黑盒。 🧩🆕
- [Jayluci4/micro-rlhf](https://github.com/Jayluci4/micro-rlhf) — 奖励模型、偏好优化与 RLHF 概念的最小实现，先理解目标函数再看 PPO/DPO 代码。 🧩🆕

> 对齐方向高质量的独立「从零实现」仍不多，多数集中在教材型仓库里（`LLMs-from-scratch` 的 DPO 章节、`minimind` 的 DPO/蒸馏）。这是目前最适合贡献 PR 的空缺方向之一。

---

## 6. Agent 与检索

Agent 的难点从来不是调用模型，而是**循环、工具协议、状态、检索、记忆与评测**。请把「最小 ReAct 玩具」和「可评测的多智能体系统」区分看待。

### 6.1 Agent 循环与工具调用

- [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) — 18 节课：Agent 基础、工具调用、RAG、规划、可信 Agent、多智能体、生产部署，支持五十多种语言。 🔥🎓
- [sanzgiri/ai-agents-from-scratch](https://github.com/sanzgiri/ai-agents-from-scratch) — 不用任何框架、用本地 LLM 手写 Agent：基础调用 → 系统提示 → 流式 → 工具调用 → 记忆 → ReAct。 🆕🧩
- [trojanSF/agents-from-scratch](https://github.com/trojanSF/agents-from-scratch) — 12 课渐进式教程：结构化输出、路由、工具、Agent 循环、记忆、规划、原子操作、AoT、评测、可观测性，配套架构图。 🆕🎓
- [woodx9/build-your-claude-code-from-scratch](https://github.com/woodx9/build-your-claude-code-from-scratch) — 从零实现 Claude Code 风格的命令行编码 Agent：工具调用、ReAct、流式输出、历史压缩、上下文裁剪、子 Agent（8 章）。 🆕⚙️
- [JohnMachado11/ReAct-Agent-from-Scratch](https://github.com/JohnMachado11/ReAct-Agent-from-Scratch) — Thought → Action → Observation 的纯 Python ReAct Agent，带 6 个工具，无任何框架抽象。 🧩
- [KansSoftware/simple-re-act-agent-from-scratch](https://github.com/KansSoftware/simple-re-act-agent-from-scratch) — 旅行助手场景的 ReAct 循环 + 工具表 + 对话记忆，Notebook 化便于逐格观察动作解析与执行。 📓🧩
- [hexo-ai/agent-from-scratch](https://github.com/hexo-ai/agent-from-scratch) — 单个 Python 脚本讲清单/多 Agent：Agent 类 + Swarm 循环 + 工具调用，fork 自 OpenAI Swarm 但更简单。 🧩
- [Jayluci4/micro-agent](https://github.com/Jayluci4/micro-agent) — 最小 ReAct 思考—行动—观察循环，可当作理解所有框架 Agent 的基准模型。 🧩🆕

### 6.2 RAG 检索增强生成

- [drisskhattabi6/Retrieval-Augmented-Generation-RAG-From-Scratch](https://github.com/drisskhattabi6/Retrieval-Augmented-Generation-RAG-From-Scratch) — 从零搭 RAG：混合稠密/稀疏检索、rerank、ChromaDB、幻觉安全回答，并主动暴露 chunking 与重排的简化假设。 🆕
- [akash-aman/RAG](https://github.com/akash-aman/RAG) — RAG 基础全栈：文档处理、embedding、检索、上下文拼接、生成 API，工程目录清晰便于扩展。
- [Jayluci4/micro-rag](https://github.com/Jayluci4/micro-rag) — 最小 RAG：chunk → embed → retrieve → context → generate，用少量代码讲完链路。 🧩🆕
- [Jayluci4/micro-kg](https://github.com/Jayluci4/micro-kg) — 知识图谱构建与查询辅助 Agent，展示向量检索之外的结构化记忆方案。 🧩🆕
- [poppycoderr/TriplexRAG](https://github.com/poppycoderr/TriplexRAG) — 手搓并融合 GraphRAG、LightRAG 与知识图谱构建，带自制评估框架，是 2025 年后 GraphRAG 工程的代表。 🆕

### 6.3 向量数据库与记忆

- [SriPrarabdha/vector_db_from_scratch](https://github.com/SriPrarabdha/vector_db_from_scratch) — 纯 C++ 手写向量数据库：线性扫描、KD-Tree、IVF、IVF+PQ、HNSW、混合索引，不用 Faiss/Annoy。 ⚙️🆕
- [envy7/vectordb](https://github.com/envy7/vectordb) — 学习用向量库：Word2Vec 训练、余弦相似度检索、持久化与 embedding 可视化。 🧩

### 6.4 MCP 与工具协议

- [zahrafatima9432/mcp-toolbox](https://github.com/zahrafatima9432/mcp-toolbox) — 从零实现 MCP server + client：文档存储、网页搜索、安全计算器三个真实工具，客户端支持离线脚本与 LLM 双模式。 🆕🧩
- [dynstat/agents-mcp-clients](https://github.com/dynstat/agents-mcp-clients) — 最小可运行 MCP 示例：stdio server、文件工具、client session、工具发现与调用，讲清 JSON-RPC 与工具生命周期。 🧩🆕
- [priyanthan07/Agents_with_MCP](https://github.com/priyanthan07/Agents_with_MCP) — 多 Agent 研究系统：Web/ArXiv/多模态 Agent + MCP + Redis/ChromaDB + 冲突检测，附六篇配套博客。 🆕

### 6.5 多智能体、工作流与评测

- [NirDiamant/agents-towards-production](https://github.com/NirDiamant/agents-towards-production) — 从原型到生产：有状态工作流、RAG、向量记忆、MCP、A2A、Docker、FastAPI、可观测性、评测。 🔥🎓
- [victordibia/designing-multiagent-systems](https://github.com/victordibia/designing-multiagent-systems) — 配套书籍的 PicoAgents 实现：工具、流式、工作流、编排、MCP、记忆、终止条件、评测与 Web UI。 📖🎓
- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) — 可运行的 Agent 蓝图合集：单 Agent、RAG、语音 Agent、MCP、多智能体、代码与浏览器应用。 🔥

---
---

# Part II · 系统与工程层

> 这一层回答的不是「模型怎么算」，而是「模型怎么跑得快、放得下、训得动」。
> 建议顺序：先 [§11 算子](#11-高性能算子与-gpu-编程) 建立性能直觉，再 [§8 并行](#8-分布式训练与并行策略)，最后 [§10 编译器](#10-ai-编译器与推理运行时)。

## 8. 分布式训练与并行策略

分布式「从零实现」已从「写一个 AllReduce」升级为把完整并行策略拆成可替换模块。**学习顺序建议：Ring AllReduce → DDP → ZeRO → TP → PP → SP/CP → EP**，每一步都验证「数值等价」和「显存/通信实测」。

- [huggingface/picotron](https://github.com/huggingface/picotron) — 教学型 4D 并行预训练框架，把数据、张量、流水线、上下文并行拆成可读模块，关键文件控制在 300 行以内，并给出 8 卡与 64 卡实验记录。 🧩🎓🆕
- [huggingface/nanotron](https://github.com/huggingface/nanotron) — 轻量但可扩展的 3D 并行预训练库，含配置化并行、检查点与 MoE/Mamba 示例，适合观察生产化训练如何组织。 ⚙️
- [Zhang-Wen-chao/mini-megatron](https://github.com/Zhang-Wen-chao/mini-megatron) — 约 800 行复现 Megatron 风格 TP、非交错 1F1B PP、DP 与 BF16 AMP，并给出等价性测试与**反例分析**（诚实标注自己没做哪些吞吐优化）。 🧩
- [ritwikbera/RingReduce](https://github.com/ritwikbera/RingReduce) — 从底层实现 Ring AllReduce，直接展示 reduce-scatter 与 all-gather 的两段式结构，是理解一切集合通信的起点。 🧩
- [junfanz1/MoE-Mixture-of-Experts-in-PyTorch](https://github.com/junfanz1/MoE-Mixture-of-Experts-in-PyTorch) — 实现 top-k 路由、容量因子、重要性损失与负载均衡损失，并提供单设备与多设备（all-to-all）版本。 🧩
- [topal-team/rockmate](https://github.com/topal-team/rockmate) — 在给定 GPU 显存预算下自动决定检查点/重计算，把「激活重算」形式化为一个求解问题而非开关。 ⚙️

**这一方向的关键认知**：DDP 的难点是梯度就绪顺序、bucket 归组与计算/通信重叠；ZeRO-3/FSDP 要处理参数 all-gather、分片梯度与 prefetch；TP 的重点是矩阵切分与每层规约；PP 的重点是微批、1F1B 调度与阶段平衡。只跑通示例代码不等于理解错误边界。

**延伸：工业级对照实现**（非从零，用于对照）
- [deepspeedai/DeepSpeed](https://github.com/deepspeedai/DeepSpeed) — ZeRO 系列分片与 offload 的权威实现。
- [NVIDIA/Megatron-LM](https://github.com/NVIDIA/Megatron-LM) — 张量/流水线/序列并行的生产参考。

---

## 9. 模型压缩、量化与蒸馏

这一方向有三个层级：手写低比特算子（理解数值）→ 实现 GPTQ/AWQ/QLoRA（理解误差补偿）→ 剪枝蒸馏（理解压缩如何进入训练）。**当下的趋势是「按敏感度分配位宽」，而不是所有层统一 4 比特。**

- [IST-DASLab/gptq](https://github.com/IST-DASLab/gptq) — GPTQ 论文原始代码：逐层量化并用误差补偿降低 2/3/4 位重建误差，配套低比特矩阵向量 kernel。 ⚙️
- [mit-han-lab/llm-awq](https://github.com/mit-han-lab/llm-awq) — AWQ 官方实现：识别对激活重要的显著权重并通过缩放保护它们，与 GPTQ 是两种不同的优化视角。 ⚙️
- [michaelnny/QLoRA-LLM](https://github.com/michaelnny/QLoRA-LLM) — 把冻结 4 比特线性层、可训练 LoRA 与自定义优化器接成完整微调链路，展示 QLoRA 不只是「调量化库」。 🧪
- [schneiderkamplab/bitlinear](https://github.com/schneiderkamplab/bitlinear) — 可直接替换 `nn.Linear` 的 1.58 比特 BitLinear 层，面向量化感知训练与极低比特推理。 🧩🆕
- [Mario928/edge-ml-optimization](https://github.com/Mario928/edge-ml-optimization) — 手写 INT8 权重量化、逐通道缩放、百分位激活校准与偏置校正，聚焦边缘部署的数值问题。 📓
- [HtutLynn/Knowledge_Distillation_Pytorch](https://github.com/HtutLynn/Knowledge_Distillation_Pytorch) — 从零实现 logits 蒸馏、损失与多教师扩展，体量小但覆盖软标签如何传递信息。 🧩
- [tianyic/onlytrainonce](https://github.com/tianyic/onlytrainonce) — OTO：一次训练同时完成结构化剪枝，用零不变组直接移除组件而不依赖后处理微调。 ⚙️

**判断标准**：任何只宣称「4 比特快 N 倍」却不给模型、kernel、校准集和硬件条件的项目，都不足以作为可靠结论。好的量化项目必须同时回答校准怎么做、敏感层怎么识别、端到端 PPL 掉了多少。

---

## 10. AI 编译器与推理运行时

判断一个编译器项目，不要看「有没有 IR」，要看 **IR 有几层、每层允许哪些变换、如何从计算语义下降到循环/调度再生成目标代码**。**IR 本身不是最难的部分，跨层语义一致才是。**

- [apache/tvm](https://github.com/apache/tvm) — 经典端到端深度学习编译器栈：高层 IR → 张量 IR（TIR）→ 调度 → 多后端 → 运行时，分层结构最完整的学习对象。 ⚙️🔥
- [mlc-ai/mlc-llm](https://github.com/mlc-ai/mlc-llm) — 以 TVM Unity 把 LLM 编译到 GPU/CPU/WebGPU 等运行时，融合量化 kernel、动态形状，是「编译器能力如何转化为部署能力」的样本。 ⚙️
- [rafaelipuente/AuroraAICompiler](https://github.com/rafaelipuente/AuroraAICompiler) — 自定义 MLIR dialect 并实现 MatMul+Bias 融合，演示从 Aurora IR 经 Linalg、bufferization、loop 转换逐级 lowering 到 LLVM dialect。 🧩
- [jjustin-k/ai_compiler](https://github.com/jjustin-k/ai_compiler) — 把问题缩到最小：JSON → 计算图 → 图优化（常量折叠/融合）→ 循环 IR → C codegen，完整说明 shape、依赖与代码发射的关系。 🧩
- [sgpthomas/comp-gen](https://github.com/sgpthomas/comp-gen) — 更前沿的一层：用规则生成与 equality saturation **自动构造编译器**，而不是手写每个 Pass。 ⚙️
- [4paradigm/canopy](https://github.com/4paradigm/canopy) — 在 TVM 上扩展 PCIe 云 FPGA 驱动与 OpenCL 加速器，展示编译器如何接入一种新硬件。 ⚙️

> 想理解 LLM 推理优化，`tinygrad`（[§2.1](#21-自动微分与微缩框架)）+ `mlc-llm` 的组合比直接读完整 TVM 更高效；做硬件或编译器研究则应反过来从 TVM/MLIR 的 Pass 与 backend 接口入手。

**延伸：工业级对照实现**
- [vllm-project/vllm](https://github.com/vllm-project/vllm) — PagedAttention、KV Cache 管理、连续批处理、量化与 OpenAI 兼容服务。源码 + 论文共同解释了推理引擎的核心优化。 ⚙️
- [ggml-org/ggml](https://github.com/ggml-org/ggml) — 张量库与推理运行时，是 llama.cpp 的底座，适合观察端侧推理的最小抽象。 ⚙️

---

## 11. 高性能算子与 GPU 编程

这里的所有项目都在回答同一个问题：**当算术强度低时，global memory 带宽成为瓶颈**，tile、shared memory、bank conflict、Tensor Core 与算子融合必须配合。**铁律：先测量，再解释，不按套路套优化。**

- [triton-lang/triton](https://github.com/triton-lang/triton) — Triton 语言与编译器本身：Python 层写 tile、layout、autotune 直接生成 GPU kernel，是阅读 FlashAttention Triton 实现与研究 kernel 自动调优的入口。 ⚙️🔥
- [srush/GPU-Puzzles](https://github.com/srush/GPU-Puzzles) — 用解谜的方式学 GPU 并行、内存层次与 CUDA，把高性能计算拆成可交互练习，是最友好的起点。 🎓🔥
- [sanket-pixel/flash-attention](https://github.com/sanket-pixel/flash-attention) — 单文件 FlashAttention：tiling、online softmax、SRAM 复用 + 性能基准。 ⚙️🧩
- [codingwithshawnyt/FlashAttention-CUDA](https://github.com/codingwithshawnyt/FlashAttention-CUDA) — 从零实现 FlashAttention 前向 kernel，含 CPU 参考测试、误差阈值与 benchmark —— 「正确性 + 基准 + 对比」三件套齐全。 ⚙️
- [terryye/cuda_GEMM](https://github.com/terryye/cuda_GEMM) — GEMM 四级结构：朴素 kernel → shared memory tiling → WMMA Tensor Core → cuBLASLt，是理解 GPU 内存层次最完整的练习。 ⚙️
- [claudiocamolese/CUDA-CNN-from-scratch](https://github.com/claudiocamolese/CUDA-CNN-from-scratch) — 从零实现 CNN 前向/反向：卷积与 ReLU 融合、shared memory GEMM、warp 归约、多 stream 与锁页内存。 ⚙️
- [currybab/fused-llm-inference-kernels-in-cuda](https://github.com/currybab/fused-llm-inference-kernels-in-cuda) — 按 warp/block reduce → RMSNorm → Softmax → RoPE → SwiGLU 的顺序构建推理算子，最终组成 MLP block。 🧩⚙️🆕
- [erogol/CUDA_MATRIX_TRANSPOSE](https://github.com/erogol/CUDA_MATRIX_TRANSPOSE) — 极小却精准：把合并访存、shared memory bank conflict 与 `__syncthreads()` 放在一个可运行示例里。 🧩
- [rm-wu/cuda_course](https://github.com/rm-wu/cuda_course) — 完整课程：first kernel → CUDA API → fast matmul → Triton → PyTorch CUDA 扩展 → final project。 🎓

**FlashAttention 的教学价值不在某个 tile size，而在 online softmax、分块、IO-aware 与重计算如何共同降低 HBM 流量。** 缺少正确性对照和 memory/throughput benchmark 的仓库，只能算代码展示。

---

## 12. 硬件、端侧与异构加速

这一方向覆盖两类工作：在 FPGA/类 TPU 数据流加速器上实现矩阵运算；把模型搬进浏览器、嵌入式 CPU/RISC-V 或 SIMD 环境。**成败取决于数据路径，而不是算子代码量。**

- [mbrukman/tinytinyTPU-co](https://github.com/mbrukman/tinytinyTPU-co) — 用 SystemVerilog 实现 2×2 脉动阵列 TPU：MAC 后处理流水线（累加/激活/归一化/量化）、UART 主机接口、多层 MLP 推理，部署在 Basys3 Artix-7 上。 ⚙️🆕
- [RightNow-AI/picolm](https://github.com/RightNow-AI/picolm) — 约 2500 行纯 C11 推理引擎：在 256MB RAM 的十美元板子上跑 1B 模型，靠 mmap 权重流式加载 + 9 项优化把生成速度从 1.6 tok/s 提到 13.5 tok/s。 ⚙️🆕🔥
- [mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) — 浏览器内基于 WebGPU 本地运行 LLM：前端运行时、编译模型与 GPU shader 如何协同，推理完全留在用户设备。 ⚙️
- [MoonBit/moonbit-gpt-edge-demo](https://github.com/MoonBit/moonbit-gpt-edge-demo) — 用 MoonBit 手写 Transformer 与 autograd，编译成 wasm-gc 在静态页面运行，无服务器无 GPU。 🧩🆕
- [fahadhamdan1/NNOF](https://github.com/fahadhamdan1/NNOF) — 对比基础 CPU 算子、AVX SIMD 与 OpenCL GPU 的矩阵乘法与全连接实现，适合理解同一算法在三种执行模型下的差异。 ⚙️
- [Huawei-Ascend/ascend-c-samples](https://github.com/Huawei-Ascend/ascend-c-samples) — 昇腾 Ascend C 算子开发样例集合，可研究 NPU 上的算子实现、双缓冲与多核协同。 ⚙️

**不要跨硬件直接比较「同一 FLOP」或「同一秒数」** —— 精度、batch、内存与 runtime overhead 并不等价。正确做法是先在 CPU 写参考数值 kernel，再在目标平台实现相同语义，用逐元素差分 + 吞吐/显存测量验证。

---
---

# Part III · 多模态与新兴模态

> 这部分的共同瓶颈已经从「模型结构」转向「数据、表示与训练闭环」。
> 学多模态时请把系统拆成模块分别攻克：VLM = 编码器 + 投影器 + LLM + 指令数据；TTS = 文本前端 + 声学模型 + 声码器 + 说话人表示。

## 13. 多模态与视觉语言模型

VLM 的核心难点已经从「接上视觉编码器」变成**视觉 token 如何投影进语言模型空间、分辨率如何处理、图文数据如何构造**。

- [huggingface/nanoVLM](https://github.com/huggingface/nanoVLM) — 纯 PyTorch 的最小 VLM：视觉骨干 + 语言解码器 + 模态投影 + 训练循环，核心代码约 750 行，单卡 H100 训 6 小时即可跑通。**学 VLM 的最佳起点。** 🧩🆕🔥
- [openai/CLIP](https://github.com/openai/CLIP) — 双编码器 + 对比损失把图文映射到同一嵌入空间，结构简洁到能直接读懂正负样本配对与相似度计算，是零样本分类与多模态的原点。 🔥
- [google-research/vision_transformer](https://github.com/google-research/vision_transformer) — ViT 官方参考实现：图像分块、位置编码、Transformer 编码器、分类头，理解「图像如何变成 token」。 📓
- [haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA) — 视觉指令微调系统：视觉编码器 + 视觉—语言连接器 + LLM，可观察视觉特征如何被投影成 LLM 能理解的 token。 🔥
- [mlfoundations/open_clip](https://github.com/mlfoundations/open_clip) — CLIP 风格的开放训练栈：数据清洗、多分辨率训练、分布式与可复现权重，比只跑推理更接近「从零训练」。 🧪
- [PKU-YuanGroup/Video-LLaVA](https://github.com/PKU-YuanGroup/Video-LLaVA) — 把 LLaVA 框架扩展到视频帧—文本对齐，可观察多帧视频如何组织成 LLM 可处理序列。

**阅读顺序建议：nanoVLM → LLaVA → open_clip。** 先读懂完整训练闭环，再看生产级模型组合，最后理解 CLIP 训练需要的数据与算力规模。从大型 VLM 仓库开始，容易把 tokenizer、数据加载和模型并行误认为多模态算法本身。

---

## 14. 3D 视觉与神经渲染

这一方向的本质是**隐式场与显式基元的权衡**。建议顺序：NeRF → 光线与体渲染 → 坐标编码 → Gaussian Splatting → 表面提取。

- [bmild/nerf](https://github.com/bmild/nerf) — NeRF 原始代码：位置编码、MLP、体渲染、相机光线采样，理解神经辐射场的历史起点。 🔥📓
- [yenchenlin/nerf-pytorch](https://github.com/yenchenlin/nerf-pytorch) — 忠实复现 NeRF 的 PyTorch 版本，官方称与原版数值匹配且更快，是练手端到端的最好入口。 🧩
- [NVlabs/instant-ngp](https://github.com/NVlabs/instant-ngp) — 多分辨率哈希编码 + 轻量 MLP + CUDA 实时训练，把 NeRF 从离线推进到近实时；**核心不是换网络，而是坐标编码替代深层 MLP**。 ⚙️🔥
- [graphdeco-inria/gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting) — 3D Gaussian Splatting 原始官方实现：各向异性高斯的位置/协方差/不透明度优化、密度控制与可见性感知光栅化，实现 1080p 实时新视角合成。 ⚙️🔥
- [google-research/multinerf](https://github.com/google-research/multinerf) — Mip-NeRF 360、Ref-NeRF、RawNeRF 的统一发布，研究抗混叠圆锥追踪与反射表示。 ⚙️
- [Anttwo/SuGaR](https://github.com/Anttwo/SuGaR) — Surface-Aligned Gaussian Splatting 与网格提取，把「新视角渲染」与「可编辑几何」连接起来。 ⚙️
- [kwea123/nerf_pl](https://github.com/kwea123/nerf_pl) — 用 PyTorch Lightning 实现 NeRF 与 NeRF-W，适合学习实验组织、配置与场景外推。 📓

**只读 Python 模型定义理解不了这些项目的性能来源**，必须读 CUDA kernel、哈希编码与光栅化管线。另外，相机标定（COLMAP/SfM）与稀疏点云是这个方向的工程前提，不要当成附属细节。

> **附注 · 经典图像与信号处理**：卷积、Sobel、高斯滤波、仿射变换、SIFT/HOG 这类经典算法建议先手写一遍再进深度学习。可对照阅读 [kornia/kornia](https://github.com/kornia/kornia)（把传统滤波、几何变换、相机模型写成**可微**算子，正好说明「传统算法」与「可训练模块」的边界）。

---

## 15. 视频生成与视频理解

视频的关键难点不是把图像模型逐帧复制，而是**帧间冗余、时序长度、跨帧一致性与计算成本**。当前主流路线是：先用 3D-VAE 压缩时空体积，再在潜空间做扩散。

- [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) — 文本/图像/视频到视频的完整扩散训练与推理栈：数据处理、3D-VAE、视频扩散、条件生成、推理，是「视频压缩 + 时空扩散」全景的最佳样本。 🔥🆕
- [facebookresearch/SlowFast](https://github.com/facebookresearch/SlowFast) — SlowFast、I3D、Non-local、X3D、MViT 等视频理解骨干集于一库：慢路径保留语义、快路径捕捉运动。 🔥
- [facebookresearch/TimeSformer](https://github.com/facebookresearch/TimeSformer) — 时空分离自注意力：先时间维度再空间维度，比直接对 3D token 做全注意力更容易理解。
- [SwinTransformer/Video-Swin-Transformer](https://github.com/SwinTransformer/Video-Swin-Transformer) — 把 Swin 的局部窗口注意力扩展到 3D 时空，可研究窗口如何在时间与空间两个维度移动。
- [NVIDIA/flownet2-pytorch](https://github.com/NVIDIA/flownet2-pytorch) — FlowNet 2.0 光流估计：光流是时序一致性、运动补偿与视频生成的重要先验。
- [PKU-YuanGroup/Video-LLaVA](https://github.com/PKU-YuanGroup/Video-LLaVA) — 多帧视频视觉—语言对齐与指令微调，视频理解向多模态对话扩展的实例。

**先理解视频表征，再碰视频生成。** 否则容易把闪烁、抖动和身份漂移误认为单纯的采样问题——它们往往是时序表征缺失导致的。

---

## 16. 语音与音频

音频生成分两条主线：**「谱预测 + 声码器」**（训练稳定）与**「端到端波形生成」**（对自回归建模理解更直接）。少样本语音克隆则是当下最活跃的社区入口。

**识别（ASR）**

- [xiabingquan/Automatic-Speech-Recognition-from-Scratch](https://github.com/xiabingquan/Automatic-Speech-Recognition-from-Scratch) — 端到端 ASR：音频特征、字符/BPE tokenizer、Transformer ASR、greedy/beam search。
- [yg211/SpeechRecognitionModelsFromScratch](https://github.com/yg211/SpeechRecognitionModelsFromScratch) — LAS 与 Deep Speech 2 两条经典路线并存，便于比较 CTC 与注意力的对齐方式。

**合成（TTS）与声码器**

- [keithito/tacotron](https://github.com/keithito/tacotron) — Tacotron 序列到序列 TTS：文本编码、注意力对齐、梅尔谱生成，配合声码器就是完整 TTS 链路。 🔥
- [jik876/hifi-gan](https://github.com/jik876/hifi-gan) — HiFi-GAN 官方实现：多周期与多尺度判别器、反卷积波形合成，用对抗训练换高保真与速度。 🔥
- [fatchord/WaveRNN](https://github.com/fatchord/WaveRNN) — WaveRNN 自回归波形生成，展示逐样本递归声码器在速度、量化与音质间的权衡。 🧩
- [ibab/tensorflow-wavenet](https://github.com/ibab/tensorflow-wavenet) — WaveNet 的扩张因果卷积逐样本生成音频，是神经音频生成的原型。 ⚠️
- [coqui-ai/TTS](https://github.com/coqui-ai/TTS) — 把 Tacotron、Glow-TTS、VITS、HiFi-GAN 等组件模块化，可做训练、推理、语音克隆与多语言流程。 🔥
- [RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) — 少样本 TTS 与语音转换：5 秒语音零样本 TTS、1 分钟微调，是语音克隆工程实现的重要代表。 🆕🔥
- [microsoft/SpeechT5](https://github.com/microsoft/SpeechT5) — 统一语音—文本预训练框架：共享语音/文本表示 + 编码器—解码器 + 跨模态任务头。

**学习顺序**：梅尔谱 → 声码器 → 时长建模 → 说话人Embedding → 少样本微调。语音活动检测（VAD）方向专门的小而完整实现较少，建议从 WebRTC VAD、speechbrain 的可训练模块入手，而不是把通用 ASR 仓库当成从零实现。

---
---

# Part IV · 方法论与横向能力

## 17. 生成式模型的其他范式

扩散之外的生成范式（VAE、Normalizing Flow、StyleGAN、快速采样器）仍是理解「潜空间怎么建、采样为什么慢」的必修课。

**扩散与采样器**

- [CompVis/denoising-diffusion-pytorch](https://github.com/CompVis/denoising-diffusion-pytorch) — 小型 DDPM：前向加噪、反向去噪、噪声调度与训练损失，结构清晰适合第一个扩散项目。 🧩📓
- [lucidrains/denoising-diffusion-pytorch](https://github.com/lucidrains/denoising-diffusion-pytorch) — 模块化扩散：可替换主干、条件机制与采样器，适合做组件实验。 🧩🔥
- [Jayluci4/micro-diffusion](https://github.com/Jayluci4/micro-diffusion) — 最少代码讲清楚加噪与去噪（[§4](#4-自然语言处理) micro 系列）。 🧩🆕

**GAN 进阶**

- [rosinality/stylegan2-pytorch](https://github.com/rosinality/stylegan2-pytorch) — StyleGAN2 的 PyTorch 实现：风格调制、噪声输入、路径长度正则化。 ⚙️
- [NVlabs/stylegan2](https://github.com/NVlabs/stylegan2) — StyleGAN2 官方 TensorFlow 实现：映射网络、生成器与判别器细节的原始参考。 ⚠️
- [NVlabs/stylegan3](https://github.com/NVlabs/stylegan3) — alias-free StyleGAN3：研究信号混叠、平移旋转等变性，解释生成器坐标系与采样缺陷。 ⚙️
- [lucidrains/stylegan2-pytorch](https://github.com/lucidrains/stylegan2-pytorch) — 精简可用的 StyleGAN2 实现，工程复杂度低于官方版本，适合快速理解风格空间与解耦。 🧩

**图像复原与超分**

- [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) — 真实世界退化建模 + ESRGAN 超分训练推理，是传统插值之外的重要深度学习对照。 🔥
- [cszn/KAIR](https://github.com/cszn/KAIR) — 去噪、去模糊、超分与图像复原的训练框架，把经典复原问题模块化。

> **空缺提醒**：专门从零实现 **VAE / Normalizing Flow / 能量模型** 的高质量教学仓明显偏少。调研中只找到「使用了 Flow 的模型」，而非「把 Flow 从零写出来」的仓库，因此此处**没有为了凑数而收录**。这是最欢迎 PR 的方向之一。

---

## 18. 自监督与表示学习

自监督的可比点不只是增强或掩码策略，而是**线性探测、kNN、微调数据量与下游泛化**。这一方向的共同问题是：不需要标签时，你用什么证明自己学到了东西？

- [google-research/simclr](https://github.com/google-research/simclr) — SimCLR v2 官方实现：数据增强、对比损失、投影头与半监督评测，对比学习的标准起点。 🔥📓
- [facebookresearch/mae](https://github.com/facebookresearch/mae) — MAE 官方 PyTorch 实现：高比例随机掩码、非对称编码器—解码器、像素重建目标。 🔥
- [automl/metassl](https://github.com/automl/metassl) — BYOL 的可用 PyTorch 封装：无负样本对也能自监督，适合研究目标网络、预测器与动量更新的角色。
- [yann-ducq/barlowtwins](https://github.com/yann-ducq/barlowtwins) — Barlow Twins 的互相关矩阵冗余减少损失，可与 SimCLR/BYOL 对照理解「负样本是否必要」。 🧩
- [lucidrains/DINO-pytorch](https://github.com/lucidrains/DINO-pytorch) — 可读的自蒸馏无标签视觉预训练：教师—学生网络、中心化与 Sinkhorn 正则化。 🧩

**对照学习建议**：把 SimCLR（靠负样本）、BYOL（靠动量目标网络）、Barlow Twins（靠冗余减少）、MAE（靠重建）、DINO（靠自蒸馏）放在一起，你会发现它们只是用五种不同方式回答同一个问题——**如何在没有标签时防止表示坍缩**。

---

## 19. 可解释性、可视化与 AI 安全

这一方向的成熟项目不再只画显著性图，而是同时关注**解释稳定性、扰动鲁棒性、隐私预算、分组偏差与攻击面**。

**可视化与归因**

- [poloclub/transformer-explainer](https://github.com/poloclub/transformer-explainer) — 浏览器里运行 GPT-2 并逐步可视化 token 嵌入、注意力、前向传播与输出概率，把 Transformer 从公式变成可以点开看的东西。 🔥🧩
- [jacobgil/pytorch-grad-cam](https://github.com/jacobgil/pytorch-grad-cam) — 用 PyTorch 钩子实现 Grad-CAM、HiResCAM、LayerCAM 等，可直接观察 CNN 与视觉 Transformer 的判别区域。
- [TinyZombie/DeepInversion](https://github.com/TinyZombie/DeepInversion) — 通过优化输入重建特征，可视化网络学到的表征，理解特征空间、重建与可视化之间的联系。

**鲁棒性与攻击**

- [Trusted-AI/adversarial-robustness-toolbox](https://github.com/Trusted-AI/adversarial-robustness-toolbox) — 实现 FGSM、PGD、Carlini & Wagner 等攻击与对抗训练、认证防御，把鲁棒性从概念变成可运行实验。 ⚙️
- [bethgelab/robustness](https://github.com/bethgelab/robustness) — ImageNet 鲁棒性基准与训练评估工具，可复现模型在常见扰动与分布偏移下的泛化差距。

**隐私、公平与 LLM 安全**

- [pytorch/opacus](https://github.com/pytorch/opacus) — 用 PyTorch 训练钩子实现差分隐私 SGD（DP-SGD），可观察梯度裁剪、噪声注入与隐私预算的计算过程。 ⚙️
- [fairlearn/fairlearn](https://github.com/fairlearn/fairlearn) — 分组准确率、机会均等差、选择率等公平性度量与缓解算法，学会量化偏差而不是只报单一准确率。
- [NVIDIA/garak](https://github.com/NVIDIA/garak) — 用可插拔探针自动对 LLM 做越狱、提示注入与数据泄漏红队测试。 🆕⚙️
- [protectai/rebuff](https://github.com/protectai/rebuff) — 通过启发式、向量检索与 LLM 检测实现多层提示注入防护，可研究检测器串联方式与误报代价。 🆕

**学习建议**：把归因图与删除/插入指标、对抗成功率、隐私损失、公平性差距放在同一个实验里评估，不要孤立地看热图。生产安全场景应优先审查维护活跃、许可证明确的工具。

**延伸：工业级对照实现**
- [pytorch/captum](https://github.com/pytorch/captum) — Integrated Gradients、Saliency、DeepLIFT 等归因算法的统一实现，是理解归因接口与假设的参考。
- [PAIR-code/lit](https://github.com/PAIR-code/lit) — 模型无关的交互式可视化工作台。

---

## 20. 时间序列与表格数据

**表格与时序学习的关键不是模型数量，而是时间正确性。** 预测实验必须固定滚动切分、防止未来信息泄漏，并报告分位损失或校准度，不能只报平均 MAE。

**树模型从零（梯度提升的数学）**

- [alexoh2bd/xgboost-scratch](https://github.com/alexoh2bd/xgboost-scratch) — 手动实现一阶梯度、二阶 Hessian、分裂增益、缺失值处理与正则化，逐行对应 GBDT/XGBoost 的数学对象。 🧩
- [eriklindernoren/ML-From-Scratch](https://github.com/eriklindernoren/ML-From-Scratch) — 仅依赖 NumPy 的 GBDT 实现，支持自定义 loss、梯度、Hessian 与正则参数（[§1](#1-聚合与学习路线)）。 🧩

**时序预测**

- [facebook/prophet](https://github.com/facebook/prophet) — Prophet 官方实现：加法季节项、变点、节假日项与 Stan/MCMC 或 MAP 拟合，研究趋势—季节分解的可解释预测。
- [Nixtla/statsforecast](https://github.com/Nixtla/statsforecast) — 高性能实现 ARIMA、ETS、Theta 等经典统计方法，适合理解状态空间与季节差分。 ⚙️
- [Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast) — N-BEATS、NHITS、TFT、PatchTST 等深度时序架构，研究多变量、外生变量与滚动窗口训练。 ⚙️
- [unit8co/darts](https://github.com/unit8co/darts) — ARIMA、Kalman Filter、TCN、N-BEATS、Transformer、TFT 与概率预测接口，便于比较统计方法与深度模型的数据契约。
- [ourownstory/neural_prophet](https://github.com/ourownstory/neural_prophet) — 用 PyTorch 重写 Prophet 式可分解模型并加入自回归分量。 🧩
- [mingkai-zheng/time-series-anomaly-detection-benchmark](https://github.com/mingkai-zheng/time-series-anomaly-detection-benchmark) — 统计、自编码器、预测残差与上下文感知异常检测方法及基准，理解点异常与区间异常的评价差异。 ⚙️

**建议路径**：先用纯 NumPy 推导一遍梯度提升，再去读官方 C++ 实现，否则只会停留在调参层面。

**延伸：工业级对照实现**
- [dmlc/xgboost](https://github.com/dmlc/xgboost) — 目标函数二阶近似、树生长、直方图/外部内存与分布式训练的工业优化，是高阶「从零读懂」材料。
- [microsoft/LightGBM](https://github.com/microsoft/LightGBM) — 基于直方图的 leaf-wise 生长、GOSS 与 EFB。
- [catboost/catboost](https://github.com/catboost/catboost) — 有序提升与类别特征处理、对称树与 GPU 训练。

---

## 21. 搜索、推荐与信息检索

**高质量检索的难点已从「找到相似向量」转向多路融合与证据评测。** 真正的闭环必须有问题—文档标注集，同时报告 Recall@k、MRR/NDCG 和端到端答案正确性。

**索引与评分函数（从零）**

- [jiantu/inverted-index](https://github.com/jiantu/inverted-index) — 从文档编码、词项归约到倒排表构建与查询处理，可观察压缩与查询优化的起点。 🧩
- [joaooliveirachats/mini-index](https://github.com/joaooliveirachats/mini-index) — 极简倒排索引：文档分析、词典/倒排列表与布尔或排名查询。 🧩
- [marti1125/BM25](https://github.com/marti1125/BM25) — 用公式直接计算 IDF、词频饱和与文档长度归一化，把 BM25 从黑箱评分变成可审计函数。 🧩
- [sultan/tfidf](https://github.com/sultan/tfidf) — TF-IDF 统计、文档向量化与相似度计算，与 BM25 对照理解「词频是否饱和、长度如何惩罚」。 🧩
- [jbmusso/information-retrieval](https://github.com/jbmusso/information-retrieval) — 汇集倒排索引、向量空间模型、BM25、PageRank 与查询扩展的教学实现。 📓

**排序与推荐**

- [rom1504/rerankers](https://github.com/rom1504/rerankers) — 统一封装 Cross-Encoder、ColBERT 等重排模型，研究 query-document 交互计算为何在粗排之后执行。
- [maciejkula/spotlight](https://github.com/maciejkula/spotlight) — PyTorch 实现隐式反馈矩阵分解与序列推荐，理解召回/排序两阶段与负采样设计。 🧩
- [jasper7c/RecommenderSystem](https://github.com/jasper7c/RecommenderSystem) — User/Item CF、SVD、LightGCN、NGCF、内容推荐与评测，一个仓库覆盖经典到图推荐。
- [wins-wang/recommender-systems-from-scratch](https://github.com/wins-wang/recommender-systems-from-scratch) — 章节化 Notebook：回归基线、协同过滤、KNN、Top-N、内容推荐。 📓

> 向量检索与 ANN 索引（HNSW/IVF/PQ）见 [§6.3 向量数据库与记忆](#63-向量数据库与记忆)。

**延伸：工业级对照实现**
- [apache/lucene](https://github.com/apache/lucene) — 倒排索引、段、评分与查询执行的真实工业实现。
- [facebookresearch/faiss](https://github.com/facebookresearch/faiss) — 向量检索工业标准，含 IVF、PQ、HNSW 等索引。

---

## 22. 图计算、图神经网络与知识图谱

**图项目的趋势是把「算法演示」升级为可查询、可评估的知识系统。** 学习时要特别区分图结构泄漏（随机分割造成的测试泄露）与真实的 inductive/dynamic graph 假设。

**图神经网络从零**

- [Samanvith1404/GNN-From-Scratch](https://github.com/Samanvith1404/GNN-From-Scratch) — 自带微型 autograd，把图卷积写成 `(A @ X @ W)`，从矩阵形式理解消息传递。 🧩
- [HamzaGbada/GCN-Numpy](https://github.com/HamzaGbada/GCN-Numpy) — GCN、GAT、GIN、GraphSAGE、MPNN 的 NumPy 实现，数学文档与代码目录一一对应。 🧩

**图算法从零**

- [ShubhamAggarwal6105/Link-Analysis-Of-Impression-Network](https://github.com/ShubhamAggarwal6105/Link-Analysis-Of-Impression-Network) — 随机游走 PageRank、Dijkstra 最短路径与缺失链路预测放在同一实验框架，用 NetworkX 手搓图算法。 🧩
- [pnnngch/shortest-path-visualizer](https://github.com/pnnngch/shortest-path-visualizer) — Dijkstra、A*、BFS 的可视化实现，理解启发式函数与优先队列如何改变搜索行为。 🧩
- [towardsai/networkx-community-detection](https://github.com/towardsai/networkx-community-detection) — Louvain 等社区发现教学实现，理解模块度优化与层次/重叠社区的表达差异。 🧩

**知识图谱与图嵌入**

- [pykeen/pykeen](https://github.com/pykeen/pykeen) — 从零提供 TransE、DistMult、ComplEx、RotatE 等图嵌入与链接预测训练/评测，理解负采样与过滤排名指标。 ⚙️
- [Accenture/AmpliGraph](https://github.com/Accenture/AmpliGraph) — 知识图谱嵌入训练与链接预测，研究实体关系表示、评分函数与知识补全评价。 ⚙️
- [microsoft/graphrag](https://github.com/microsoft/graphrag) — 从文档构建实体关系图、做社区检测与社区摘要，支持本地/全局搜索，是 GraphRAG 的端到端参考。 🆕⚙️
- [poppycoderr/TriplexRAG](https://github.com/poppycoderr/TriplexRAG) — 手搓融合 GraphRAG、LightRAG 与知识图谱构建（[§6.2](#62-rag-检索增强生成)）。 🆕

**延伸：工业级对照实现**
- [pyg-team/pytorch_geometric](https://github.com/pyg-team/pytorch_geometric) — 图卷积、消息传递、邻居采样与异构图。
- [dmlc/dgl](https://github.com/dmlc/dgl) — 消息传递 API、图采样与分布式训练。
- [snap-stanford/ogb](https://github.com/snap-stanford/ogb) — 图任务标准化数据集与评测，阅读其切分方式可避免信息泄漏。

---

## 23. 元学习、少样本与持续学习

这些范式的共同难题是**如何评估「学会学习」本身**：MAML 要分清任务内适配与跨任务泛化；持续学习必须报告遗忘与正向迁移，不能只看最终平均精度。

**元学习与少样本**

- [tristandeleu/pytorch-meta](https://github.com/tristandeleu/pytorch-meta) — episode 任务采样、few-shot 数据集与 MAML/ProtoNets 组件，理解 support/query 切分与二阶梯度。 🧩
- [dragen1860/MAML-Pytorch](https://github.com/dragen1860/MAML-Pytorch) — 可读的 MAML 实现，便于跟踪内层/外层循环的参数更新。 🧩
- [oscarknagg/few-shot-learning](https://github.com/oscarknagg/few-shot-learning) — 汇总 Matching Networks、Prototypical Networks、Relation Networks 与 MAML，横向比较度量学习与优化式元学习。 🧩
- [AntreasAntoniou/HowToTrainYourMAMLLines](https://github.com/AntreasAntoniou/HowToTrainYourMAMLLines) — MAML 复现实验与调试经验，讲清二阶梯度、inner-loop 步数与常见训练失败原因。 📓

**持续学习、主动学习与课程学习**

- [Continvvm/continual_learning_benchmark](https://github.com/Continvvm/continual_learning_benchmark) — 持续学习基准、任务协议与评测方法，把遗忘从主观描述转化为可计算指标。 ⚙️
- [modAL-python/modAL](https://github.com/modAL-python/modAL) — 模块化主动学习框架，可观察查询策略如何在迭代标注—训练循环中落地。 🧩
- [wang-chen/active-learning](https://github.com/wang-chen/active-learning) — 不确定性采样、委员会查询与多样性采样策略集合，理解标注预算有限时怎么选样本。 📓
- [deepmind/curriculum-learning](https://github.com/deepmind/curriculum-learning) — 课程学习实验复现，研究任务难度排序与训练课程。 📓

---

## 24. 强化学习、决策与具身智能

**学习顺序应是「算法正确性 → 仿真可复现 → 控制可部署」。** 玩具任务足以验证算法，但真机部署还要验证延迟、安全约束、控制器频率、观测噪声与 sim-to-real 差异。

**强化学习算法**

- [Adam-Mazur/ppo-from-scratch](https://github.com/Adam-Mazur/ppo-from-scratch) — PyTorch 从零实现 PPO，训练 CNN 智能体玩 Pong 与 CartPole，含配置与训练脚本。 🧪🆕
- [oussamakharouiche/PPO-Implementation](https://github.com/oussamakharouiche/PPO-Implementation) — 带 clip objective、GAE、Wandb 与 checkpoint 的 PPO，实验可复现性更好。 🧪
- [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) — 单智能体 RL 环境 API 与经典环境标准，是自己写 RL 算法时的训练场。 ⚙️🔥
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — PPO、SAC、TD3、A2C 的参考实现，适合对照检查自己的 rollout、replay buffer 与目标网络写对了没有。 ⚙️

**搜索与博弈决策**

- [suragnair/alpha-zero-general](https://github.com/suragnair/alpha-zero-general) — 简洁代码把 AlphaZero 适配到棋类与其他游戏：MCTS + 策略/价值头 + 自对弈训练，理解搜索与学习如何结合。 🔥🧩
- [junxiaosong/AlphaZero_Gomoku](https://github.com/junxiaosong/AlphaZero_Gomoku) — 五子棋 AlphaZero 与 MCTS，模型小、代码可读，适合从完整可训练 Demo 入手。 🧩
- [peter-ch/MCTS](https://github.com/peter-ch/MCTS) — MCTS 的选择、扩展、模拟与回溯的可读实现，是 AlphaZero 的最小算法骨架。 🧩
- [int8/monte-carlo-tree-search](https://github.com/int8/monte-carlo-tree-search) — MCTS 核心流程 + Tic-Tac-Toe 示例，理解 UCB 探索与模拟预算如何决定搜索质量。 🧩

**规划、SLAM 与控制**

- [AtsushiSakai/PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics) — A*、Dijkstra、RRT、RRT*、卡尔曼滤波、MPC、SLAM 等算法的 Python 实现集合，具身智能数学基础最完整的学习仓库。 🔥🎓
- [StevenShiChina/SLAM-algorithms-from-scratch](https://github.com/StevenShiChina/SLAM-algorithms-from-scratch) — 从零实现 SLAM 的滤波、优化与地图构建组件，理解状态估计、观测模型与位姿图优化的关系。 ⚙️
- [gaoxiang12/slambook2](https://github.com/gaoxiang12/slambook2) — 《视觉 SLAM 十四讲》配套代码：非线性优化、BA、光流、直接法与数据集实验。 📖
- [ompl/ompl](https://github.com/ompl/ompl) — 开源运动规划库：RRT、RRT*、PRM、EST 等采样规划器，研究高维配置空间与碰撞约束下的规划。 ⚙️
- [google/brax](https://github.com/google/brax) — 可微物理仿真库，研究快速并行仿真、梯度感知控制与 sim-to-real 的物理建模假设。 ⚙️
- [huggingface/lerobot](https://github.com/huggingface/lerobot) — 机器人学习工具库：数据集、策略、模仿学习与 RL 训练流程，代表 2024–2026 机器人策略的工程标准化。 🆕⚙️

---

## 25. 数据工程、评测与实验基础设施

**工程基础设施的价值在于把「模型能跑」升级为「结果可复现」。** 从零实现在这里不该重复造轮子，而是要理解数据流、状态管理与评测契约。

**最小实现**

- [karpathy/nanochat](https://github.com/karpathy/nanochat) — 面向聊天模型的小型训练工程，能看清 tokenizer、数据整理、训练循环与推理的最小闭环（[§5.2](#52-现代架构与推理)）。 ⚙️🆕
- [homebrewdata/how-to-stream-datasets](https://github.com/homebrewdata/how-to-stream-datasets) — 演示大模型训练数据的流式读取、分片、打乱与确定性采样，理解单机 batch 加载之外的数据扩展思路。 🧩🆕
- [google-research/deduplicate-text-datasets](https://github.com/google-research/deduplicate-text-datasets) — 文本去重方法与工具，理解 MinHash/LSH、精确重复与近似重复对 LLM 训练质量的影响。 ⚙️

**评测与数据质量**

- [openai/evals](https://github.com/openai/evals) — 模型评测框架：任务注册、运行器与结果报告，学习评测集切分、提示、评分器的工程抽象。 ⚙️
- [SalesforceAIResearch/judgebench](https://github.com/SalesforceAIResearch/judgebench) — LLM-as-judge 基准与实验，研究位置偏差、模型偏差、评分一致性与人工标签校准。 🆕⚙️
- [dakshjain-1616/synthetic-data-flywheel](https://github.com/dakshjain-1616/synthetic-data-flywheel) — 合成数据飞轮：生成 → 模式/去重/PII 校验 → LLM-as-judge → 人工校准 → 失败样本回流，代表 2025 年后数据工程的新形态。 🆕⚙️

**关键认知**：流式管线要验证 shuffle/checkpoint 正确性；特征存储要区分训练特征与在线服务特征；LLM-as-judge 必须设置盲评、人工校准与不确定性阈值。

**延伸：工业级对照实现**
- [huggingface/datasets](https://github.com/huggingface/datasets) — Arrow 内存映射、流式数据集、映射缓存与多进程 shard，是理解生产级 DataLoader 的重要材料。
- [mlflow/mlflow](https://github.com/mlflow/mlflow) — 参数、代码版本、指标、模型与制品追踪。
- [ray-project/ray](https://github.com/ray-project/ray) — 分布式执行框架，数据并行、远程任务、Actor 与集群调度。

---

## 26. 数值计算与科学智能

这一方向对数值正确性极其敏感：广播、stride、浮点误差、条件数、收敛判据与边界条件都可能让结果「看起来对但实际失效」。**最低标准是：有误差界、有对照、有边界测试。**

**张量库与线性代数**

- [Madhavyamjala/potatonumpy](https://github.com/Madhavyamjala/potatonumpy) — 纯 Python 的线性代数与张量库：matmul 写成三重循环、determinant 写成递归余子式。**慢是特色** —— 与 NumPy 的巨大性能差就是这一课的内容。 🧩🆕
- [kevinzakka/learn-linalg](https://github.com/kevinzakka/learn-linalg) — 复现 Gaussian elimination、LU/PLU/PLUQ、Cholesky、QR、SVD 与迭代求解，并与 NumPy/SciPy 对照测试，直接看到 pivot 与正交化如何改变稳定性。 🧩
- [dpilger26/NumCpp](https://github.com/dpilger26/NumCpp) — header-only 的 NumPy 风格 C++ 库，研究 C++ 如何既保持类型安全又提供 Python 式调用。 ⚙️

**优化器与求解器**

- [anaslimem/Optimizers-from-scratch](https://github.com/anaslimem/Optimizers-from-scratch) — 不用 autograd，手动 forward/backward + SGD/Momentum/RMSProp/Adam/AdamW + 学习率 schedule + 有限差分梯度检查，构成约 1e-6 容差内的闭环。 🧩
- [ultimaille/stlbfgs](https://github.com/ultimaille/stlbfgs) — 仅用 C++ STL 的 L-BFGS：Moré-Thuente 线搜索、历史向量乘与单元测试。 🧩⚙️
- [rlabbe/filterpy](https://github.com/rlabbe/filterpy) — 卡尔曼、扩展卡尔曼、无迹卡尔曼等状态估计算法的从零实现，机器人与科学计算方向。 ⚙️

**AI for Science**

- [TheodoreWolf/pinns](https://github.com/TheodoreWolf/pinns) — 用 PyTorch 把 PDE 残差与初边值条件写进 loss，从零求解偏微分方程。 📓
- [nonlinear-vibes/ODEs-and-solvers-in-Python](https://github.com/nonlinear-vibes/ODEs-and-solvers-in-Python) — 手写 ODE 求解器，用 van der Pol、Lotka–Volterra、三体、SIR 等模型展示同一求解器框架如何跨问题复用。 🧩

**图形与仿真（数值方法的可视化练兵场）**

- [zauonlok/renderer](https://github.com/zauonlok/renderer) — C89 从零实现软件渲染器，理解 NeRF、扩散渲染等图形学前置知识。 ⚙️
- [PavelDoGreat/WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) — 浏览器里的流体模拟，说明「from scratch」也包括数值模拟与微分方程。 ⚙️🔥

> **PINN 的检查要点**：PDE 残差、初始/边界条件、数据项与训练集外泛化要分开检查，不能把训练 loss 下降等同于方程被正确求解。

---
---

## 27. 趋势观察（2025–2026）

**① 重心从「模型玩具」转向「可训练、可推理、可对齐的现代小模型」。**
经典项目解决「什么是 Transformer」，新项目继续追问：如何用 RoPE、RMSNorm、GQA、MoE 搭现代架构，怎么做 LoRA、DPO、GRPO，怎么在消费级 GPU 上训出能对话的模型。标志是教材化（`LLMs-from-scratch`）、全栈化（`minimind`）与系统化（`llm.c`、`nanochat`）三条路线同时成熟。

**② 从零实现的重心正在从「模型层」下沉到「系统层」。**
分布式并行、量化、编译器、算子、端侧推理这些方向的优质教学仓在过去两年增长最快。原因是模型结构已相对标准化，而**「怎么让它跑得快、放得下、训得动」成了新的知识差**。这也是本次扩章的主要来源。

**③ 新项目普遍采用「短说明 + 可执行 Notebook + 测试 + 架构图 + 博客/视频」的组合。**
纯 README 的仓库影响力在下降；micro-* 系列那种「一个概念、几百行、独立可跑」的形态最适合碎片化学习。

**④ 多模态的瓶颈已从模型结构转向数据、表示与训练闭环。**
VLM 要图文配对，3D 要相机位姿与 SfM，视频要时序压缩，音频要说话人条件。`nanoVLM` 这种「750 行训一个 222M VLM」的项目之所以爆红，正是因为它把闭环压到了个人能承受的规模。

**⑤ 高性能与科学计算项目的最低标准是「正确性 + 基准 + 对照」。**
一个 FlashAttention 教学仓库若只有 kernel，没有 CPU 参考、误差阈值和序列长度基准，学习者无法判断优化是否真的成立。数值方向则必须有误差界和边界测试。

**⑥ 三个方向仍然明显缺货，也是最值得贡献 PR 的地方：**
- **Agent 的记忆机制、评测与可观测性**（Agent 仓库数量增长最快，但这几块最薄弱）
- **独立的 RLHF/DPO 从零实现**（目前几乎只有教材章节）
- **VAE / Normalizing Flow / 能量模型的教学实现**（只找到「用了 Flow 的模型」，没找到「把 Flow 写出来」的仓库）

---

## 贡献与许可

欢迎提 PR 补充仓库，但请遵守（详见 [CONTRIBUTING.md](从零实现AI/CONTRIBUTING.md)）：

1. **必须真实存在**：`owner/repo` 能打开，README 能确认它在从零实现什么。
2. **不写 star 数**：改用标签。
3. **一句话说清价值**，不要复制项目简介。
4. **放到正确的层级**：NLP 讲表示/序列，LLM 讲架构/训练/推理/对齐；「最小 ReAct 玩具」与「可评测多智能体」分开；生产级框架只能进「延伸：工业级对照实现」。

- 收录标准与 PR 模板：[CONTRIBUTING.md](从零实现AI/CONTRIBUTING.md)
- 五条学习路线（CV / LLM / Agent / 系统 / 多模态）：[LEARNING_PATH.md](从零实现AI/LEARNING_PATH.md)

本项目内容以 **MIT License** 发布，各收录仓库的许可请以其自身仓库为准。

---

<sub>清单内容整理于 2026 年 10 月，共 26 章、250+ 条目。所有条目的 owner/repo 均经过存在性核验，`star` 字段以形态标签替代。若发现链接失效或项目归档，欢迎直接提 Issue。</sub>