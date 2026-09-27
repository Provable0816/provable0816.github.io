# 大模型 / Agent 记忆压缩：顶会论文调研总索引

- 调研日期：2026-09-27
- 覆盖会议（主会，CCF-A/B 及同级）：ICLR 2026、NeurIPS 2025、ICML 2025、ICLR 2025、NeurIPS 2024、AAAI 2026、AAAI 2025、ACL 2026、ACL 2025、EMNLP 2025、NAACL 2025、COLING 2025、IJCAI 2025、IJCAI 2026、CVPR 2026、CVPR 2025、ICCV 2025
- 语料规模：从上述会议主会论文标题中共采集 48,540 条记录；关键词初筛后得到 813 条与本方向相关的标题
- 精读规模：221 篇 = **主会 207 篇** + 非主会补充 14 篇（Findings 13 篇 + Demo 1 篇），逐篇文件见 `Agent记忆papers/`
- 分层：Tier A 深度报告 145 篇 / Tier B 结构简报 76 篇
- 排除：Workshop、Tutorial、Doctoral Consortium 与期刊论文；Findings/Demo 仅在主题高度相关时保留并在表中标注

## 一、精读清单（221 篇）

| ID | 会议 | 会议类型 | 方向簇 | 层级 | 标题 | 报告文件 |
| --- | --- | --- | --- | --- | --- | --- |
| P001 | ICLR 2026 | 主会 | KV | A | Attention Is All You Need for KV Cache in Diffusion LLMs | [Agent记忆papers/P001.md](Agent记忆papers/P001.md) |
| P002 | ICLR 2026 | 主会 | THEORY | A | Attention Sinks and Compression Valleys in LLMs are Two Sides of the Same Coin | [Agent记忆papers/P002.md](Agent记忆papers/P002.md) |
| P003 | ICLR 2026 | 主会 | KV | A | Cache What Lasts: Token Retention for Memory-Bounded KV Cache in LLMs | [Agent记忆papers/P003.md](Agent记忆papers/P003.md) |
| P004 | ICLR 2026 | 主会 | KV | A | DefensiveKV: Taming the Fragility of KV Cache Eviction in LLM Inference | [Agent记忆papers/P004.md](Agent记忆papers/P004.md) |
| P005 | ICLR 2026 | 主会 | KV | A | FreeKV: Boosting KV Cache Retrieval for Efficient LLM Inference | [Agent记忆papers/P005.md](Agent记忆papers/P005.md) |
| P006 | ICLR 2026 | 主会 | KV | A | FreqKV: Key-Value Compression in Frequency Domain for Context Window Extension | [Agent记忆papers/P006.md](Agent记忆papers/P006.md) |
| P007 | ICLR 2026 | 主会 | KV | A | IceCache: Memory-Efficient KV-cache Management for Long-Sequence LLMs | [Agent记忆papers/P007.md](Agent记忆papers/P007.md) |
| P008 | ICLR 2026 | 主会 | KV | A | KaVa: Latent Reasoning via Compressed KV-Cache Distillation | [Agent记忆papers/P008.md](Agent记忆papers/P008.md) |
| P009 | ICLR 2026 | 主会 | KV | A | KV Cache Transform Coding for Compact Storage in LLM Inference | [Agent记忆papers/P009.md](Agent记忆papers/P009.md) |
| P010 | ICLR 2026 | 主会 | KV | A | LookaheadKV: Fast and Accurate KV Cache Eviction by Glimpsing into the Future without Generation | [Agent记忆papers/P010.md](Agent记忆papers/P010.md) |
| P011 | ICLR 2026 | 主会 | KV | A | LouisKV: Efficient KV Cache Retrieval for Long Input-Output Sequences | [Agent记忆papers/P011.md](Agent记忆papers/P011.md) |
| P012 | ICLR 2026 | 主会 | KV | A | PM-KVQ: Progressive Mixed-precision KV Cache Quantization for Long-CoT LLMs | [Agent记忆papers/P012.md](Agent记忆papers/P012.md) |
| P013 | ICLR 2026 | 主会 | KV | A | ProtoKV: Long-context Knowledges Are Already Well-Organized Before Your Query | [Agent记忆papers/P013.md](Agent记忆papers/P013.md) |
| P014 | ICLR 2026 | 主会 | KV | A | Reconstructing KV Caches with Cross-Layer Fusion for Enhanced Transformers | [Agent记忆papers/P014.md](Agent记忆papers/P014.md) |
| P015 | ICLR 2026 | 主会 | KV | A | ReST-KV: Robust KV Cache Eviction with Layer-wise Output Reconstruction and Spatial-Temporal Smoothing | [Agent记忆papers/P015.md](Agent记忆papers/P015.md) |
| P016 | ICLR 2026 | 主会 | KV | A | ThinKV: Thought-Adaptive KV Cache Compression for Efficient Reasoning Models | [Agent记忆papers/P016.md](Agent记忆papers/P016.md) |
| P017 | ICLR 2026 | 主会 | ARCH | A | Bottlenecked Transformers: Periodic KV Cache Consolidation for Generalised Reasoning | [Agent记忆papers/P017.md](Agent记忆papers/P017.md) |
| P018 | ICLR 2026 | 主会 | CTX | A | Autoencoding-Free Context Compression for LLMs via Contextual Semantic Anchors | [Agent记忆papers/P018.md](Agent记忆papers/P018.md) |
| P019 | ICLR 2026 | 主会 | CTX | A | COMI: Coarse-to-fine Context Compression via Marginal Information Gain | [Agent记忆papers/P019.md](Agent记忆papers/P019.md) |
| P020 | ICLR 2026 | 主会 | CTX | A | Cartridges: Lightweight and general-purpose long context representations via self-study | [Agent记忆papers/P020.md](Agent记忆papers/P020.md) |
| P021 | ICLR 2026 | 主会 | ARCH | A | RMAAT: Astrocyte-Inspired Memory Compression and Replay for Efficient Long-Context Transformers | [Agent记忆papers/P021.md](Agent记忆papers/P021.md) |
| P022 | ICLR 2026 | 主会 | ARCH | A | UltraMemV2: Memory Networks Scaling to 120B Parameters with Superior Long-Context Learning | [Agent记忆papers/P022.md](Agent记忆papers/P022.md) |
| P023 | ICLR 2026 | 主会 | AGENT | A | MemAgent: Reshaping Long-Context LLM with Multi-Conv RL-based Memory Agent | [Agent记忆papers/P023.md](Agent记忆papers/P023.md) |
| P024 | ICLR 2026 | 主会 | AGENT | A | REMem: Reasoning with Episodic Memory in Language Agent | [Agent记忆papers/P024.md](Agent记忆papers/P024.md) |
| P025 | ICLR 2026 | 主会 | AGENT | A | Look Back to Reason Forward: Revisitable Memory for Long-Context LLM Agents | [Agent记忆papers/P025.md](Agent记忆papers/P025.md) |
| P026 | ICLR 2026 | 主会 | AGENT | A | From Single to Multi-Granularity: Toward Long-Term Memory Association and Selection of Conversational Agents | [Agent记忆papers/P026.md](Agent记忆papers/P026.md) |
| P027 | ICLR 2026 | 主会 | BENCH | A | Beyond a Million Tokens: Benchmarking and Enhancing Long-Term Memory in LLMs | [Agent记忆papers/P027.md](Agent记忆papers/P027.md) |
| P028 | ICLR 2026 | 主会 | VLM | B | MARC: Memory-Augmented RL Token Compression for Efficient Video Understanding | [Agent记忆papers/P028.md](Agent记忆papers/P028.md) |
| P029 | ICLR 2026 | 主会 | VLM | B | VideoChat-Flash: Hierarchical Compression for Long-Context Video Modeling | [Agent记忆papers/P029.md](Agent记忆papers/P029.md) |
| P030 | ICLR 2026 | 主会 | VLM | B | Mixing Importance with Diversity: Joint Optimization for KV Cache Compression in Large Vision-Language Models | [Agent记忆papers/P030.md](Agent记忆papers/P030.md) |
| P031 | ICLR 2026 | 主会 | AGENT | B | Seeing, Listening, Remembering, and Reasoning: A Multimodal Agent with Long-Term Memory | [Agent记忆papers/P031.md](Agent记忆papers/P031.md) |
| P032 | ICLR 2026 | 主会 | CTX | B | PERK: Long-Context Reasoning as Parameter-Efficient Test-Time Learning | [Agent记忆papers/P032.md](Agent记忆papers/P032.md) |
| P033 | ICLR 2026 | 主会 | THEORY | B | Learning is Forgetting; LLM Training As Lossy Compression | [Agent记忆papers/P033.md](Agent记忆papers/P033.md) |
| P034 | ICLR 2026 | 主会 | KV | B | Channel-Aware Mixed-Precision Quantization for Efficient Long-Context Inference | [Agent记忆papers/P034.md](Agent记忆papers/P034.md) |
| P201 | ICLR 2026 | 主会 | KV | B | Beyond Speedup - Utilizing KV Cache for Sampling and Reasoning | [Agent记忆papers/P201.md](Agent记忆papers/P201.md) |
| P202 | ICLR 2026 | 主会 | KV | B | Fast-dLLM v2: Efficient Block-Diffusion LLM | [Agent记忆papers/P202.md](Agent记忆papers/P202.md) |
| P203 | ICLR 2026 | 主会 | KV | B | FlashDLM: Accelerating Diffusion Language Model Inference via Efficient KV Caching and Guided Diffusion | [Agent记忆papers/P203.md](Agent记忆papers/P203.md) |
| P204 | ICLR 2026 | 主会 | KV | B | ICaRus: Identical Cache Reuse for Efficient Multi-Model Inference | [Agent记忆papers/P204.md](Agent记忆papers/P204.md) |
| P205 | ICLR 2026 | 主会 | AGENT | A | KVComm: Enabling Efficient LLM Communication through Selective KV Sharing | [Agent记忆papers/P205.md](Agent记忆papers/P205.md) |
| P206 | ICLR 2026 | 主会 | KV | A | QuoKA: Query-Oriented KV Selection for Efficient LLM Prefill | [Agent记忆papers/P206.md](Agent记忆papers/P206.md) |
| P207 | ICLR 2026 | 主会 | KV | B | Randomization Boosts KV Caching, Learning Balances Query Load: A Joint Perspective | [Agent记忆papers/P207.md](Agent记忆papers/P207.md) |
| P208 | ICLR 2026 | 主会 | ARCH | B | Scaling Knowledge Editing in LLMs to 100,000 Facts with Neural KV Database | [Agent记忆papers/P208.md](Agent记忆papers/P208.md) |
| P209 | ICLR 2026 | 主会 | ARCH | B | TokenSeek: Memory Efficient Fine Tuning via Instance-Aware Token Ditching | [Agent记忆papers/P209.md](Agent记忆papers/P209.md) |
| P210 | ICLR 2026 | 主会 | AGENT | A | LightMem: Lightweight and Efficient Memory-Augmented Generation | [Agent记忆papers/P210.md](Agent记忆papers/P210.md) |
| P035 | NeurIPS 2025 | 主会 | KV | B | SALS: Sparse Attention in Latent Space for KV Cache Compression | [Agent记忆papers/P035.md](Agent记忆papers/P035.md) |
| P036 | NeurIPS 2025 | 主会 | KV | A | Accurate KV Cache Eviction via Anchor Direction Projection for Efficient LLM Inference | [Agent记忆papers/P036.md](Agent记忆papers/P036.md) |
| P037 | NeurIPS 2025 | 主会 | KV | A | Ada-KV: Optimizing KV Cache Eviction by Adaptive Budget Allocation for Efficient LLM Inference | [Agent记忆papers/P037.md](Agent记忆papers/P037.md) |
| P038 | NeurIPS 2025 | 主会 | KV | A | AttentionPredictor: Temporal Patterns Matter for KV Cache Compression | [Agent记忆papers/P038.md](Agent记忆papers/P038.md) |
| P039 | NeurIPS 2025 | 主会 | KV | A | ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference | [Agent记忆papers/P039.md](Agent记忆papers/P039.md) |
| P040 | NeurIPS 2025 | 主会 | KV | A | Homogeneous Keys, Heterogeneous Values: Exploiting Local KV Cache Asymmetry for Long-Context LLMs | [Agent记忆papers/P040.md](Agent记忆papers/P040.md) |
| P041 | NeurIPS 2025 | 主会 | KV | A | Inference-Time Hyper-Scaling with KV Cache Compression | [Agent记忆papers/P041.md](Agent记忆papers/P041.md) |
| P042 | NeurIPS 2025 | 主会 | KV | A | KeyDiff: Key Similarity-Based KV Cache Eviction for Long-Context LLM Inference in Resource-Constrained Environments | [Agent记忆papers/P042.md](Agent记忆papers/P042.md) |
| P043 | NeurIPS 2025 | 主会 | AGENT | A | KVCOMM: Online Cross-context KV-cache Communication for Efficient LLM-based Multi-agent Systems | [Agent记忆papers/P043.md](Agent记忆papers/P043.md) |
| P044 | NeurIPS 2025 | 主会 | KV | A | KVLink: Accelerating Large Language Models via Efficient KV Cache Reuse | [Agent记忆papers/P044.md](Agent记忆papers/P044.md) |
| P045 | NeurIPS 2025 | 主会 | KV | A | KVzip: Query-Agnostic KV Cache Compression with Context Reconstruction | [Agent记忆papers/P045.md](Agent记忆papers/P045.md) |
| P046 | NeurIPS 2025 | 主会 | KV | A | MPCache: MPC-Friendly KV Cache Eviction for Efficient Private LLM Inference | [Agent记忆papers/P046.md](Agent记忆papers/P046.md) |
| P047 | NeurIPS 2025 | 主会 | KV | A | MUSTAFAR: Promoting Unstructured Sparsity for KV Cache Pruning in LLM Inference | [Agent记忆papers/P047.md](Agent记忆papers/P047.md) |
| P048 | NeurIPS 2025 | 主会 | KV | A | NSNQuant: A Double Normalization Approach for Calibration-Free Low-Bit Vector Quantization of KV Cache | [Agent记忆papers/P048.md](Agent记忆papers/P048.md) |
| P049 | NeurIPS 2025 | 主会 | KV | A | PolarQuant: Leveraging Polar Transformation for Key Cache Quantization and Decoding Acceleration | [Agent记忆papers/P049.md](Agent记忆papers/P049.md) |
| P050 | NeurIPS 2025 | 主会 | KV | A | R-KV: Redundancy-aware KV Cache Compression for Reasoning Models | [Agent记忆papers/P050.md](Agent记忆papers/P050.md) |
| P051 | NeurIPS 2025 | 主会 | KV | A | RetrievalAttention: Accelerating Long-Context LLM Inference via Vector Retrieval | [Agent记忆papers/P051.md](Agent记忆papers/P051.md) |
| P052 | NeurIPS 2025 | 主会 | KV | A | SmallKV: Small Model Assisted Compensation of KV Cache Compression for Efficient LLM Inference | [Agent记忆papers/P052.md](Agent记忆papers/P052.md) |
| P053 | NeurIPS 2025 | 主会 | KV | A | Spotlight Attention: Towards Efficient LLM Generation via Non-linear Hashing-based KV Cache Retrieval | [Agent记忆papers/P053.md](Agent记忆papers/P053.md) |
| P054 | NeurIPS 2025 | 主会 | CTX | A | Efficient Prompt Compression with Evaluator Heads for Long-Context Transformer Inference | [Agent记忆papers/P054.md](Agent记忆papers/P054.md) |
| P055 | NeurIPS 2025 | 主会 | CTX | A | UniGist: Towards General and Hardware-aligned Sequence-level Long Context Compression | [Agent记忆papers/P055.md](Agent记忆papers/P055.md) |
| P056 | NeurIPS 2025 | 主会 | ARCH | A | Blending Complementary Memory Systems in Hybrid Quadratic-Linear Transformers | [Agent记忆papers/P056.md](Agent记忆papers/P056.md) |
| P057 | NeurIPS 2025 | 主会 | ARCH | A | Hardware-aligned Hierarchical Sparse Attention for Efficient Long-term Memory Access | [Agent记忆papers/P057.md](Agent记忆papers/P057.md) |
| P058 | NeurIPS 2025 | 主会 | VLM | B | PrefixKV: Adaptive Prefix KV Cache is What Vision Instruction-Following Models Need for Efficient Generation | [Agent记忆papers/P058.md](Agent记忆papers/P058.md) |
| P059 | NeurIPS 2025 | 主会 | VLM | B | InfiniPot-V: Memory-Constrained KV Cache Compression for Streaming Video Understanding | [Agent记忆papers/P059.md](Agent记忆papers/P059.md) |
| P060 | NeurIPS 2025 | 主会 | VLM | B | Memory-Efficient Visual Autoregressive Modeling with Scale-Aware KV Cache Compression | [Agent记忆papers/P060.md](Agent记忆papers/P060.md) |
| P061 | NeurIPS 2025 | 主会 | CTX | B | Compress, Gather, and Recompute: REFORMing Long-Context Processing in Transformers | [Agent记忆papers/P061.md](Agent记忆papers/P061.md) |
| P062 | NeurIPS 2025 | 主会 | KV | B | Efficient Low Rank Attention for Long-Context Inference in Large Language Models | [Agent记忆papers/P062.md](Agent记忆papers/P062.md) |
| P063 | NeurIPS 2025 | 主会 | KV | B | Improving Model Representation and Reducing KV Cache via Skip Connections with First Value Heads | [Agent记忆papers/P063.md](Agent记忆papers/P063.md) |
| P064 | NeurIPS 2025 | 主会 | KV | B | HiFC: High-efficiency Flash-based KV Cache Swapping for Scaling LLM Inference | [Agent记忆papers/P064.md](Agent记忆papers/P064.md) |
| P065 | NeurIPS 2025 | 主会 | ARCH | B | MoBA: Mixture of Block Attention for Long-Context LLMs | [Agent记忆papers/P065.md](Agent记忆papers/P065.md) |
| P215 | NeurIPS 2025 | 主会 | AGENT | A | A-Mem: Agentic Memory for LLM Agents | [Agent记忆papers/P215.md](Agent记忆papers/P215.md) |
| P216 | NeurIPS 2025 | 主会 | AGENT | A | CAM: A Constructivist View of Agentic Memory for LLM-Based Reading Comprehension | [Agent记忆papers/P216.md](Agent记忆papers/P216.md) |
| P217 | NeurIPS 2025 | 主会 | KV | B | dKV-Cache: The Cache for Diffusion Language Models | [Agent记忆papers/P217.md](Agent记忆papers/P217.md) |
| P218 | NeurIPS 2025 | 主会 | ARCH | B | Graph-KV: Breaking Sequence via Injecting Structural Biases into Large Language Models | [Agent记忆papers/P218.md](Agent记忆papers/P218.md) |
| P219 | NeurIPS 2025 | 主会 | AGENT | A | KVFlow: Efficient Prefix Caching for Accelerating LLM-Based Multi-Agent Workflows | [Agent记忆papers/P219.md](Agent记忆papers/P219.md) |
| P220 | NeurIPS 2025 | 主会 | KV | B | Sim-LLM: Optimizing LLM Inference at the Edge through Inter-Task KV Reuse | [Agent记忆papers/P220.md](Agent记忆papers/P220.md) |
| P221 | NeurIPS 2025 | 主会 | KV | A | Value-Guided KV Compression for LLMs via Approximated CUR Decomposition | [Agent记忆papers/P221.md](Agent记忆papers/P221.md) |
| P066 | ICML 2025 | 主会 | KV | A | CateKV: On Sequential Consistency for Long-Context LLM Inference Acceleration | [Agent记忆papers/P066.md](Agent记忆papers/P066.md) |
| P067 | ICML 2025 | 主会 | KV | A | CommVQ: Commutative Vector Quantization for KV Cache Compression | [Agent记忆papers/P067.md](Agent记忆papers/P067.md) |
| P068 | ICML 2025 | 主会 | KV | A | Compute or Load KV Cache? Why Not Both? | [Agent记忆papers/P068.md](Agent记忆papers/P068.md) |
| P069 | ICML 2025 | 主会 | KV | A | Dialogue Without Limits: Constant-Sized KV Caches for Extended Response in LLMs | [Agent记忆papers/P069.md](Agent记忆papers/P069.md) |
| P070 | ICML 2025 | 主会 | KV | A | KVTuner: Sensitivity-Aware Layer-Wise Mixed-Precision KV Cache Quantization for Efficient and Nearly Lossless LLM Inference | [Agent记忆papers/P070.md](Agent记忆papers/P070.md) |
| P071 | ICML 2025 | 主会 | KV | A | LaCache: Ladder-Shaped KV Caching for Efficient Long-Context Modeling of Large Language Models | [Agent记忆papers/P071.md](Agent记忆papers/P071.md) |
| P072 | ICML 2025 | 主会 | KV | A | Lexico: Extreme KV Cache Compression via Sparse Coding over Universal Dictionaries | [Agent记忆papers/P072.md](Agent记忆papers/P072.md) |
| P073 | ICML 2025 | 主会 | CTX | A | ParallelComp: Parallel Long-Context Compressor for Length Extrapolation | [Agent记忆papers/P073.md](Agent记忆papers/P073.md) |
| P074 | ICML 2025 | 主会 | ARCH | A | Peripheral Memory for LLMs: Integration of Sequential Memory Banks with Adaptive Querying | [Agent记忆papers/P074.md](Agent记忆papers/P074.md) |
| P075 | ICML 2025 | 主会 | ARCH | A | M+: Extending MemoryLLM with Scalable Long-Term Memory | [Agent记忆papers/P075.md](Agent记忆papers/P075.md) |
| P076 | ICML 2025 | 主会 | KV | A | QuantSpec: Self-Speculative Decoding with Hierarchical Quantized KV Cache | [Agent记忆papers/P076.md](Agent记忆papers/P076.md) |
| P077 | ICML 2025 | 主会 | KV | A | RocketKV: Accelerating Long-Context LLM Inference via Two-Stage KV Cache Compression | [Agent记忆papers/P077.md](Agent记忆papers/P077.md) |
| P078 | ICML 2025 | 主会 | KV | A | ShadowKV: KV Cache in Shadows for High-Throughput Long-Context LLM Inference | [Agent记忆papers/P078.md](Agent记忆papers/P078.md) |
| P079 | ICML 2025 | 主会 | CTX | B | Efficient Length-Generalizable Attention via Causal Retrieval for Long-Context Language Modeling | [Agent记忆papers/P079.md](Agent记忆papers/P079.md) |
| P080 | ICML 2025 | 主会 | ARCH | B | On-the-Fly Adaptive Distillation of Transformer to Dual-State Linear Attention for Long-Context LLM Serving | [Agent记忆papers/P080.md](Agent记忆papers/P080.md) |
| P081 | ICML 2025 | 主会 | VLM | B | MMInference: Accelerating Pre-filling for Long-Context Visual Language Models via Modality-Aware Permutation Sparse Attention | [Agent记忆papers/P081.md](Agent记忆papers/P081.md) |
| P082 | ICML 2025 | 主会 | CTX | B | RAPID: Long-Context Inference with Retrieval-Augmented Speculative Decoding | [Agent记忆papers/P082.md](Agent记忆papers/P082.md) |
| P211 | ICML 2025 | 主会 | ARCH | A | $∞$-Video: A Training-Free Approach to Long Video Understanding via Continuous-Time Memory Consolidation | [Agent记忆papers/P211.md](Agent记忆papers/P211.md) |
| P212 | ICML 2025 | 主会 | KV | B | KV Shifting Attention Enhances Language Modeling | [Agent记忆papers/P212.md](Agent记忆papers/P212.md) |
| P213 | ICML 2025 | 主会 | AGENT | B | SAM2Act: Integrating Visual Foundation Model with A Memory Architecture for Robotic Manipulation | [Agent记忆papers/P213.md](Agent记忆papers/P213.md) |
| P083 | ICLR 2025 | 主会 | KV | A | CAKE: Cascading and Adaptive KV Cache Eviction with Layer Preferences | [Agent记忆papers/P083.md](Agent记忆papers/P083.md) |
| P084 | ICLR 2025 | 主会 | KV | A | DuoAttention: Efficient Long-Context LLM Inference with Retrieval and Streaming Heads | [Agent记忆papers/P084.md](Agent记忆papers/P084.md) |
| P085 | ICLR 2025 | 主会 | CTX | A | Long Context Compression with Activation Beacon | [Agent记忆papers/P085.md](Agent记忆papers/P085.md) |
| P086 | ICLR 2025 | 主会 | ARCH | A | MELODI: Exploring Memory Compression for Long Contexts | [Agent记忆papers/P086.md](Agent记忆papers/P086.md) |
| P087 | ICLR 2025 | 主会 | KV | A | Not All Heads Matter: A Head-Level KV Cache Compression Method with Integrated Retrieval and Reasoning | [Agent记忆papers/P087.md](Agent记忆papers/P087.md) |
| P088 | ICLR 2025 | 主会 | KV | A | OmniKV: Dynamic Context Selection for Efficient Long-Context LLMs | [Agent记忆papers/P088.md](Agent记忆papers/P088.md) |
| P089 | ICLR 2025 | 主会 | KV | A | Palu: KV-Cache Compression with Low-Rank Projection | [Agent记忆papers/P089.md](Agent记忆papers/P089.md) |
| P090 | ICLR 2025 | 主会 | KV | A | RazorAttention: Efficient KV Cache Compression Through Retrieval Heads | [Agent记忆papers/P090.md](Agent记忆papers/P090.md) |
| P091 | ICLR 2025 | 主会 | KV | A | SqueezeAttention: 2D Management of KV-Cache in LLM Inference via Layer-wise Optimal Budget | [Agent记忆papers/P091.md](Agent记忆papers/P091.md) |
| P092 | ICLR 2025 | 主会 | KV | A | Training Free Exponential Context Extension via Cascading KV Cache | [Agent记忆papers/P092.md](Agent记忆papers/P092.md) |
| P093 | ICLR 2025 | 主会 | AGENT | A | Human-inspired Episodic Memory for Infinite Context LLMs | [Agent记忆papers/P093.md](Agent记忆papers/P093.md) |
| P094 | ICLR 2025 | 主会 | BENCH | B | SCBench: A KV Cache-Centric Analysis of Long-Context Methods | [Agent记忆papers/P094.md](Agent记忆papers/P094.md) |
| P095 | ICLR 2025 | 主会 | VLM | B | VL-Cache: Sparsity and Modality-Aware KV Cache Compression for Vision-Language Model Inference Acceleration | [Agent记忆papers/P095.md](Agent记忆papers/P095.md) |
| P096 | ICLR 2025 | 主会 | KV | B | $\text{D}_{2}\text{O}$: Dynamic Discriminative Operations for Efficient Long-Context Inference of Large Language Models | [Agent记忆papers/P096.md](Agent记忆papers/P096.md) |
| P097 | ICLR 2025 | 主会 | KV | B | MagicDec: Breaking the Latency-Throughput Tradeoff for Long Context Generation with Speculative Decoding | [Agent记忆papers/P097.md](Agent记忆papers/P097.md) |
| P199 | ICLR 2025 | 主会 | KV | A | MatryoshkaKV: Adaptive KV Compression via Trainable Orthogonal Projection | [Agent记忆papers/P199.md](Agent记忆papers/P199.md) |
| P200 | ICLR 2025 | 主会 | KV | B | RobustKV: Defending Large Language Models against Jailbreak Attacks via KV Eviction | [Agent记忆papers/P200.md](Agent记忆papers/P200.md) |
| P098 | NeurIPS 2024 | 主会 | THEORY | A | Fundamental Limits of Prompt Compression: A Rate-Distortion Framework for Black-Box Language Models | [Agent记忆papers/P098.md](Agent记忆papers/P098.md) |
| P099 | NeurIPS 2024 | 主会 | AGENT | A | HippoRAG: Neurobiologically Inspired Long-Term Memory for Large Language Models | [Agent记忆papers/P099.md](Agent记忆papers/P099.md) |
| P100 | NeurIPS 2024 | 主会 | KV | A | InfLLM: Training-Free Long-Context Extrapolation for LLMs with an Efficient Context Memory | [Agent记忆papers/P100.md](Agent记忆papers/P100.md) |
| P101 | NeurIPS 2024 | 主会 | KV | A | KV Cache is 1 Bit Per Channel: Efficient Large Language Model Inference with Coupled Quantization | [Agent记忆papers/P101.md](Agent记忆papers/P101.md) |
| P102 | NeurIPS 2024 | 主会 | KV | A | KVQuant: Towards 10 Million Context Length LLM Inference with KV Cache Quantization | [Agent记忆papers/P102.md](Agent记忆papers/P102.md) |
| P103 | NeurIPS 2024 | 主会 | KV | A | MiniCache: KV Cache Compression in Depth Dimension for Large Language Models | [Agent记忆papers/P103.md](Agent记忆papers/P103.md) |
| P104 | NeurIPS 2024 | 主会 | KV | A | Reducing Transformer Key-Value Cache Size with Cross-Layer Attention | [Agent记忆papers/P104.md](Agent记忆papers/P104.md) |
| P105 | NeurIPS 2024 | 主会 | CTX | A | StreamingDialogue: Prolonged Dialogue Learning via Long Context Compression with Minimal Losses | [Agent记忆papers/P105.md](Agent记忆papers/P105.md) |
| P106 | NeurIPS 2024 | 主会 | CTX | A | xRAG: Extreme Context Compression for Retrieval-augmented Generation with One Token | [Agent记忆papers/P106.md](Agent记忆papers/P106.md) |
| P107 | NeurIPS 2024 | 主会 | KV | A | ZipCache: Accurate and Efficient KV Cache Quantization with Salient Token Identification | [Agent记忆papers/P107.md](Agent记忆papers/P107.md) |
| P108 | NeurIPS 2024 | 主会 | ARCH | B | Linking In-context Learning in Transformers to Human Episodic Memory | [Agent记忆papers/P108.md](Agent记忆papers/P108.md) |
| P109 | NeurIPS 2024 | 主会 | CTX | B | Chain of Agents: Large Language Models Collaborating on Long-Context Tasks | [Agent记忆papers/P109.md](Agent记忆papers/P109.md) |
| P110 | NeurIPS 2024 | 主会 | VLM | B | Efficient Large Multi-modal Models via Visual Context Compression | [Agent记忆papers/P110.md](Agent记忆papers/P110.md) |
| P214 | NeurIPS 2024 | 主会 | KV | A | ArkVale: Efficient Generative LLM Inference with Recallable Key-Value Eviction | [Agent记忆papers/P214.md](Agent记忆papers/P214.md) |
| P151 | AAAI 26 | 主会 | KV | A | DesireKV: Decoupling Sensitivity and Importance for Reasoning-Aware KV Cache Compression | [Agent记忆papers/P151.md](Agent记忆papers/P151.md) |
| P152 | AAAI 26 | 主会 | VLM | A | StreamKV: Streaming Video Question-Answering with Segment-based KV Cache Retrieval and Compression | [Agent记忆papers/P152.md](Agent记忆papers/P152.md) |
| P153 | AAAI 26 | 主会 | KV | A | Accelerating LLM Inference Throughput via Asynchronous KV Cache Prefetching | [Agent记忆papers/P153.md](Agent记忆papers/P153.md) |
| P154 | AAAI 26 | 主会 | ARCH | A | Backtrace Mamba: Reviving Critical Temporal Contexts via Hierarchical Memory Compression for Online Action Detection | [Agent记忆papers/P154.md](Agent记忆papers/P154.md) |
| P155 | AAAI 26 | 主会 | VLM | B | AccKV: Towards Efficient Audio-Video LLMs Inference via Adaptive-Focusing and Cross-Calibration KV Cache Optimization | [Agent记忆papers/P155.md](Agent记忆papers/P155.md) |
| P156 | AAAI 26 | 主会 | VLM | B | Efficient Multimodal Large Language Model via Dynamic KV Cache Quantization | [Agent记忆papers/P156.md](Agent记忆papers/P156.md) |
| P175 | AAAI 26 | 主会 | AGENT | A | ARTEM: Enhancing Large Language Model Agents with Spatial-Temporal Episodic Memory | [Agent记忆papers/P175.md](Agent记忆papers/P175.md) |
| P176 | AAAI 26 | 主会 | AGENT | B | Beyond Fact Retrieval: Episodic Memory for RAG with Generative Semantic Workspaces | [Agent记忆papers/P176.md](Agent记忆papers/P176.md) |
| P177 | AAAI 26 | 主会 | KV | A | Judge Q: Trainable Queries for Optimized Information Retention in KV Cache Eviction | [Agent记忆papers/P177.md](Agent记忆papers/P177.md) |
| P178 | AAAI 26 | 主会 | KV | A | KeepKV: Achieving Periodic Lossless KV Cache Compression for Efficient LLM Inference | [Agent记忆papers/P178.md](Agent记忆papers/P178.md) |
| P179 | AAAI 26 | 主会 | KV | B | KVmix: Gradient-Based Layer Importance-Aware Mixed-Precision Quantization for KV Cache | [Agent记忆papers/P179.md](Agent记忆papers/P179.md) |
| P180 | AAAI 26 | 主会 | KV | A | Lethe: Layer- and Time-Adaptive KV Cache Pruning for Reasoning-Intensive LLM Serving | [Agent记忆papers/P180.md](Agent记忆papers/P180.md) |
| P181 | AAAI 26 | 主会 | AGENT | B | Multi-agent In-context Coordination via Decentralized Memory Retrieval | [Agent记忆papers/P181.md](Agent记忆papers/P181.md) |
| P182 | AAAI 26 | 主会 | KV | A | Self-Indexing KVCache: Predicting Sparse Attention from Compressed Keys | [Agent记忆papers/P182.md](Agent记忆papers/P182.md) |
| P183 | AAAI 26 | 主会 | KV | A | SparK: Query-Aware Unstructured Sparsity with Recoverable KV Cache Channel Pruning | [Agent记忆papers/P183.md](Agent记忆papers/P183.md) |
| P184 | AAAI 26 | 主会 | KV | B | Sparse Attention Across Multiple-Context KV Cache | [Agent记忆papers/P184.md](Agent记忆papers/P184.md) |
| P185 | AAAI 26 | 主会 | KV | B | Sparse-dLLM: Accelerating Diffusion LLMs with Dynamic Cache Eviction | [Agent记忆papers/P185.md](Agent记忆papers/P185.md) |
| P186 | AAAI 26 | 主会 | AGENT | B | SubGCache: Accelerating Graph-based RAG with Subgraph-level KV Cache | [Agent记忆papers/P186.md](Agent记忆papers/P186.md) |
| P187 | AAAI 26 | 主会 | AGENT | B | Towards Continually-Evolving AI: Selective and Expandable Multimodal Memory System | [Agent记忆papers/P187.md](Agent记忆papers/P187.md) |
| P188 | AAAI 26 | 主会 | VLM | B | DAVID: Dual-stage Adaptive Vision-text Integrated Decoupling for Multimodal KV Cache Eviction | [Agent记忆papers/P188.md](Agent记忆papers/P188.md) |
| P189 | AAAI 26 | 主会 | VLM | B | AMS-KV: Adaptive KV Caching in Multi-Scale Visual Autoregressive Transformers | [Agent记忆papers/P189.md](Agent记忆papers/P189.md) |
| P190 | AAAI 26 | 主会 | VLM | B | Head-Aware KV Cache Compression for Efficient Visual Autoregressive Modeling | [Agent记忆papers/P190.md](Agent记忆papers/P190.md) |
| P191 | AAAI 26 | 主会 | AGENT | B | DigimonGPT: An Evolvable Agent with Hierarchical Human-like Memory for Video Question Answering | [Agent记忆papers/P191.md](Agent记忆papers/P191.md) |
| P170 | AAAI 25 | 主会 | ARCH | A | CMT: A Memory Compression Method for Continual Knowledge Learning of Large Language Models | [Agent记忆papers/P170.md](Agent记忆papers/P170.md) |
| P171 | AAAI 25 | 主会 | KV | A | CSR:Achieving 1 Bit Key-Value Cache via Sparse Representation | [Agent记忆papers/P171.md](Agent记忆papers/P171.md) |
| P172 | AAAI 25 | 主会 | CTX | A | Leveraging Attention to Effectively Compress Prompts for Long-Context LLMs | [Agent记忆papers/P172.md](Agent记忆papers/P172.md) |
| P173 | AAAI 25 | 主会 | CTX | A | Prompt Compression with Context-Aware Sentence Encoding for Fast and Improved LLM Inference | [Agent记忆papers/P173.md](Agent记忆papers/P173.md) |
| P174 | AAAI 25 | 主会 | KV | A | QJL: 1-Bit Quantized JL Transform for KV Cache Quantization with Zero Overhead | [Agent记忆papers/P174.md](Agent记忆papers/P174.md) |
| P121 | ACL 2026 | 主会 | AGENT | A | Agentic Memory: Learning Unified Long-Term and Short-Term Memory Management for Large Language Model Agents | [Agent记忆papers/P121.md](Agent记忆papers/P121.md) |
| P122 | ACL 2026 | 主会 | CTX | A | Bridging the Memorization-Utilization Gap: Near-Lossless Context Compression via Reinforcement Learning | [Agent记忆papers/P122.md](Agent记忆papers/P122.md) |
| P123 | ACL 2026 | 主会 | AGENT | A | Dynamic Long Context Reasoning over Compressed Memory via End-to-End Reinforcement Learning | [Agent记忆papers/P123.md](Agent记忆papers/P123.md) |
| P124 | ACL 2026 | 主会 | AGENT | A | Fine-Mem: Fine-Grained Feedback Alignment for Long-Horizon Memory Management | [Agent记忆papers/P124.md](Agent记忆papers/P124.md) |
| P125 | ACL 2026 | **Findings（非主会）** | AGENT | A | From Recall to Forgetting: Benchmarking Long-Term Memory for Personalized Agents | [Agent记忆papers/P125.md](Agent记忆papers/P125.md) |
| P126 | ACL 2026 | 主会 | ARCH | A | Gated Differentiable Working Memory for Long-Context Language Modeling | [Agent记忆papers/P126.md](Agent记忆papers/P126.md) |
| P127 | ACL 2026 | 主会 | CTX | A | Glyph: Scaling Context Windows via Visual-Text Compression | [Agent记忆papers/P127.md](Agent记忆papers/P127.md) |
| P128 | ACL 2026 | **Findings（非主会）** | AGENT | A | Grounding Agent Memory in Contextual Intent | [Agent记忆papers/P128.md](Agent记忆papers/P128.md) |
| P129 | ACL 2026 | **Demo（非主会）** | AGENT | A | Hindsight: Structured Agent Memory that Retains, Recalls, and Reflects | [Agent记忆papers/P129.md](Agent记忆papers/P129.md) |
| P130 | ACL 2026 | 主会 | CTX | A | Latent-Condensed Transformer for Efficient Long Context Modeling | [Agent记忆papers/P130.md](Agent记忆papers/P130.md) |
| P131 | ACL 2026 | **Findings（非主会）** | AGENT | A | Learning How to Remember: A Meta-Cognitive Management Method for Structured and Transferable Agent Memory | [Agent记忆papers/P131.md](Agent记忆papers/P131.md) |
| P132 | ACL 2026 | 主会 | AGENT | A | Long Context Modeling with Ranked Memory-Augmented Retrieval | [Agent记忆papers/P132.md](Agent记忆papers/P132.md) |
| P133 | ACL 2026 | 主会 | KV | A | Octopus: Gated Selective Attention for Memory-Bounded Long-Context Inference in Large Language Models | [Agent记忆papers/P133.md](Agent记忆papers/P133.md) |
| P134 | ACL 2026 | 主会 | CTX | A | Read As Human: Compressing Context via Parallelizable Close Reading and Skimming | [Agent记忆papers/P134.md](Agent记忆papers/P134.md) |
| P135 | ACL 2026 | 主会 | CTX | B | Stability Implies Redundancy: Delta Attention Selective Halting for Efficient Long-Context Prefilling | [Agent记忆papers/P135.md](Agent记忆papers/P135.md) |
| P136 | ACL 2026 | 主会 | BENCH | B | Ghost Context: Measuring Cross-Context Interference in Long-Context Language Models | [Agent记忆papers/P136.md](Agent记忆papers/P136.md) |
| P137 | ACL 2026 | 主会 | AGENT | B | Evidence-Augmented Policy Optimization with Reward Co-Evolution for Long-Context Reasoning | [Agent记忆papers/P137.md](Agent记忆papers/P137.md) |
| P194 | ACL 2026 | **Findings（非主会）** | ARCH | B | Beyond Memorization: Extending Reasoning Depth with Recurrence, Memory and Test-Time Compute Scaling | [Agent记忆papers/P194.md](Agent记忆papers/P194.md) |
| P195 | ACL 2026 | 主会 | AGENT | A | Learning How and What to Memorize: Cognition-Inspired Two-Stage Optimization for Evolving Memory | [Agent记忆papers/P195.md](Agent记忆papers/P195.md) |
| P196 | ACL 2026 | **Findings（非主会）** | ARCH | B | Memory Dial: A Training Framework for Controllable Memorization in Language Models | [Agent记忆papers/P196.md](Agent记忆papers/P196.md) |
| P197 | ACL 2026 | 主会 | VLM | B | From Verbatim to Gist: Distilling Pyramidal Multimodal Memory via Semantic Information Bottleneck for Long-Horizon Video Agents | [Agent记忆papers/P197.md](Agent记忆papers/P197.md) |
| P111 | ACL 2025 | 主会 | CTX | A | A Silver Bullet or a Compromise for Full Attention? A Comprehensive Study of Gist Token-based Context Compression | [Agent记忆papers/P111.md](Agent记忆papers/P111.md) |
| P112 | ACL 2025 | **Findings（非主会）** | AGENT | A | Dynamic Steering With Episodic Memory For Large Language Models | [Agent记忆papers/P112.md](Agent记忆papers/P112.md) |
| P113 | ACL 2025 | 主会 | CTX | A | Efficient Long Context Language Model Retrieval with Compression | [Agent记忆papers/P113.md](Agent记忆papers/P113.md) |
| P114 | ACL 2025 | 主会 | AGENT | A | In Prospect and Retrospect: Reflective Memory Management for Long-term Personalized Dialogue Agents | [Agent记忆papers/P114.md](Agent记忆papers/P114.md) |
| P115 | ACL 2025 | 主会 | CTX | A | Pretraining Context Compressor for Large Language Models with Embedding-Based Memory | [Agent记忆papers/P115.md](Agent记忆papers/P115.md) |
| P116 | ACL 2025 | 主会 | AGENT | A | Self-Taught Agentic Long Context Understanding | [Agent记忆papers/P116.md](Agent记忆papers/P116.md) |
| P117 | ACL 2025 | **Findings（非主会）** | BENCH | A | Evaluating the Long-Term Memory of Large Language Models | [Agent记忆papers/P117.md](Agent记忆papers/P117.md) |
| P118 | ACL 2025 | 主会 | CTX | B | Dynamic Chunking and Selection for Reading Comprehension of Ultra-Long Context in Large Language Models | [Agent记忆papers/P118.md](Agent记忆papers/P118.md) |
| P119 | ACL 2025 | 主会 | AGENT | B | Graph of Records: Boosting Retrieval Augmented Generation for Long-context Summarization with Graphs | [Agent记忆papers/P119.md](Agent记忆papers/P119.md) |
| P120 | ACL 2025 | 主会 | AGENT | B | Hierarchical Document Refinement for Long-context Retrieval-augmented Generation | [Agent记忆papers/P120.md](Agent记忆papers/P120.md) |
| P192 | ACL 2025 | 主会 | ARCH | B | If Attention Serves as a Cognitive Model of Human Memory Retrieval, What is the Plausible Memory Representation? | [Agent记忆papers/P192.md](Agent记忆papers/P192.md) |
| P193 | ACL 2025 | 主会 | ARCH | B | Learn to Memorize: Scalable Continual Learning in Semiparametric Models with Mixture-of-Neighbors Induction Memory | [Agent记忆papers/P193.md](Agent记忆papers/P193.md) |
| P138 | EMNLP 2025 | **Findings（非主会）** | AGENT | A | Pre-Storage Reasoning for Episodic Memory: Shifting Inference Burden to Memory for Personalized Dialogue | [Agent记忆papers/P138.md](Agent记忆papers/P138.md) |
| P139 | EMNLP 2025 | **Findings（非主会）** | CTX | A | Think Clearly: Improving Reasoning via Redundant Token Pruning | [Agent记忆papers/P139.md](Agent记忆papers/P139.md) |
| P140 | EMNLP 2025 | **Findings（非主会）** | KV | A | You Only Use Reactive Attention Slice When Retrieving From Long Context | [Agent记忆papers/P140.md](Agent记忆papers/P140.md) |
| P141 | EMNLP 2025 | 主会 | CTX | B | Recall with Reasoning: Chain-of-Thought Distillation for Mamba’s Long-Context Memory and Extrapolation | [Agent记忆papers/P141.md](Agent记忆papers/P141.md) |
| P142 | EMNLP 2025 | 主会 | KV | B | Cost-Optimal Grouped-Query Attention for Long-Context Modeling | [Agent记忆papers/P142.md](Agent记忆papers/P142.md) |
| P143 | EMNLP 2025 | **Findings（非主会）** | BENCH | B | Tree of Agents: Improving Long-Context Capabilities of Large Language Models through Multi-Perspective Reasoning | [Agent记忆papers/P143.md](Agent记忆papers/P143.md) |
| P198 | EMNLP 2025 | **Findings（非主会）** | ARCH | A | Learning What to Remember: Adaptive Probabilistic Memory Retention for Memory-Efficient Language Models | [Agent记忆papers/P198.md](Agent记忆papers/P198.md) |
| P144 | NAACL 2025 | **Findings（非主会）** | CTX | A | Perception Compressor: A Training-Free Prompt Compression Framework in Long Context Scenarios | [Agent记忆papers/P144.md](Agent记忆papers/P144.md) |
| P145 | NAACL 2025 | 主会 | BENCH | A | Prompt Compression for Large Language Models: A Survey | [Agent记忆papers/P145.md](Agent记忆papers/P145.md) |
| P146 | NAACL 2025 | 主会 | AGENT | A | Towards Lifelong Dialogue Agents via Timeline-based Memory Management | [Agent记忆papers/P146.md](Agent记忆papers/P146.md) |
| P147 | NAACL 2025 | 主会 | AGENT | B | Emergence of Episodic Memory in Transformers: Characterizing Changes in Temporal Structure of Attention Scores During Training | [Agent记忆papers/P147.md](Agent记忆papers/P147.md) |
| P148 | COLING 2025 | 主会 | AGENT | A | Compress to Impress: Unleashing the Potential of Compressive Memory in Real-World Long-Term Conversations | [Agent记忆papers/P148.md](Agent记忆papers/P148.md) |
| P149 | COLING 2025 | 主会 | ARCH | B | Flashback: Memory Mechanism for Enhancing Memory Efficiency and Speed in Deep Sequential Models | [Agent记忆papers/P149.md](Agent记忆papers/P149.md) |
| P150 | COLING 2025 | 主会 | AGENT | B | A Compressive Memory-based Retrieval Approach for Event Argument Extraction | [Agent记忆papers/P150.md](Agent记忆papers/P150.md) |
| P157 | IJCAI 2025 | 主会 | AGENT | A | AriGraph: Learning Knowledge Graph World Models with Episodic Memory for LLM Agents | [Agent记忆papers/P157.md](Agent记忆papers/P157.md) |
| P158 | IJCAI 2025 | 主会 | CTX | A | PCToolkit: A Unified Plug-and-Play Prompt Compression Toolkit of Large Language Models | [Agent记忆papers/P158.md](Agent记忆papers/P158.md) |
| P159 | IJCAI 2025 | 主会 | KV | A | RotateKV: Accurate and Robust 2-Bit KV Cache Quantization for LLMs via Outlier-Aware Adaptive Rotations | [Agent记忆papers/P159.md](Agent记忆papers/P159.md) |
| P160 | IJCAI 2025 | 主会 | KV | A | TreeKV: Smooth Key-Value Cache Compression with Tree Structures | [Agent记忆papers/P160.md](Agent记忆papers/P160.md) |
| P162 | CVPR 2026 | 主会 | VLM | A | MuKV: Multi-Grained KV Cache Compression for Long Streaming Video Question-Answering | [Agent记忆papers/P162.md](Agent记忆papers/P162.md) |
| P163 | CVPR 2026 | 主会 | VLM | A | Revisiting Multimodal KV Cache Compression: A Frequency-Domain-Guided Outlier-KV-Aware Approach | [Agent记忆papers/P163.md](Agent记忆papers/P163.md) |
| P164 | CVPR 2026 | 主会 | VLM | B | STAC: Plug-and-Play Spatio-Temporal Aware Cache Compression for Streaming 3D Reconstruction | [Agent记忆papers/P164.md](Agent记忆papers/P164.md) |
| P165 | CVPR 2026 | 主会 | VLM | B | VecAttention: Vector-wise Sparse Attention for Accelerating Long Context Inference | [Agent记忆papers/P165.md](Agent记忆papers/P165.md) |
| P166 | CVPR 2026 | 主会 | AGENT | B | Interactive Episodic Memory with User Feedback | [Agent记忆papers/P166.md](Agent记忆papers/P166.md) |
| P167 | CVPR 2026 | 主会 | AGENT | B | Explore with Long-term Memory: A Benchmark and Multimodal LLM-based Reinforcement Learning Framework for Embodied Exploration | [Agent记忆papers/P167.md](Agent记忆papers/P167.md) |
| P161 | ICCV 2025 | 主会 | VLM | A | AirCache: Activating Inter-modal Relevancy KV Cache Compression for Efficient Large Vision-Language Model Inference | [Agent记忆papers/P161.md](Agent记忆papers/P161.md) |
| P168 | ICCV 2025 | 主会 | VLM | B | FrameFusion: Combining Similarity and Importance for Video Token Reduction on Large Vision Language Models | [Agent记忆papers/P168.md](Agent记忆papers/P168.md) |
| P169 | ICCV 2025 | 主会 | VLM | B | VFlowOpt: A Token Pruning Framework for LMMs with Visual Information Flow-Guided Optimization | [Agent记忆papers/P169.md](Agent记忆papers/P169.md) |

