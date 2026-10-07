---
title: 从零实现AI
date: 2026-10-07
tags: xxx-from-scratch
---

# Awesome From Scratch — AI 从零实现清单

<p align="center">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green.svg">
  <img alt="topics" src="https://img.shields.io/badge/topics-AI%20%2F%20CV%20%2F%20NLP%20%2F%20LLM%20%2F%20Agent-blue.svg">
  <img alt="lang" src="https://img.shields.io/badge/lang-Python%20%2F%20C%20%2F%20CUDA%20%2F%20Rust-orange.svg">
  <img alt="updated" src="https://img.shields.io/badge/updated-2026--10-lightgrey.svg">
</p>

> 一份**「不讲原理，先把手弄脏」**的 AI 开源清单。
> 收录的项目不教你 `pip install` 之后怎么调 API，而是把**反向传播、注意力、Tokenizer、KV Cache、ReAct 循环、HNSW** 这些黑盒逐行拆开重写一遍。

本清单覆盖 **机器学习基础 / 自动微分 / 计算机视觉 / 自然语言处理 / 大语言模型 / Agent 与检索 / 强化学习 / 高性能算子** 七大方向，目前收录 **110+** 个可从零复现的仓库。

---

## 收录标准

一个仓库要进这份清单，至少要满足下面两条：

1. **真的从零写**：核心算法或系统由作者手写实现，而不是对 `torch.nn` / `langchain` 的一层薄封装。
2. **看得懂**：有 README、注释、配套博客 / 视频 / Notebook，能让人理解「为什么这么写」，而不只是「跑通了」。

不收录：纯调库教程、只有 PPT 没有代码的资料站、已 5 年无更新的镜像仓库（历史价值极高的经典项目除外，会显式标注）。

## 关于 star 数

**这份清单刻意不写 star 数字。** star 会随时间快速变化，而且大量中长尾仓库的 star 无法稳定核验，写上去只会制造过期信息。作为替代，每个条目用标签标明它的**形态**和**人气量级**：

| 标签 | 含义 |
| :--- | :--- |
| 🔥 | 社区公认的高人气项目（万星级量级） |
| 🧩 | 极简实现，核心代码通常在几百行以内 |
| 🧪 | 可训练：单张消费级 GPU 就能跑完 |
| 📖 | 书籍配套代码 |
| 🎓 | 系统课程，有分章/分课结构 |
| 📓 | 以 Jupyter Notebook 讲解 |
| ⚙️ | 偏系统：推理引擎、算子、编译器、CUDA |
| 🆕 | 2025 年之后新建或仍在活跃更新的项目 |
| ⚠️ | 经典但偏旧，API / 依赖需要自行迁移 |

---

## 目录

