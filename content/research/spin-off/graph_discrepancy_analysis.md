---
title: Graph Discrepancy Analysis
tags:
  - spin-off
  - software-analysis
---

Software analysis often involves comparing different representations of the same entities and their relationships. Differences between those representations can provide useful information about a system.

One example is comparing densely connected parts of a method-call graph with their locations in the package hierarchy. Discrepancies may point to code worth investigating. A more general methodology for graph discrepancy analysis could help unify such comparisons.

## Program structure and traceability

A related challenge is **program structure analysis**: software development research frequently compares sets of interconnected entities, but relations such as test-to-code connections are not always explicitly recorded.

This idea is connected to [[research/software_analysis_and_quality_assurance|Software Analysis and Quality Assurance]], particularly [[research/bibliography/analysis_of_static_and_dynamic_test_to_code_traceability_information|static and dynamic test-to-code traceability]].