## 二、相关但未逐篇精读的论文（按会议列出）

以下论文在关键词筛选中与本方向相关，属于相邻簇：多模态/视频/3D 的视觉 token 压缩、长上下文训练与位置外推、记忆评测与认知建模、稀疏注意力加速等。列出以便覆盖完整性核查。

### ICLR 2026（88 篇）

- A Biologically Plausible Dense Associative Memory with Exponential Capacity
- A Memory-Efficient Hierarchical Algorithm for Large-scale Optimal Transport Problems
- Adaptive Hopfield Network: Rethinking Similarities in Associative Memory
- AgilePruner: An Empirical Study of Attention and Diversity for Adaptive Visual Token Pruning in Large Vision-Language Models
- AMemGym: Interactive Memory Benchmarking for Assistants in Long-Horizon Conversations
- Arbitrary-Order Block SignSGD for Memory-Efficient LLM Fine-Tuning
- Are LLMs Really Not Knowledgeable? Mining the Submerged Knowledge in LLMs&#x27; Memory
- AssoMem: Scalable Memory QA with Multi-Signal Associative Retrieval
- Beyond Markovian Drifts: Action-Biased Geometric Walks with Memory for Personalized Summarization
- BrowseNet: Graph-Based Associative Memory for Contextual Information Retrieval
- Building spatial world models from sparse transitional episodic memories
- CIMemories: A Compositional Benchmark For Contextual Integrity In LLMs
- CoMem: Compositional Concept-Graph Memory for Vision–Language Adaptation
- Composition of Memory Experts for Diffusion World Models
- Cross-Timestep: 3D Diffusion Model with Trans-temporal Memory LSTM and Adaptive Priori Decoding Strategy for Medical Segmentation
- Dual-Scale World Memory for LLM Agents towards Hard-Exploration Problems
- Dynamical properties of dense associative memory
- Efficient-SAM2: Accelerating SAM2 with Object-Aware Visual Encoding and Memory Retrieval
- ELMUR: External Layer Memory with Update/Rewrite for Long-Horizon RL Problems
- Embodied Agents Meet Personalization: Investigating Challenges and Solutions Through the Lens of Memory Utilization
- Enhancing Vision Transformers for Object Detection via Context-Aware Token Selection and Packing
- Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions
- Evoking User Memory: Personalizing LLM via Recollection-Familiarity Adaptive Retrieval
- Exploratory Memory-Augmented LLM Agent via Hybrid On- and Off-Policy Optimization
- Fast-dLLM: Training-free Acceleration of Diffusion LLM by Enabling KV Cache and Parallel Decoding
- FlashVID: Efficient Video Large Language Models via Training-free Tree-based Spatiotemporal Token Merging
- FLoC: Facility Location-Based Efficient Visual Token Compression for Long Video Understanding
- FlowSearcher: Synthesizing Memory-Guided Agentic Workflows for Web Information Seeking
- Forget Forgetting: Continual Learning in a World of Abundant Memory
- Fresh in memory: Training-order recency is linearly encoded in language model activations
- GraphPlanner: Graph Memory-Augmented Agentic Routing for Multi-Agent LLMs
- HiDrop: Hierarchical Vision Token Reduction in MLLMs via Late Injection, Concave Pyramid Pruning, and Early Exit
- Hippoformer: Integrating Hippocampus-inspired Spatial Memory with Transformers
- Image Can Bring Your Memory Back: A Novel Multi-Modal Guided Attack against Image Generation Model Unlearning
- Improving Code Localization with Repository Memory
- IncVGGT: Incremental VGGT for Memory-Bounded Long-Range 3D Reconstruction
- IVC-Prune: Revealing the Implicit Visual Coordinates in LVLMs for Vision Token Pruning
- JanusVLN: Decoupling Semantics and Spatiality with Dual Implicit Memory for Vision-Language Navigation
- LearnPruner: Rethinking Attention-based Token Pruning in Vision Language Models
- Leveraging Data to Say No: Memory Augmented Plug-and-Play Selective Prediction
- MaRS: Memory-Adaptive Routing for Reliable Capacity Expansion and Knowledge Retention
- MEGS^{2}: Memory-Efficient Gaussian Splatting via Spherical Gaussians and Unified Pruning
- MEM1: Learning to Synergize Memory and Reasoning for Efficient Long-Horizon Agents
- MemGen: Weaving Generative Latent Memory for Self-Evolving Agents
- Memory-Free Continual Learning with Null Space Adaptation for Zero-Shot Vision-Language Models
- Memory-Statistics Tradeoff in Continual Learning with Structural Regularization
- Memory-T1: Reinforcement Learning for Temporal Reasoning in Multi-session Agents
- Memory, Benchmark &amp; Robots: A Benchmark for Solving Complex Tasks with Reinforcement Learning
- MemoryVLA: Perceptual-Cognitive Memory in Vision-Language-Action Models for Robotic Manipulation
- MeSH: Memory-as-State-Highways for Recursive Transformers
- MIRA: Memory-Integrated Reinforcement Learning Agent with Limited LLM Guidance
- MLP Memory: A Retriever-Pretrained Memory for Large Language Models
- Modal Aphasia: Can Unified Multimodal Models Describe Images From Memory?
- MoM: Linear Sequence Modeling with Mixture-of-Memories
- MRAD: Zero-Shot Anomaly Detection with Memory-Driven Retrieval
- Multi-Agent Debate with Memory Masking
- Muon Outperforms Adam in Tail-End Associative Memory Learning
- Not All Bits Are Equal: Scale-Dependent Memory Optimization Strategies for Reasoning Models
- Nüwa: Mending the Spatial Integrity Torn by VLM Token Pruning
- Out of the Memory Barrier: A Highly Memory-Efficient Training System for LLMs with Million-Token Contexts
- Planning with an Embodied Learnable Memory
- PPE: Positional Preservation Embedding for Token Compression in Multimodal Large Language Models
- Pre-training Limited Memory Language Models with Internal and External Knowledge
- PrefixMemory-Tuning: Modernizing Prefix-Tuning by Decoupling the Prefix from Attention
- Pretraining with hierarchical memories: separating long-tail and common knowledge
- Prune Redundancy, Preserve Essence: Vision Token Compression in VLMs via Synergistic Importance-Diversity
- QKV Projections Require a Fraction of Their Memory
- Quantized Gradient Projection for Memory-Efficient Continual Learning
- ReasoningBank: Scaling Agent Self-Evolving with Reasoning Memory
- Recurrent Action Transformer with Memory
- Redirection for Erasing Memory (REM): Towards a universal unlearning method for corrupted data
- Scaling up Memory for Robotic Control via Experience Retrieval
- SinkTrack: Attention Sink based Context Anchoring for Large Language Models
- SP-VLA: A Joint Model Scheduling and Token Pruning Approach for VLA Model Acceleration
- ssToken: Self-modulated and Semantic-aware Token Selection for LLM Fine-tuning
- Study of Training Dynamics for Memory-Constrained Fine-Tuning
- Sublinear Spectral Clustering Oracle with Little Memory
- SURGE: Surprise-Guided Token Reduction for Efficient Video Understanding with VLMs
- Task-Related Token Compression in Multimodal Large Language Models from an Explainability Perspective
- Temporal superposition and feature geometry of RNNs under memory demands
- Three Forward, One Backward: Memory-Efficient Full-Rank Fine-Tuning of Large Models via Extra Forward Passes
- TokMem: One-Token Procedural Memory for Large Language Models
- Towards Lossless Memory-efficient Training of Spiking Neural Networks via Gradient Checkpointing and Spike Compression
- TP-Spikformer: Token Pruned Spiking Transformer
- Transformers as Measure-Theoretic Associative Memory: A Statistical Perspective and Minimax Optimality
- Unraveling the Complexity of Memory in RL Agents: an Approach for Classification and Evaluation
- VisionTrim: Unified Vision Token Compression for Training-Free MLLM Acceleration
- What &quot;Not&quot; to Detect: Negation-Aware VLMs via Structured Reasoning and Token Merging

