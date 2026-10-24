---
title: PPO与后PPO算法公式全景手册
date: 2026-10-24
tags: reinforcement learning, PPO, 后PPO
---


# PPO 与后 PPO 时代：强化学习公式全景手册

> **上篇（§1–§5）**：从 REINFORCE 到 PPO-Clip 的第一性原理推导链，每一步都写到代数末梢，并附数值验证。
> **下篇（§6–§15）**：RLHF-PPO → GRPO → DAPO / GSPO / CISPO / VAPO 的 2024–2025 衍生算法公式族。
>
> 数据截止 2025 年 10 月。所有公式给出符号解释；存在口径冲突处已明确标注。
> 配套复现脚本：`rl_derivation_verify.py`（纯 numpy，直接运行即可复现上篇所有【数值验证】表格）。

---

## 0. 阅读地图：一张表看懂整个演进

所有这类算法都可以写成同一个"骨架"：

$$\mathcal{J}(\theta)=\mathbb{E}\Bigl[\;f\bigl(r,\hat A\bigr)\Bigr]\quad\text{其中}\quad r=\frac{\pi_\theta}{\pi_{\theta_{\text{old}}}}$$

**区别只有四件事：① 优势 $\hat A$ 怎么估计；② 比率 $r$ 取什么粒度；③ 权重函数 $f$ 长什么样；④ 归一化分母是什么。**

| 算法 | ① 优势 $\hat A$ | ② 比率粒度 | ③ 权重函数 $f(r,\hat A)$ | ④ 分母 | 价值模型 |
|---|---|---|---|---|---|
| REINFORCE | 蒙特卡洛回报 $G_t$ | 无（on-policy） | $\log\pi_\theta\cdot G_t$ | 轨迹平均 | 无 |
| Actor-Critic / A2C | TD / n-step / GAE | 无 | $\log\pi_\theta\cdot\hat A$ | 逐 token | 有 |
| TRPO | GAE | token 级 $r_t$ | $r_t\hat A$，硬约束 $\bar D_{\rm KL}\le\delta$ | 逐 token | 有 |
| **PPO-Clip** | GAE | token 级 $r_t$ | $\min(r_t\hat A,\ \mathrm{clip}(r_t,1\!\pm\!\epsilon)\hat A)$ | 逐 token | 有 |
| PPO-Penalty | GAE | token 级 $r_t$ | $r_t\hat A-\beta D_{\rm KL}$，$\beta$ 自适应 | 逐 token | 有 |
| **RLHF-PPO** | GAE（$\gamma=1$，KL 进奖励） | token 级 $r_t$ | 同 PPO-Clip | 逐 token | 有 |
| **GRPO** | 组内归一化 $\frac{R_i-\mu_G}{\sigma_G}$ | token 级 $r_{i,t}$ | $\min(r_{i,t}\hat A_i,\ \mathrm{clip}(\cdot)\hat A_i)$ | $G\cdot|o_i|$ | **无** |
| Dr. GRPO | $R_i-\mu_G$（去掉 $\sigma_G$） | token 级 | 同 GRPO | **求和而非平均** | 无 |
| **DAPO** | 组内归一化 | token 级 $r_{i,t}$ | $\min(r\hat A,\ \mathrm{clip}(r,1-\epsilon_{\rm low},1+\epsilon_{\rm high})\hat A)$ | $\sum_i|o_i|$ | 无 |
| **GSPO** | 组内归一化 | **序列级** $s_i$（长度归一化） | $\min(s_i A_i,\ \mathrm{clip}(s_i,1\!\pm\!\epsilon)A_i)$ | $\frac1G$ | 无 |
| **CISPO** | 组内归一化 | token 级 | $\mathrm{clip}(r,1-\epsilon_{\rm low},1+\epsilon_{\rm high})\cdot\hat A$（**无 min**） | $G\cdot|o_i|$ | 无 |
| **VAPO** | **解耦 GAE** $\lambda_\pi\!\ne\!\lambda_V$ | token 级 | 解耦 clip + 正例 NLL | $\sum_i|o_i|$ | **有** |

**一句话主线**：TRPO 用 KL 硬约束 → PPO 用 clip 逐点下界 → GRPO 用组内基线砍掉价值网络 → DAPO/GSPO/CISPO 修 clip 与比率的粒度偏差 → VAPO 把价值网络请回来但修好它的 GAE。

---

# 上篇 · 第一性原理推导链

## 1. 地基：MDP、符号与 REINFORCE

### 1.1 符号约定

马尔可夫决策过程 $\mathcal{M}=(\mathcal{S},\mathcal{A},P,r,\rho_0,\gamma)$：

