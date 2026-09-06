---
title: Markdown 与 LaTeX 公式完全演示
date: 2026-09-05
tags: Markdown, LaTeX, 写作
---

这篇文章把本站支持的排版能力演示一遍，也可以当作写作速查手册：**写新文章时，复制这份文件的格式即可。**

## 行内文字样式

普通段落，支持**加粗**、*斜体*、***粗斜体***、~~删除线~~、`行内代码`，以及[链接](https://github.com)和图片：

![一张示例图片](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=60 "星空")

> 引用块：数学是给不同事物取相同名字的艺术。
>
> > 嵌套引用也可以。

---

## 列表

无序列表：

- 第一层
  - 第二层
    - 第三层
- 支持多级嵌套

有序列表：

1. 观察
2. 提出猜想
3. 构造证明

任务清单：

- [x] 搭好博客
- [x] 支持公式渲染
- [ ] 持续写作

## 表格

| 语法 | 写法 | 渲染 |
| --- | --- | --- |
| 行内公式 | `$E=mc^2$` | $E=mc^2$ |
| 求和 | `\sum_{i=1}^{n} i` | $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ |
| 希腊字母 | `\alpha\ \beta\ \gamma` | $\alpha\ \beta\ \gamma$ |
| 上下标 | `x^{2n}_{i}` | $x^{2n}_{i}$ |

表格里放公式也没问题，横竖都能滚动。

## 代码块

```python
import numpy as np

def monte_carlo_pi(n: int) -> float:
    """用蒙特卡洛方法估计 π"""
    x = np.random.random(n)
    y = np.random.random(n)
    return 4 * np.mean(x**2 + y**2 <= 1.0)

print(f"π ≈ {monte_carlo_pi(1_000_000):.5f}")
```

```javascript
// JS 一样支持高亮
const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
console.log([0, 1, 2, 3, 4, 5].map(fib)); // [0, 1, 1, 2, 3, 5]
```

```bash
# 本地预览站点
python -m http.server 8000
```

代码块里的 `$x$`、`$$\int_a^b f(t)\,dt$$` 与 `\[...\]` 都不会被误渲染成公式。

## 行内公式

质能方程 $E = mc^2$、欧拉公式 $e^{i\pi} + 1 = 0$、梯度 $\nabla f(\mathbf{x})$、
以及用 `\(...\)` 写的勾股定理 \(a^2 + b^2 = c^2\)，都可以混排在正文里。

## 独立公式块

用 `$$...$$` 写独立公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

用 `\[...\]` 也一样：

\[
\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e
\]

### 多行对齐推导

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### 矩阵与分段函数

$$
A = \begin{pmatrix} a_{11} & a_{12} & \cdots \\ a_{21} & a_{22} & \cdots \\ \vdots & \vdots & \ddots \end{pmatrix}
\qquad
|x| = \begin{cases} x, & x \geq 0 \\ -x, & x < 0 \end{cases}
$$

### 一条很长的公式（可以横向滚动）

$$
p(\theta \mid D) = \frac{p(D \mid \theta)\, p(\theta)}{\int_{\Theta} p(D \mid \theta')\, p(\theta') \, d\theta'} = \frac{p(D \mid \theta)\, p(\theta)}{\sum_{k=1}^{K} p(D \mid \theta_k)\, p(\theta_k)\, \pi_k + \int_{\Theta \setminus \Theta_K} p(D \mid \theta')\, p(\theta') \, d\theta'}
$$

## 其他

数学家高斯说过：

> 数学家是「先证明，再相信」的人。

风格 *混* **排** 时公式也不怕：*$\alpha$ 与 $\beta$*，`**不是代码**`，都渲染正常。

祝你写得开心。