### NeurIPS 2025（74 篇）

- 3DLLM-Mem: Long-Term Spatial-Temporal Memory for Embodied 3D Large Language Model
- Active Target Discovery under Uninformative Priors: The Power of Permanent and Transient Memory
- Agentic Plan Caching: Test-Time Memory for Fast and Cost-Efficient LLM Agents
- Analog In-memory Training on General Non-ideal Resistive Elements: The Impact of Response Functions
- Attention Sinks: A &#x27;Catch, Tag, Release&#x27; Mechanism for Embeddings
- Attribution-Driven Adaptive Token Pruning for Transformers
- Balanced Token Pruning: Accelerating Vision Language Models Beyond Local Optimization
- Beyond Attention or Similarity: Maximizing Conditional Diversity for Token Pruning in MLLMs
- Bit-swapping Oriented Twin-memory Multi-view Clustering in Lifelong Incomplete Scenarios
- Black-Box Membership Inference Attack for LVLMs via Prior Knowledge-Calibrated Memory Probing
- BMW: Bidirectionally Memory bank reWriting for Unsupervised Person Re-Identification
- Compact Memory for Continual Logistic Regression
- Compress &amp; Cache: Vision token compression for efficient generation and retrieval
- Computation and Memory-Efficient Model Compression with Gradient Reweighting
- Dense Associative Memory with Epanechnikov Energy
- EDELINE: Enhancing Memory in Diffusion-based World Models via Linear-Time Sequence Modeling
- Efficient Allocation of Working Memory Resource for Utility Maximization in Humans and Recurrent Neural Networks
- EMLoC: Emulator-based Memory-efficient Fine-tuning with LoRA Correction
- Exponential Dynamic Energy Network for High Capacity Sequence Memory
- Fire360: A Benchmark for Robust Perception and Episodic Memory in Degraded 360° Firefighting Video
- FLAME: Fast Long-context Adaptive Memory for Event-based Vision
- FlexSelect: Flexible Token Selection for Efficient Long Video Understanding
- Fourier Token Merging: Understanding and Capitalizing Frequency Domain for Efficient Image Generation
- Frequency-Aware Token Reduction for Efficient Vision Transformer
- Future Link Prediction Without Memory or Aggregation
- G-Memory: Tracing Hierarchical Memory for Multi-Agent Systems
- Harmony in Divergence: Towards Fast, Accurate, and Memory-efficient Zeroth-order LLM Fine-tuning
- HoliTom: Holistic Token Merging for Fast Video Large Language Models
- How Memory in Optimization Algorithms Implicitly Modifies the Loss
- HyRF: Hybrid Radiance Fields for Memory-efficient and High-quality Novel View Synthesis
- Kinaema: a recurrent sequence model for memory and pose in motion
- Learning Memory-Enhanced Improvement Heuristics for Flexible Job Shop Scheduling
- Learning to Focus: Causal Attention Distillation via Gradient‐Guided Token Pruning
- Less Is More, but Where? Dynamic Token Compression via LLM-Guided Keyframe Prior
- Memo: Training Memory-Efficient Embodied Agents with Reinforcement Learning
- Memory by accident: a theory of learning as a byproduct of network stabilization
- Memory Decoder: A Pretrained, Plug-and-Play Memory for Large Language Models
- Memory Injection Attacks on LLM Agents via Query-Only Interaction
- Memory Mosaics at scale
- Memory-Augmented Potential Field Theory: A Framework for Adaptive Control in Non-Convex Domains
- Memory-Efficient Training with In-Place FFT Implementation
- Memory-Enhanced Neural Solvers for Routing Problems
- Memory-Integrated Reconfigurable Adapters: A Unified Framework for Settings with Multiple Tasks
- MemSim: A Bayesian Simulator for Evaluating Memory of LLM-based Personal Assistants
- MISA: Memory-Efficient LLMs Optimization with Module-wise Importance Sampling
- NestedFP: High-Performance, Memory-Efficient Dual-Precision Floating Point Support for LLMs
- Point3R: Streaming 3D Reconstruction with Explicit Spatial Pointer Memory
- PPMStereo: Pick-and-Play Memory Construction for Consistent Dynamic Stereo Matching
- Recurrent Attention-based Token Selection for Efficient Streaming Video-LLMs
- Recurrent Memory for Online Interdomain Gaussian Processes
- REMI: Reconstructing Episodic Memory During Internally Driven Path Planning
- Robust Ego-Exo Correspondence with Long-Term Memory
- Robust Hallucination Detection in LLMs via Adaptive Token Selection
- SALoM: Structure Aware Temporal Graph Networks with Long-Short Memory Updater
- SAM2Flow: Interactive Optical Flow Estimation with Dual Memory for in vivo Microcirculation Analysis
- SCOPE: Saliency-Coverage Oriented Token Pruning for Efficient Multimodel LLMs
- Steering Information Utility in Key-Value Memory for Language Model Post-Training
- StreamBP: Memory-Efficient Exact Backpropagation for Long Sequence Training of LLMs
- StreamForest: Efficient Online Video Understanding with Persistent Event Memory
- StruDiCO: Structured Denoising Diffusion with Gradient-free Inference-stage Boosting for Memory and Time Efficient Combinatorial Optimization
- SUMO: Subspace-Aware Moment-Orthogonalization for Accelerating Memory-Efficient LLM Training
- Towards General Continuous Memory for Vision-Language Models
- Transformer Key-Value Memories Are Nearly as Interpretable as Sparse Autoencoders
- VCM: Vision Concept Modeling with Adaptive Vision Token Compression via Instruction Fine-Tuning
- Video World Models with Long-term Spatial Memory
- VideoLucy: Deep Memory Backtracking for Long Video Understanding
- VideoTitans: Scalable Video Prediction with Integrated Short- and Long-term Memory
- Vision-centric Token Compression in Large Language Model
- VQToken: Neural Discrete Token Representation Learning for Extreme Token Reduction in Video Large Language Models
- What are you sinking? A geometric approach on attention sink
- Why 1 + 1 &lt; 1 in Visual Token Pruning: Beyond Naive Integration via Multi-Objective Balanced Covering
- WorldMem: Long-term Consistent World Simulation with Memory
- xLSTM-Mixer: Multivariate Time Series Forecasting by Mixing via Scalar Memories
- Zero-shot World Models via Search in Memory