| 符号 | 含义 |
|---|---|
| $\mathcal{S},\mathcal{A}$ | 状态空间、动作空间（LLM 场景：$s_t=(x,y_{<t})$，$a_t=y_t$） |
| $P(s'\|s,a)$ | 状态转移（LLM 中是确定性的：拼接 token） |
| $r(s,a)$ | 即时奖励 |
| $\gamma\in[0,1]$ | 折扣因子 |
| $\mu^\pi(s)=\sum_{t=0}^{\infty}\gamma^t P(s_t=s\|\pi)$ | **未归一化**折扣占用度量，$\sum_s\mu^\pi(s)=\frac{1}{1-\gamma}$ |
| $d^\pi(s)=(1-\gamma)\mu^\pi(s)$ | 归一化折扣占用度量（概率分布） |

优化目标：

$$J(\theta)=\mathbb{E}_{\tau\sim p_\theta}\Bigl[\sum_{t=0}^{T-1}\gamma^t r_t\Bigr]=V^\pi(s_0)$$

> **符号提示**：本文推导一律用**未归一化**的 $\mu^\pi$，好处是性能差引理 $J(\pi')-J(\pi)=\sum_s\mu^{\pi'}(s)\sum_a\pi'(a|s)A^\pi(s,a)$ 不带 $(1-\gamma)$ 系数，式子更干净。读到其他地方出现 $d^\pi$ 时，记住 $d^\pi=(1-\gamma)\mu^\pi$，两者只差一个常数因子。

### 1.2 REINFORCE 的完整推导（四个小步）

**核心困难**：$J(\theta)$ 对 $\theta$ 的依赖藏在**采样分布** $p_\theta$ 里，不能把梯度直接挪进期望——"对分布求导"没有定义。下面四步就是解决这一件事。

#### 小步 1：轨迹概率的对数求导

$$p_\theta(\tau)=\rho_0(s_0)\prod_{t=0}^{T-1}\pi_\theta(a_t|s_t)\,P(s_{t+1}|s_t,a_t)$$

取对数后求导：

$$\log p_\theta(\tau)=\underbrace{\log\rho_0(s_0)}_{\text{不含}\ \theta}+\sum_{t=0}^{T-1}\underbrace{\log\pi_\theta(a_t|s_t)}_{\text{含}\ \theta}+\sum_{t=0}^{T-1}\underbrace{\log P(s_{t+1}|s_t,a_t)}_{\text{不含}\ \theta}$$

$$\Longrightarrow\quad \boxed{\;\nabla_\theta\log p_\theta(\tau)=\sum_{t=0}^{T-1}\nabla_\theta\log\pi_\theta(a_t|s_t)\;}$$

> **这是整个强化学习最关键的一行**：环境动力学是"外部世界"，它的项**全部消失**，只剩策略自己的对数概率。所以 RL 不需要知道环境模型——这就是 model-free 的根源。

#### 小步 2：对数导数技巧（likelihood-ratio trick）

由 $\nabla\log f=\frac{\nabla f}{f}$ 得 $\nabla p_\theta=p_\theta\nabla\log p_\theta$，于是：

$$\nabla_\theta J=\int \nabla_\theta p_\theta(\tau)\,R(\tau)\,d\tau=\int p_\theta(\tau)\,\nabla_\theta\log p_\theta(\tau)\,R(\tau)\,d\tau=\mathbb{E}_{\tau\sim p_\theta}\bigl[R(\tau)\,\nabla_\theta\log p_\theta(\tau)\bigr]$$

**这一步把"对分布求导"转成了"在分布下求期望"**，因此可以用采样估计。

#### 小步 3：naive 形式

$$\nabla_\theta J=\mathbb{E}_{\tau\sim\pi_\theta}\Bigl[\Bigl(\sum_{t=0}^{T-1}\nabla_\theta\log\pi_\theta(a_t|s_t)\Bigr)\Bigl(\sum_{t=0}^{T-1}\gamma^t r_t\Bigr)\Bigr]$$

#### 小步 4：因果性化简 —— 从"整条回报"到 rewards-to-go

把双求和展开。对固定的 $t$，考察所有 $t'<t$ 的项：

$$\mathbb{E}\bigl[\nabla_\theta\log\pi_\theta(a_t|s_t)\cdot r_{t'}\bigr]
=\mathbb{E}_{s_t}\Bigl[\underbrace{\mathbb{E}_{a_t\sim\pi_\theta(\cdot|s_t)}\bigl[\nabla_\theta\log\pi_\theta(a_t|s_t)\bigr]}_{=0\ \text{(得分函数恒等式，见 §2.1)}}\cdot r_{t'}\Bigr]=0$$

因为 $r_{t'}$ 发生在 $a_t$ **之前**，与 $a_t$ 无关（可提到内层期望外）。于是 $t'<t$ 的项全部归零：

$$\boxed{\;\nabla_\theta J=\mathbb{E}_{\tau\sim\pi_\theta}\Bigl[\sum_{t=0}^{T-1}\gamma^t\,\nabla_\theta\log\pi_\theta(a_t|s_t)\,G_t\Bigr],\qquad G_t=\sum_{t'=t}^{T-1}\gamma^{t'-t}r_{t'}\;}$$

### 1.3 策略梯度定理

用占用度量写成紧致形式：

$$\boxed{\;\nabla_\theta J(\theta)=\mathbb{E}_{s\sim\mu^\pi,\;a\sim\pi_\theta}\bigl[\nabla_\theta\log\pi_\theta(a|s)\,Q^\pi(s,a)\bigr]\;}$$

直觉极其简单：**把 $\log\pi_\theta(a_t|s_t)$ 的梯度，按"这个动作带来的回报 $Q^\pi$"加权求和。回报高的动作，往增大其概率的方向走。**

---

## 2. 从 REINFORCE 到 PPO-Clip：完整推导链

> 这一节是全文主干。四步，每一步都回答"为什么必须做这一步"，并给出代数末梢。

$$\textbf{REINFORCE}\ \xrightarrow{\ \text{减基线}\ }\ \textbf{+Baseline}\ \xrightarrow{\ \text{IS}\ }\ \textbf{+Surrogate}\ \xrightarrow{\ \text{clip}\ }\ \textbf{PPO-Clip}$$

---

### 2.1 第一步：减基线 —— 唯一目的是降方差

#### (a) 得分函数恒等式（严格证明）

$$\mathbb{E}_{a\sim\pi_\theta}\bigl[\nabla_\theta\log\pi_\theta(a|s)\bigr]
=\sum_a \pi_\theta(a|s)\frac{\nabla_\theta\pi_\theta(a|s)}{\pi_\theta(a|s)}
=\sum_a\nabla_\theta\pi_\theta(a|s)
=\nabla_\theta\underbrace{\sum_a\pi_\theta(a|s)}_{=1}=0$$

【数值验证】5 臂 softmax bandit，200 万样本：

```
E_a[∇logπ] = [-1.4e-4, -1.2e-4, -7.5e-5, 1.1e-4, 2.2e-4]   ≈ 0 ✓
```

#### (b) 减基线不改变期望

对**任意不依赖 $a_t$** 的 $b(s_t)$：

$$\mathbb{E}\bigl[\nabla_\theta\log\pi_\theta(a_t|s_t)\,b(s_t)\bigr]
=\mathbb{E}_{s_t}\Bigl[b(s_t)\cdot\underbrace{\mathbb{E}_{a_t}\bigl[\nabla_\theta\log\pi_\theta(a_t|s_t)\bigr]}_{=0}\Bigr]=0$$

$$\Longrightarrow\quad \nabla_\theta J=\mathbb{E}\Bigl[\sum_t \gamma^t\nabla_\theta\log\pi_\theta(a_t|s_t)\bigl(G_t-b(s_t)\bigr)\Bigr]$$

**硬约束：$b$ 不能依赖 $a_t$。** 一旦违反，估计器立刻有偏——见下方验证表的最后一行。

【数值验证】

| 估计器 | 与解析 $\nabla J$ 的最大误差 | 梯度方差 $\sum_k\mathrm{Var}$ | 方差降幅 | 判定 |
|---|---|---|---|---|
| REINFORCE（$b=0$） | 1.7e-4 | 0.856 | — | 无偏 ✓ |
| + 常数基线 $\mathbb{E}[R]$ | 3.3e-4 | 0.659 | **↓23%** | 无偏 ✓ |
| + 最优基线 $b^*$ | 8.9e-5 | 0.168 | **↓80%** | 无偏 ✓ |
| 基线 $=0.5\,R(a)$（**依赖动作**） | **0.192** | — | — | **有偏 ✗** |

> 最后一行是关键。这也是 GRPO 组内均值 $\frac1G\sum_j R_j$（含自身样本）所引发的轻微偏差的来源，以及 RLOO 改用留一基线 $\frac{1}{G-1}\sum_{j\ne i}R_j$ 的动机（见 §12.2）。

#### (c) 基线的唯一作用：削减方差（完整推导）

设估计量 $X(b)=\nabla\log\pi(a|s)\bigl(G-b\bigr)$，则

$$\mathrm{Var}[X(b)]=\underbrace{\mathbb{E}\bigl[\|\nabla\log\pi\|^2(G-b)^2\bigr]}_{\text{随 } b \text{ 变}}-\underbrace{\bigl\|\mathbb{E}[\nabla\log\pi(G-b)]\bigr\|^2}_{\text{与 } b \text{ 无关}}$$

第二项与 $b$ 无关的原因是 $\mathbb{E}[\nabla\log\pi\,b]=0$，故 $\mathbb{E}[\nabla\log\pi(G-b)]=\mathbb{E}[\nabla\log\pi\,G]$ 恒定。**所以只需最小化第一项。**

#### (d) 最优基线（完整推导）

对 $\mathbb{E}\bigl[\|\nabla\log\pi\|^2(G-b)^2\bigr]$ 关于 $b$ 求导并令其为零：

$$\frac{d}{db}\mathbb{E}\bigl[\|\nabla\log\pi\|^2(G-b)^2\bigr]=-2\,\mathbb{E}\bigl[\|\nabla\log\pi\|^2(G-b)\bigr]=0$$

$$\boxed{\;b^*(s)=\frac{\mathbb{E}_{a\sim\pi}\bigl[\|\nabla_\theta\log\pi_\theta(a|s)\|^2\,G\bigr]}{\mathbb{E}_{a\sim\pi}\bigl[\|\nabla_\theta\log\pi_\theta(a|s)\|^2\bigr]}\;}$$

这是**逐维度**的加权平均，权重是 score 的平方。数值验证中它把方差再压 80%（相对无基线累计降 **80.4%**）。

若忽略权重 $\|\nabla\log\pi\|^2$ 的变化（粗近似），$b^*\approx\mathbb{E}[G|s]=V^\pi(s)$。

#### (e) 优势函数自然浮现

取 $b(s)=V^\pi(s)$：

$$A^\pi(s,a)=Q^\pi(s,a)-V^\pi(s,a)$$

$V^\pi(s)=\mathbb{E}_{a\sim\pi}[Q^\pi(s,a)]$ **不依赖动作**（合法基线），同时又是 $b^*$ 的近似（方差接近最优）。**"基线"与"优势"是同一件事的两面。**

$$\nabla_\theta J=\mathbb{E}_{s\sim\mu^\pi,a\sim\pi}\bigl[\nabla_\theta\log\pi_\theta(a|s)\,A^\pi(s,a)\bigr]$$

---

### 2.2 第二步：重要性采样 —— 让旧数据能反复用

#### (a) 动机

上面的估计器是 **on-policy** 的：样本必须来自**当前的** $\pi_\theta$。这意味着每做一次梯度更新就要重新采样一批数据——对 LLM 而言采样成本极高。

#### (b) IS 恒等式

$$\mathbb{E}_{x\sim p}[f(x)]=\int p(x)f(x)dx=\int q(x)\frac{p(x)}{q(x)}f(x)dx=\mathbb{E}_{x\sim q}\Bigl[\frac{p(x)}{q(x)}f(x)\Bigr]$$

只需 $q(x)>0$ 处处成立（支撑集覆盖）。

#### (c) 轨迹级 IS：数学上无偏，工程上不可用

$$w_\tau(\theta)=\frac{\pi_\theta(\tau)}{\pi_{\theta_{\text{old}}}(\tau)}=\prod_{t=0}^{T-1}\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}=\prod_{t=0}^{T-1}r_t$$

无偏，但**方差随 $T$ 指数增长**。

【数值验证】2 状态 MDP，$T=20$，2 万条轨迹，用 $\pi_{\text{old}}$ 采样后算 IS 权重：

| 步长 $t$ | $\mathbb{E}[w]$ | ESS（有效样本量） | ESS / N |
|---|---|---|---|
| 0.0 | 1.000 | 20000 | **100%** |
| 0.5 | 0.0705 | 7943 | 39.7% |
| 1.0 | 0.0098 | 1293 | 6.5% |
| 2.0 | 0.0011 | 63.5 | **0.32%** |
| 4.0 | 0.0003 | 7.7 | **0.04%** |
| 8.0 | 0.0002 | 4.1 | **0.02%** |

**步长一大，2 万条样本的有效信息量塌到个位数**——梯度被极少数轨迹绑架。这就是必须"在比率上做手脚"的直接原因。

#### (d) 逐步 surrogate：TRPO/PPO 的关键取舍

既然轨迹级 IS 方差爆炸，就**只对动作做 IS，把状态分布冻结在旧策略上**：

$$\boxed{\;L_{\theta_{\text{old}}}(\theta)=\sum_t\mathbb{E}_{s_t\sim\mu^{\pi_{\text{old}}},\,a_t\sim\pi_{\text{old}}}\bigl[r_t(\theta)\,A^{\pi_{\text{old}}}(s_t,a_t)\bigr]=\sum_s\mu^{\text{old}}(s)\sum_a\pi_\theta(a|s)\,A^{\text{old}}(s,a)\;}$$

第二个等号用了 $\sum_a\pi_{\text{old}}(a|s)\cdot\frac{\pi_\theta(a|s)}{\pi_{\text{old}}(a|s)}=\sum_a\pi_\theta(a|s)$。

> **这是一次刻意的"偏差换方差"交易**：完整 IS 应该连状态分布一起修正，但那会回到轨迹级爆炸。冻结 $\mu^{\text{old}}$ 使估计器变成**近似**（有偏），但方差可控。

#### (e) 关键引理：surrogate 与真实目标一阶等价

$$\nabla_\theta L_{\theta_{\text{old}}}(\theta)\Big|_{\theta=\theta_{\text{old}}}
=\sum_s\mu^{\text{old}}(s)\sum_a\nabla_\theta\pi_\theta(a|s)\big|_{\text{old}}A^{\text{old}}(s,a)$$

$$=\sum_s\mu^{\text{old}}(s)\sum_a\pi_{\text{old}}(a|s)\,\nabla_\theta\log\pi_\theta(a|s)\big|_{\text{old}}\bigl(Q^{\text{old}}(s,a)-V^{\text{old}}(s)\bigr)$$

$$\underbrace{-\sum_s\mu^{\text{old}}(s)V^{\text{old}}(s)\underbrace{\sum_a\pi_{\text{old}}(a|s)\nabla_\theta\log\pi_\theta(a|s)}_{=0\ \text{(得分函数恒等式)}}}_{=0}$$

$$=\mathbb{E}_{s\sim\mu^{\text{old}},a\sim\pi_{\text{old}}}\bigl[\nabla_\theta\log\pi_\theta(a|s)Q^{\text{old}}(s,a)\bigr]=\nabla_\theta J(\theta_{\text{old}})\quad\blacksquare$$

> 注意：证明里"减掉 $V^{\text{old}}$ 那一整项为 0"用的正是 §2.1(a) 的得分函数恒等式。**它是整座大厦的地基——同时支撑了"减基线"和"surrogate 一阶等价"两个结论。**

【数值验证】2 状态折扣 MDP，$\gamma=0.9$：

```
∇J(θ_old)                = [-1.817900  1.817900 -1.361864  1.361864]
∇L_{θold}(θ)|_{θ=θ_old}  = [-1.817900  1.817900 -1.361864  1.361864]
max|∇L − ∇J|             = 1.720e-09
```

四位有效数字完全吻合。**这就是 PPO 敢用 $L$ 代替 $J$ 的全部底气。**

---

### 2.3 第三步：surrogate 的裂缝 —— 为什么必须限制步长

#### (a) 性能差引理（完整推导）

$$\mathbb{E}_{\tau\sim\pi'}\Bigl[\sum_t\gamma^t A^\pi(s_t,a_t)\Bigr]
=\mathbb{E}\Bigl[\sum_t\gamma^t\bigl(r_t+\gamma V^\pi(s_{t+1})-V^\pi(s_t)\bigr)\Bigr]$$

第二、三项望远镜相消：

$$\mathbb{E}\Bigl[\sum_t\gamma^{t+1}V(s_{t+1})\Bigr]-\mathbb{E}\Bigl[\sum_t\gamma^t V(s_t)\Bigr]=\mathbb{E}\bigl[\gamma^TV(s_T)\bigr]-V^\pi(s_0)$$

当 $T\to\infty$ 或终止态 $V=0$ 时中间项为 0，故

$$\boxed{\;J(\pi')-J(\pi)=\mathbb{E}_{\tau\sim\pi'}\Bigl[\sum_t\gamma^t A^\pi(s_t,a_t)\Bigr]=\sum_s\mu^{\pi'}(s)\sum_a\pi'(a|s)A^\pi(s,a)\;}$$

#### (b) 与 surrogate 对比：唯一的差别是状态分布

$$L_\pi(\pi')=\sum_s\color{red}{\mu^{\pi}(s)}\sum_a\pi'(a|s)A^\pi(s,a)$$

$$J(\pi')-J(\pi)-L_\pi(\pi')=\sum_s\bigl[\mu^{\pi'}(s)-\mu^{\pi}(s)\bigr]\sum_a\pi'(a|s)A^\pi(s,a)$$

**正是这一项让 surrogate 在远处撒谎。**

【数值验证】沿 $\nabla J$ 方向走 $t$ 步（2 状态 MDP，$\gamma=0.9$）：

| 步长 $t$ | 真实改进 $J-J_{\text{old}}$ | surrogate 承诺 $L-L_{\text{old}}$ | 比值 L/J | 判定 |
|---|---|---|---|---|
| 0.25 | 0.793 | 0.814 | 1.026 | 邻域内可信 |
| 0.50 | 1.540 | 1.636 | 1.062 | 邻域内可信 |
| 1.00 | 2.787 | 3.212 | 1.152 | 高估 15% |
| 2.00 | 4.236 | 5.585 | 1.318 | 高估 32% |
| 4.00 | 5.071 | 7.241 | **1.428** | 高估 43% |
| ≥8 | 5.241 | 7.517 | **1.434** | 高估 43% |

**邻域内（$t\lesssim0.5$）误差 3–6%，可忽略；走远后 surrogate 系统性高估 43%。**
这就是信任域存在的全部理由：**一阶等价只在 $\theta_{\text{old}}$ 的邻域内成立**。

---

### 2.4 第四步：clip —— 用逐点梯度遮蔽替代约束优化

#### (a) 需求：约束策略变化的幅度

既然 $L$ 只在局部可信，就要限制 $\pi_\theta$ 相对 $\pi_{\text{old}}$ 的变化。两条既有路线：

**路线 A（TRPO）——硬约束 KL**

$$\max_\theta L_{\theta_{\text{old}}}(\theta)\quad\text{s.t.}\quad \bar D_{\mathrm{KL}}(\theta_{\text{old}}\|\theta)\le\delta$$

求解要 Fisher 向量积 + 共轭梯度 + 线搜索（见 §4），对大模型不可行。

**路线 B（PPO-Penalty）——软惩罚**

$$L^{\mathrm{KLPEN}}(\theta)=L_{\theta_{\text{old}}}(\theta)-\beta\,\bar D_{\mathrm{KL}}(\theta_{\text{old}}\|\theta),\qquad \beta_{k+1}=\begin{cases}2\beta_k & \bar D_{\mathrm{KL}}>1.5\,d_{\text{tgt}}\\ \beta_k/2 & \bar D_{\mathrm{KL}}<d_{\text{tgt}}/1.5\end{cases}$$

问题：$\beta$ 的合适尺度**跨任务变化极大**，调不好就退化为"要么束手束脚、要么完全失效"。

#### (b) PPO-Clip 的思路转向：不去约束"分布距离"，直接约束"比率本身"

观察 surrogate 的每一项：

$$L=\mathbb{E}_t\bigl[\,r_t(\theta)\,\hat A_t\,\bigr],\qquad r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}$$

**失控的唯一直观表现就是 $r_t$ 跑离 1。** 与其绕道去算 KL（一个关于分布的**平均**量），不如**逐样本、逐点**地把 $r_t$ 摁住。

天真做法：$L^{\text{naive}}=\mathbb{E}[\operatorname{clip}(r_t,1-\epsilon,1+\epsilon)\,\hat A_t]$。它确实限制了 $r$，但有个致命缺陷（见 (d)）。

PPO 的做法：加一个 $\min$：

$$\boxed{\;L^{\mathrm{CLIP}}(\theta)=\mathbb{E}_t\Bigl[\min\Bigl(r_t(\theta)\hat A_t,\ \operatorname{clip}\bigl(r_t(\theta),1-\epsilon,1+\epsilon\bigr)\hat A_t\Bigr)\Bigr]\;}$$

#### (c) 完整分情形推导（$r>0$，记 $A=\hat A_t,\ r=r_t,\ \epsilon>0$）

**当 $A>0$**（好动作，想推高 $r$）：

| $r$ 范围 | $\operatorname{clip}(r)$ | 比较 | $\min$ 取 |
|---|---|---|---|
| $r<1-\epsilon$ | $1-\epsilon>r$ → $(1-\epsilon)A>rA$ | | $rA$ |
| $1-\epsilon\le r\le 1+\epsilon$ | $=r$ | 相等 | $rA$ |
| $r>1+\epsilon$ | $1+\epsilon<r$ → $(1+\epsilon)A<rA$ | | $\mathbf{(1+\epsilon)A}$ |

**当 $A<0$**（坏动作，想压低 $r$）：

| $r$ 范围 | $\operatorname{clip}(r)$ | 比较 | $\min$ 取 |
|---|---|---|---|
| $r<1-\epsilon$ | $1-\epsilon>r$ → $(1-\epsilon)A<rA$ | | $\mathbf{(1-\epsilon)A}$ |
| $1-\epsilon\le r\le 1+\epsilon$ | $=r$ | 相等 | $rA$ |
| $r>1+\epsilon$ | $1+\epsilon<r$ → $(1+\epsilon)A>rA$ | | $rA$ |

**结论（这是 PPO 最容易被讲错的地方）**：

$$L^{\mathrm{CLIP}}_t=\begin{cases}
(1+\epsilon)A & A>0,\ r>1+\epsilon \quad\textbf{【截断】}\\
(1-\epsilon)A & A<0,\ r<1-\epsilon \quad\textbf{【截断】}\\
rA & \text{其他所有情形}
\end{cases}$$

**$A>0$ 时只有上界起作用，$A<0$ 时只有下界起作用。**

#### (d) $\min$ 到底在干什么（这是 PPO 最精妙的一处）

关键在于 **$A<0$ 且 $r>1+\epsilon$** 这一格——"这是个坏动作，但它的概率被推高了 20% 以上"，**最危险的情形**：

- **$\min$ 版本**取 $rA$：惩罚**不封顶**，$r$ 越大罚得越狠 → 强力纠偏
- **天真 $\operatorname{clip}(r)A$ 版本**取 $(1+\epsilon)A$：惩罚**封顶**，模型可以"无痛"把坏动作概率推到任意高

【数值验证】$\epsilon=0.2$：

| 情形 | $A$ | $r$ | PPO 目标 | PPO 梯度 | 天真目标 | 天真梯度 |
|---|---|---|---|---|---|---|
| ① $A>0$, $r\in[1\pm\epsilon]$ | +1 | 1.05 | 1.050 | 1.050 | 1.050 | 1.050 |
| ② $A>0$, $r>1+\epsilon$ | +1 | 1.60 | 1.200 | **0.000** | 1.200 | 0.000 |
| ③ $A<0$, $r\in[1\pm\epsilon]$ | −1 | 0.95 | −0.950 | −0.950 | −0.950 | −0.950 |
| ④ $A<0$, $r<1-\epsilon$ | −1 | 0.50 | −0.800 | **0.000** | −0.800 | 0.000 |
| ★ **$A<0$, $r>1+\epsilon$** | **−1** | **1.60** | **−1.600** | **−1.600** | −1.200 | **0.000** |

> **★ 那一格就是 $\min$ 的全部价值**：PPO 惩罚不封顶（梯度 −1.6），天真 clip 却把惩罚钉在 −1.2 且梯度为 0。

**所以 $\min$ 的语义是：在"我们想要的方向"上设上限，在"危险的方向"上不设限。** 这正是 pessimistic（悲观 / 保守）一词的准确含义——**对未来可能的坏情况做最坏打算，而不是对所有方向一律封顶。**

#### (e) 下界性质

由 $\min$ 的定义逐点成立：

$$\min\bigl(r_tA_t,\ \operatorname{clip}(r_t)A_t\bigr)\le r_tA_t\qquad\Longrightarrow\qquad L^{\mathrm{CLIP}}(\theta)\le L_{\theta_{\text{old}}}(\theta)$$

即 **$L^{\mathrm{CLIP}}$ 是未裁剪 surrogate 的逐点下界**。优化它天然保守。

#### (f) clip 与 KL 的关系：换了个更鲁棒的度量

在 $\theta_{\text{old}}$ 附近二阶展开，$\log r$ 是小量：

$$D_{\mathrm{KL}}(\pi_{\text{old}}\|\pi_\theta)\approx\frac12\mathbb{E}\bigl[(\log r_t)^2\bigr],\qquad \text{而}\quad |r_t-1|\le\epsilon\iff |\log r_t|\lesssim\epsilon$$

| | 约束对象 | 语义 |
|---|---|---|
| **KL penalty** | $(\log r)^2$ 的**均值** | 允许个别样本严重越界，只要平均下来小 |
| **clip** | 每个样本 $\lvert\log r\rvert$ 的**上确界** | 逐点硬性截断，对离群样本更鲁棒 |

考虑到 LLM 上数千个 token 里只要少数几个 ratio 爆炸就足以毁掉一次更新，**逐点硬约束显然比平均值约束更对症**。

这也是后续演进的延续逻辑——GSPO 把比率提到序列级、DAPO 解耦 $\epsilon_{\text{low}}/\epsilon_{\text{high}}$、CISPO 改成裁剪权重，本质上都在调整"逐点约束"的**粒度与形状**。

#### (g) 完整 PPO 目标

$$\mathcal{L}_{\text{total}}=\underbrace{-\mathbb{E}_t\Bigl[\min\bigl(r_t\hat A_t,\ \operatorname{clip}(r_t,1\!\pm\!\epsilon)\hat A_t\bigr)\Bigr]}_{\text{policy，取负后最小化}}
+c_1\underbrace{\mathbb{E}_t\Bigl[\max\bigl((V_\theta-\hat V^{\text{targ}})^2,(V_{\text{clip}}-\hat V^{\text{targ}})^2\bigr)\Bigr]}_{\text{value，PPO-MAX}}
-c_2\underbrace{\mathcal{H}[\pi_\theta]}_{\text{熵，最大化}}$$

其中 $\hat V^{\text{targ}}_t=V_{\theta_{\text{old}}}(s_t)+\hat A_t^{\mathrm{GAE}}$。

---

### 2.5 一页纸看完整条链

$$\textbf{REINFORCE}\quad \nabla J=\mathbb{E}\Bigl[\sum_t\gamma^t\nabla\log\pi_\theta(a_t|s_t)\,G_t\Bigr]$$
$$\downarrow\ \mathbb{E}_{a}[\nabla\log\pi]=0\ \Rightarrow\ \text{减 } b(s) \text{ 不改期望，只降方差（最优基线再降 80\%）}$$
$$\textbf{+基线}\quad \nabla J=\mathbb{E}\Bigl[\sum_t\gamma^t\nabla\log\pi_\theta(a_t|s_t)\,(G_t-b(s_t))\Bigr],\quad b^*=\frac{\mathbb{E}[\|\nabla\log\pi\|^2G]}{\mathbb{E}[\|\nabla\log\pi\|^2]}$$
$$\downarrow\ b\to V^\pi\ \Rightarrow\ \text{方差接近最优}$$
$$\textbf{+优势}\quad \nabla J=\mathbb{E}_{s\sim\mu^\pi,a\sim\pi}\bigl[\nabla\log\pi_\theta(a|s)\,A^\pi(s,a)\bigr]$$
$$\downarrow\ \text{IS 恒等式 } \mathbb{E}_p[f]=\mathbb{E}_q[\tfrac pq f]\ \Rightarrow\ \text{旧数据可复用}$$
$$\textbf{+IS}\quad L_{\theta_{\text{old}}}(\theta)=\sum_s\mu^{\text{old}}(s)\sum_a\pi_\theta(a|s)A^{\text{old}}(s,a),\qquad \nabla L|_{\theta_{\text{old}}}=\nabla J(\theta_{\text{old}})\ \checkmark(10^{-9})$$
$$\downarrow\ \text{但 } \mu^{\text{old}} \text{ 被冻结 } \Rightarrow\ \text{远处高估 43\%，ESS 塌到 0.02\%}$$
$$\textbf{+clip}\quad L^{\mathrm{CLIP}}=\mathbb{E}\Bigl[\min\bigl(r_t\hat A_t,\ \operatorname{clip}(r_t,1\!\pm\!\epsilon)\hat A_t\bigr)\Bigr]\le L_{\theta_{\text{old}}}$$

### 2.6 三条贯穿始终的不变量

1. **得分函数恒等式** $\mathbb{E}_a[\nabla\log\pi]=0$ 是整座大厦的地基——它同时支撑了"减基线"（§2.1b）和"surrogate 一阶等价"（§2.2e 里减掉 $V^{\text{old}}$ 那一步）两个核心结论。
2. **偏差—方差的三次交易**：轨迹级 IS（无偏但方差爆炸）→ 冻结状态分布（有偏但方差可控）→ clip（再引入保守偏差换取稳定）。**PPO 的每一次简化都是在买方差。**
3. **clip 不是 KL 的近似**：KL 约束分布的**平均**距离，clip 是逐样本的**梯度遮蔽**。近年研究（80/20 高熵少数 token 那篇，见 §13.2）进一步指出，clip 的实际效果更接近**熵调节机制**而非信任域——它放开高熵分叉 token、压住低熵多数 token，这才是 DAPO/GSPO 普遍弃用 entropy bonus 的原因。

---

## 3. 优势估计的顶点：GAE

### 3.1 完整公式

Schulman et al. (2016, arXiv:1506.02438)。定义 TD 残差 $\delta_t=r_t+\gamma V(s_{t+1})-V(s_t)$，则

$$\boxed{\;\hat A_t^{\mathrm{GAE}(\gamma,\lambda)}=\sum_{l=0}^{\infty}(\gamma\lambda)^l\,\delta_{t+l}\;}\qquad\text{（展开式）}$$

$$\boxed{\;\hat A_t=\delta_t+\gamma\lambda\,\hat A_{t+1},\quad \hat A_T=0\;}\qquad\text{（递推式，$O(T)$ 反向计算）}$$

等价地，GAE 是 n-step 优势的指数加权平均：

$$\hat A_t^{\mathrm{GAE}}=(1-\lambda)\sum_{n=1}^{\infty}\lambda^{n-1}\bigl(G_t^{(n)}-V(s_t)\bigr)$$

### 3.2 $\lambda$ 的语义

| $\lambda$ | 退化结果 | 性质 |
|---|---|---|
| $\lambda=0$ | $\hat A_t=\delta_t$（TD(0)） | 低方差、高偏差（完全依赖 $V$ 精度） |
| $\lambda=1$ | $\hat A_t=\sum_l\gamma^l\delta_{t+l}=G_t-V(s_t)$ | 无偏、高方差（纯蒙特卡洛） |
| $\lambda\in(0,1)$ | 折中 | **实践用 0.95 左右** |

> **符号惯例提示**：PPO 原论文写 $\hat A_t=\delta_t+\gamma\lambda\hat A_{t+1}$；很多 RLHF 代码写成 $\hat A_t=r_t+\gamma V(s_{t+1})-V(s_t)+\gamma\lambda\hat A_{t+1}$。二者完全等价，后者只是把 $\delta_t$ 内联展开。

### 3.3 代码：GAE

```python
def compute_gae(rewards, values, dones, gamma=0.99, lam=0.95):
    """rewards/values/dones: [T],  values 含 bootstrap 的 V(s_T)"""
    T = len(rewards)
    adv = torch.zeros(T)
    last = 0.0
    for t in reversed(range(T)):            # O(T) 反向递推
        nonterminal = 1.0 - dones[t]
        delta = rewards[t] + gamma * values[t+1] * nonterminal - values[t]
        last  = delta + gamma * lam * nonterminal * last
        adv[t] = last
    returns = adv + values[:T]              # V_target = A + V
    return adv, returns
```

---

## 4. TRPO：信任域的严格形式

### 4.1 为什么需要信任域

见 §2.3：surrogate 与真实目标只保证**一阶等价**，步长一大 $L$ 上升不代表 $J$ 上升，策略可能崩掉且不可恢复。

### 4.2 CPI 下界定理

$$J(\pi')\ \ge\ L_\pi(\pi')-\frac{4\epsilon\gamma}{(1-\gamma)^2}\,\alpha^2$$

其中

$$\epsilon=\max_{s,a}\bigl|A^\pi(s,a)\bigr|,\qquad \alpha=\max_s D_{\mathrm{TV}}\bigl(\pi(\cdot|s)\,\|\,\pi'(\cdot|s)\bigr)$$

再用 **Pinsker 不等式** $D_{\mathrm{TV}}(p\|q)^2\le\frac12 D_{\mathrm{KL}}(p\|q)$ 换成 KL 形式：

$$J(\pi')\ \ge\ L_\pi(\pi')-\frac{2\epsilon\gamma}{(1-\gamma)^2}\,\max_s D_{\mathrm{KL}}\bigl(\pi(\cdot|s)\,\|\,\pi'(\cdot|s)\bigr)$$

> **这是最常写错的地方**：分母是 $(1-\gamma)^2$，系数含 $\epsilon$，且 Lipschitz 常数与 $\alpha^2$ 相乘（转 KL 后是一次方）。
> **结论**：只要 KL 足够小，$L$ 的提升就能保证 $J$ 的提升 → 单调改进。

### 4.3 TRPO 的优化问题

$$\max_\theta\ \mathbb{E}_t\bigl[r_t(\theta)\hat A_t\bigr]\quad\text{s.t.}\quad \bar D_{\mathrm{KL}}(\theta_{\text{old}}\|\theta):=\mathbb{E}_s\bigl[D_{\mathrm{KL}}(\pi_{\theta_{\text{old}}}(\cdot|s)\,\|\,\pi_\theta(\cdot|s))\bigr]\le\delta$$

> 实践用**平均 KL**；CPI 定理给的是**逐状态最坏 KL**。两者口径不同，TRPO 是"用平均 KL 近似最坏 KL"——理论到工程的妥协。

### 4.4 自然梯度与 Fisher 向量积

在 $\theta_{\text{old}}$ 处把约束二阶展开：

$$\max_\theta\ g^\top(\theta-\theta_{\text{old}})\quad\text{s.t.}\quad \tfrac12(\theta-\theta_{\text{old}})^\top F(\theta-\theta_{\text{old}})\le\delta$$

$$g=\nabla_\theta L_{\theta_{\text{old}}},\qquad F=\mathbb{E}_{s,a\sim\pi}\bigl[\nabla\log\pi_\theta(a|s)\,\nabla\log\pi_\theta(a|s)^\top\bigr]\ \ (\text{Fisher 信息矩阵})$$

解析解（自然梯度步）：

$$\theta_{\text{new}}=\theta_{\text{old}}+\sqrt{\frac{2\delta}{g^\top F^{-1}g}}\;F^{-1}g$$

**$F$ 显式求逆对 LLM 是 $O(d^2)$ 显存 / $O(d^3)$ 算力，完全不可行。** TRPO 的解法：

1. **Fisher-vector product（FVP）**：不构造 $F$，只对任意 $v$ 算 $Fv$（实践中用 `autograd.grad((g_logp * v).sum(), params, retain_graph=True)`）。
2. **共轭梯度（CG）** 迭代解 $Fx=g$，只需反复做 FVP。
3. **回溯线搜索**：在满足 KL 约束且目标不下降的前提下取最大步长。

### 4.5 拉格朗日形式 → PPO 的桥梁

$$\min_\beta\max_\theta\ \mathcal{L}(\theta,\beta)=L_{\theta_{\text{old}}}(\theta)-\beta\bigl(\bar D_{\mathrm{KL}}(\theta_{\text{old}}\|\theta)-\delta\bigr)$$

内层 $\max_\theta$ 就是 **PPO-Penalty 目标** $\max_\theta[L-\beta\bar D_{\mathrm{KL}}]$；外层 $\min_\beta$ 是"按违反程度调惩罚系数"。
**PPO-Penalty = 保留内层、去掉外层硬约束、用启发式规则调 $\beta$** —— 这就是"PPO 是 TRPO 的一阶近似"的准确含义。

---

## 5. PPO 本体：工程细节

> clip 的数学已在 §2.4 完整推导，本节只讲工程侧。

### 5.1 为什么要取 $\min$ / clip 的四象限

见 §2.4(c)(d)。**一句话复述**：情形 ②④ 梯度被钉为 0（近端效应）；★ 情形（$A<0,\ r>1+\epsilon$）惩罚不封顶（$\min$ 的真正价值）。

### 5.2 PPO-Penalty

$$L^{\mathrm{KLPEN}}(\theta)=\mathbb{E}_t\bigl[r_t(\theta)\hat A_t\bigr]-\beta\,D_{\mathrm{KL}}^{\text{target}}(\theta),\qquad
\beta_{k+1}=\begin{cases}\beta_k\times 2 & \overline{D_{\mathrm{KL}}}>1.5\,d_{\text{tgt}}\\ \beta_k/2 & \overline{D_{\mathrm{KL}}}<d_{\text{tgt}}/1.5\\ \beta_k & \text{else}\end{cases}$$

> 1.5 / 2 是**工程惯例，不是定理**。$d_{\text{target}}$ 常取 0.01–0.02。实践上 PPO-Penalty 效果通常不如 Clip 版本，所以口语中的"PPO"默认指 Clip。

### 5.3 价值函数裁剪（value clip）

$$V_{\text{clip}}=\operatorname{clip}\bigl(V_\theta,\ V_{\theta_{\text{old}}}-\epsilon^V,\ V_{\theta_{\text{old}}}+\epsilon^V\bigr)$$

$$\mathcal{L}_{\text{value}}^{\text{clip}}=\mathbb{E}_t\Bigl[\max\Bigl((V_\theta-\hat V^{\text{targ}})^2,\ (V_{\text{clip}}-\hat V^{\text{targ}})^2\Bigr)\Bigr]$$

取 **max** 即"哪个更差就惩罚哪个"（PPO-MAX），防止价值网络单向漂移。$\epsilon^V$ 可与 policy 的 $\epsilon$ 不同（0.2–0.4）。

### 5.4 "实现细节比算法更重要"

Engstrom et al. (2020, ICLR, arXiv:2005.12729) 的消融结论：**移除非本质细节后，朴素策略梯度与 PPO 的性能差距基本消失。** PPO 的收益很大程度来自代码层工程选择，而非 clip 目标本身。被反复验证的关键项：

Adam 优化器 · 学习率退火 · value clipping · reward scaling · observation normalization · 正交初始化 · 梯度裁剪 · tanh 优势裁剪 · batch size · epochs · $\epsilon$ · 网络是否共享

> 引用时**不要**说"Engstrom 论文给出 37 个细节"——37 这个数字出自后续综述的汇总，不是论文精确计数。

### 5.5 代码：PPO-Clip

```python
def ppo_loss(new_logp, old_logp, adv, values, v_target, ent,
             eps=0.2, eps_v=0.2, c1=0.5, c2=0.01):
    # 一律用 log 空间做差，再 exp —— 防止概率下溢
    ratio = torch.exp(new_logp - old_logp)                  # r_t

    unclipped = ratio * adv
    clipped   = torch.clamp(ratio, 1 - eps, 1 + eps) * adv
    policy_obj = torch.min(unclipped, clipped).mean()       # 要最大化

    v_clip = values + (values - v_target).clamp(-eps_v, eps_v)
    v_loss = torch.max((values - v_target)**2,
                       (v_clip  - v_target)**2).mean()      # 要最小化

    loss = -policy_obj + c1 * v_loss - c2 * ent             # 转成最小化
    return loss, dict(ratio=ratio.mean(),
                      clip_frac=(torch.abs(ratio - 1) > eps).float().mean())
```

**监控项**：`clip_frac`（被裁剪样本占比）应 < 10%；`ratio` 均值应贴近 1；`approx_kl` 应 < 0.02。

---

# 下篇 · LLM 时代的衍生算法族

## 6. RLHF 时代的 PPO

### 6.1 三阶段 = 三个不同的优化问题

**阶段一 SFT**（最大似然）：

$$\mathcal{L}_{\text{SFT}}(\theta)=-\mathbb{E}_{(x,y)\sim\mathcal{D}}\Bigl[\sum_{t=1}^{|y|}\log\pi_\theta(y_t|x,y_{<t})\Bigr]$$

**阶段二 奖励模型**（Bradley-Terry 偏好模型）：

$$P(y_w\succ y_l\mid x)=\sigma\bigl(r_\phi(x,y_w)-r_\phi(x,y_l)\bigr),\qquad
\mathcal{L}_{\text{RM}}(\phi)=-\mathbb{E}\Bigl[\log\sigma\bigl(r_\phi(x,y_w)-r_\phi(x,y_l)\bigr)\Bigr]$$

LLaMA-2 加了边际项并训练两个 RM（有用性 / 安全性）：

$$\mathcal{L}_{\text{RM}}^{\text{LLaMA2}}=\mathbb{E}\Bigl[-\log\sigma\bigl(r_\phi(x,y_c)-r_\phi(x,y_r)-m(r)\bigr)\Bigr]$$

**阶段三 RLHF-PPO**：

$$\boxed{\;\max_\theta\ \mathbb{E}_{x\sim\mathcal{D},\,y\sim\pi_\theta}\bigl[r_\phi(x,y)\bigr]-\beta\,D_{\mathrm{KL}}\bigl(\pi_\theta(y|x)\,\|\,\pi_{\text{ref}}(y|x)\bigr)\;}$$

$\pi_{\text{ref}}$ = 冻结的 SFT 模型。

### 6.2 关键分歧：KL 放哪里

**写法 A —— KL 进奖励（KL-in-reward，InstructGPT 采用）**

$$\tilde r_t=r_\phi(y)+\beta\log\frac{\pi_{\text{ref}}(a_t|s_t)}{\pi_\theta(a_t|s_t)},\qquad \hat A_t^{\mathrm{GAE}}\ \text{用}\ \tilde r_t\ \text{计算，}\gamma=1$$

**写法 B —— KL 进损失（KL-in-loss）**

$$\mathcal{L}(\theta)=\mathcal{L}_{\text{PPO}}(\theta)+\beta\,D_{\mathrm{KL}}(\pi_{\text{ref}}\|\pi_\theta)$$

**区别不是符号游戏**：

- 写法 A：KL **逐 token 进入 TD 残差**，参与 GAE。优势估计本身已扣掉"偏离参考策略的代价"，信用分配会自动避开高 KL 的路径。
- 写法 B：KL 只在外层目标，GAE 用的是裸奖励 $r_\phi$。

由于 $\log\frac{\pi_{\text{ref}}}{\pi_\theta}$ 恒为"偏离越大越负"，写法 A 等价于**对高 KL token 施加负奖励**。

### 6.3 序列级奖励如何在 token MDP 上展开

轨迹级奖励 $r_\phi(y)$ 只在末端（EOS）给一次，中间每步给 KL 项：

$$G_t=\sum_{l=t}^{T-1}\gamma^{l-t}r_l=\underbrace{\gamma^{T-t-1}r_\phi(y)}_{\text{末端奖励}}+\sum_{l=t}^{T-1}\gamma^{l-t}\,\beta\log\frac{\pi_{\text{ref}}(a_l|s_l)}{\pi_\theta(a_l|s_l)}$$

**这就是 $\gamma=1$ 的原因**：$\gamma=1$ 时末端奖励对所有前缀 token 权重相同，不衰减，让"整条回复的成败"平摊到每个 token。

### 6.4 KL 的三种估计器（Schulman blog → GRPO 采纳 k3）

对 $D_{\mathrm{KL}}(p\|q)=\mathbb{E}_{x\sim p}[\log\frac{p}{q}]$：

| 估计器 | 公式 | 性质 |
|---|---|---|
| $k_1$ | $\log\frac{p}{q}$ | 无偏，方差高，**可为负**（会变成虚假奖励） |
| $k_2$ | $\frac12\bigl(\log\tfrac{p}{q}\bigr)^2$ | 方差低，**有偏** |
| $k_3$ | $\frac{q}{p}-\log\frac{q}{p}-1$ | **恒 $\ge0$、无偏、低方差** |

GRPO / TRL / verl 默认用 k3：

$$\hat D_{\mathrm{KL}}[\pi_\theta\|\pi_{\text{ref}}]=\frac{\pi_{\text{ref}}(o_{i,t})}{\pi_\theta(o_{i,t})}-\log\frac{\pi_{\text{ref}}(o_{i,t})}{\pi_\theta(o_{i,t})}-1$$

```python
def kl_k3(logp_theta, logp_ref):        # 输入为 log 概率
    r = logp_ref - logp_theta           # log(q/p)
    return torch.exp(r) - r - 1         # 恒 >= 0
```

### 6.5 工程差异速记

| 系统 | 特点 |
|---|---|
| **InstructGPT** (2203.02155) | PPO + 每 token KL 进奖励 + 单一 RM；1.3B 模型优于 175B GPT-3 |
| **LLaMA-2** (2307.09288) | 拒绝采样 + PPO 两阶段迭代；双 RM、带边际 RM 损失、奖励白化 |
| **DeepSeek-R1** | GRPO + **规则化奖励**（无神经 RM）+ 去掉 KL；为 GRPO 时代的分水岭 |

---

## 7. GRPO：砍掉价值网络

- **出处**：Shao et al., *DeepSeekMath*, arXiv:2402.03300（2024.02）；DeepSeek-R1 将其推向主流
- **动机**：PPO 的价值网络与策略同规模，RLHF 中占用近一半显存。而推理任务的奖励是**确定性、可验证、轨迹级**的（正确性 0/1）。**同一 prompt 采样多个输出，组内奖励本身就是天然基线** → 不需要学 $V$。

### 7.1 组相对优势

$$\boxed{\;\hat A_i=\hat A_{i,t}=\frac{R_i-\operatorname{mean}(\{R_1,\dots,R_G\})}{\operatorname{std}(\{R_1,\dots,R_G\})}\;}$$

同一条序列的所有 token **共享同一个 $\hat A_i$**（结果监督，outcome supervision）。

> 注意：组内均值 $\frac1G\sum_j R_j$ **含自身样本**，严格来说依赖了 $a$，属于 §2.1(b) 所说的"轻微有偏基线"；除以 $\sigma_G$ 也不是严格的方差最优。Dr. GRPO（§12.1）专门修这两点。

### 7.2 完整目标

$$\mathcal{J}_{\text{GRPO}}(\theta)=\mathbb{E}_{q,\{o_i\}\sim\pi_{\theta_{\text{old}}}}\Biggl[\frac1G\sum_{i=1}^{G}\frac1{|o_i|}\sum_{t=1}^{|o_i|}\Bigl(\min\bigl(r_{i,t}\hat A_i,\ \operatorname{clip}(r_{i,t},1\!\pm\!\epsilon)\hat A_i\bigr)-\beta\,\hat D_{\mathrm{KL}}[\pi_\theta\|\pi_{\text{ref}}]\Bigr)\Biggr]$$

$$r_{i,t}(\theta)=\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}$$

| 符号 | 含义 |
|---|---|
| $q$ | prompt；$o_i$ 第 $i$ 个采样输出；$G$ 组大小 |
| $R_i$ | 输出 $o_i$ 的奖励（正确性 + 格式等可验证奖励） |
| $\pi_{\text{ref}}$ | SFT 参考模型；$\beta$ KL 系数（DeepSeekMath 用 0.04） |
| $\epsilon$ | clip 范围，常 0.2 |

### 7.3 与 PPO 的三点实质差异

1. **无价值模型** → 显存/算力减半，且免掉 critic 的训练不稳定。
2. **优势 = 组内归一化**，不是 GAE → 无 $\gamma$、无 $\lambda$、无 TD 残差。
3. **KL 从奖励移到损失**，并换用 k3 估计器。

### 7.4 代价

- 需要 $G$ 足够大（DeepSeekMath 用 64）组基线才稳。
- **梯度消失组**：组内全对或全错时 $\sigma_G\to0$，优势退化 → DAPO 的动态采样专门解决这个。
- 除 $\sigma_G$ 引入统计偏差 → Dr. GRPO 专门解决这个。

```python
def grpo_advantage(rewards):                 # rewards: [G]
    mu  = rewards.mean()
    std = rewards.std(unbiased=False)
    return (rewards - mu) / (std + 1e-4)     # 组内归一化

def grpo_loss(new_logp, old_logp, adv_i, len_i, beta, ref_logp, eps=0.2):
    ratio = torch.exp(new_logp - old_logp)
    obj   = torch.min(ratio * adv_i, torch.clamp(ratio, 1-eps, 1+eps) * adv_i)
    kl    = kl_k3(new_logp, ref_logp)
    # 注意分母：GRPO 是 G * |o_i| 双层平均
    return -(obj - beta * kl).sum() / (len_i.sum())
```

> **DeepSeek-R1-Zero 的做法**：规则化奖励（答案正确性 + 格式），**完全去掉 KL 项和神经奖励模型**。后续 DAPO 也去掉 KL——理由是"长思维链训练中策略本就该远离初始模型"。

---

## 8. DAPO：解耦 clip 与动态采样

- **出处**：Yu et al., ByteDance Seed, arXiv:2503.14476（2025.03）；Qwen2.5-32B 在 AIME 2024 达 50 分并开源

### 8.1 完整目标

$$\boxed{\;\mathcal{J}_{\text{DAPO}}(\theta)=\mathbb{E}\Biggl[\frac{1}{\sum_{i=1}^{G}|o_i|}\sum_{i=1}^{G}\sum_{t=1}^{|o_i|}\min\Bigl(r_{i,t}\hat A_i,\ \operatorname{clip}(r_{i,t},1-\epsilon_{\text{low}},1+\epsilon_{\text{high}})\hat A_i\Bigr)\Biggr]\;}$$

$$\text{s.t.}\quad 0<\bigl|\{o_i\mid \text{is\_equivalent}(a,o_i)\}\bigr|<G$$

### 8.2 四项技术逐个拆解

**① Clip-Higher（解耦上下界）**

$$\epsilon_{\text{low}}=0.2,\qquad \epsilon_{\text{high}}=0.28\quad(\text{典型值})$$

**解决熵坍塌**：PPO 的对称 clip 使低概率 token 的概率增长空间被 $1+\epsilon$ 死死卡住（回想 §2.4c 的情形 ②，梯度直接被钉为 0），模型很快变得确定，不再探索。放宽上界**显式给探索留空间**，下界保持紧凑以继续压低差 token。

**② Dynamic Sampling（动态采样）**

重复采样直到组内**既有正确又有错误**（即上式约束），过滤掉全对/全错的无效 prompt。直接解决 §7.4 的梯度消失组。

**③ Token-Level Policy Gradient Loss**

把归一化分母从 $G\times|o_i|$ 双层平均改为**总 token 数** $\sum_i|o_i|$：

$$\frac{1}{G}\sum_i\frac{1}{|o_i|}\sum_t(\cdot)\ \longrightarrow\ \frac{1}{\sum_i|o_i|}\sum_i\sum_t(\cdot)$$

**修正长度偏差**：GRPO 的写法使 1000-token 的回复与 10-token 的回复对总梯度贡献相同 → 长回复中每个 token 的梯度权重被稀释。

**④ Overlong Reward Shaping / Soft Overlong Punishment**

$$R_i^{\text{final}}=R_i-\eta\cdot\max\Bigl(0,\ \frac{|o_i|-L_{\max}}{L_{\text{soft}}}\Bigr)$$

被截断的超长输出不再一律给 0 分，而是**按超出程度软扣分**，避免"写得越长越被误判为错"。

```python
def dapo_loss(new_logp, old_logp, adv_i, total_tokens,
              eps_low=0.2, eps_high=0.28):
    ratio = torch.exp(new_logp - old_logp)
    obj   = torch.min(ratio * adv_i,
                      torch.clamp(ratio, 1-eps_low, 1+eps_high) * adv_i)
    return -obj.sum() / total_tokens          # token 级归一化：总 token 数

def soft_overlong_penalty(reward, length, L_max, L_soft, eta=1.0):
    return reward - eta * max(0.0, (length - L_max) / L_soft)
```

**DAPO 还去掉了 KL 项**——这是它相对于 GRPO 的另一个（不在四项技术列表里但很关键的）改动。

---

## 9. GSPO：把比率提到序列级

- **出处**：Zheng et al.（Qwen 团队）, *Group Sequence Policy Optimization*, **arXiv:2507.18071**（2025）

### 9.1 动机：token 级比率在长序列上根本不成立

重要性采样的有效性来自"对多个样本取平均"（§2.2b）。**但每个 token 位置 GRPO 只有一个样本**，因此 token 级比率 $r_{i,t}$ 无法执行这种平均——它只是一**个高方差噪声**，还会在位置间逐项相乘、再过 clip，误差沿长回复累积，最终把策略推下悬崖。

**MoE 模型尤其严重**：每次梯度更新后专家路由会变，Qwen 报告 48 层 MoE 上约 **10% 的激活专家每步都不同**，导致逐 token 似然剧烈摆动，即使模型整体几乎没变。旧解法 Routing Replay（缓存旧路由）有显存与通信开销。**GSPO 直接取消 token 级比率。**

### 9.2 序列级重要性比率（长度归一化）

$$\boxed{\;s_i(\theta)=\left(\frac{\pi_\theta(o_i|q)}{\pi_{\theta_{\text{old}}}(o_i|q)}\right)^{1/|o_i|}=\exp\left(\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}\log\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}\right)\;}$$

指数 $1/|o_i|$ 是**对 token 对数比率的几何平均**：让 $s_i$ 紧贴 1、控制方差、并把不同长度的回复放到同一数值尺度上。

### 9.3 完整目标

$$\boxed{\;\mathcal{J}_{\text{GSPO}}(\theta)=\mathbb{E}\Biggl[\frac1G\sum_{i=1}^{G}\min\Bigl(s_i(\theta)A_i,\ \operatorname{clip}\bigl(s_i(\theta),1-\epsilon,1+\epsilon\bigr)A_i\Bigr)\Biggr]\;}$$

$A_i$ 是序列级优势（与 GRPO 相同的组内归一化）。**整条序列共享同一个 $s_i$ 和 $A_i$，clip 也作用在整条序列上**：一旦某条回复的序列比率越界，被排除的是整条回复，而不是其中某些 token。

由于 $s_i$ 经长度归一化后紧密集中在 1 附近，**有效 clip 区间比 GRPO 窄得多**（$10^{-4}$ 量级，见 §14.1）。

```python
def gspo_loss(seq_new_logp, seq_old_logp, adv_i, eps=3e-4):
    # seq_*_logp: 整条序列的 sum(log p)，shape [G]
    delta = (seq_new_logp - seq_old_logp) / n_tokens      # 长度归一化
    s_i   = torch.exp(delta)
    obj   = torch.min(s_i * adv_i, torch.clamp(s_i, 1-eps, 1+eps) * adv_i)
    return -obj.mean()
```

**GSPO-token 变体**：若需要 token 级梯度（如配合 PRM），用 stop-gradient 把序列级 $s_i$ 与 token 比率缝合：

$$s_{i,t}=\operatorname{sg}[s_i]\cdot\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\operatorname{sg}[\pi_\theta(o_{i,t}|q,o_{i,<t})]}$$

梯度流经 token 比率，但**数值尺度由序列级 $s_i$ 决定**。

---

## 10. CISPO：裁剪权重而非裁剪更新

- **出处**：MiniMax, *CISPO: Clipping Importance Sampling Weights in Policy Optimization*, arXiv:2506.18094（2025）；用于 MiniMax-M1

$$\boxed{\;\mathcal{J}_{\text{CISPO}}(\theta)=\mathbb{E}\Biggl[\frac1G\sum_{i=1}^{G}\frac1{|o_i|}\sum_{t=1}^{|o_i|}\hat r_{i,t}(\theta)\,\hat A_{i,t}\Biggr],\qquad \hat r_{i,t}(\theta)=\operatorname{clip}\bigl(r_{i,t}(\theta),1-\epsilon_{\text{low}},1+\epsilon_{\text{high}}\bigr)\;}$$

**注意：这里没有 $\min$！**

### 10.1 与 PPO/GRPO 的本质差别

- **PPO/GRPO**：$\min(rA,\ \mathrm{clip}(r)A)$。当 $A>0$ 且 $r>1+\epsilon$ 时（§2.4c 的情形 ②），$\mathrm{clip}(r)A=(1+\epsilon)A$ 对 $\theta$ 是**常数** → **该 token 梯度为 0，等价于被 mask 掉**。长回复中被 mask 的 token 往往正是最有价值的推理分叉点。
- **CISPO**：$\mathrm{clip}(r)\cdot A$。clip 的是**权重本身**，$\nabla_\theta\log\pi_\theta$ 永远在，$\mathrm{clip}(r)$ 只控制这个 token 说话的"音量"。**所有 token 都保留梯度贡献**。

一句话：**PPO 是"超界就闭嘴"，CISPO 是"超界就小声点"。**

> CISPO 正是 §2.4(d) 里那个"天真做法"的正式化——它放弃了 $\min$ 的悲观下界性质（★ 情形惩罚会封顶），换来的是**长序列中梯度信号不被 mask**。这是又一次明确的偏差换方差交易。

报告称 CISPO 在 Qwen2.5-32B 上用一半训练步数达到 DAPO 的性能。

---

## 11. VAPO：把价值网络请回来，但修好它

- **出处**：ByteDance Seed, arXiv:2505.23563（2025）

### 11.1 动机

GRPO 砍掉价值网络省显存，但丢掉了低方差基线（回想 §2.1：最优基线能把方差降 80%）。而直接把 PPO 的价值模型搬回来，会出现 **critic 与 actor 的 GAE 参数耦合、互相拖累**。VAPO = "GRPO 思想 + 修好的价值模型"。

### 11.2 复合目标

$$\mathcal{J}_{\text{VAPO}}(\theta)=\mathcal{J}_{\text{policy}}(\theta)+c_1\mathcal{J}_{\text{value}}(\theta)+\mu\mathcal{J}_{\text{NLL}}(\theta)$$

$$\mathcal{J}_{\text{policy}}=\mathbb{E}\Biggl[\frac{1}{\sum_i|o_i|}\sum_{i,t}\min\Bigl(r_{i,t}\hat A_{i,t}^{\text{policy}},\ \operatorname{clip}(r_{i,t},1-\epsilon_{\text{low}},1+\epsilon_{\text{high}})\hat A_{i,t}^{\text{policy}}\Bigr)\Biggr]$$

### 11.3 六大组件

**① 解耦 GAE（Decoupled GAE）** —— 价值模型与策略模型用**不同的 $\lambda$**：

$$\hat A_t^{\text{value}}=\sum_{l}(\gamma\lambda_V)^l\delta_{t+l},\ \ \lambda_V=1.0;\qquad \hat A_t^{\text{policy}}=\sum_{l}(\gamma\lambda_\pi)^l\delta_{t+l},\ \ \lambda_\pi=0.95$$

critic 用 $\lambda_V=1$（蒙特卡洛方向，低偏差）更新；actor 用 $\lambda_\pi=0.95$（偏差/方差折中）。两者不再互相拖累。

**② 长度自适应 GAE**：

$$\lambda_{\text{policy}}=1-\frac{1}{\alpha l}\qquad(l=\text{响应长度})$$

短序列用更小的 $\lambda$（偏 TD，低方差）；长序列用更接近 1 的 $\lambda$（偏 MC，减小偏差）。使 TD 误差在不同长度上分布均匀。

**③ Clip-Higher** 与 **④ Token-Level Loss**：与 DAPO 同义（§8.2①③）。

**⑤ 正例 LM Loss（Positive Example NLL）**：

$$\mathcal{J}_{\text{NLL}}(\theta)=\mathbb{E}_{o_i\in\mathcal{C}}\Bigl[-\frac1{|o_i|}\sum_{t=1}^{|o_i|}\log\pi_\theta(o_{i,t}|q,o_{i,<t})\Bigr],\qquad \mathcal{C}=\{o_i\mid o_i\ \text{为正确输出}\}$$

对正确输出额外做最大似然，**防止正确轨迹的概率被 PPO 的负优势更新意外压低**，提高正样本利用率。

**⑥ 价值预训练**：在固定的 $\pi_{\text{sft}}$ 上采样，用蒙特卡洛回报预训练 critic：$J_{\text{value-pretrain}}=\mathbb{E}[(V_{\theta_V}(s_t)-G_t)^2]$。避免训练初期 critic 给出的优势方向与真实优势相反。

---

## 12. 其他重要衍生

### 12.1 Dr. GRPO（去掉两个归一化偏差）

- **出处**：Liu et al., *Understanding R1-Zero-Like Training: A Critical Perspective*, arXiv:2503.20783（COLM 2025）

**修正 1 —— 去掉标准差归一化**（$\sigma_G\to0$ 时数值爆炸，且除以标准差会引入难度偏差：把优化权重过度集中到"通过率接近 50%"的题上）：

$$\boxed{\;\hat A_{i,t}^{\text{Dr.GRPO}}=R_i-\frac1G\sum_{j=1}^{G}R_j\;}$$

**修正 2 —— 去掉逐 token 平均**（改为对 token **求和**），消除长度偏差：

$$\mathcal{J}_{\text{Dr.}}(\pi)=\sum_{t=1}^{|y_i|}\Bigl(\min\{r_{i,t}\hat A_{i,t},\ \mathrm{clip}(r_{i,t},1\!\pm\!\epsilon)\hat A_{i,t}\}-\eta\,\mathrm{KL}(\pi\|\pi^{\text{old}})\bigr)$$

两项修正都**有理论动机**（都是让梯度估计回到无偏，呼应 §2.1），实践中不劣于原 GRPO。

### 12.2 RLOO / REINFORCE++

留一基线（不含自身样本，严格无偏——正是 §2.1(b) 的硬约束）：

$$b_i=\frac{1}{G-1}\sum_{j\ne i}R_j,\qquad \hat A_i^{\text{RLOO}}=R_i-b_i$$

与 GRPO 的差别：**只用均值、不用标准差，且基线不含自身**。REINFORCE++ 在此基础上加 KL 惩罚与奖励白化。

### 12.3 ReMax

用**贪心解码回复的奖励**作为基线（确定性基线，方差更低）：

$$\mathcal{L}_{\text{ReMax}}(\theta)=-\mathbb{E}\Bigl[\frac1{|y|}\sum_{t}\log\pi_\theta(y_t|x,y_{<t})\cdot\bigl(r_\phi(x,y)-r_\phi(x,\bar y)\bigr)\Bigr]$$

$\bar y$ 为贪心解码输出。理由：贪心输出的奖励是期望奖励的良好近似。约 6 行代码即可实现，省去价值模型与 GAE，仍是**无偏**策略梯度估计器。

### 12.4 Stepwise GRPO（过程奖励 PRM）

把组内归一化从序列级奖励搬到**步骤级**奖励上：

$$\hat A_{i,t}^{\text{step}}=\frac{r_{i,t}^{\text{PRM}}-\operatorname{mean}_G(r_{1,t}^{\text{PRM}},\dots,r_{G,t}^{\text{PRM}})}{\operatorname{std}_G(r_{1,t}^{\text{PRM}},\dots,r_{G,t}^{\text{PRM}})}$$

使优势能区分同一序列内不同推理步骤的好坏。代价：需要过程级标注或 PRM，且 PRM 自身可能被 reward hacking。

### 12.5 DCPO / GEPO / SRPO / ARPO / T-PPO（口径提示）

| 算法 | 主张 | 备注 |
|---|---|---|
| **DCPO** | clip 范围随训练步动态变化 $\epsilon_t=\epsilon_{\min}+(\epsilon_{\max}-\epsilon_{\min})f(t)$ | 与 clip-higher 不同：clip-higher 是**上下界解耦**，DCPO 是**幅度随时间衰减**。具体 $f(t)$ 需查原文 |
| **T-PPO** | 截断响应生成 + EGAE + policy/value 独立优化（arXiv:2506.15050） | 提升长 CoT 训练吞吐 |
| **GEPO / SRPO** | 涉及 ratio 与优势的改进 | **公开资料口径不一，建议直接读原文** |
| **ARPO** | Agentic RL，多轮交互的信用分配 | 尚无统一公式写法 |

---

## 13. 演进脉络与研究共识

### 13.1 改了什么 → 解决什么

```
REINFORCE        蒙特卡洛回报            → 无偏但方差极高
  ↓ 减基线（E_a[∇logπ]=0）
+Baseline        (G − b(s))              → 方差降 23%，最优基线降 80%
  ↓ b→V，得优势函数
Actor-Critic     A = Q − V               → 逐 token 信用分配
  ↓ IS 恒等式 + 冻结状态分布
+Surrogate       L = Σ μ^old Σ π_θ A     → 旧数据复用；∇L=∇J（局部）
  ↓ 但远处高估 43%，ESS 塌到 0.02%
TRPO (2015)      KL 硬约束 + CG 线搜索    → 单调改进保证，但求解昂贵
  ↓ 用 min/clip 逐点下界替代约束优化
PPO-Clip (2017)  min(rA, clip(r)A)        → 一次 SGD 搞定，成为默认基线
  ↓ 轨迹级稀疏奖励 + 参考模型锚点
RLHF-PPO (2022)  末端 RM 奖励 + 每步 KL，γ=1  → 对齐人类偏好
  ↓ 组内奖励做基线，砍掉价值网络
GRPO (2024)      A=(R−μ)/σ               → 显存减半，适配可验证奖励
  ↓ 修统计量偏差 / 修 clip / 修比率粒度
Dr.GRPO          去 σ、去长度归一化         → 无偏梯度
DAPO             解耦 clip、动态采样、token 级损失、超长软惩罚
GSPO             序列级比率 + 长度归一化     → 消除 token 级噪声累积（尤其 MoE）
CISPO            clip(r)·A，无 min          → 保留全部 token 的梯度
  ↓ 把价值网络请回来并修好
VAPO             解耦 GAE、长度自适应、正例 NLL、价值预训练
  ↓ 更细的信用分配 / 更长的交互
Stepwise/PRM     步骤级优势；ARPO 多轮智能体
```

### 13.2 2025 年的四条研究共识

**① clip 本质上是熵机制，不是信任域。**
《Beyond the 80/20 Rule: High-Entropy Minority Tokens Drive Effective RL for LLM Reasoning》指出：思维链中绝大多数 token 是低熵的（约 50.6% 的 token 熵低于 $10^{-2}$），只有约 **20% 的分叉 token（forking tokens）** 是高熵的。clip-higher 的真正作用是**提升高熵少数 token 的熵**；而传统 entropy bonus 反而增加低熵多数 token 的熵，适得其反。
→ **这就是 DAPO / GSPO 普遍去掉 entropy bonus、仅靠 clip-higher 维持探索的原因。**

**② 序列级 vs token 级比率 = 偏差与方差的取舍，没有统一最优。**
token 级比率在长序列上低估低频 token（乘积中每个因子都偏离 1，乘积偏离更严重）；序列级比率用一个标量避免累积，代价是整条序列共用一个梯度尺度，抹掉序列内部细节。GSPO 与 CISPO 给出了两种不同答案，且二者对 clip 超参的敏感度都显著低于 DAPO 风格方法。

**③ PPO 的"近端"效果很大程度来自梯度遮蔽，而非真约束 KL。**
PPO 名义上 on-policy，但多 epoch、多 minibatch 更新实际已是 off-policy。近期工作建议用 **single mini-batch + 及时反馈**（如 PipelineRL）替代传统的"采样—多轮更新"循环，减少策略漂移。

**④ 中文社区的三门理论（田渊栋团队, NeurIPS 2025）**
RLVR 的更新**集中于小权重区域**，形成"三门"式的优化偏置。提示：与其纠结目标函数形式，不如关注"哪些 token 真正在被更新"。

### 13.3 明确标注的不确定性

1. **clip 是否真的构成信任域**，学术界仍有分歧。
2. RLHF 中 $\gamma=1$ 是否必须，各实现不同。
3. DCPO / GEPO / SRPO 的部分公式在公开资料中口径不一，本手册仅列出已核实项。
4. $\epsilon_{\text{low}}/\epsilon_{\text{high}}$、$\beta$、$\mu$ 的取值依赖基座模型与任务，**不能跨论文直接比较**。

---

## 14. 工程超参与崩溃模式

### 14.1 典型超参（作为起点，不是答案）

| 超参 | PPO（通用 RL） | GRPO / DAPO / GSPO（LLM 推理） | 说明 |
|---|---|---|---|
| $\gamma$ | 0.99 | **1.0** | 末端奖励，不衰减 |
| $\lambda$ | 0.95–0.97 | GRPO 无 GAE；VAPO $\lambda_\pi=0.95,\lambda_V=1.0$ | GAE 折中 |
| $\epsilon$ | 0.1–0.3，常用 **0.2** | DAPO $\epsilon_{\text{low}}=0.2,\epsilon_{\text{high}}=0.28$；GSPO 用 $10^{-4}$ 量级 | **粒度差两个数量级，别照抄** |
| clip 比例 | < 10% | 同左 | 过高说明步子太大 |
| PPO epoch | 3–10 | **1–2**（倾向少 epoch） | epoch 越多越 off-policy |
| 组大小 $G$ | — | 16–64（DeepSeekMath 用 64） | 越大组基线越稳 |
| KL 系数 $\beta$ | 0.01–0.1 | 0.01–0.1；DeepSeekMath 0.04；**R1/DAPO 直接去掉** | 需随奖励尺度调整 |
| 熵系数 $c_2$ | 0.0–0.01 | **常取 0** | 推理 RL 中易引发熵爆炸 |
| micro-batch | 若干序列 | 按 token 数（256–1024 tokens） | LLM 场景按 token 而非样本 |

### 14.2 崩溃模式与公式层面的解药

| 崩溃模式 | 成因（公式视角） | 缓解手段 |
|---|---|---|
| **Reward hacking** | 优化的是 $\mathbb{E}[r_\phi]$ 而非真实效用，$r_\phi$ 存在高分捷径 | 多奖励组合、奖励封顶、验证集早停、对抗式奖励 |
| **熵坍塌** | 对称 clip 上界太紧，低概率 token 无法增长（§2.4c 情形 ② 梯度归零） | clip-higher（提高 $\epsilon_{\text{high}}$）；只提高熵分叉 token 的熵 |
| **熵爆炸** | 熵 bonus 在大词表 × 长轨迹上线性放大 | top-p 掩码内算熵、自锚定熵正则、裁剪熵梯度 |
| **Ratio 爆炸** | token 级 ratio 乘积在长序列上方差指数增长（§2.2c ESS 崩塌） | 序列级比率（GSPO）、长度归一化、监控 clip 比例、全程 FP32 |
| **Value 过拟合** | critic 拟合含噪 RM 分数，GAE 用错优势 | 解耦 GAE（VAPO）、价值预训练、价值裁剪、降低 critic 学习率 |
| **长度爆炸** | 奖励与长度相关，模型学会"写更长"而非"写更好" | 长度惩罚、超长软惩罚（DAPO）、KL 锚定 |
| **梯度消失组** | 组内全对/全错 → $\sigma_G\to0$ | 动态采样（DAPO）、增大 $G$、过滤零方差 prompt |

---

## 15. 速查：所有核心公式一页纸

$$\nabla_\theta J=\mathbb{E}\Bigl[\sum_t\nabla_\theta\log\pi_\theta(a_t|s_t)\,\Psi_t\Bigr],\qquad \Psi_t\in\{G_t,\ Q^\pi,\ A^\pi,\ \delta_t,\ \hat A^{\text{GAE}}\}$$

$$\mathbb{E}_a[\nabla_\theta\log\pi_\theta(a|s)]=0\qquad\text{(得分函数恒等式：减基线与 surrogate 的共同地基)}$$

$$b^*(s)=\frac{\mathbb{E}_a[\|\nabla\log\pi\|^2G]}{\mathbb{E}_a[\|\nabla\log\pi\|^2]},\qquad A^\pi=Q^\pi-V^\pi$$

$$\hat A_t^{\text{GAE}(\gamma,\lambda)}=\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}=\delta_t+\gamma\lambda\hat A_{t+1}$$

$$L_{\theta_{\text{old}}}(\theta)=\sum_s\mu^{\text{old}}(s)\sum_a\pi_\theta(a|s)A^{\text{old}}(s,a),\qquad \nabla L|_{\theta_{\text{old}}}=\nabla J(\theta_{\text{old}})$$

$$\text{TRPO:}\quad \max\mathbb{E}[r_t\hat A_t]\ \text{s.t.}\ \bar D_{\text{KL}}\le\delta,\qquad J(\pi')\ge L_\pi(\pi')-\frac{4\epsilon\gamma\alpha^2}{(1-\gamma)^2}$$

$$\text{PPO:}\quad L^{\text{CLIP}}=\mathbb{E}\bigl[\min(r_t\hat A_t,\ \mathrm{clip}(r_t,1\!\pm\!\epsilon)\hat A_t)\bigr]\le L_{\theta_{\text{old}}}$$

$$\text{RLHF:}\quad \tilde r_t=r_\phi(y)+\beta\log\frac{\pi_{\text{ref}}}{\pi_\theta},\quad \gamma=1,\quad k_3=\frac{q}{p}-\log\frac qp-1$$

$$\text{GRPO:}\quad \hat A_i=\frac{R_i-\mu_G}{\sigma_G}+\ \text{PPO-clip} + \beta\hat D_{\text{KL}}^{(k3)}$$

$$\text{DAPO:}\quad \frac{1}{\sum_i|o_i|}\sum_{i,t}\min(r_{i,t}\hat A_i,\ \mathrm{clip}(r_{i,t},1-\epsilon_{\text{low}},1+\epsilon_{\text{high}})\hat A_i)$$

$$\text{GSPO:}\quad s_i=\Bigl(\frac{\pi_\theta(o_i|q)}{\pi_{\text{old}}(o_i|q)}\Bigr)^{1/|o_i|},\quad \min(s_iA_i,\ \mathrm{clip}(s_i,1\!\pm\!\epsilon)A_i)$$

$$\text{CISPO:}\quad \mathrm{clip}(r_{i,t},1-\epsilon_{\text{low}},1+\epsilon_{\text{high}})\cdot\hat A_{i,t}\quad(\textbf{无 min})$$

$$\text{VAPO:}\quad \lambda_V=1.0,\ \lambda_\pi=0.95,\ \lambda_\pi=1-\tfrac1{\alpha l},\ +\ \mu\mathcal{J}_{\text{NLL}}(\text{正例})$$

$$\text{Dr.GRPO:}\quad \hat A_{i,t}=R_i-\frac1G\sum_jR_j,\quad \text{对 token 求和而非平均}$$

---

## 参考来源

| # | 论文 | arXiv |
|---|---|---|
| [1] | Proximal Policy Optimization Algorithms (Schulman et al., 2017) | 1707.06347 |
| [2] | High-Dimensional Continuous Control Using GAE (2016) | 1506.02438 |
| [3] | Trust Region Policy Optimization (2015) | 1502.05477 |
| [4] | Training LMs to Follow Instructions (InstructGPT, 2022) | 2203.02155 |
| [5] | Llama 2 (2023) | 2307.09288 |
| [6] | Implementation Matters in Deep RL (Engstrom et al., ICLR 2020) | 2005.12729 |
| [7] | DeepSeekMath / GRPO (Shao et al., 2024) | 2402.03300 |
| [8] | Understanding R1-Zero-Like Training (Dr. GRPO) | 2503.20783 |
| [9] | DAPO (ByteDance Seed, 2025) | 2503.14476 |
| [10] | Group Sequence Policy Optimization (Qwen, 2025) | **2507.18071** |
| [11] | VAPO (ByteDance Seed, 2025) | 2505.23563 |
| [12] | CISPO (MiniMax, 2025) | 2506.18094 |
| [13] | T-PPO (2025) | 2506.15050 |
| [14] | ROLL: RL Optimization for Large-Scale Learning (Alibaba) | 2506.06122 |
| [15] | 三门理论：RLVR 微调的优化偏置（田渊栋团队, NeurIPS 2025） | 2511.08567 |
