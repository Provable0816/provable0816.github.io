# 学习路线：五条执行路径

README 是**查阅型**清单（26 章、275 个条目），这份文件是**执行型**路线。每条路线都按「先懂原理 → 再手写 → 最后做系统」的顺序排，避免跳级。

五条路线共用第 0 阶段的基础，之后分叉：

| 路线 | 周期 | 适合谁 |
| :--- | :--- | :--- |
| A · 计算机视觉 | 12 周 | 想做图像生成、检测、复原 |
| B · 大语言模型 | 12 周 | 想搞懂 Transformer 到对齐的全链路 |
| C · Agent 与检索 | 8 周 | 想搭能干活的智能体 |
| D · 系统与性能 | 12 周 | 想搞清楚 GPU 为什么跑不满、模型怎么塞进小设备 |
| E · 多模态与 3D | 8 周 | 想做 VLM、NeRF、Gaussian Splatting |

---

## 阶段 0：地基（约 2–3 周，所有人都要过）

| 周 | 做什么 | 仓库 | 验收标准 |
| :--- | :--- | :--- | :--- |
| 1 | 手写标量 autograd | [karpathy/micrograd](https://github.com/karpathy/micrograd) | 能解释 `backward()` 如何遍历计算图 |
| 2 | 从 MLP 写到 CNN | [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | 不看参考写出一个两层 MLP 的训练循环 |
| 2–3 | 补全体系：优化器、正则、调参 | [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh) 或 [eriklindernoren/ML-From-Scratch](https://github.com/eriklindernoren/ML-From-Scratch) | 能用 NumPy 实现 SGD/Adam 与交叉熵 |

> 跳过阶段 0 直接做 LLM，大概率只会复制粘贴张量形状。

---

## 路线 A：计算机视觉（12 周）

| 周 | 主题 | 仓库 / 材料 | 产出 |
| :--- | :--- | :--- | :--- |
| 1–2 | 图像分类：从 LeNet 到 ResNet | [apandy02/vision](https://github.com/apandy02/vision) | 在 CIFAR-10 上从零训一个 CNN |
| 3–4 | 生成模型谱系：AE / VAE / GAN | [wiseodd/generative-models](https://github.com/wiseodd/generative-models) | 跑通 DCGAN 并说明训练不稳定的原因 |
| 5–6 | 图像翻译 | [junyanz/pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix) | 讲清循环一致性损失的作用 |
| 7–9 | 扩散模型：DDPM → DDIM → Latent | [openai/guided-diffusion](https://github.com/openai/guided-diffusion)、[CompVis/latent-diffusion](https://github.com/CompVis/latent-diffusion)、[Jayluci4/micro-diffusion](https://github.com/Jayluci4/micro-diffusion) | 手写噪声调度 + 采样循环 |
| 10–11 | 目标检测：YOLO / Faster R-CNN / DETR | [Dovanvu09/Object_Detection](https://github.com/Dovanvu09/Object_Detection)、[PedroFerreira03/YOLO_scratch](https://github.com/PedroFerreira03/YOLO_scratch) | 实现 IoU、NMS 与 mAP 评测 |
| 12 | 全栈项目：从零训一个扩散模型 | [atandra2000/StableDiffusion](https://github.com/atandra2000/StableDiffusion) | 完整 UNet + VAE + 条件的训练管线 |

**CV 路线的关键验收点**：不要只学会调 `sample()`。要能回答：噪声调度为什么是那个形式？classifier-free guidance 在代码里改了哪一行？潜空间相比像素空间省了多少计算？

---

## 路线 B：大语言模型（12 周）

| 周 | 主题 | 仓库 / 材料 | 产出 |
| :--- | :--- | :--- | :--- |
| 1 | Tokenizer | [karpathy/minbpe](https://github.com/karpathy/minbpe) | 手写 BPE 训练与编解码 |
| 2 | 词向量与序列模型（前史） | [Jayluci4/micro-embedding](https://github.com/Jayluci4/micro-embedding)、[micro-lstm](https://github.com/Jayluci4/micro-lstm) | 理解为什么需要注意力 |
| 3–4 | 注意力与 Transformer | [Jayluci4/micro-transformer](https://github.com/Jayluci4/micro-transformer)、[jsbaan/transformer-from-scratch](https://github.com/jsbaan/transformer-from-scratch) | 200 行内写出完整 Transformer block |
| 5–7 | GPT 预训练 | [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) Ch 1–5 | 训一个 124M 模型并生成文本 |
| 8–9 | SFT / LoRA / 偏好对齐 | `LLMs-from-scratch` Ch 6–7 + Appendix E、[Jayluci4/micro-lora](https://github.com/Jayluci4/micro-lora) | 让模型学会遵循指令 |
| 10 | 现代架构细节：RoPE / GQA / RMSNorm / MoE | [therealoliver/Deepdive-llama3-from-scratch](https://github.com/therealoliver/Deepdive-llama3-from-scratch)、[casinca/LLM-quest](https://github.com/casinca/LLM-quest) | 说清每个模块解决什么问题 |
| 11 | 推理侧：KV Cache、量化、采样 | [karpathy/llama2.c](https://github.com/karpathy/llama2.c) | 用 C 跑通一次推理 |
| 12 | 全栈项目 | [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 从零训一个能对话的小模型并部署 |

**进阶（学有余力）**：`karpathy/llm.c`（C/CUDA 训练）、`vllm-project/vllm`（PagedAttention）、`sanket-pixel/flash-attention`（算子）。

---

## 路线 C：Agent 与检索（8 周）

| 周 | 主题 | 仓库 / 材料 | 产出 |
| :--- | :--- | :--- | :--- |
| 1 | Agent 概念与工具调用 | [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) | 说清 Agent = LLM + 工具 + 循环 |
| 2 | 手写最小 Agent | [sanzgiri/ai-agents-from-scratch](https://github.com/sanzgiri/ai-agents-from-scratch) 或 [trojanSF/agents-from-scratch](https://github.com/trojanSF/agents-from-scratch) | 不用框架写一个 ReAct 循环 |
| 3 | 结构化输出与状态/记忆 | 同上（第 3–7 课） | 实现会话记忆与状态恢复 |
| 4 | RAG 全链路 | [drisskhattabi6/Retrieval-Augmented-Generation-RAG-From-Scratch](https://github.com/drisskhattabi6/Retrieval-Augmented-Generation-RAG-From-Scratch) | chunking → embedding → 检索 → 重排 → 生成 |
| 5 | 向量数据库原理 | [SriPrarabdha/vector_db_from_scratch](https://github.com/SriPrarabdha/vector_db_from_scratch)、[Jayluci4/micro-kg](https://github.com/Jayluci4/micro-kg) | 手写 HNSW，理解 ANN 的取舍 |
| 6 | MCP 与工具协议 | [zahrafatima9432/mcp-toolbox](https://github.com/zahrafatima9432/mcp-toolbox)、[dynstat/agents-mcp-clients](https://github.com/dynstat/agents-mcp-clients) | 写一个 MCP server 并被 Agent 调用 |
| 7 | 多智能体与工作流 | [victordibia/designing-multiagent-systems](https://github.com/victordibia/designing-multiagent-systems) | 设计终止条件与编排方式 |
| 8 | 工程化：评测、可观测性、部署 | [NirDiamant/agents-towards-production](https://github.com/NirDiamant/agents-towards-production) | 给自己的 Agent 加上评测与追踪 |

**Agent 路线的关键验收点**：能回答这五个问题 —— 模型输出怎么解析成工具调用？工具超时/报错怎么处理？对话状态存在哪？循环什么时候停？输出好不好怎么测？只答得出第一个的，还不算理解 Agent。

---

## 路线 D：系统与性能（12 周）

适合已经跑通过模型训练、想知道「为什么我的 GPU 只有 20% 利用率」的人。前提是先走完阶段 0。

| 周 | 主题 | 仓库 / 材料 | 产出 |
| :--- | :--- | :--- | :--- |
| 1–2 | GPU 心智模型 | [srush/GPU-Puzzles](https://github.com/srush/GPU-Puzzles) | 说清 global/shared/register 的带宽差与 warp 调度 |
| 3–4 | GEMM 优化四级 | [terryye/cuda_GEMM](https://github.com/terryye/cuda_GEMM) | 朴素 → tiling → Tensor Core → cuBLASLt，每级给出实测加速比 |
| 5–6 | 注意力算子 | [sanket-pixel/flash-attention](https://github.com/sanket-pixel/flash-attention)、[codingwithshawnyt/FlashAttention-CUDA](https://github.com/codingwithshawnyt/FlashAttention-CUDA) | 手写 online softmax，并用 CPU 参考验证误差 |
| 7 | 高层算子语言 | [triton-lang/triton](https://github.com/triton-lang/triton) | 用 Triton 重写 FlashAttention 并 autotune |
| 8 | 极简框架与编译 | [tinygrad/tinygrad](https://github.com/tinygrad/tinygrad) | 说清 lazy IR、算子融合与后端如何接 |
| 9 | 量化算术 | [Mario928/edge-ml-optimization](https://github.com/Mario928/edge-ml-optimization)、[IST-DASLab/gptq](https://github.com/IST-DASLab/gptq) | 手写 INT8 校准，测出各层 PPL 敏感度 |
| 10 | 并行策略 | [ritwikbera/RingReduce](https://github.com/ritwikbera/RingReduce) → [huggingface/picotron](https://github.com/huggingface/picotron) | 从 AllReduce 写到 4D 并行，验证数值等价 |
| 11 | 显存与重计算 | [topal-team/rockmate](https://github.com/topal-team/rockmate) | 在给定显存预算下自动选择检查点策略 |
| 12 | 端侧部署 | [RightNow-AI/picolm](https://github.com/RightNow-AI/picolm) 或 [mbrukman/tinytinyTPU-co](https://github.com/mbrukman/tinytinyTPU-co) | 把模型塞进极端受限环境，或用 HDL 焊一个矩阵单元 |

**验收点**：任何性能结论都必须带 baseline、误差阈值与测量工具（Nsight / event timing）。说不出「快在哪一步」的优化，等于没做。

## 路线 E：多模态与 3D（8 周）

| 周 | 主题 | 仓库 / 材料 | 产出 |
| :--- | :--- | :--- | :--- |
| 1 | 图像如何变成 token | [google-research/vision_transformer](https://github.com/google-research/vision_transformer) | 手写 patch 切分与位置编码 |
| 2 | 图文对齐 | [openai/CLIP](https://github.com/openai/CLIP) | 实现对比损失，跑通零样本分类 |
| 3–4 | 最小 VLM | [huggingface/nanoVLM](https://github.com/huggingface/nanoVLM) | 训一个 222M VLM，说清模态投影层在做什么 |
| 5 | 视觉指令微调 | [haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA) | 对比 nanoVLM，理解指令数据与规模的影响 |
| 6 | 体渲染 | [yenchenlin/nerf-pytorch](https://github.com/yenchenlin/nerf-pytorch) | 手写光线采样与体渲染积分 |
| 7 | 坐标编码与加速 | [NVlabs/instant-ngp](https://github.com/NVlabs/instant-ngp) | 说清哈希编码为什么能替代深层 MLP |
| 8 | 显式基元 | [graphdeco-inria/gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting) | 对比隐式场与显式高斯的取舍 |

**验收点**：多模态要能回答「视觉 token 怎么进 LLM、占多少上下文、分辨率怎么变」；3D 要能回答「隐式场 vs 显式基元在空区域计算、渲染速度、可编辑性上分别差什么」。

---

## 通用建议

- **每个项目都 fork 并加注释**：自己重写一遍 README，比读十遍有用。
- **记录失败**：训练不收敛、检索召回差、Agent 死循环，这些调试过程才是真正的收获。
- **别追求覆盖**：路线 A/B/D 选一条走完，胜过五条各走两周。路线 D 需要先走完阶段 0，路线 E 建议先有 CV 或 LLM 基础。
- **输出倒逼输入**：每完成一个阶段，写一篇博客或录一段讲解，讲不清楚的地方就是没懂的地方。