### ICML 2025（38 篇）

- A Cognac Shot To Forget Bad Memories: Corrective Unlearning for Graph Neural Networks
- A Memory Efficient Randomized Subspace Optimization Method for Training Large Language Models
- Agent Reviewers: Domain-specific Multimodal Agents with Shared Memory for Paper Review
- Agent Workflow Memory
- Backdoor Attacks in Token Selection of Attention Mechanism
- Benign Overfitting in Token Selection of Attention Mechanism
- Ca2-VDM: Efficient Autoregressive Video Diffusion Model with Causal Generation and Cache Sharing
- CoMemo: LVLMs Need Image Context with Image Memory
- ConfPO: Exploiting Policy Model Confidence for Critical Token Selection in Preference Optimization
- Decision Mixer: Integrating Long-term and Local Dependencies via Dynamic Token Selection for Decision-Making
- Determinant Estimation under Memory Constraints and Neural Scaling Laws
- Dynamical phases of short-term memory mechanisms in RNNs
- Efficient Time Series Processing for Transformers and State-Space Models through Token Merging
- ELMO : Efficiency via Low-precision and Peak Memory Optimization in Large Output Spaces
- FloE: On-the-Fly MoE Inference on Memory-constrained GPU
- From RAG to Memory: Non-Parametric Continual Learning for Large Language Models
- From Weight-Based to State-Based Fine-Tuning: Further Memory Reduction on LoRA with Parallel Control
- FRUGAL: Memory-Efficient Optimization by Reducing State Overhead for Scalable Training
- Highly Compressed Tokenizer Can Generate Without Training
- Improving Memory Efficiency for Training KANs via Meta Learning
- In-Context Denoising with One-Layer Transformers: Connections between Attention and Associative Memory Retrieval
- In-Context Learning as Conditioned Associative Memory Retrieval
- Joint MoE Scaling Laws: Mixture of Experts Can Be Memory Efficient
- Lego Sketch: A Scalable Memory-augmented Neural Network for Sketching Data Streams
- Look Twice Before You Answer: Memory-Space Visual Retracing for Hallucination Mitigation in Multimodal Large Language Models
- Memory Layers at Scale
- Minerva: A Programmable Memory Test Benchmark for Language Models
- Oracle-MoE: Locality-preserving Routing in the Oracle Space for Memory-constrained Large Language Model Inference
- OrthoRank: Token Selection via Sink Token Orthogonality for Efficient LLM inference
- Partially Observable Reinforcement Learning with Memory Traces
- PENCIL: Long Thoughts with Short Memory
- PipeOffload: Improving Scalability of Pipeline Parallelism with Memory Optimization
- Quantifying Memory Utilization with Effective State-Size
- RWKVQuant: Quantizing the RWKV Family with Proxy Guided Hybrid of Scalar and Vector Quantization
- Skrr: Skip and Re-use Text Encoder Layers for Memory Efficient Text-to-Image Generation
- Tensor Decomposition Based Memory-Efficient Incremental Learning
- ToMA: Token Merge with Attention for Diffusion Models
- Towards flexible perception with visual memory

