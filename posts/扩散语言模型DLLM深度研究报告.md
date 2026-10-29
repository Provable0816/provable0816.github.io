---
title: 扩散语言模型（dLLM/DLLM）深度研究报告
date: 2026-10-29
tags: DLLM
---

# 扩散语言模型（dLLM/DLLM）深度研究报告

## 摘要

扩散语言模型不是简单地把图像扩散模型照搬到词表上，而是用马尔可夫或连续时间状态转换逐步破坏离散文本、再由模型预测“去噪”或状态转移。其理论核心是把生成建模为隐变量模型：似然由证据下界（ELBO）控制，而不像自回归（AR）模型那样通常可直接计算精确的逐 token 负对数似然（NLL）[1][2]。掩码扩散（masked diffusion）将 `[MASK]` 当作吸收态，最终训练目标可简化为不同噪声程度下的交叉熵，因此与 BERT 式 MLM 有形式上的亲缘关系；但二者的联合概率分解、采样机制和最终似然含义并不相同[3][4]。

截至 2026 年 10 月，dLLM 已经从 D3PM、Diffusion-LM、SEDD 等小规模验证，发展到 LLaDA、Dream 7B、Mercury、Gemini Diffusion、Seed Diffusion、LLaDA-MoE 和 Clover 等从零预训练或工程化产品。公开数字显示，Gemini Diffusion 的采样速度为 1479 tokens/s、首字节开销 0.84 s；Seed Diffusion Preview 公开表述为 2146 tokens/s、相较同规模 AR 快 5.4 倍[7][10]。这些数字属于特定软硬件与评测口径，不能横向解释为通用性能排名。

dLLM 最有价值的潜在优势是块内并行、双向上下文、填空/编辑和结构化生成，而不是对所有 AR 应用做到绝对更快。双向注意力使经典 AR 的 KV cache 失效，导致“步数 × 序列长度”的双重开销；小批量单请求场景下，延迟未必优于 AR。推理加速、精确似然、稳定长链推理、工具/Agent、端到端 RLHF 与生态支持仍是决定 dLLM 能否成为通用基础模型的主要瓶颈。

## 一、从连续扩散到离散语言扩散

### **连续扩散提供了一个可学习反向随机过程的统一框架，但不能直接照搬到 one-hot 词表**

给定一个连续数据样本 $x_0\in\mathbb R^d$，连续扩散模型构造一条前向马尔可夫链

$$
q(x_{1:T}\mid x_0)=\prod_{t=1}^Tq(x_t\mid x_{t-1}),
$$

其中 DDPM 通常取各向同性高斯

$$
q(x_t\mid x_{t-1})=\mathcal N\bigl(x_t;\sqrt{1-\beta_t}\,x_{t-1},\beta_tI\bigr).
$$

定义 $\alpha_t=1-\beta_t$、$\bar\alpha_t=\prod_{s=1}^t\alpha_s$，由重参数化可得闭式边缘分布

$$
q(x_t\mid x_0)=\mathcal N\bigl(x_t;\sqrt{\bar\alpha_t}\,x_0,(1-\bar\alpha_t)I\bigr).
$$

因此可直接采样

$$
x_t=\sqrt{\bar\alpha_t}\,x_0+\sqrt{1-\bar\alpha_t}\,\epsilon,\qquad \epsilon\sim\mathcal N(0,I).
$$

从 $x_0$ 出发意味着：固定 $x_0$ 时，$x_t$ 是 $x_0$ 与标准正态噪声的线性插值，信噪比由 $\bar\alpha_t$ 控制；当 $T$ 足够大且 $\bar\alpha_T\approx0$ 时，$x_T\approx\mathcal N(0,I)$。

生成模型的学习对象是反向转移 $p_\theta(x_{t-1}\mid x_t)$，目标是使生成的 $x_0$ 近似真实数据。以先验 $p(x_T)=\mathcal N(0,I)$ 为起点，逐步采样即可生成数据。这里“扩散”并不是只指添加高斯噪声，而是指从数据到简单先验的可逆（在概率意义上）退化过程及其学习逆过程。

### **ELBO 由重构、逐转移 KL 与最终先验匹配构成**

隐变量模型的边际对数似然为

$$
\log p_\theta(x_0)
=\mathbb E_{q(x_{1:T}\mid x_0)}\log\frac{p_\theta(x_{0:T})}{q(x_{1:T}\mid x_0)}.
$$

将联合分布按贝叶斯链式法则拆为 $p_\theta(x_0)\prod_{t=1}^Tp_\theta(x_t\mid x_{t-1})$ 后，利用 $\mathrm{KL}(q\|p)=\mathbb E_q[\log q-\log p]$ 可得 DDPM 的标准分解：

$$
\log p_\theta(x_0)\ge
\underbrace{\mathbb E_{q(x_1\mid x_0)}\log p_\theta(x_0\mid x_1)}_{L_0}
-\underbrace{\mathrm{KL}\bigl(q(x_T\mid x_0)\|p_\theta(x_T)\bigr)}_{L_T}
-\sum_{t=2}^T\underbrace{\mathbb E_{q(x_t\mid x_0)}
\mathrm{KL}\bigl(q(x_{t-1}\mid x_t,x_0)\|p_\theta(x_{t-1}\mid x_t)\bigr)}_{L_{t-1}}.
$$

逐项含义如下：

1. $L_0$ 是由较清晰状态 $x_1$ 重构 $x_0$ 的期望对数似然；
2. $L_T$ 要求前向终点接近模型先验，通常当 $\bar\alpha_T\approx0$ 时以标准正态先验近似为 0；
3. 中间 $L_{t-1}$ 要求模型学习的反向转移匹配前向过程给出的变分后验。

关键在于，前向转移已知，$q(x_{t-1}\mid x_t,x_0)$ 可以利用 $x_0$ 闭式计算；于是训练时不必从真实后验采样，只需把 $x_0$ 与随机时间步 $t$ 输入网络。

### **用 $x_0$ 重参数化可将反向均值写成可学习的去噪预测**

已知

$$
q(x_{t-1}\mid x_t,x_0)=\mathcal N(x_{t-1};\tilde\mu_t(x_t,x_0),\tilde\beta_tI),
$$

其中

$$
\tilde\mu_t(x_t,x_0)=\frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}x_0
+\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}x_t,\qquad
\tilde\beta_t=\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\beta_t.
$$

若令模型预测 $x_0$ 的估计 $\hat x_0(x_t,t)$，再代入 $q(x_{t-1}\mid x_t,x_0)$ 的均值，可得到反向采样均值；若预测噪声 $\epsilon_\theta(x_t,t)$，则

$$
\hat x_0=\frac{x_t-\sqrt{1-\bar\alpha_t}\,\epsilon_\theta}{\sqrt{\bar\alpha_t}}.
$$

因此预测 $x_0$、预测噪声 $\epsilon$ 或预测速度场 $v$ 之间只差一个可微的代数重参数化，不意味着它们自动具有相同的训练损失尺度或数值稳定性。

