---
title: "Code Coverage Differences of Java Bytecode and Source Code Instrumentation Tools"
year: 2019
authors:
  - "Horváth, Ferenc"
  - "Gergely, Tamás"
  - "Beszédes, Árpád"
  - "Tengeri, Dávid"
  - "Balogh, Gergő"
  - "Gyimóthy, Tibor"
citation_key: "HGB19"
publication_type: "misc"
abstract_available: true
abstract_kind: "original_preprint"
howpublished: "Presented in the Journal First Track of the 26th IEEE International Conference on Software Analysis, Evolution and Reengineering (SANER'19)"
month: "February"
abstract_source: "uploaded preprint: HGB17_HGB19.pdf"
---

## Abstract

Many software testing fields, like white-box testing, test case generation, test prioritization and fault localization, depend on code coverage measurement. If used as an overall completeness measure, the minor inaccuracies of coverage data reported by a tool do not matter that much; however, in certain situations they can lead to serious confusion. For example, a code element that is falsely reported as covered can introduce false confidence in the test. This work investigates code coverage measurement issues for the Java programming language. For Java, the prevalent approach to code coverage measurement is using bytecode instrumentation due to its various benefits over source code instrumentation. As we have experienced, bytecode instrumentation-based code coverage tools produce different results than source code instrumentation-based ones in terms of the reported items as covered. We report on an empirical study to compare the code coverage results provided by tools using the different instrumentation types for Java coverage measurement on the method level. In particular, we want to find out how much a bytecode instrumentation approach is inaccurate compared to a source code instrumentation method. The differences are systematically investigated both in quantitative (how much the outputs differ) and in qualitative terms (what the causes for the differences are). In addition, the impact on test prioritization and test suite reduction – a possible application of coverage measurement – is investigated in more detail as well.