### ICLR 2025（43 篇）

- 3D-SPATIAL MULTIMODAL MEMORY
- AdaRankGrad: Adaptive Gradient Rank and Moments for Memory-Efficient LLMs Training and Fine-Tuning
- Addax: Utilizing Zeroth-Order Gradients to Improve Memory Efficiency and Performance of SGD for Fine-Tuning Language Models
- Adjoint Matching: Fine-tuning Flow and Diffusion Generative Models with Memoryless Stochastic Optimal Control
- An Evolved Universal Transformer Memory
- Associative memory and dead neurons
- BitStack: Any-Size Compression of Large Language Models in Variable Memory Environments
- ChemAgent: Self-updating Memories in Large Language Models Improves Chemical Reasoning
- COAT: Compressing Optimizer states and Activations for Memory-Efficient FP8 Training
- Connectome Mapping: Shape-Memory Network via Interpretation of Contextual Semantic Information
- DelTA: An Online Document-Level Translation Agent Based on Multi-Level Memory
- Episodic Memories Generation and Evaluation Benchmark for Large Language Models
- Federated Continual Learning Goes Online: Uncertainty-Aware Memory Management for Vision Tasks and Beyond
- From Isolated Conversations to Hierarchical Schemas: Dynamic Tree Memory Representation for LLMs
- HOPE for a Robust Parameterization of Long-memory State Space Models
- Learning Successor Features with Distributed Hebbian Temporal Memory
- LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory
- Memory Efficient Transformer Adapter for Dense Predictions
- Memory Mosaics
- Mini-batch Coresets for Memory-efficient Language Model Training on Data Mixtures
- MIRACLE 3D: Memory-efficient Integrated Robust Approach for Continual Learning on 3D Point Clouds via Shape Model Construction
- MrSteve: Instruction-Following Agents in Minecraft with What-Where-When Memory
- MrT5: Dynamic Token Merging for Efficient Byte-level Language Models
- Mutual Effort for Efficiency: A Similarity-based Token Pruning for Vision Transformers in Self-Supervised Learning
- On the Benefits of Memory for Modeling Time-Dependent PDEs
- Parameter and Memory Efficient Pretraining via Low-rank Riemannian Optimization
- Precise Localization of Memories: A Fine-grained Neuron-level Knowledge Editing Technique for LLMs
- SeCom: On Memory Construction and Retrieval for Personalized Conversational Agents
- See What You Are Told: Visual Attention Sink in Large Multimodal Models
- SGD with memory: fundamental properties and stochastic acceleration
- Stable Hadamard Memory: Revitalizing Memory-Augmented Agents for Reinforcement Learning
- State Space Models are Provably Comparable to Transformers in Dynamic Token Selection
- Streaming Video Question-Answering with In-context Video KV-Cache Retrieval
- Streaming Video Understanding and Multi-round Interaction with Memory-enhanced Knowledge
- TempMe: Video Temporal Token Merging for Efficient Text-Video Retrieval
- Towards Continuous Reuse of Graph Models via Holistic Memory Diversification
- Track-On: Transformer-based Online Point Tracking with Memory
- Train Small, Infer Large: Memory-Efficient LoRA Training for Large Language Models
- Ultra-Sparse Memory Network
- Uncovering Latent Memories in Large Language Models
- Understanding Factual Recall in Transformers via Associative Memories
- Unlearning or Obfuscating? Jogging the Memory of Unlearned LLMs via Benign Relearning
- When Attention Sink Emerges in Language Models: An Empirical View