### **预测噪声的 MSE 与简化变分目标在权重意义上等价**

对固定 $t$，反向 KL 的高斯项为

$$
\mathrm{KL}=\frac12\|\tilde\beta_t^{-1/2}[\tilde\mu_t-\mu_\theta(x_t,t)]\|^2+\text{const}.
$$

将 $\tilde\mu_t$ 中依赖数据的 $x_0$ 替换为 $\frac{x_t-\sqrt{1-\bar\alpha_t}\epsilon}{\sqrt{\bar\alpha_t}}$，并把模型均值也参数化为 $x_0$-预测形式，整理后得到

$$
\mathrm{KL}
=\frac12\tilde\beta_t^{-1}\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}
\frac{1-\bar\alpha_t}{\bar\alpha_t}\|\epsilon-\epsilon_\theta(x_t,t)\|^2+\text{const}.
$$

注意 $\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}$ 与前面因子相乘后仍可进一步化简为 $\frac{\beta_t}{1-\bar\alpha_t}$；最终权重还含 $\bar\alpha_t^{-1}$。原始目标需要对所有时间步求和，噪声较大；Ho 等的简化版本直接采用

$$
\mathcal L_{\text{simple}}(\theta)=\mathbb E_{t,x_0,\epsilon}\|\epsilon-\epsilon_\theta(x_t,t)\|^2,
$$

它在最优反向方差等条件下与完整加权 ELBO 的最优解一致，但不是说二者对每个样本、每个时间步具有相同的数值损失。实践中仍可能根据 SNR、重要性采样或变分边界重新加权。

### **分数函数是在噪声分布上定义对数密度的梯度**

Score-based 视角定义

$$
s(x_t,t)=\nabla_{x_t}\log p_t(x_t),
$$

其中 $p_t$ 是 $x_t$ 的边缘分布。连续时间形式用 SDE

$$
dx=f(x,t)dt+g(t)dW
$$

描述前向扰动，反向 SDE 则为

$$
dx=[f(x,t)-g(t)^2\nabla_x\log p_t(x)]dt+g(t)d\bar W.
$$

因此只要学得 $s_\theta(x_t,t)$，就可沿反向随机微分方程生成样本。对于高斯前向过程，$x_t\mid x_0$ 已知，$\nabla_{x_t}\log q(x_t\mid x_0)$ 是 $-(x_t-\sqrt{\bar\alpha_t}x_0)/[(1-\bar\alpha_t)]$ 的线性函数；若用 $x_0$-预测，则

$$
s_\theta(x_t,t)\approx
-\frac{x_t-\sqrt{\bar\alpha_t}\hat x_{0,\theta}(x_t,t)}{1-\bar\alpha_t}.
$$

这正是 denoising score matching 与 DDPM 的桥梁：网络既可以是噪声预测器，也可以解释成学习噪声分布的对数密度梯度。

### **文本的离散性使“加噪—argmax”会引入不可微和非唯一映射误差**

语言序列 $w_{1:L}$ 的词表是有限集 $\mathcal V$。若把 token 映射到 one-hot 向量 $x_0\in\{e_v:v\in\mathcal V\}^L$，直接在其上添加连续高斯噪声会得到 $x_t\in\mathbb R^{L|\mathcal V|}$，不再表示合法离散概率或合法 token。常见做法是改在嵌入空间加噪，但嵌入空间通常不是欧氏数据空间：词向量距离不等于词表上概率变化，插值向量通常没有对应 token；采样后还需 $\arg\max$ 回到离散 token。

若用嵌入向量 $e(x_0)$ 加噪，则 $x_t=e(x_0)+\epsilon$ 的似然、分数和先验都变成嵌入流形上的建模问题，目标函数不再直接给出离散 token 序列的 $p(w_{1:L})$。若从概率分布预测后取 $\arg\max$，只能得到点估计，不能保证恢复概率最高的完整序列；多峰分布还会造成不同位置相互矛盾的硬决策。

离散扩散因此更自然：状态空间仍是词表，前向过程用状态转移矩阵 $Q_t$，反向过程预测离散类别概率。它牺牲了连续空间中的平滑梯度，却保留合法的离散生成语义。

## 二、D3PM 的离散状态转移与反向后验

### **D3PM 用时间齐次或非齐次的转移矩阵建立有限状态马尔可夫链**

对单个 token $x_0\in\{1,\ldots,K\}$，定义 $Q_t\in\mathbb R^{K\times K}$：

$$
q(x_t=j\mid x_{t-1}=i)=[Q_t]_{ij}.
$$

通常要求每列或每行之和为 1，具体方向取决于把状态写作行向量还是列向量；本文采用 $q(x_t^T=v)=x_{t-1}^TQ_t$ 的“右乘”约定，其中 $x_{t-1}$ 为 one-hot 行向量。多 token 序列通常假设位置间条件独立，于是

$$
q(x_t\mid x_0)=\mathrm{Cat}(x_t;\bar Q_t x_0),\qquad
\bar Q_t=Q_1Q_2\cdots Q_t.
$$

从 $x_0$ 直接采样 $x_t$ 无须顺序遍历全部中间状态：先算 $\bar Q_t$，再按第 $x_0$ 行给出的类别分布采样。

### **转移核的选择决定前向噪声的语义与反向学习的难易**

常见的转移核包括：

| 转移核 | 数学形式 | 主要优点 | 主要代价 |
|---|---|---|---|
| Absorbing（吸收态） | 以概率 $1-\beta_t$ 保持 token，以 $\beta_t$ 转移到 `[MASK]` | 直接对应掩码语言模型，边界清晰 | 完全掩码后信息丢失，反向须从空上下文恢复 |
| Uniform | $Q_t=I(1-\beta_t)+\frac{\beta_t}{K}\mathbf1\mathbf1^T$ | 每个 token 被均匀替换，有显式平稳分布 | 可能把正确 token 替换成许多语义错误 token |
| Discretized Gaussian | 在有序状态上按邻近度定义过渡概率 | 保留类别或颜色等邻域结构 | 文本 token 不一定存在自然全序，邻域定义主观 |
| Spacing-adjusting / 数据相关核 | 按词频、嵌入相似度或学习转移概率构造 | 可让高频 token 更易保留或降低语义损伤 | 参数和计算更复杂，平稳分布难分析 |

均匀转移的边缘概率为

$$
q(x_t=v\mid x_0=u)=(1-\beta_t)\mathbf1[u=v]+\frac{\beta_t}{K}.
$$

吸收态转移可写成

$$
q(x_t=v\mid x_0=u)=
\begin{cases}
1-\beta_t,&v=u,\\
\beta_t,&v=\text{[MASK]},\\
0,&\text{其他}.
\end{cases}
$$

### **吸收态的反向后验可由贝叶斯公式闭式计算**