- [Awesome From Scratch — AI 从零实现清单](#awesome-from-scratch--ai-从零实现清单)
  - [收录标准](#收录标准)
  - [关于 star 数](#关于-star-数)
  - [目录](#目录)
  - [新手起步：9 个先看的仓库](#新手起步9-个先看的仓库)
  - [1. 聚合与学习路线](#1-聚合与学习路线)
  - [2. 机器学习与深度学习基础](#2-机器学习与深度学习基础)
    - [2.1 自动微分与微缩框架](#21-自动微分与微缩框架)
  - [3. 计算机视觉](#3-计算机视觉)
  - [4. 自然语言处理](#4-自然语言处理)
  - [5. 大语言模型](#5-大语言模型)
    - [5.1 Transformer 与 GPT 训练](#51-transformer-与-gpt-训练)
    - [5.2 现代架构与推理](#52-现代架构与推理)
    - [5.3 微调、对齐与强化学习](#53-微调对齐与强化学习)
    - [5.4 推理引擎、算子与 CUDA](#54-推理引擎算子与-cuda)
  - [6. Agent 与检索](#6-agent-与检索)
    - [6.1 Agent 循环与工具调用](#61-agent-循环与工具调用)
    - [6.2 RAG 检索增强生成](#62-rag-检索增强生成)
    - [6.3 向量数据库与记忆](#63-向量数据库与记忆)
    - [6.4 MCP 与工具协议](#64-mcp-与工具协议)
    - [6.5 多智能体、工作流与评测](#65-多智能体工作流与评测)
  - [7. 其他方向：RL / 图 / 语音 / 推荐 / 科学计算](#7-其他方向rl--图--语音--推荐--科学计算)
  - [8. 趋势观察（2025–2026）](#8-趋势观察20252026)
  - [学习路线](#学习路线)

---

## 新手起步：9 个先看的仓库

不知道从哪下手，就按这个顺序走。三条路线分别对应「基础 → 大模型 → 智能体」。

| 阶段 | 推荐仓库 | 你会得到什么 |
| :--- | :--- | :--- |
| ① 自动微分 | [karpathy/micrograd](https://github.com/karpathy/micrograd) | 几百行代码看懂计算图与反向传播 🔥🧩 |
| ② 神经网络 | [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | 从 MLP 一路写到 GPT，配视频 🔥🎓 |
| ③ 深度学习体系 | [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) | 中文教材，理论 + 可运行代码 🔥📖 |
| ④ 大模型（首选） | [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 逐章手写 GPT：数据 → 预训练 → 微调 📖🔥 |
| ⑤ 大模型（系统视角） | [karpathy/llama2.c](https://github.com/karpathy/llama2.c) | 一个 C 文件跑完 Llama 推理 🔥🧩 |
| ⑥ 大模型（全栈） | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 低成本训一个能对话的小模型 🧪🔥 |
| ⑦ Agent 入门 | [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) | 18 节课，从工具调用讲到多智能体 🎓 |
| ⑧ Agent 手写 | [sanzgiri/ai-agents-from-scratch](https://github.com/sanzgiri/ai-agents-from-scratch) | 不用框架、本地 LLM 手写 Agent 🆕🧩 |
| ⑨ 检索与向量库 | [SriPrarabdha/vector_db_from_scratch](https://github.com/SriPrarabdha/vector_db_from_scratch) | 纯 C++ 手写 HNSW / IVF / PQ ⚙️ |

---

## 1. 聚合与学习路线

这一节不是单一模型实现，而是把「从零实现」本身作为组织方式的清单、教材与课程。适合当作整份清单的入口。

- [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) — 从零重建一切的元清单：数据库、操作系统、编译器、网络、渲染，也包含 AI 相关条目。这类清单的源头。 🔥
- [eriklindernoren/ML-From-Scratch](https://github.com/eriklindernoren/ML-From-Scratch) — 用 NumPy 从零实现线性回归、逻辑回归、决策树、聚类与浅层神经网络，最经典的「框架只是封装」证明。 🔥🧩
- [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) — 神经网络从零到英雄：micrograd → makemore（MLP/CNN/WaveNet）→ GPT + BPE，配套视频逐节对应。 🔥🎓
- [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) — 《动手学深度学习》中文版：从线性回归、MLP 到 Transformer，每个数学概念都配可运行代码。 📖🔥
- [d2l-ai/d2l-en](https://github.com/d2l-ai/d2l-en) — 英文原版，额外提供 PyTorch / JAX / TensorFlow / MXNet 多框架实现。 📖
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
- [rasbt/python-machine-learning-book-3rd-edition](https://github.com/rasbt/python-machine-learning-book-3rd-edition) — 《Python 机器学习》第三版配套 Notebook，从经典算法到深度学习，每格代码对应一个概念。 📓📖
- [chiphuyen/tf-stanford-tutorials](https://github.com/chiphuyen/tf-stanford-tutorials) — 斯坦福课程 TensorFlow 教程与练习，包含从零搭神经网络的内容。 ⚠️🎓

### 2.1 自动微分与微缩框架

想知道 `loss.backward()` 里面发生了什么，看这一节。

- [karpathy/micrograd](https://github.com/karpathy/micrograd) — 标量自动微分引擎 + 最小神经网络库，几百行讲透计算图、链式法则与反向传播。 🔥🧩
- [tinygrad/tinygrad](https://github.com/tinygrad/tinygrad) — 轻量张量计算、自动微分与多后端（CPU/GPU/Metal/CUDA）深度学习框架，可读性与工程野心兼具。 🔥⚙️
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
- [Jayluci4/micro-diffusion](https://github.com/Jayluci4/micro-diffusion) — micro 系列中的扩散模型，用最少代码讲清楚加噪与去噪。 🧩🆕
- [Scicrop/llm-vision-basics](https://github.com/Scicrop/llm-vision-basics) — 从 RNN/LSTM、注意力到 CNN 与 DDPM 的教学 Notebook，一个仓库串起 NLP/CV/扩散。 📓

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

**micro 系列：每个概念一个几百行的小仓库**（同一作者的 "Build AI From Scratch" 系列，纯 NumPy，适合作 NLP 的最小积木）

- [Jayluci4/micro-embedding](https://github.com/Jayluci4/micro-embedding) — Word2Vec/Skip-Gram 词向量，从共现到负采样逐一展示。 🧩🆕
- [Jayluci4/micro-rnn](https://github.com/Jayluci4/micro-rnn) — 最小 RNN 与训练循环，序列模型的 "Hello World"。 🧩🆕
- [Jayluci4/micro-lstm](https://github.com/Jayluci4/micro-lstm) — 最小 LSTM：遗忘门、输入门、输出门、候选状态拆开写。 🧩🆕
- [Jayluci4/micro-gru](https://github.com/Jayluci4/micro-gru) — 最小 GRU，适合与 micro-lstm 对比门控参数量差异。 🧩🆕
- [Jayluci4/micro-seq2seq](https://github.com/Jayluci4/micro-seq2seq) — 编码器—解码器结构，理解注意力为何被引入的关键一步。 🧩🆕
- [Jayluci4/micro-tokenizer](https://github.com/Jayluci4/micro-tokenizer) — 最小 BPE tokenizer，可与 minbpe 对照阅读。 🧩🆕
- [Jayluci4/micro-transformer](https://github.com/Jayluci4/micro-transformer) — 约 200 行的完整 Transformer：注意力 + FFN + LayerNorm + 残差，配架构图。 🧩🆕
- [jsbaan/transformer-from-scratch](https://github.com/jsbaan/transformer-from-scratch) — 带单元测试、类型检查的 vanilla Transformer，每个文件自带测试且配长文博客解释 7 个反直觉细节。 🧩

---

## 5. 大语言模型

LLM 是 from-scratch 最活跃的方向，分成四层：**教学型（解释算法）→ 系统型（解释执行）→ 现代训练栈（解释工程）→ 推理引擎（解释优化）**。

### 5.1 Transformer 与 GPT 训练

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — 《Build a Large Language Model (From Scratch)》配套代码：数据采样 → BPE → 注意力 → GPT → 预训练 → 分类微调 → SFT → LoRA → DPO，逐章可运行。目前最完整的教材级 LLM 代码库。 🔥📖
- [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) — 极简 GPT 训练/微调模板，可复现 GPT-2 124M，被无数项目当作起点。 🔥🧪
- [karpathy/minGPT](https://github.com/karpathy/minGPT) — 约 300 行的极简 GPT，nanoGPT 的前身，适合对照阅读。 ⚠️🧩
- [datawhalechina/happy-llm](https://github.com/datawhalechina/happy-llm) — 中文体系：Transformer → LLaMA 训练 → SFT → LoRA，配套 PDF/PPT。 📖🎓
- [raiyanyahya/how-to-train-your-gpt](https://github.com/raiyanyahya/how-to-train-your-gpt) — 现代 GPT 训练过程，逐行注释 + 概念解释，可当作 nanoGPT 的注释版。
- [theAIGuysCode/LLMTrainingFromScratch](https://github.com/theAIGuysCode/LLMTrainingFromScratch) — 小型 GPT 的训练、微调与部署拆成 Notebook，适合课堂演示。 📓
- [Jayluci4/micro-instruct](https://github.com/Jayluci4/micro-instruct) — 最小指令跟随 Transformer：RoPE、RMSNorm、合成指令数据、SFT，解释 GPT 如何变成能对话的模型。 🧩🆕

### 5.2 现代架构与推理

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) — 26M–64M 级 GPT：预训练、SFT、LoRA、DPO、蒸馏、MoE、多模态与推理服务全都在一个项目里，个人 GPU 可训。 🔥🧪
- [karpathy/llama2.c](https://github.com/karpathy/llama2.c) — 单文件纯 C 推理 Llama 2 / TinyLlama：权重加载、前向计算、采样、部署一次讲清。 🔥🧩
- [karpathy/llm.c](https://github.com/karpathy/llm.c) — 不依赖 PyTorch 的 GPT-2/GPT-3 训练，纯 C/CUDA，同时维护 PyTorch 对照实现用于验证数值一致性。 🔥⚙️
- [naklecha/llama3-from-scratch](https://github.com/naklecha/llama3-from-scratch) — 一个张量、一次矩阵乘地实现 Llama 3 8B 推理，从权重文件直接加载，是「逐行对照」式学习材料的代表。 📓
- [therealoliver/Deepdive-llama3-from-scratch](https://github.com/therealoliver/Deepdive-llama3-from-scratch) — 上者的增强版：补齐推导过程与代码注释，含 KV-Cache 推导与优化说明，中英双语文档。 📓
- [casinca/LLM-quest](https://github.com/casinca/LLM-quest) — 现代架构速查式实现：GPT-2、Llama 3.2、Qwen、MoE、DeepSeek MLA、ViT、DPO、GRPO、多模态。 🆕
- [NousResearch/llama.rs](https://github.com/NousResearch/llama.rs) — 用 Rust 从零推理 LLaMA，与 C 项目互补，展示内存安全语言的推理实现。 ⚙️
- [keyvank/femtoGPT](https://github.com/keyvank/femtoGPT) — Rust 生态里少见的最小 GPT 训练 + 推理实现，适合系统背景读者。 🧩⚙️

### 5.3 微调、对齐与强化学习

- [Jayluci4/micro-lora](https://github.com/Jayluci4/micro-lora) — 从矩阵分解视角解释 LoRA，避免把 PEFT 当黑盒。 🧩🆕
- [Jayluci4/micro-rlhf](https://github.com/Jayluci4/micro-rlhf) — 奖励模型、偏好优化与 RLHF 概念的最小实现，先理解目标函数再看 PPO/DPO 代码。 🧩🆕

> 说明：对齐方向的高质量「从零实现」目前仍集中在教材型仓库里（如 `LLMs-from-scratch` 的 DPO 章节、`minimind` 的 DPO/蒸馏），独立小仓库数量少、维护不稳定，因此本小节保持精简。有更好的推荐欢迎提 PR。

### 5.4 推理引擎、算子与 CUDA

- [vllm-project/vllm](https://github.com/vllm-project/vllm) — 生产级推理引擎：PagedAttention、KV Cache 管理、连续批处理、量化、OpenAI 兼容服务。不是教学项目，但源码 + 论文共同解释了推理优化的核心。 🔥⚙️
- [triton-lang/triton](https://github.com/triton-lang/triton) — GPU 编程与自定义算子语言/编译器，能看懂如何用更高层抽象写 FlashAttention 式算子。 ⚙️
- [srush/GPU-Puzzles](https://github.com/srush/GPU-Puzzles) — 用解谜的方式学 GPU 并行、内存层次与 CUDA，把高性能计算拆成可交互练习。 🔥🎓
- [sanket-pixel/flash-attention](https://github.com/sanket-pixel/flash-attention) — 单文件 FlashAttention：tiling、online softmax、SRAM 复用 + 性能基准。 ⚙️🧩
- [codingwithshawnyt/FlashAttention-CUDA](https://github.com/codingwithshawnyt/FlashAttention-CUDA) — 从零实现 FlashAttention 前向 kernel，含 CPU 参考测试、误差阈值与 benchmark。 ⚙️

> 高性能项目的判断标准是「正确性 + 基准 + 对比」三件套。只有 kernel 没有 baseline 和数值测试的仓库，即便自称高性能也不建议作为学习材料。

---

## 6. Agent 与检索

Agent 的难点从来不是调用模型，而是**循环、工具协议、状态、检索、记忆与评测**。请把「最小 ReAct 玩具」和「可评测的多智能体系统」区分看待——只有提示词模板和 API 调用的仓库，可以学思路，但不能当作工程实践。

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

### 6.3 向量数据库与记忆

- [SriPrarabdha/vector_db_from_scratch](https://github.com/SriPrarabdha/vector_db_from_scratch) — 纯 C++ 手写向量数据库：线性扫描、KD-Tree、IVF、IVF+PQ、HNSW、混合索引，不用 Faiss/Annoy。 ⚙️🆕
- [envy7/vectordb](https://github.com/envy7/vectordb) — 学习用向量库：Word2Vec 训练、余弦相似度检索、持久化与 embedding 可视化，解释生产向量库为何需要连续内存布局。 🧩

### 6.4 MCP 与工具协议

- [zahrafatima9432/mcp-toolbox](https://github.com/zahrafatima9432/mcp-toolbox) — 从零实现 MCP server + client：文档存储、网页搜索、安全计算器三个真实工具，客户端支持离线脚本与 LLM 双模式。 🆕🧩
- [dynstat/agents-mcp-clients](https://github.com/dynstat/agents-mcp-clients) — 最小可运行 MCP 示例：stdio server、文件工具、client session、工具发现与调用，讲清 JSON-RPC 与工具生命周期。 🧩🆕
- [priyanthan07/Agents_with_MCP](https://github.com/priyanthan07/Agents_with_MCP) — 多 Agent 研究系统：Web/ArXiv/多模态 Agent + MCP + Redis/ChromaDB + 冲突检测，附六篇配套博客。 🆕

### 6.5 多智能体、工作流与评测

- [NirDiamant/agents-towards-production](https://github.com/NirDiamant/agents-towards-production) — 从原型到生产：有状态工作流、RAG、向量记忆、MCP、A2A、Docker、FastAPI、可观测性、评测，Agent 工程化覆盖最全的教程之一。 🔥🎓
- [victordibia/designing-multiagent-systems](https://github.com/victordibia/designing-multiagent-systems) — 配套书籍的 PicoAgents 实现：工具、流式、工作流、编排、MCP、记忆、终止条件、评测与 Web UI，可与 LangGraph/AutoGen 对照。 📖🎓
- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) — 可运行的 Agent 蓝图合集：单 Agent、RAG、语音 Agent、MCP、多智能体、代码与浏览器应用。 🔥

---

## 7. 其他方向：RL / 图 / 语音 / 推荐 / 科学计算

「从零实现」的边界正在从模型层扩展到 AI 基础设施与科学计算。

**强化学习**

- [Adam-Mazur/ppo-from-scratch](https://github.com/Adam-Mazur/ppo-from-scratch) — PyTorch 从零实现 PPO，训练 CNN 智能体玩 Pong 和 CartPole，含配置文件与训练脚本。 🧪🆕
- [oussamakharouiche/PPO-Implementation](https://github.com/oussamakharouiche/PPO-Implementation) — 带 clip objective、GAE、Wandb 与 checkpoint 的 PPO，实验可复现性更好。 🧪

**图神经网络**

- [Samanvith1404/GNN-From-Scratch](https://github.com/Samanvith1404/GNN-From-Scratch) — 自带微型 autograd 的 GNN，把图卷积写成 `(A @ X @ W)`，从矩阵形式理解消息传递。 🧩
- [HamzaGbada/GCN-Numpy](https://github.com/HamzaGbada/GCN-Numpy) — GCN、GAT、GIN、GraphSAGE、MPNN 的 NumPy 实现，数学文档与代码目录一一对应。 🧩

**推荐系统**

- [jasper7c/RecommenderSystem](https://github.com/jasper7c/RecommenderSystem) — User/Item CF、SVD、LightGCN、NGCF、内容推荐与评测，一个仓库覆盖经典到图推荐。
- [wins-wang/recommender-systems-from-scratch](https://github.com/wins-wang/recommender-systems-from-scratch) — 章节化 Notebook：回归基线、协同过滤、KNN、Top-N、内容推荐。 📓

**语音**

- [xiabingquan/Automatic-Speech-Recognition-from-Scratch](https://github.com/xiabingquan/Automatic-Speech-Recognition-from-Scratch) — 端到端 ASR：音频特征、字符/BPE tokenizer、Transformer ASR、greedy/beam search。
- [yg211/SpeechRecognitionModelsFromScratch](https://github.com/yg211/SpeechRecognitionModelsFromScratch) — LAS 与 Deep Speech 2 两条经典路线并存，便于比较 CTC 与注意力的对齐方式。

**科学计算与图形**

- [rlabbe/filterpy](https://github.com/rlabbe/filterpy) — 从零实现卡尔曼滤波、扩展卡尔曼、无迹卡尔曼等状态估计算法，机器人与科学计算方向。
- [zauonlok/renderer](https://github.com/zauonlok/renderer) — C89 从零实现软件渲染器，是理解 NeRF、扩散渲染等图形学前置知识的好材料。 ⚙️
- [PavelDoGreat/WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) — 浏览器里的流体模拟，说明「from scratch」也包括数值模拟与微分方程，不只是模型。 🔥⚙️

---

## 8. 趋势观察（2025–2026）

**① 重心从「模型玩具」转向「可训练、可推理、可对齐的现代小模型」。**
经典项目解决「什么是 Transformer」，新项目继续追问：如何用 RoPE、RMSNorm、GQA、MoE 搭现代架构，怎么做 LoRA、DPO、GRPO，怎么在消费级 GPU 上训出能对话的模型。标志是教材化（`LLMs-from-scratch`）、全栈化（`minimind`）与系统化（`llm.c`）三条路线同时成熟。一份只收 2023 年前经典的清单，会错过这层明显的技术迁移。

**② 新项目普遍采用「短说明 + 可执行 Notebook + 测试 + 架构图 + 博客/视频」的组合。**
纯 README 的仓库影响力正在下降。micro-* 系列那种「一个概念、几百行、独立可跑」的形态尤其适合碎片化学习。

**③ NLP 正在变成 LLM 的前置基础设施，CV 则从 GAN 扩散到完整生成管线。**
NLP 侧的重点从 seq2seq 转向 tokenizer / BPE / RNN / 注意力这些「最小积木」；CV 侧新项目更关注扩散训练、VAE、检测与从零训 Stable Diffusion。所以本清单不把 NLP 与 LLM 机械并列——**NLP 讲表示、序列与经典任务，LLM 讲架构、训练、推理、微调与系统优化**。

**④ Agent 数量增长最快，但质量分化也最大。**
一个合格的教学仓库至少应展示：如何把模型输出解析成工具调用；如何处理超时、异常与结构化返回；如何维护对话/任务状态；如何终止循环；如何评测输出。MCP、RAG、多智能体正在成为新的标准子主题，而**记忆、可观测性、评测与安全目前仍是明显短板**——这也是最值得贡献的方向。

---

## 学习路线

- 三条学习路线（CV / LLM / Agent）：[LEARNING_PATH.md](从零实现AI/LEARNING_PATH.md)

---