### NeurIPS 2024（44 篇）

- 4-bit Shampoo for Memory-Efficient Network Training
- A Gradient Accumulation Method for Dense Retriever under Memory Constraint
- Accelerating Transformers with Spectrum-Preserving Token Merging
- AgentPoison: Red-teaming LLM Agents via Poisoning Memory or Knowledge Bases
- An Efficient Memory Module for Graph Few-Shot Class-Incremental Learning
- Attractor Memory for Long-Term Time Series Forecasting: A Chaos Perspective
- B&#x27;MOJO: Hybrid State Space Realizations of Foundation Models with Eidetic and Fading Memory
- BAdam: A Memory Efficient Full Parameter Optimization Method for Large Language Models
- CoMERA: Computing- and Memory-Efficient Training via Rank-Adaptive Tensor Optimization
- Dense Associative Memory Through the Lens of Random Features
- Do LLMs dream of elephants (when told not to)? Latent concept association and associative memory in transformers
- Expanding Sparse Tuning for Low Memory Usage
- Exploiting the Replay Memory Before Exploring the Environment: Enhancing Reinforcement Learning Through Empirical MDP Iteration
- Exploring Token Pruning in Vision State Space Models
- F-OAL: Forward-only Online Analytic Learning with Fast Training and Low Memory Footprint in Class Incremental Learning
- Fast and Memory-Efficient Video Diffusion Using Streamlined Inference
- Geometry of naturalistic object representations in recurrent neural network models of working memory
- Interpretable Concept-Based Memory Reasoning
- KOALA: Empirical Lessons Toward Memory-Efficient and Fast Diffusion Models for Text-to-Image Synthesis
- LISA: Layerwise Importance Sampling for Memory-Efficient Large Language Model Fine-Tuning
- LoCo: Learning 3D Location-Consistent Image Features with a Memory-Efficient Ranking Loss
- Memory-Efficient Gradient Unrolling for Large-Scale Bi-level Optimization
- Memory-Efficient LLM Training with Online Subspace Descent
- MemoryFormer : Minimize Transformer Computation by Removing Fully-Connected Layers
- MemVLT: Vision-Language Tracking with Adaptive Memory-based Prompts
- Mini-Sequence Transformers: Optimizing Intermediate Memory for Long Sequences Training
- Mixture of Scales: Memory-Efficient Token-Adaptive Binarization for Large Language Models
- Online Adaptation of Language Models with a Memory of Amortized Contexts
- Optimus-1: Hybrid Multimodal Memory Empowered Agents Excel in Long-Horizon Tasks
- Pipeline Parallelism with Controllable Memory
- Provably Optimal Memory Capacity for Modern Hopfield Models: Transformer-Compatible Dense Associative Memories as Spherical Codes
- Rethinking Memory and Communication Costs for Efficient Data Parallel Training of Large Language Models
- Sketched Lanczos uncertainty score: a low-memory summary of the Fisher information
- SLTrain: a sparse plus low rank approach for parameter and memory efficient pretraining
- The Collusion of Memory and Nonlinearity in Stochastic Approximation With Constant Stepsize
- Thinking Forward: Memory-Efficient Federated Finetuning of Language Models
- Token Merging for Training-Free Semantic Binding in Text-to-Image Synthesis
- Towards Exact Gradient-based Training on Analog In-memory Computing
- Towards General Loop Invariant Generation: A Benchmark of Programs with Memory Manipulation
- VeLoRA: Memory Efficient Training using Rank-1 Sub-Token Projections
- Video Token Merging for Long Video Understanding
- VLM Agents Generate Their Own Memories: Distilling Experience into Embodied Programs of Thought
- WISE: Rethinking the Knowledge Memory for Lifelong Model Editing of Large Language Models
- xLSTM: Extended Long Short-Term Memory

### AAAI 26（61 篇）

- A Robust Unlearning Method with Adaptive Knowledge Guidance and Memory Preservation
- CATP: Contextually Adaptive Token Pruning for Efficient and Enhanced Multimodal In-Context Learning
- CMMCoT: Enhancing Complex Multi-Image Comprehension via Multi-Modal Chain-of-Thought and Memory Augmentation
- CogniTrust: Cognitive Memory-Driven Verifiable Supervision for Robust Hashing
- CommitMoE: Efficient Fallback-Free MoE Inference with Offloading Under GPU Memory Constraints
- Commonality in Few: Few-Shot Multimodal Anomaly Detection via Hypergraph-Enhanced Memory
- ComoRAG: A Cognitive-Inspired Memory-Organized RAG for Stateful Long Narrative Reasoning
- CompTrack: Information Bottleneck-Guided Low-Rank Dynamic Token Compression for Point Cloud Tracking
- Constrained Online Convex Optimization with Memory and Predictions
- Contribution-aware Token Compression for Efficient Video Understanding via Reinforcement Learning
- D²Pruner: Debiased Importance and Structural Diversity for MLLM Token Pruning
- D3ToM: Decider-Guided Dynamic Token Merging for Accelerating Diffusion MLLMs
- Depth-Synergized Mamba Meets Memory Experts for All-Day Image Reflection Separation
- Distillation-Guided Structural Transfer for Continual Learning Beyond Sparse Distributed Memory
- DMGINE: Day-Memory Guided Nighttime Image Enhancement for Dynamic Traffic Scenes
- EAGLE: Episodic Appearance- and Geometry-aware Memory for Unified 2D-3D Visual Query Localization in Egocentric Vision
- Echoless Label-Based Pre-computation for Memory-Efficient Heterogeneous Graph Learning
- EHL*: Memory-Budgeted Indexing for Ultrafast Optimal Euclidean Pathfinding
- Evolving Generalist Virtual Agents with Generative and Associative Memory
- Expandable and Differentiable Dual Memories with Orthogonal Regularization for Exemplar-free Continual Learning
- FastDriveVLA: Efficient End-to-End Driving via Plug-and-Play Reconstruction-based Token Pruning
- Filter, Correlate, Compress: Training-Free Token Reduction for MLLM Acceleration
- FlashSVD: Memory-Efficient Inference with Streaming for Low-Rank Models
- FreeMem: Enhancing Consistency in Long Video Generation via Tuning-Free Memory
- From Passive Perception to Active Memory: A Weakly Supervised Image Manipulation Localization Framework Driven by Coarse-Grained Annotations
- HCC-3D: Hierarchical Compensatory Compression for 98% 3D Token Reduction in Vision-Language Models
- Instruction-Guided Cross-Modal Clustering for Training-Free Visual Token Pruning in Vision-Language Models
- Invariant Representation Learning for Memory Behavior Modeling via Adaptive Environment Separation
- LifeAlign: Lifelong Alignment for Large Language Models with Memory-Augmented Focalized Preference Optimization
- Localized Near Surface Temperature Inversion Forecasting Using Long Short-Term Memory
- MacVQA: Adaptive Memory Allocation and Global Noise Filtering for Continual Visual Question Answering
- ME-SFDA: Marginal Exploration with Pyramidal Atkinson-Shiffrin Memory for Source-Free Domain Adaptation
- Mem-PAL: Towards Memory-based Personalized Dialogue Assistants for Long-term User-Agent Interaction
- Mem4D: Decoupling Static and Dynamic Memory for Dynamic Scene Reconstruction
- MemeBQ:Memory Efficient Binary Quantization of LLMs
- MemGuide: Intent-Driven Memory Selection for Goal-Oriented Multi-Session LLM Agents
- MemoryART: Enhancing LLMs via Multi-Memory Models with Adaptive Resonance Theory for Healthcare Agents
- MergeDNA: Context-Aware Genome Modeling with Dynamic Tokenization Through Token Merging
- MR-COSMO: Visual-Text Memory Recall and Direct CrOSs-MOdal Alignment Method for Query-Driven 3D Segmentation
- MUTrack: A Memory-Aware Unified Representation Framework for Visual Tracking
- Octopus: Entropy-Controlled Science Fiction Literature Generation with Persistent Memory-Context Binding
- PanoNav: Mapless Zero-Shot Object Navigation with Panoramic Scene Parsing and Dynamic Memory
- Parameter-, Memory-, Time-Efficient Multi-Task Dense Vision Adaptation
- PosPrune: Visual Token Pruning with Positional Bias Correction for Efficient Large Vision-Language Models
- PRIME: Planning and Retrieval-Integrated Memory for Enhanced Reasoning
- Rethinking Progression of Memory State in Robotic Manipulation: An Object-Centric Perspective
- Rethinking Visual Token Reduction in LVLMs Under Cross-Modal Misalignment
- RetroLM: Retrieval-Augmented KVs for Long-Context Processing
- SatSolarCast: A Flexible Framework for Multimodal Solar Irradiance Forecasting via Memory-Alignment Learning
- SegMem-RAG: Adaptive Memory for Retrieval-Augmented Generation in Open-Ended Knowledge Environments
- Sharp Eyes and Memory for VideoLLMs: Information-Aware Visual Token Pruning for Efficient and Reliable VideoLLM Reasoning
- SlimInfer: Accelerating Long-Context LLM Inference via Dynamic Token Pruning
- Spike Stream Memory Transfer for Dynamic Scene Reconstruction
- STEP-Nav: Spatial-Temporal Efficient Visual Token Pruning for Vision-and-Language Navigation with Large Language Models
- TinyChemVL: Advancing Chemical Vision-Language Models via Efficient Visual Token Reduction and Complex Reaction Tasks
- TOP-RL: Task-Optimized Progressive Token Pruning with Reinforcement Learning for Vision Language Models
- Training-Free Spatio-temporal Decoupled Reasoning Video Segmentation with Adaptive Object Memory
- Trustworthy Classification for Complex Social Surveys: A Memory-Enhanced Hierarchical Framework with Calibrated Uncertainty
- UMNet: Uncertainty-guided Memory Network for Hyperspectral Pansharpening
- V-Pruner: A Fast and Globally-informed Token Pruning Framework for Vision Transformer
- Vision-language Incremental Learning with Dual Class-individual Memory