记 $M$ 为 `[MASK]` 状态。对已知 $x_0=u$ 的吸收态过程，若 $x_t$ 仍为原 token，则整个链没有吸收该位置，概率为 $1-\bar\beta_t$；若 $x_t=M$，则表示该位置在某时刻被吸收，概率为 $\bar\beta_t$。因此

$$
q(x_t=M\mid x_0=u)=\bar\beta_t,\qquad
q(x_0=u\mid x_t=M)=\frac{\bar\beta_t\,p_0(u)}{\sum_v\bar\beta_tp_0(v)}=p_0(u),
$$

即完全掩码时关于 $x_0$ 的后验退化为先验。若 $x_t=u$，则

$$
q(x_0=u\mid x_t=u)
=\frac{(1-\bar\beta_t)p_0(u)}
{(1-\bar\beta_t)p_0(u)+\bar\beta_t p_0(M)}.
$$

更一般地，反向一步后验满足

$$
q(x_{t-1}\mid x_t,x_0)
=\frac{q(x_t\mid x_{t-1})q(x_{t-1}\mid x_0)}
{q(x_t\mid x_0)}.
$$

由于三个因子都由转移矩阵与 $\bar Q$ 给出，其类别概率可直接计算。训练时模型只需预测该分布，而不需要真实反向过程。

### **D3PM 的 ELBO 仍可分解为终端项、转移 KL 与最终观测项**

对离散状态链，

$$
\log p_\theta(x_0)
\ge \mathbb E_q\log\frac{p_\theta(x_0\mid x_1)p_\theta(x_1)}{q(x_1\mid x_0)}
-\sum_{t=2}^T\mathbb E_q\log\frac{p_\theta(x_{t-1}\mid x_t)}{q(x_{t-1}\mid x_t,x_0)}
-\mathbb E_q\log\frac{p_\theta(x_T)}{q(x_T\mid x_0)}.
$$

写为三项：

1. $L_0=\mathbb E_{q(x_1\mid x_0)}\log p_\theta(x_0\mid x_1)$，通常由模型输出类别分布并由 $x_0$ 监督；
2. $L_{t-1}=\mathbb E_q\mathrm{KL}(q(x_{t-1}\mid x_t,x_0)\|p_\theta(x_{t-1}\mid x_t))$，是离散类别分布之间的 KL；
3. $L_T=\mathrm{KL}(q(x_T\mid x_0)\|p_\theta(x_T))$，要求前向终点匹配模型先验。

类别分布 KL 可写作

$$
\mathrm{KL}(q\|p)=\sum_i q_i\log q_i-\sum_i q_i\log p_i,
$$

其中第一项是数据相关常数，优化时可由交叉熵项替代。D3PM 还常加入辅助交叉熵，使网络不仅优化边界，也直接成为有效的 token 预测器。

## 三、连续时间离散扩散、CTMC 与 SEDD

### **CTMC 用速率矩阵描述状态在无穷小时间内的转移**

