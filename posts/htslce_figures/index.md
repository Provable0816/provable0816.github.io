# 图表索引

来源 `paper.pdf`（23 页）：图 14 张、表 7 张。全部裁剪拼在 `figures/_contact.png`，一次看完。

> 讲到哪张图就把那个 PNG 发给用户；讲之前自己先看一眼——caption 不会告诉你图是怎么排的。
> 裁得不对：`crop.py paper.pdf --page P --grid` 看带刻度的整页，再 `crop.py paper.pdf --page P x0 y0 x1 y1 -o figures/fig-NN.png` 重裁（坐标是页面比例 0–1）。

## 图 1 · 第 2 页 · `figures/fig-01.png`
**caption**：Figure 1: Highlight-Then-Summarize. H2S transforms a block-structured long document into source-addressable evidence and then a question-conditioned summary before producing the final answer in one autoregressive trajectory.
· label `fig:overview` · paper.tex L33 · 源文件 `figs/H2S_pipeline.pdf` · 正文引用：§1 Introduction (L42)；§3.2 Highlight-Then-Summarize Paradigm (L147)

## 图 2 · 第 5 页 · `figures/fig-02.png`
**caption**：Figure 2: Composition of H2S-Dataset. H2S-Dataset spans diverse long-context tasks and input lengths, with reasoning and precise retrieval accounting for 24.4% and 23.7% of the dataset, respec- tively, while examples cover input lengths from 0–32K to 64–128K+ tokens.
· label `fig:dataset_composition` · paper.tex L151 · 源文件 `figs/dataset_composition_by_input_tokens.pdf`、`figs/dataset_composition_by_task.png`

## 图 3 · 第 6 页 · `figures/fig-03.png`
**caption**：Figure 3: Dataset Construction of Highlight-Then-Summarize. Each training instance is con- structed through semantic blocking, candidate retrieval, query-guided evidence extraction, question- conditioned summarization, and quality verification, with failed instances iteratively reconstructed until the required criteria are satisfied.
· label `fig:data_construction` · paper.tex L189 · 源文件 `figs/H2S_datapipeline.pdf` · 正文引用：§3.3 Construction of H2S-Dataset (L187)

## 图 4 · 第 8 页 · `figures/fig-04.png`
**caption**：Figure 4: Analysis of Summarization Quality. Final- answer score versus Evidence–Summary Quality (ESQ). Higher is better on both axes.
· label `fig:esq_training_paths` · paper.tex L279 · 源文件 `figs/esq_qc1090_training_paths.png` · 正文引用：§4.3 Analysis of Summarization Quality (L296)

## 图 5 · 第 9 页 · `figures/fig-05.png`
**caption**：Figure 5: Attention Distribution of Long Document Analysis. H2S improves long-context localization by inducing more concentrated attention over query- relevant evidence in the source document.

## 图 6 · 第 9 页 · `figures/fig-06.png`（整页，需要时手动裁）
**caption**：Figure 6: Output budget ablation. Aver- age score under different output budgets.
· label `fig:attention_case_study, tab:budget` · paper.tex L355 · 源文件 `figs/attention-case-study.png` · 正文引用：§4.5 Attention Distribution of Long Document  (L353)；§4.4 Ablations study (L348)；§A.4 Detailed Output-Budget Results (L504)

## 图 A7 · 第 13 页 · `figures/fig-A7.png`
**caption**：Figure A7: Benchmark and input-length distributions of the final training data. The left panel merges different task configurations from the same benchmark; LongBench-Pro contains T1–T11. The right panel shows the within-split length proportions for SFT and RL. The two splits have similar task-source and length distributions.
· label `fig:appendix_data_distribution` · paper.tex L443 · 源文件 `figs/appendix-data-distribution.png` · 正文引用：§A.2 Training Data Overview (L441)

## 图 A8 · 第 18 页 · `figures/fig-A8.png`（整页，需要时手动裁）
**caption**：Figure A8: Numerical reasoning from a compact evidence set. Red highlighting marks $18,595 under 2010 and $10,159 under 2009 in the source excerpt. The lower portion shows how these values are transformed into calculation-ready summaries and final answers.
· label `fig:case_docfinqa_success` · paper.tex L823

## 图 A9 · 第 18 页 · `figures/fig-A9.png`
**caption**：Figure A9: Multi-hop reasoning across distributed passages. The four source excerpts establish the Slush Puppie to hushpuppy to red horse fish to Moxostoma chain, which both model summaries preserve.
· label `fig:case_slush_puppie` · paper.tex L966

## 图 A10 · 第 19 页 · `figures/fig-A10.png`
**caption**：Figure A10: Successful OOD cross-document synthesis over a 122,862-token context. The two source excerpts are drawn from different papers. H2S identifies the recurring threats and connects them to their umbrella category while preserving source provenance.
· label `fig:case_aalcr_success` · paper.tex L1093