### AAAI 25（22 篇）

- Active Geospatial Search for Efficient Tenant Eviction Outreach
- ALRMR-GEC: Adjusting Learning Rate Based on Memory Rate to Optimize the Edit Scorer for Grammatical Error Correction
- Deep Reinforcement Learning with Time-Scale Invariant Memory
- DP-MemArc: Differential Privacy Transfer Learning for Memory Efficient Language Models
- Editing Memories Through Few Targeted Neurons
- Filling Memory Gaps: Enhancing Continual Semantic Parsing via SQL Syntax Variance-Guided LLMs Without Real Data Replay
- Fit and Prune: Fast and Training-free Visual Token Pruning for Multi-modal Large Language Models
- FreqTS: Frequency-Aware Token Selection for Accelerating Diffusion Models
- Graph Mixture of Experts and Memory-augmented Routers for Multivariate Time Series Anomaly Detection
- HiCM²: Hierarchical Compact Memory Modeling for Dense Video Captioning
- HiRED: Attention-Guided Token Dropping for Efficient Inference of High-Resolution Vision-Language Models
- Interweaving Memories of a Siamese Large Language Model
- MaskViM: Domain Generalized Semantic Segmentation with State Space Models
- Memory Efficient Matting with Adaptive Token Routing
- Memory-Augmented Re-Completion for 3D Semantic Scene Completion
- Memory-Reduced Meta-Learning with Guaranteed Convergence
- Multimodal Promptable Token Merging for Diffusion Models
- Planning from Imagination: Episodic Simulation and Episodic Memory for Vision-and-Language Navigation
- SMMF: Square-Matricized Momentum Factorization for Memory-Efficient Optimization
- TinyFoA: Memory Efficient Forward-Only Algorithm for On-Device Learning
- Training-Free and Hardware-Friendly Acceleration for Diffusion Models via Similarity-based Token Pruning
- What Kind of Visual Tokens Do We Need? Training-Free Visual Token Pruning for Multi-Modal Large Language Models from the Perspective of Graph

### ACL 2026（31 篇）

- Are We Using the Right Benchmark: An Evaluation Framework for Visual Token Compression Methods
- Attention Sinks Are Provably Necessary in Softmax Transformers: Evidence from Trigger-Conditional Tasks
- Attention Sinks in Diffusion Language Models
- Branch-and-Browse: Efficient and Controllable Web Exploration with Tree-Structured Reasoning and Action Memory
- Conditional Memory via Scalable Lookup: A New Axis of Sparsity for Large Language Models
- Conflict-Aware Memory for Embodied Agents: Enhancing Vector Data Quality via Detection Rules
- Controllable Memory Usage: Balancing Anchoring and Innovation in Long-Term Human–Agent Interaction
- Demystify the Role of Memory in Machine Learning Engineering Agents
- Does Memory Need Graphs? A Unified Framework and Empirical Analysis for Long-Term Dialog Memory
- Dual-Cluster Memory Agent: Resolving Multi-Paradigm Ambiguity in Optimization Problem Solving
- Evaluating Humanlike Memory Effects in Transformers Using Item Recognition Tasks
- Evaluating Memory Capability in Continuous Lifelog Scenario
- From Pseudo-Balancing to True Specialization: Memory-Aware Routing for Mixture-of-Experts
- Hybrid Self-evolving Structured Memory for Computer-Use Agents
- Inside Out: Evolving User-Centric Core Memory Trees for Long-Term Personalized Dialogue Systems
- Linear-Time and Constant-Memory Text Embeddings Based on Recurrent Language Models
- Memory as Action: Autonomous Context Curation for Long-Horizon Agentic Tasks
- Memory efficiency and resource-rational encoding in sentence processing
- Memory Matters More: Event-Centric Memory as a Logic Map for Agent Searching and Reasoning
- Memory-Guided Hard Data Augmentation for Multimodal Named Entity Recognition
- Memory-R1: Enhancing Large Language Model Agents to Manage and Utilize Memories via Reinforcement Learning
- Memp: Exploring Agent Procedural Memory
- Nirvana: A Specialized Generalist Model With Task-Aware Memory Mechanism
- Reasoning with Memory: Adaptive Information Management for Retrieval-Augmented Generation
- Reducing Peak Memory Usage for Modern Multimodal Large Language Model Pipelines
- Remember Me, Refine Me: A Dynamic Procedural Memory Framework for Experience-Driven Agent Evolution
- Softpick: No Attention Sink, No Massive Activations with Rectified Softmax
- Structured Episodic Event Memory
- Visual and Memory–Augmented Soccer Commentary Generation
- Visual Inception: Compromising Long-term Planning in Agentic Recommenders via Multimodal Memory Poisoning
- Working Memory Constraints Scaffold Learning in Transformers under Data Scarcity

### ACL 2025（14 篇）

- Decoupling Memories, Muting Neurons: Towards Practical Machine Unlearning for Large Language Models
- Developmentally-plausible Working Memory Shapes a Critical Period for Language Acquisition
- Disentangling Memory and Reasoning Ability in Large Language Models
- Efficient and Accurate Prompt Optimization: the Benefit of Memory in Exemplar-Guided Reflection
- Forward Knows Efficient Backward Path: Saliency-Guided Memory-Efficient Fine-tuning of Large Language Models
- Improve Language Model and Brain Alignment via Associative Memory
- Improving Factuality with Explicit Working Memory
- Interpersonal Memory Matters: A New Task for Proactive Dialogue Utilizing Conversational History
- Investigating Context Faithfulness in Large Language Models: The Roles of Memory Strength and Evidence Style
- Lifelong Model Editing with Graph-Based External Memory
- Memory Tokens: Large Language Models Can Generate Reversible Sentence Embeddings
- Smarter, Better, Faster, Longer: A Modern Bidirectional Encoder for Fast, Memory Efficient, and Long Context Finetuning and Inference
- Token Pruning in Multimodal Large Language Models: Are We Solving the Right Problem?
- Towards Adaptive Memory-Based Optimization for Enhanced Retrieval-Augmented Generation

### EMNLP 2025（11 篇）

- Case-Based Decision-Theoretic Decoding with Quality Memories
- Data-Efficient Automatic Prompt Optimization for Memory-Enhanced Conversational Agents
- Flexibly Utilize Memory for Long-Term Conversation via a Fragment-then-Compose Framework
- Knowledge Graph-Driven Memory Editing with Directional Interventions
- Memory-enhanced Large Language Model for Cross-lingual Dependency Parsing via Deep Hierarchical Syntax Understanding
- Re:Member: Emotional Question Generation from Personal Memories
- Seeing More, Saying More: Lightweight Language Experts are Dynamic Video Token Compressors
- Static or Dynamic: Towards Query-Adaptive Token Selection for Video Question Answering
- Two ways into the hall of mirrors: Language exposure and lossy memory drive cross-linguistic grammaticality illusions in language models
- Understanding and Enhancing Mamba-Transformer Hybrids for Memory Recall and Language Modeling
- Walk and Read Less: Improving the Efficiency of Vision-and-Language Navigation via Tuning-Free Multimodal Token Pruning

### NAACL 2025（5 篇）

- Generating Long-form Story Using Dynamic Hierarchical Outlining with Memory-Enhancement
- Not All Adapters Matter: Selective Adapter Freezing for Memory-Efficient Fine-Tuning of Language Models
- On Localizing and Deleting Toxic Memories in Large Language Models
- Temporal Working Memory: Query-Guided Segment Refinement for Enhanced Multimodal Understanding
- Vocabulary-level Memory Efficiency for Language Model Fine-tuning

### COLING 2025（4 篇）

- Enhancing Criminal Investigation Analysis with Summarization and Memory-based Retrieval-Augmented Generation: A Comprehensive Evaluation of Real Case Data
- Enhancing Extractive Question Answering in Multiparty Dialogues with Logical Inference Memory Network
- Personalized Large Language Model Assistant with Evolving Conditional Memory
- The Exception of Humor: Iconicity, Phonemic Surprisal, Memory Recall, and Emotional Associations

### IJCAI 2025（10 篇）

- Attractor-based Closed List Search: Sparsifying the Closed List for Efficient Memory-Constrained Planning
- Enhancing Multimodal Model Robustness Under Missing Modalities via Memory-Driven Prompt Learning
- External Memory Matters: Generalizable Object-Action Memory for Retrieval-Augmented Long-Term Video Understanding
- FedCPD:Personalized Federated Learning with Prototype-Enhanced Representation and Memory Distillation
- Let’s Group: A Plug-and-Play SubGraph Learning Method for Memory-Efficient Spatio-Temporal Graph Modeling
- MEGAD: A Memory-Efficient Framework for Large-Scale Attributed Graph Anomaly Detection
- MMNet: Missing-Aware and Memory-Enhanced Network for Multivariate Time Series Imputation
- Progressive Prefix-Memory Tuning for Complex Logical Query Answering on Knowledge Graphs
- Robust Finite-Memory Policy Gradients for Hidden-Model POMDPs
- Squeezing Context into Patches: Towards Memory-Efficient Ultra-High Resolution Semantic Segmentation

### IJCAI 2026（13 篇）

- Addressing Downward Memory Loss in Hierarchical GNN Forecasters Through Memory-Buffered Decoding
- ClinAlign: Clinical Workflow Aligned Memory Retrieval for Radiology Report Generation
- Constant-Memory Strategies in Stochastic Games: A Theoretical and Empirical Study
- Joint Neural Architecture Search and Token Pruning for Efficient Visual Tracking
- Less Is More: Proportional Memory-Guided Differential-Attention MIL for Whole-Slide Image Classification
- Looking at Your Photo, What Comes to Mind? Personalized Memory Internalization for Dementia Reminiscence
- M-LoRA: Efficient Serving for Concurrent LoRA Adapters with Memory-Aware Speculative Scheduler on Single GPU
- MemoVAD: Resource-Efficient Video Anomaly Detection via Dynamic Semantic Memory in Edge Computing Scenarios
- PersuHMM: Iterative Learning the Hierarchical Meta-Strategy Memory for Persuasive Dialogue
- QFlash: Bridging Quantization and Memory Efficiency in Vision Transformer Attention
- Raise One and Infer Three: Toward Reasoning- and Memory-Augmented Diffusion Policy Generalization
- SMLDR: Spectral Memory Learner with Dual-Retrieval for Time Series Forecasting
- Unlocking More Granular Control of Memory-Efficient LLM Finetuning

### CVPR 2026（90 篇）