离散时间链 $Q_t$ 适合有限步训练；连续时间版本用 rate matrix $R_t$，满足 $R_t(x,x')\ge0$（$x\ne x'$）且 $R_t(x,x)=-\sum_{x'\ne x}R_t(x,x')$。经过时间 $h$ 的一阶转移矩阵可写为

$$
P_{t\to t+h}=\exp(hR_t)=I+hR_t+O(h^2).
$$

若只保留一个状态并允许跳到其余状态，则对应离散扩散中的吸收过程；若跳到所有类别，则接近均匀或数据相关扩散。

在连续时间 CTMC 中，可定义类似分数的量。对有限离散空间，概率比值比连续梯度更适合描述局部变化。SEDD 的核心观察是：连续分数 $s(x)=\nabla\log p(x)$ 可离散化为具体分数（concrete score），即状态邻域上的对数概率差或比值。论文《Discrete Diffusion Modeling by Estimating the Ratios of the Data Distribution》提出 score entropy（SE），把连续空间的 score matching 自然推广到离散状态空间[1]。

### **SEDD 用概率比而非高斯基估计离散状态梯度**

令 $r_v(x)$ 表示与状态 $x$ 相差一个位置的邻居状态 $x^v$ 相对 $x$ 的具体分数。SEDD 的损失要求模型预测的比值与数据分布诱导的比值一致。论文表明，在其构造下优化 SE 可推出离散扩散的变分目标，并在标准语言建模设置下将困惑度较既有语言扩散范式降低 25–75%，部分设置超过 GPT-2[1]。

一个重要区别在于，SEDD 可直接学习状态间转移偏好，不必依赖嵌入空间欧氏距离；但它仍需要定义状态和速率结构。其损失不是“任意离散分类交叉熵”的等价物，而是经过概率比和 CTMC 动力学约束后的 score entropy。

### **CTMC 的似然仍来自反向过程与正向过程的 KL 平衡**

对连续时间过程，Campbell 等给出类似 ELBO 的边界：

$$
\log p(x)
\ge \mathbb E\int_0^T\bigl[
\log p_\theta(x_t)-\log q(x_t\mid x)
\bigr]R_t^*(x_t\to\cdot)dt
+\text{边界项},
$$

其中 $R_t^*$ 是恰当构造的反向速率。直观上，模型同时要求：（1）当前状态在模型生成分布下合理；（2）状态变化速率与真实过程匹配。

D3PM 可视为 CTMC 在有限离散步上的嵌入：当时间步长趋于 0、离散转移 $Q_t$ 用 $I+hR_t$ 逼近时，逐步 KL 会收敛到连续时间速率积分。因此“离散时间 D3PM”与“连续时间 CTMC”不是两套完全割裂理论，只是参数化和采样粒度不同。

## 四、掩码扩散：MLM 损失、似然与 AR 的边界

### **掩码扩散把 `[MASK]` 作为吸收态，使部分位置保持、部分位置归零**

令 $M$ 为掩码状态，$[\bar Q_t]_{uu}=1-\beta_t$，$[\bar Q_t]_{Mu}=\beta_t p_M(u)$，其余为 0。若所有非掩码位置被掩码的概率相同，则 $q(x_t\mid x_0)$ 的分布只依赖未被掩码的数量，而无需逐位置独立地走 $T$ 步。

MD4/MDLM 的核心简化是：直接采样“有多少位置仍未被掩码”，或等价地在连续时间中把每个 token 的存活时间建模为指数分布。若一个 token 在时刻 $t$ 仍未被掩码，其状态就是 $x_0$；否则为 $M$。由此

$$
q(x_t^i\ne M\mid x_0^i)=e^{-\lambda t},
$$

在适当速率参数化下成立。

### **吸收态的逐位置后验只依赖该位置是否仍为掩码**

对于仍保留原 token 的位置，

$$
q(x_0^i=u\mid x_t^i=u,x_t^i\ne M)
=1,\quad u\ne M.
$$

对于掩码位置，

$$
q(x_0^i=u\mid x_t^i=M)
=p_0(u),
$$

即先验。这里再次说明：当整个序列进入吸收态时，模型只能从全局上下文与先验推断内容，而不能从局部真实 token 直接复制。

若模型参数为 $\theta$，输出为 $p_\theta(x_0^i=u\mid x_t)$，则单个时间步的反向目标主要监督被掩码位置：

$$
\mathcal L_t=\sum_i \mathbf1[x_t^i=M]
\mathrm{KL}\bigl(q(x_0^i\mid x_t^i)\|p_\theta(x_0^i\mid x_t)\bigr).
$$

由于未被掩码位置的真实后验是退化的一点分布，交叉熵监督只会落在掩码位置。

### **掩码扩散的 ELBO 可化简为不同掩码比例下的交叉熵加权和**

记时刻 $t$ 处 token 仍可见的概率为 $s(t)$。对每个 token，未被掩码的条件概率为 $s(t)$，被掩码的概率为 $1-s(t)$。若以连续时间速率 $\lambda$ 控制，则 $s(t)=e^{-\lambda t}$。期望 KL 中每个 token 的有效权重为 $1-s(t)$，未被掩码项则退化为 0。于是可写成

$$
\mathcal L_{\mathrm{mask}}
=\mathbb E_t\sum_i(1-s(t))
\mathbb E_{x_0^i\sim D}\bigl[
-\log p_\theta(x_0^i\mid x_t)
\bigr]_{\mathrm{masked}}+\mathrm{const}.
$$

若再把时间权重 $\lambda s(t)$ 与位置权重 $1-s(t)$ 合并，可得到常见的时间均匀化损失。MDLM 的结论是：在该参数化下，掩码扩散的训练可以约化成与噪声水平有关的加权交叉熵，而不是每个样本都重新跑完整 $T$ 步链[3]。

这种简化并不表示“掩码扩散就是 BERT”。BERT MLM 的目标是随机掩盖固定比例并进行一次判别；掩码扩散把掩码程度组织成时间过程，训练模型支持从高度掩码状态逐步恢复，并学习可用于采样的反向转移。MDLM 是语言建模目标，不是单纯的表示学习目标。

### **掩码扩散的似然分解可以映射到一条特殊的任意顺序 AR 链**

对一个固定排列 $\pi$，AR 模型分解

$$
\log p(x)=\sum_{j=1}^L\log p(x_{\pi(j)}\mid x_{\pi(<j)}).
$$

掩码扩散的边缘分布可由任意顺序链的期望表示：

$$
p(x)=\sum_\pi p(\pi)p_\pi(x),
$$

其中每个 $p_\pi$ 是以 $\pi$ 为生成顺序的联合分布。若定义一个过程，每次从当前未知集合中随机选位置并填入正确 token，则所有可能的填法对应不同的 AR 顺序。

LLaDA 的分析强调，任意顺序扩散可覆盖一条联合分布的集合，而不是强迫使用左到右分解[4]。然而“覆盖所有排列”并不自动保证在所有排列上学习质量相同；模型能否处理不同填充顺序，取决于训练覆盖、条件上下文和位置编码。任意顺序生成理论上提高表达灵活性，也会带来规划与顺序敏感性。

### **掩码扩散给出的是似然上界，不等价于精确 AR NLL**

掩码扩散的 $p_\theta(x)$ 仍通过积分隐藏序列 $x_{1:T}$ 得到：

$$
\log p_\theta(x_0)
=\log\int p_\theta(x_{0:T})dx_{1:T}
\ge \mathbb E_q\log\frac{p_\theta(x_{0:T})}{q(x_{1:T}\mid x_0)}.
$$

由于 Jensen 不等式方向，一般 ELBO 是 $\log p(x_0)$ 的下界，因此以 nats/token 或 bits/token 报告的扩散训练损失是真实负对数似然的上界。若希望精确估计似然，可使用 importance sampling 或 annealed importance sampling：

$$
p(x_0)=\mathbb E_{q_\phi(x_{1:T}\mid x_0)}
\frac{p_\theta(x_{0:T})}{q_\phi(x_{1:T}\mid x_0)},
$$

但估计方差通常随序列长度和步数增长，不适合逐 token、逐请求在线使用。

相反，AR 模型直接计算

$$
\log p(y\mid x)=\sum_i\log p(y_i\mid x,y_{<i}),
$$

且标准语言建模交叉熵可解释为 NLL。其局限是条件分解固定为左到右，不能自然地表示双向填空。因此 dLLM 的“更高 PPL”未必意味着文本质量更差；同一 PPL 也不代表与 AR 的似然口径完全相同。

## 五、采样、重掩码与离散引导

### **Ancestral sampling 是逐状态按学习到的反向转移随机采样**

离散时间采样过程为：

1. 从 $x_T\sim p(x_T)$ 出发，例如全部置为 `[MASK]`；
2. 对每个时间步 $t=T,\ldots,1$，由 $\theta$ 计算 $p_\theta(x_{t-1}\mid x_t)$；
3. 在该类别分布上采样 $x_{t-1}$；
4. 在吸收态掩码模型中，未被掩码的位置保持，被掩码位置按预测分布重填。

连续时间对应为 CTMC 模拟：从当前状态跳到某邻居状态，等待时间由离开当前状态的总速率决定。模拟可更细粒度，但每一步仍需要网络评估，除非使用缓存或提前退出。

### **去噪 schedule 控制掩码比例下降的速度与生成质量**

常见 schedule 包括线性、余弦或基于 SNR 的形式。若掩码比例下降过快，模型必须在低置信、上下文不足时提交太多 token；若过慢，则增加网络评估次数，延迟上升。

一个好的 schedule 应随生成步数分配“信息恢复预算”。实践中可依据每步预测熵、位置置信度和条件复杂度动态调整；但目前没有普适证明表明某一 schedule 对任意长度和模型最优。

### **Remasking 是 dLLM 区别于一次性 MLM 的核心纠错机制**

生成后模型可重新掩码部分位置。主要策略包括：

| 策略 | 规则 | 适用情况 | 风险 |
|---|---|---|---|
| Low-confidence remask | 重掩置信度最低的位置 | 已生成结果有明显冲突 | 可能反复修改同一处 |
| Entropy-based remask | 重掩预测熵最高的位置 | 分布平坦、不确定性高 | 熵未必等于语义错误率 |
| Random remask | 随机选一部分位置 | 简单、正则化效果好 | 可能破坏已有正确结构 |
| Semi-autoregressive / block-wise remask | 块内并行，块间顺序或重掩 | 长文本、对话、结构化输出 | 块边界规划成为新瓶颈 |

其动机是：早期填错的 token 会污染后续双向上下文。允许反复修改能缓解“一次写错、全局受损”，但也会增加额外前向计算。稳定性取决于模型是否在训练时见过类似的中间状态，以及重掩后是否能从其余上下文恢复。

### **离散分类器自由引导通过组合条件与无条件 logits 控制强度**

AR 中常见的 CFG 形式为

$$
\tilde\logit=(1+w)\logit_{\mathrm{cond}}-w\logit_{\mathrm{uncond}}.
$$

离散 dLLM 可把 $w$ 作用在未归一化 logit 上，再进行 softmax 得到采样分布。条件控制越强，输出越贴近提示，但可能降低多样性和句法自然度。

分类器引导则需一个可微分数 $s_\phi(y)$：

$$
\nabla_x\log p(x)+\nabla_x\log p_\phi(c\mid x)
\Rightarrow
\logit\propto\log p_\theta(x)+\lambda s_\phi(c\mid x).
$$

对离散高维语言，分类器分数可能不可靠且昂贵；CFG 更适合已训练无条件/条件输出的场景，但不能替代端到端条件训练。

## 六、发展脉络：从离散扩散原型到工业级系统

### **2021—2023 年的关键任务是证明离散状态扩散可学习，而不是追求大规模通用能力**

| 时间 | 代表工作 | 机构/团队 | 贡献 |
|---|---|---|---|
| 2021 | D3PM | Google Research | 建立离散状态扩散、多种转移核与 ELBO 框架[2] |
| 2022 | Diffusion-LM | 多机构 | 在连续嵌入/潜在空间做文本扩散，验证连续扩散语言生成 |
| 2022 | DiffusionBERT | 学术团队 | 将扩散思想与 BERT 式双向表示结合 |
| 2022 | SEDD | Stanford / Pika | 用 score entropy 推广离散分数匹配[1] |
| 2023 | SSD-LM、DiffuSeq、GENIE、VQ-Diffusion 等 | 多团队 | 探索半非自回归、序列到序列、离散潜码与结构化生成 |

这一阶段的结论可概括为：离散扩散能够生成文本，并支持双向填空；但模型规模、数据规模、似然质量和产品吞吐尚未证明足以与同期 AR 基础模型竞争。

### **2024—2025 年的转折是从“能否生成”转向“能否规模化与工程化”**

MDLM/MD4 把掩码扩散的训练与采样化简，降低了离散扩散的算法复杂度；LLaDA 则从零预训练，并加入 SFT 范式，报告 8B 模型在通用、数学、代码等任务上与自建 AR 基线可比，并在反转诗歌任务上优于 GPT-4o[4]。需要注意，这种比较依赖测试提示、采样方法和自建基线，不能外推成全面超越 GPT-4o。

Dream 7B 是 7B 级扩散语言模型的重要代表。公开资料显示，它与香港大学、华为诺亚方舟实验室相关，并从 Qwen2.5-7B 权重初始化，再进行扩散训练；其主张是在通用、数学和代码任务上达到或超过部分同规模 AR 模型[9]。这一路线降低了从零训练的语言知识成本，但“AR checkpoint 适配扩散”不等于保留原 AR 的全部能力，尤其是在精确逐 token 概率和流式输出方面。

### **工业级产品证明峰值吞吐可行，但“速度”仍受条件严格约束**

| 产品/模型 | 时间与机构 | 已披露指标 | 应谨慎对待之处 |
|---|---|---|---|
| Mercury Coder | Inception AI，2025 年起迭代 | 媒体与官网转述：H100 上超过 1000 tokens/s，相比专门优化模型最高约 10 倍[8] | 官方动态页面当前无法稳定抓取，需以发布时版本和官方复现为准 |
| Gemini Diffusion | Google DeepMind，2025 | 1479 tokens/s（不含 overhead）、overhead 0.84 s[7] | 属于实验性 demo，速度不包含首包开销，任务范围较窄 |
| Seed Diffusion Preview | ByteDance Seed，2025 | 2146 tokens/s，相较同规模 AR 约 5.4 倍[10] | 官方公开页面有限，比较对象、硬件和长度未完整披露 |
| LLaDA-MoE | 蚂蚁集团/中国人民大学，2025 | 20T 数据、原生 MoE dLLM，约激活 1.4B 参数达到可比 3B 稠密效果[11] | 报告口径来自发布与媒体报道，需等开源权重/代码验证 |
| Clover 35B-A3B-Preview | DiffuSpace，2026 | 35B 总参数、3B 激活，宣称保持 10 倍速度并支持 SGLang、llama.cpp[12] | “10 倍”是团队口径，尚未形成统一第三方基准 |

![公开披露速度对比](扩散语言模型DLLM深度研究报告\fig_public_speed.png)
*图 1：公开披露的扩散模型峰值解码速度均超过 1400 tokens/s。数据来源：Google Gemini Diffusion 官方页 [7]；Seed Diffusion Preview 官方发布公开转述 [10]。*

速度数字支持“并行去噪可换取高吞吐”的方向性判断，但不足以回答单用户延迟、首 token 时间、并发和能耗问题。尤其是 Gemini Diffusion 的 0.84 s 首包开销与 1479 tokens/s 采样速度必须分开报告。

## 七、方法体系：噪声、训练、推理与后训练

### **不同转移核本质上是在可控退化与语义保留之间权衡**

Uniform 核使每个 token 都可能变成任意词，训练时见到的损坏样本分布稳定，但语义破坏强。Absorbing 核更接近真实填空：未掩码部分保持稳定，学习器能直接复用真实上下文；缺点是到达全掩码后信息丢失，且掩码比例 schedule 敏感。

Discretized Gaussian 适合有序类别、颜色或空间结构；对文本，词表没有普遍自然顺序，使用嵌入近邻构造转移核虽更语义化，却可能让噪声过程继承嵌入空间的偏差。最佳核可能依模态而异：代码 AST、生物序列、小分子与自由文本不应预设同一种邻近关系。

### **训练初始化决定语言知识来源，也决定能力继承方式**

主要训练范式有：

1. 从零预训练（LLaDA）：训练目标与 AR 语言建模不同，理论上不受固定因果顺序约束，但数据和算力成本最高。
2. AR checkpoint 继续训练（Dream 7B 思路）：复用已学到的语言表征，改造成双向/掩码扩散，降低训练成本；需处理注意力方向、位置偏差和输出参数化。
3. 蒸馏式初始化：让扩散模型模仿教师 AR 模型的分布或输出，加速冷启动，但学生的并行结构仍须单独优化。
4. 混合 AR + diffusion 目标：同时优化左到右似然和去噪目标，便于保留流式输出与精确 logprob，同时获得填空、编辑和并行解码能力。

第四类路线并不只是简单损失相加。若两部分共用主干，需注意梯度尺度、训练阶段与推理模式切换；若分别使用不同解码器，则更接近系统组合而非单一统一架构。

### **全并行、块级半 AR 与任意顺序解码是同一效率—控制连续体的不同点**

全并行掩码扩散可一次更新整段，但固定步数内的反复前向传播会放大上下文计算。Block-wise semi-AR 将序列分成块，块内并行扩散、块间按依赖推进，适合长文、代码、表格和结构化答案；其代价是块边界需要规划，若前置块出错，后续块无法从修正后的前置块受益，除非重新运行。

任意顺序自适应解码允许模型按置信度选择下一位置，理论上更适合填空和全局约束。JustGRPO 的公开讨论报告了一个反直觉结果：复杂推理中，限制模型按 AR 顺序生成的 Pass@k 曲线可能高于任意顺序[13]。这尚不能直接证明所有 dLLM 都应固定为左到右，但表明“更自由的生成顺序”本身并不自动产生更强的推理搜索空间。

### **dLLM 的缓存难点来自双向注意力的全序列重计算**

AR 的 KV cache 依赖“过去 key/value 永远不再改变”。dLLM 每轮可修改任意位置，改后的 token 会影响所有位置，因此先前 cache 不能直接复用。

研究中的可能方向包括：

| 方向 | 原理 | 收益 | 主要问题 |
|---|---|---|---|
| Fast-dLLM 类重掩码缓存 | 稳定位置尽量复用表示 | 减少重复计算 | 需验证复用误差是否累积 |
| dLLM-Cache / Sparse-dLLM | 稀疏化更新、只重算受影响位置 | 降低全序列二次/线性注意成本 | 依赖影响传播估计 |
| Block-wise cache | 块内保持双向，块间维护前缀状态 | 适配长序列与系统实现 | 块边界一致性 |
| Prefix cache | 固定提示部分缓存 | 多请求复用 prompt | 动态生成段仍需重算 |

截至本报告时间，部分方法的名称已在社区和检索结果中出现，但尚未取得全部对应论文/仓库的稳定页面，故不能列出未经核验的加速倍率。其共同原理是：计算节省来自“部分状态不变”，而不是免费恢复完整 KV cache。

### **推理步数压缩与提前退出是吞吐优化的两个杠杆**

减少扩散步数相当于用更少次网络评估换取更粗糙的去噪轨迹；提前退出允许模型在预测熵足够低时停止更新某些位置。二者都可显著降低成本，但会牺牲复杂样本质量。

与投机解码的类比在于：都试图用少量“昂贵模型调用”产生多个候选 token。但投机解码依赖 draft 模型与 AR verifier 的因果一致性；dLLM 没有天然的逐 token acceptance 链。可行的扩散—投机混合方案需要定义块级提案、重掩与验证协议，不能以 AR 投机解码的接受率直接套用。

### **可控填充、约束解码与文本编辑是 dLLM 的天然优势场景**

已知前缀、后缀、模板、中间缺口和结构化 schema 都可以作为条件。扩散模型能同时从多个方向对空缺施加约束，适合代码 patch、文档模板、SQL/JSON 修复和知识库填充。

但“可填空”不等于“能正确理解所有全局约束”。复杂约束仍需在训练时覆盖、在采样时检查并反复重掩违反约束的位置；硬约束不能仅靠无约束 CFG 保证。

### **扩散对齐的核心障碍是精确对数概率难以获得**

AR DPO 的目标需要策略与参考策略的逐 token 对数概率。dLLM 的似然通常是 ELBO，精确值需 AIS 估计，重掩采样还会产生多条轨迹。直接把 softmax logit 当 logprob 会忽略反向过程、时间权重和隐变量积分。

现有及探索性方向包括：

- 使用轨迹级偏好损失，避免逐 token 精确概率；
- 对扩散过程做蒙特卡洛估计，再用策略梯度或轨迹级 PPO/GRPO；
- 保留 AR head 或混合目标，使 DPO/SimPO 类目标可计算；
- 用采样质量、可执行性和约束满足作为奖励，而非追求精确 ELBO。

公开资料中“VRPO”等方法尚未形成可统一引用的稳定定义，本报告不把具体算法宣称视为已验证结论。

## 八、与自回归 LLM 的系统对比

### **dLLM 的并行收益取决于请求数量、生成长度和块结构，而非单步 token 数**

| 维度 | dLLM | AR LLM | 当前判断 |
|---|---|---|---|
| 训练目标 | 去噪/离散扩散 ELBO | 左到右 NLL | 前者难直接获得精确 logprob |
| 推理方向 | 全局/块内并行 | 严格因果串行 | dLLM 有理论并行上限，但实际受步数约束 |
| KV cache | 任意修改导致难以复用 | 成熟 prefix/streaming cache | AR 目前工程优势明显 |
| 交互延迟 | 去噪步数 × 序列注意力 | 长度 × 单步解码 | 单请求短输出未必更优 |
| 吞吐 | 可并行填多 token，适合高并发 | 优化成熟、投机/蒸馏丰富 | 特定负载可显著领先 |
| 可控编辑 | 前缀、后缀、中间约束天然 | 依赖重新生成或工具 | dLLM 更适合填空式任务 |
| 长上下文 | 双向依赖、全序列重算 | KV 线性增长但成熟 | 双方均需算法与系统工程 |
| 似然质量 | ELBO 上界，需 AIS 精确估计 | 直接 NLL | AR 更适合评测与重加权 |
| 工具/Agent | 研究阶段，输出协议可并行 | 流式、逐 token API 成熟 | AR 生态明显领先 |
| 生态 | 少量开源与实验框架 | vLLM、SGLang、TensorRT-LLM 等成熟 | dLLM 尚未形成统一服务栈 |

### **公开速度不能替代统一基准，首字节时间尤其关键**

Gemini Diffusion 官方页面给出 1479 tokens/s 的采样速度与 0.84 s 的 overhead[7]。Seed Diffusion Preview 公开转述给出 2146 tokens/s，并声称相比同规模 AR 快 5.4 倍[10]。Mercury 的“超过 1000 tokens/s、最高约 10 倍”主要来自发布和媒体报道，缺少本报告可稳定访问的完整硬件、batch、生成长度与对比版本明细[8]。

![Gemini Diffusion 基准口径](扩散语言模型DLLM深度研究报告\fig_gemini_bench.png)
*图 2：Gemini Diffusion 公开代码指标分别为 HumanEval 89.6% 与 LiveCodeBench 30.9%，不同基准不可直接解释为统一排名。数据来源：Google Gemini Diffusion 官方页 [7]。*

若输出为 500 token、纯生成时间按 1479 tokens/s 计算，理论约为 0.34 s；加上 0.84 s overhead，总延迟约 1.18 s。相较之下，一个平均 100 tokens/s 的 AR 模型无需同等首字节开销，理论生成为 5 s。该比较说明高吞吐可能主导长输出负载，但不代表 Mercury 与 Gemini 之间、或不同硬件之间可以直接排名。

### **能力评测必须同时报告模型规模、去噪步数、remasking 和采样预算**

AR 可报告固定温度、top-p 与 batch 的延迟；dLLM 还需报告：

- 去噪步数；
- 每步是否全序列前向；
- remasking 策略与最大重掩轮数；
- 提示和生成长度；
- 双向注意力的实现与 cache 策略；
- 并行核数与批量大小。

不同 remasking 策略会显著改变质量与延迟。若不固定这些条件，所谓“tokens/s 领先”可能只是用更少去噪步、更短输出或更大批量换来的。

## 九、局限、争议与尚未解决的问题

### **ELBO 上界意味着低训练损失未必等于低真实 NLL**

扩散模型最大化 ELBO，真实对数似然位于其上方。若反向参数化或时间离散化存在偏差，ELBO 与真实似然的差距可能增大。AIS 能估计精确似然，却增加计算与方差；因此公开 PPL 常应理解为训练/验证上界，而不是与 AR PPL 完全同义的排名依据。

### **高质量文本与低 PPL 可能背离，故单看困惑度会误判生成能力**

掩码模型可使用完整双向上下文预测单个 token，单点交叉熵可能较低；但这不自动意味着整句联合分布、长程规划或可控采样更优。反过来，dLLM 输出流畅时，也可能因离散重参数化、轨迹截断或训练目标不同而得到较差的 ELBO。

因而应同时报告：

- 精确似然或可靠 AIS 估计；
- 任务 pass rate；
- 生成熵与多样性；
- 约束满足率；
- 延迟、能耗和失败重生成率。

### **小批量交互场景的延迟优势远不如吞吐优势稳健**

AR 解码每步处理一个 token，但成熟 KV cache 可使其逐 token 成本远低于全序列重新注意力。dLLM 若用 8、16 或 32 步，且每步都处理整段，即使单步实现效率高，也未必在“batch=1、输出 50 token”场景击败 AR。

只有在长输出、高并发、可容忍固定首字节开销、可重复提示或块内高度并行时，dLLM 更可能把并行优势转化为收益。任何声称“全面 10 倍”的结论都需在同一硬件、同一长度、同一质量阈值下复测。

### **长链推理和规划仍可能是 dLLM 的相对弱项**

左到右 AR 把推理链显式组织成因果依赖，每一步可读、可验证、可分支。任意顺序扩散可双向修正，却要规划“先生成哪些约束、何时锁定哪些 token、何时回退”。JustGRPO 的公开讨论显示，任意顺序生成在某些情况下可能收窄复杂推理的解空间[13]。

这并不证明 dLLM 不能做长链推理，而是意味着：若没有显式顺序策略、验证器或重掩机制，仅依赖全局并行不一定产生可靠推理链。

### **工具调用、Agent 与生态落后于 AR 的根本原因是缺少稳定流式 token 语义**

函数调用要求格式正确、可逐 token 增量校验、能处理部分输出。dLLM 的完整块输出与重掩机制使流式解析更困难；缺少精确 token logprob 也影响重排序、best-of-N、RAG 重加权与概率路由。

截至 2026 年 10 月，Clover 公开称支持 SGLang 与 llama.cpp[12]，是生态进步信号；但尚不能说 vLLM、SGLang 等已形成与 AR 同等成熟的 dLLM cache、并行调度和量化工具链。

### **社区对“快 10 倍”和“可替代 GPT”保持合理怀疑**

可观察到的争议集中在四点：

1. 公开速度多为特定负载，不代表通用交互体验；
2. 少步采样可能牺牲代码正确性和推理稳定性；
3. 双向模型对 prompt injection、格式边界与重复控制的行为尚未充分研究；
4. 不同 remasking、步数和模型版本导致 benchmark 不可直接比较。

这些争议并不否定 dLLM，而说明行业处在从“生成演示”转向“可复现系统工程”的阶段。本报告未找到足以量化 Reddit、知乎、X、Hacker News 上各观点的统一民意调查，因此不虚构具体比例或代表性引文。

## 十、前景与开放问题

### **低延迟交互、代码编辑、结构化填充与生物序列是最可能率先胜出的场景**

代码补全和 patch 常具有明确约束、局部块结构与可自动测试验证，适合块内并行与反复重掩。文档模板、SQL、JSON、配置和知识库填空天然对应双向条件。端侧设备则更重视固定计算预算下同时生成多个 token，以降低串行解码延迟。

生物序列虽不都是自然语言文字，但离散 token、双向依赖、插入/替换/编辑等特性与扩散机制相容。ESM 类蛋白质语言模型主要不是 dLLM，其掩码、生成与序列设计经验可以迁移，但不能把所有蛋白质语言模型都归入“扩散 LM”[14]。

### **dLLM 与 speculative decoding、MoE、长上下文结合可能形成混合架构**

Speculative decoding 可用一个小型扩散模型提出块级候选，再由 AR verifier 检查；MoE 可按位置、生成阶段或约束类型路由专家；长上下文可把稳定历史压缩为递归状态，只在当前块内做全双向注意力。

Clover 使用门控 Delta 网络压缩历史并保留块内双向交互，体现了这一方向[12]。其风险是递归状态可能丢细节，块内并行又可能固化局部错误，二者需要重新设计训练目标。

### **test-time scaling 可能采取多轨迹扩散、重掩与验证，而不是单纯增加 AR 步数**

dLLM 可在同一提示下并行产生多个完整块，再重掩不一致位置；验证器可选择满足约束或奖励最高的结果。该路线与 best-of-N 类似，但生成预算会随轨迹数、扩散步数和序列长度增长。

若未来研究能把验证反馈稳定地反向传播到 remasking 策略，test-time compute 才可能产生可预测的收益。当前没有充分证据表明任意顺序多轨迹总是优于固定顺序重采样。

### **开放理论问题仍是更优转移核、精确似然与最优重掩策略**

未来研究值得关注：

- 根据语法、AST 或语义距离学习数据相关转移核；
- 统一离散状态、嵌入空间和 CTMC 的表示；
- 用归一化流、AR 混合头或离散 ODE 获得可计算的精确似然；
- 把 remasking 建模成在线决策问题，而不是固定启发式；
- 研究扩散过程对指令分布、后门与 prompt injection 的鲁棒性。

以下为推断而非既成事实：2026—2027 年最可能出现的不是“dLLM 全面取代 AR”，而是混合模型成为主流；在代码编辑、结构化输出、端侧代理和可控生成中形成产品级优势；通用 Agent 与开放互联网任务仍以 AR 或 AR 主导的混合架构为主。

## 十一、术语表

| 术语 | 中文对照 | 含义 |
|---|---|---|
| dLLM / DLLM | 扩散大语言模型 | 以扩散过程生成离散文本 token 的语言模型 |
| DDPM | 去噪扩散概率模型 | 通过固定前向加噪与学习反向去噪的高斯扩散模型 |
| ELBO | 证据下界 | 对数似然的可优化下界，扩散训练的主要目标 |
| Score matching | 分数匹配 | 学习分布对数密度的梯度 |
| CTMC | 连续时间马尔可夫链 | 以速率矩阵描述连续时间离散状态转移 |
| Concrete score | 具体分数 | 离散状态邻域上的对数概率比 |
| D3PM | 离散状态空间结构化去噪扩散模型 | 基于离散转移矩阵的扩散框架 |
| Absorbing state | 吸收态 | 一旦进入便不再离开的状态，如 `[MASK]` |
| Uniform kernel | 均匀转移核 | 以固定概率将状态均匀替换 |
| Masked diffusion | 掩码扩散 | 以 `[MASK]` 为吸收态的离散扩散 |
| Remasking | 重掩码 | 生成后重新隐藏部分 token 并再预测 |
| Block-wise semi-AR | 块级半自回归 | 块内并行扩散、块间顺序推进 |
| KV cache | 键值缓存 | 保存注意力 key/value 以加速因果解码 |
| CFG | 无分类器引导 | 通过条件与无条件输出组合增强条件控制 |
| NLL | 负对数似然 | 常作为 AR 语言模型质量指标 |
| PPL | 困惑度 | NLL 的指数，受 tokenization 与似然口径影响 |
| Test-time scaling | 测试时扩展 | 增加采样、验证或计算提升输出质量 |

## 十二、关键论文与方法清单

| 时间 | 论文/模型 | 机构 | 贡献 | 链接 |
|---|---|---|---|---|
| 2020 | DDPM | Google | 建立现代去噪扩散概率建模基础 | https://arxiv.org/abs/2006.11239 |
| 2021 | D3PM | Google Research | 离散扩散与多种转移核 | https://arxiv.org/abs/2107.03006 |
| 2022 | Diffusion-LM | 多机构 | 连续空间文本扩散 | https://arxiv.org/abs/2205.14217 |
| 2022 | DiffusionBERT | 学术团队 | 融合扩散与 BERT 式双向表示 | https://arxiv.org/abs/2211.16492 |
| 2022 | SEDD | Stanford / Pika | 离散 score entropy | https://arxiv.org/abs/2310.16834 |
| 2023 | MDLM | 学术团队 | 掩码扩散语言模型与简化训练 | https://arxiv.org/abs/2406.07524 |
| 2023 | MD4 | 学术团队 | 离散掩码扩散改进 | 官方页面未稳定定位 |
| 2023 | DiffuSeq | 港大团队 | 序列到序列扩散生成 | https://arxiv.org/abs/2211.10685 |
| 2023 | SSD-LM | 学术团队 | 半自回归扩散文本生成 | https://arxiv.org/abs/2306.02540 |
| 2024 | LLaDA | 人大等 | 从零预训练掩码扩散语言模型 | https://arxiv.org/abs/2502.09992 |
| 2025 | Dream 7B | 港大/华为诺亚相关 | 7B 扩散语言模型与 AR 初始化 | https://arxiv.org/abs/2505.15671 |
| 2025 | Mercury Coder | Inception AI | 商业化扩散代码模型 | https://ai.incubation.inceptionlabs.ai/blog/mercury-coder |
| 2025 | Gemini Diffusion | Google DeepMind | 实验性并行扩散语言模型 | https://deepmind.google/models/gemini-diffusion/ |
| 2025 | Seed Diffusion Preview | ByteDance Seed | 实验性扩散代码生成 | 官方页面未稳定定位 |
| 2025 | LLaDA-MoE | 蚂蚁/人大 | 原生 MoE 扩散语言模型 | https://ishaanxi.com/c/2025-09-12/3511096.shtml |
| 2026 | Clover 35B-A3B-Preview | DiffuSpace | 35B/3B MoE 与块级扩散 | https://www.thecover.cn/news/TZsPiw%2BXR%2BH90qSdq8Jkw== |
| 2026 | JustGRPO | 学术团队 | 讨论 dLLM 的 AR/任意顺序 RL 差异 | https://arxiv.org/abs/2602.12219 |
| 2026 | DiffuSpace/Acrab 合作 | DiffuSpace、Acrab | 端侧 Agent 系统适配 | https://news.dayoo.com/finance/202609/03/171077_54999525.htm |

注：部分 2026 工作的公开论文页仍可能更新或变动；若无法从官方 arXiv、项目页或代码仓库交叉确认，本报告不补造链接。研究者在引用前应再次检查标题、版本与作者列表。

## 引用来源

[1] https://arxiv.org/abs/2310.16834
> “We propose score entropy, a novel loss that naturally extends score matching to discrete spaces.”

[2] https://arxiv.org/abs/2107.03006
> “D3PM forward and (learned) reverse process applied to a quantized swiss roll.”

[3] https://arxiv.org/abs/2406.07524
> “A Simple Discrete Diffusion Language Model for Text Generation”

[4] https://arxiv.org/abs/2502.09992
> “LLaDA employs a forward data masking process and a reverse generation process, parameterized by a Transformer to predict masked tokens.”

[5] https://arxiv.org/abs/2006.11239
> “Denoising Diffusion Probabilistic Models”

[6] https://arxiv.org/abs/2211.16492
> “DiffusionBERT: Improving Generative Masked Language Models with Diffusion Models”

[7] https://deepmind.google/models/gemini-diffusion/
> “Sampling speed excluding overhead 1479 tokens / sec Overhead 0.84 sec”

[8] https://m.thepaper.cn/newsDetail_forward_30393145
> “还能在 NVIDIA H100 芯片上，实现每秒超过 1000token 的处理速度。”

[9] https://arxiv.org/abs/2505.15671
> “Dream 7B is a 7B-parameter diffusion language model.”

[10] https://www.jjckb.cn/20250805/2daef54f53f8479cb4439a7a2a3a2d45/c.html
> “代码推理速度可达到2146 tokens/s，速度相比同等规模的自回归模型提升5.4倍。”

[11] https://ishaanxi.com/c/2025-09-12/3511096.shtml
> “在约20T数据上完成了从零训练MoE架构的扩散语言模型。”

[12] https://www.thecover.cn/news/TZsPiw%2BXR%2BH90qSdq8Jkw==
> “Clover在指令遵循、知识、逻辑推理和长文本理解等多项评测中达到或超过同尺寸自回归模型。”

[13] https://arxiv.org/abs/2602.12219
> “JustGRPO: Diffusion Language Models Can Learn Reasoning Better by Generating Autoregressively.”

[14] https://news.sciencenet.cn/htmlpaper/2026/6/2026611113049677151498.shtm
> “在蛋白质设计方面，包含序列的无条件生成、针对特定功能及骨架的条件生成。”

[15] https://thepaper.cn/newsDetail_forward_28169473
> “通过提出得分熵这一新颖的损失来弥补这一差距。”

[16] https://news.dayoo.com/finance/202609/03/171077_54999525.htm
> “适配测试显示，dLLM可将端侧Agent的运行速度提升5倍。”

[17] https://finance.ce.cn/rolling/202610/t20261009_3251121.shtml
> “在同等显卡、同等生成长度、单用户单次查询的条件下，团队模型每秒生成Token的速度约为主流自回归模型的10倍。”

[18] https://m.thepaper.cn/newsDetail_forward_26425067
> “在离散空间数据（如文本、分类数据）的扩散模型中，D3PM 定义了离散空间的前向过程。”