## 图 A11 · 第 21 页 · `figures/fig-A11.png`（整页，需要时手动裁）
**caption**：Figure A11: Ordinal retrieval and exact reproduction at about 64K tokens. The source excerpt contains the target essay, while the two trajectories identify its ordinal position and reproduce it with the requested prefix.
· label `fig:case_mrcr_platforms` · paper.tex L1245

## 图 A12 · 第 21 页 · `figures/fig-A12.png`
**caption**：Figure A12: Different failure locations on the same question. The upper source portion highlights the incorrect 2015 block in red for H2S-7B and the correct May 2014 table row in red for H2S-14B. The lower portion compares the two Evidence–Summary–Answer trajectories.
· label `fig:case_docfinqa_failure` · paper.tex L1368

## 图 A13 · 第 22 页 · `figures/fig-A13.png`
**caption**：Figure A13: Attribution and temporal-linking failure. Both trajectories identify Jacqueline Gareau as the subsequent Boston winner, but their linked placement claims for the 1988 Grandma’s Marathon disagree.
· label `fig:case_gareau_failure` · paper.tex L1481

## 图 A14 · 第 23 页 · `figures/fig-A14.png`（整页，需要时手动裁）
**caption**：Figure A14: Evidence selection and summary Edrift in an OOD example of H2S. H2S-7B iden- tifies the incorrect statement as (C), whereas the H2S-14B summary concentrates on dataset details and selects (D).
· label `fig:case_longbenchv2_failure` · paper.tex L1651

## 表 1 · 第 4 页 · `figures/tab-01.png`
**caption**：Table 1: Even a few summary to- kens can substantially improve long- document QA.
· label `tab:summary_motivation` · paper.tex L90 · 正文引用：§3.1 Why a Few Summary Tokens Help (L119)

## 表 2 · 第 7 页 · `figures/tab-02.png`
**caption**：Table 2: Main results on seven long-context benchmarks. All models use a maximum input length of 128K and a maximum output length of 4K. Closed-source models are included for reference; among all open-source models, including our models, the best result in each column is shown in bold, and the second-best result is shown in bold and underlined.
· label `tab:main_results` · paper.tex L227 · 正文引用：§4.2 Main Results (L269)；§A.3 Evidence--Summary Quality Subset and Det (L467)

## 表 3 · 第 8 页 · `figures/tab-03.png`
**caption**：Table 3: Detailed ablation of evidence and summary generation. Baseline removes both evidence and summary generation; w/o evidence and w/o summary remove the corresponding intermediate component, respectively. Avg is the unweighted macro-average over the seven tasks.
· label `tab:component_ablation_full` · paper.tex L299 · 正文引用：§4.4 Ablations study (L345)

## 表 4 · 第 13 页 · `figures/tab-04.png`
**caption**：Table 4: Final-answer and evidence–summary quality. Final Answer is the seven-task Avg from Table 2. E-Recall is the macro-average of per-example recall over reference evidence blocks; predic- tions are the 8-character block IDs parsed from <evidence>. Construction-time IDs are aligned to equivalent IDs in the actual inference blockization by normalized character matching before ID-only scoring. S-RL is ROUGE-L between the parsed <summary> and the reference summary. ESQ is the macro-average of the per-example harmonic mean of E-Recall and S-RL. Missing or unparsable components receive zero.
· label `tab:esq_qc1090` · paper.tex L462

## 表 5 · 第 14 页 · `figures/tab-05.png`
**caption**：Table 5: Detailed performance under different output budgets. Avg denotes the unweighted macro-average across the seven tasks, and Complete denotes the percentage of completed genera- tions.
· label `tab:output_budget_full` · paper.tex L506 · 正文引用：§A.4 Detailed Output-Budget Results (L504)

## 表 6 · 第 16 页 · `figures/tab-06.png`
**caption**：Table 6: Full results for question-conditioned summaries on long-document QA. Accuracy is reported by document-length range and as their unweighted average; context tokens report the mean document and summary lengths, and ∆Avg is measured against LongDoc for the same answer model.
· label `tab:summary_motivation_full` · paper.tex L637 · 正文引用：§A.8 Question-Conditioned Summary Motivation (L635)

## 表 7 · 第 17 页 · `figures/tab-07.png`
**caption**：Table 7: Construction statistics for the SFT and RL data. A case is an independent question– context instance; a block is the unit used for document segmentation and retrieval; a subquery is a decomposed information need; a claim is an independently verifiable atomic fact; and a citation links a claim to its source text. Quality-control counts follow their evaluated objects: faithfulness counts citations that exactly match the source, coverage counts subqueries supported by cited evidence, and answerability counts cases that can be solved from the summary alone. An additional 7,436 citations pass normalized fuzzy-0.95 matching and are reported in the appendix.
· label `tab:data_construction` · paper.tex L663