- Accelerating Streaming Video Large Language Models via Hierarchical Token Compression
- Addressing Exacerbated Attention Sink for Source-Free Cross-Domain Few-Shot Learning
- Affordance Field Intervention: Enabling VLAs to Escape Memory Traps in Robotic Manipulation
- An Efficient Token Compression Framework for Visual Object Tracking
- ApET: Approximation-Error Guided Token Compression for Efficient VLMs
- APEX: A Decoupled Memory-based Explorer for Asynchronous Aerial Object Goal Navigation
- AstraNav-Memory: Contexts Compression for Long Memory
- Attention-aware Inference Optimizations for Large Vision-Language Models with Memory-efficient Decoding
- BiGain: Unified Token Compression for Joint Generation and Classification
- Bridging the Modality Gap in Compositional Zero-Shot Learning via Sparse Alignment and Unimodal Memory Bank
- Captain Safari: A World Engine with Pose-Aligned 3D Memory
- Co-Me: Confidence Guided Token Merging for Visual Geometric Transformers
- CoIn: Coverage and Informativeness-Guided Token Reduction for Efficient Large Multimodal Models
- CORE: Compact Object-centric REpresentations as a New Paradigm for Token Merging in LVLMs
- Coupling Liquid Time-Constant Encoders with Modern Hopfield Memory
- Curvature-Aware Zeroth-Order Optimization for Memory-Efficient Test-Time Adaptation
- Decouple Your Discovery and Memory in Continual Generalized Category Discovery
- Do VLMs Perceive or Recall? Probing Visual Perception vs. Memory with Classic Visual Illusions
- DocPrune: Efficient Document Question Answering via Background, Question, and Comprehension-aware Token Pruning
- DREAM: Document Recognition with Explicit Adaptive Memory
- Dual-Granularity Memory for Efficient Video Generation
- DUET-VLM: Dual stage Unified Efficient Token reduction for VLM Training and Inference
- EarlyTom: Early Token Compression Completes Fast Video Understanding
- EmoThinker: Advancing Visual-Acoustic Emotion Analysis via Structural Token Selection and Chain-of-Thought Reasoning
- EvoComp: Learning Visual Token Compression for Multimodal Large Language Models via Semantic-Guided Evolutionary Labeling
- Evolving Contextual Safety in Multi-Modal Large Language Models via Inference-Time Self-Reflective Memory
- FluxMem: Adaptive Hierarchical Memory for Streaming Video Understanding
- FocusUI: Efficient UI Grounding via Position-Preserving Visual Token Selection
- Forging a Dynamic Memory: Retrieval-Guided Continual Learning for Generalist Medical Foundation Models
- Gated KalmaNet: A Fading Memory Layer through Test-time Ridge Regression
- Geometry-Guided 3D Visual Token Pruning for Video-Language Models
- Global Prior Meets Local Consistency: Dual-Memory Augmented Vision-Language-Action Model for Efficient Robotic Manipulation
- HAWK: Head Importance-Aware Visual Token Pruning in Multimodal Models
- Hi-Lo Prune: Look at What You&#x27;ll Lose before Pruning with Hierarchical Token Selection
- HTTM: Head-wise Temporal Token Merging for Faster VGGT
- Hybrid Token Compression for Vision-Language Models
- IF-Prune: Information-Flow Guided Token Pruning for Efficient Vision-Language Models
- Interactive Tracking: A Human-in-the-Loop Paradigm with Memory-Augmented Adaptation
- Joint Learning of General and Diverse Patterns with Mixture of Memory Experts for Weakly-Supervised Video Anomaly Detection
- KV-Tracker: Real-Time Pose Tracking with Transformers
- KVSmooth: Mitigating Hallucination in Multi-modal Large Language Models through Key-Value Smoothing
- LazyVAR: Accelerating Visual Autoregressive Models via Scale-wise Token Pruning and Parallel Group Decoding
- LightSplat: Fast and Memory-Efficient Open-Vocabulary 3D Scene Understanding in Five Seconds
- LiteVGGT: Boosting Vanilla VGGT via Geometry-aware Cached Token Merging
- M4-SAM: Multi-Modal Mixture-of-Experts with Memory-Augmented SAM for RGB-D Video Salient Object Detection
- MedFG-VQA: Low-Frequency Memory and Graph Attention for Lightweight Medical VQA
- Memory Matters: Boosting Training-Free Zero-Shot Temporal Action Localization with a Learnable Lookup Table
- Memory-Augmented Scene Understanding and Exploration for Open-World Aerial Object-Goal Navigation
- Memory-Efficient Fine-Tuning Diffusion Transformers via Dynamic Patch Sampling and Block Skipping
- Memory-Efficient Transfer Learning with Fading Side Networks via Masked Dual Path Distillation
- Merge3D: Efficient 3D Multimodal LLMs via Joint 2D-3D Token Merging
- MeToM: Metadata-Guided Token Merging for Efficient Video LLMs
- MimicTalker: A Multimodal Interactive and Memory-Enhanced Framework for Real-Time Dyadic 3D Head Generation
- Momentum Memory for Knowledge Distillation in Computational Pathology
- MORE-STEM: Long-Short MemOry REcall and Spatio-TEmporal Consistency Model for Query-Driven 3D/4D Point Cloud Segmentation
- MVLM: Template-Free Tracking via Vision-Language Margin Confidence and Memory-Gated Tracking
- OASIS: On-Demand Hierarchical Event Memory for Streaming Video Reasoning
- OmniZip: Audio-Guided Dynamic Token Compression for Fast Omnimodal Large Language Models
- One Layer&#x27;s Trash is Another Layer&#x27;s Treasure: Adaptive Layer-wise Visual Token Selection in LVLMs
- OneStory: Coherent Multi-Shot Video Generation with Adaptive Memory
- Parse, Search, and Confirmation: Training-Free Aerial Vision-and-Dialog Navigation with Chain-of-Thought Reasoning and Structured Spatial Memory
- Predict Before You Explore: Predictive Planning with Specialized Memory for Embodied Question Answering
- Question-guided Visual Compression with Memory Feedback for Long-Term Video Understanding
- QuietPrune: Query-Guided Early Token Pruning for Vision-Language Models
- Rethinking Token Reduction for Large Vision-Language Models
- Revisiting Token Compression for Accelerating ViT-based Sparse Multi-View 3D Object Detectors
- Saliency-Driven Token Merging for Vision Transformers
- Scaling the Long Video Understanding of Multimodal Large Language Models via Visual Memory Mechanism
- SCoRe: Salience-Coverage Reduction for Vision Token Pruning in Vision-Language Models
- Smart Replay: Adaptive Scheduling of Memory Rehearsal for Computational Resource-Aware Incremental Learning
- Spatia: Video Generation with Updatable Spatial Memory
- Spatial-SAM: Spatially Consistent 3D Electron Microscopy Segmentation with SDF Memory and Semi-Supervised Learning
- StaR-KVQA: Structured Reasoning Traces for Implicit-Knowledge Visual Question Answering
- StreamingTOM: Streaming Token Compression for Efficient Video Understanding
- TaskIT: Memory-Efficient Fine-Tuning of Multi-LoRA LLMs via Cross-Task Importance Transfer
- Token Reduction via Local and Global Contexts Optimization for Efficient Video Large Language Models
- UCMNet: Uncertainty-Aware Context Memory Network for Under-Display Camera Image Restoration
- UniCompress: Token Compression for Unified Vision-Language Understanding and Generation
- Unified Spatiotemporal Token Compression for Video-LLMs at Ultra-Low Retention
- UTPTrack: Towards Simple and Unified Token Pruning for Visual Tracking
- Variation-aware Vision Token Dropping for Faster Large Vision-Language Models
- VideoARM: Agentic Reasoning over Hierarchical Memory for Long-Form Video Understanding
- ViLoMem: Agentic Learner with Grow-and-Refine Multimodal Semantic Memory
- VisMem: Latent Vision Memory Unlocks Potential of Vision-Language Models
- VLM-Pruner: Buffering for Spatial Sparsity in an Efficient VLM Centrifugal Token Pruning Paradigm
- WeaveTime: Streaming from Earlier Frames into Emergent Memory in VideoLLMs
- When Token Pruning is Worse than Random: Understanding Visual Token Information in VLLMs
- WorldMM: Dynamic Multimodal Memory Agent for Long Video Reasoning
- WorldStereo: Bridging Camera-Guided Video Generation and Scene Reconstruction via 3D Geometric Memories
- ZOO-Prune: Training-Free Token Pruning via Zeroth-Order Gradient Estimation in Vision-Language Models

### CVPR 2025（35 篇）

- 3D-Mem: 3D Scene Memory for Embodied Exploration and Reasoning
- A Distractor-Aware Memory for Visual Object Tracking with SAM2
- Accelerating Multimodal Large Language Models by Searching Optimal Vision Token Reduction
- AdaCM^2: On Understanding Extremely Long-Term Video with Adaptive Cross-Modality Memory Reduction
- ATP-LLaVA: Adaptive Token Pruning for Large Vision Language Models
- Attend to Not Attended: Structure-then-Detail Token Merging for Post-training DiT Acceleration
- Breaking the Memory Barrier of Contrastive Loss via Tile-Based Strategy
- COAP: Memory-Efficient Training with Correlation-Aware Gradient Projection
- Context-Enhanced Memory-Refined Transformer for Online Action Detection
- DiskVPS: Vanishing Point Detector via Hough Transform in a Disk Region
- DivPrune: Diversity-based Visual Token Pruning for Large Multimodal Models
- Ferret: An Efficient Online Continual Learning Framework under Varying Memory Constraints
- Hybrid-Level Instruction Injection for Video Token Compression in Multi-modal Large Language Models
- Improving Editability in Image Generation with Layer-wise Memory
- KVQ: Boosting Video Quality Assessment via Saliency-guided Local Perception
- Layer- and Timestep-Adaptive Differentiable Token Compression Ratios for Efficient Diffusion Transformers
- M3amba: Memory Mamba is All You Need for Whole Slide Image Classification
- MAD: Memory-Augmented Detection of 3D Objects
- MatAnyone: Stable Video Matting with Consistent Memory Propagation
- MEET: Towards Memory-Efficient Temporal Sparse Deep Neural Networks
- Memories of Forgotten Concepts
- MergeVQ: A Unified Framework for Visual Generation and Representation with Disentangled Token Merging and Quantization
- Noise-Resistant Video Anomaly Detection via RGB Error-Guided Multiscale Predictive Coding and Dynamic Memory
- Online Task-Free Continual Learning via Dynamic Expansionable Memory Distribution
- PACT: Pruning and Clustering-Based Token Reduction for Faster Visual Language Models
- Percept, Memory, and Imagine: World Feature Simulating for Open-Domain Unknown Object Detection
- PointLoRA: Low-Rank Adaptation with Token Selection for Point Cloud Learning
- PVC: Progressive Visual Token Compression for Unified Image and Video Processing in Large Vision-Language Models
- Rethinking Token Reduction with Parameter-Efficient Fine-Tuning in ViT for Pixel-Level Tasks
- ReWind: Understanding Long Videos with Instructed Learnable Memory
- Scaling Mesh Generation via Compressive Tokenization
- Stochastic Human Motion Prediction with Memory of Action Transition and Action Characteristic
- SURGEON: Memory-Adaptive Fully Test-Time Adaptation via Dynamic Activation Sparsity
- TopV: Compatible Token Pruning with Inference Time Optimization for Fast and Low-Memory Multimodal Vision Language Model
- Zero-shot 3D Question Answering via Voxel-based Dynamic Token Compression

### ICCV 2025（45 篇）

- Adversarial Robust Memory-Based Continual Learner
- AIM: Adaptive Inference of Multi-Modal LLMs via Token Merging and Pruning
- Beyond Text-Visual Attention: Exploiting Visual Cues for Effective Token Pruning in VLMs
- Beyond Training: Dynamic Token Merging for Zero-Shot Video Understanding
- ContraGS: Codebook-Condensed and Trainable Gaussian Splatting for Fast, Memory-Efficient Reconstruction
- Dynamic-VLM: Simple Dynamic Visual Token Compression for VideoLLM
- Embodied VideoAgent: Persistent Memory from Egocentric Videos and Embodied Sensors Enables Dynamic Scene Understanding
- ESSENTIAL: Episodic and Semantic Memory Integration for Video Class-Incremental Learning
- EVOLVE: Event-Guided Deformable Feature Transfer and Dual-Memory Refinement for Low-Light Video Object Segmentation
- FastVAR: Linear Visual Autoregressive Modeling via Cached Token Pruning
- Feather the Throttle: Revisiting Visual Token Pruning for Vision-Language Model Acceleration
- GDKVM: Echocardiography Video Segmentation via Spatiotemporal Key-Value Memory with Gated Delta Rule
- Hierarchical Event Memory for Accurate and Low-latency Online Video Temporal Grounding
- Importance-Based Token Merging for Efficient Image and Video Generation
- Keyframe-oriented Vision Token Pruning: Enhancing Efficiency of Large Vision Language Models on Long-Form Video Processing
- KV-Edit: Training-Free Image Editing for Precise Background Preservation
- LLaVA-PruMerge: Adaptive Token Reduction for Efficient Large Multimodal Models
- LOMM: Latest Object Memory Management for Temporally Consistent Video Instance Segmentation
- LongAnimation: Long Animation Generation with Dynamic Global-Local Memory
- MEGA: Memory-Efficient 4D Gaussian Splatting for Dynamic Scenes
- MemDistill: Distilling LiDAR Knowledge into Memory for Camera-Only 3D Object Detection
- MEMFOF: High-Resolution Training for Memory-Efficient Multi-Frame Optical Flow Estimation
- Memory-Efficient 4-bit Preconditioned Stochastic Optimization
- Memory-Efficient Generative Models via Product Quantization
- MemoryTalker: Personalized Speech-Driven 3D Facial Animation via Audio-Guided Stylization
- METEOR: Multi-Encoder Collaborative Token Pruning for Efficient Vision Language Models
- MixANT: Observation-dependent Memory Propagation for Stochastic Dense Action Anticipation
- MSQ: Memory-Efficient Bit Sparsification Quantization
- Multi-Granular Spatio-Temporal Token Merging for Training-Free Acceleration of Video LLMs
- Occupancy Learning with Spatiotemporal Memory
- OmniCache: A Trajectory-Oriented Global Perspective on Training-Free Cache Reuse for Diffusion Transformer Models
- Online Dense Point Tracking with Streaming Memory
- Representation Shift: Unifying Token Compression with FlashAttention
- RetinexMCNet: A Memory Controller Dominated Network for Low-Light Video Enhancement Based on Retinex
- SAM2Long: Enhancing SAM 2 for Long Video Segmentation with a Training-Free Memory Tree
- Sculpting Memory: Multi-Concept Forgetting in Diffusion Models via Dynamic Mask and Concept-Aware Optimization
- Similarity Memory Prior is All You Need for Medical Image Segmentation
- Task Vector Quantization for Memory-Efficient Model Merging
- Towards Long-Horizon Vision-Language-Action System: Reasoning, Acting and Memory
- TR-PTS: Task-Relevant Parameter and Token Selection for Efficient Tuning
- TrackVerse: A Large-Scale Object-Centric Video Dataset for Image-Level Representation Learning
- VideoLLaMB: Long Streaming Video Understanding with Recurrent Memory Bridges
- VMem: Consistent Interactive Video Scene Generation with Surfel-Indexed View Memory
- WalkVLM: Aid Visually Impaired People Walking by Vision Language Model
- When Large Vision-Language Model Meets Large Remote Sensing Imagery: Coarse-to-Fine Text-Guided Token Pruning

## 三、明确排除的方向

- 灾难性遗忘 / 机器遗忘（catastrophic forgetting、unlearning）：与"记忆压缩"是不同问题（参数中知识的保持/删除，而非记忆表示的压缩）。
- 模型权重压缩与训练显存优化（量化、剪枝、低秩训练、优化器状态压缩）：压缩对象是参数或训练状态，不是推理/上下文记忆。
- 纯长上下文基准与位置编码外推：不涉及记忆压缩机制。
- RAG 检索策略（不含压缩组件）。

