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
citation_key: "HGB17"
publication_type: "article"
abstract_available: true
abstract_kind: "original_preprint"
doi: "10.1007/s11219-017-9389-z"
eissn: "1573-1367"
issn: "0963-9314"
journal: "SOFTWARE QUALITY JOURNAL"
journal_iso: "SOFTWARE QUAL J"
mtmt_url: "https://m2.mtmt.hu/api/publication/3289296"
number: "1"
orcid_numbers: "Horváth, Ferenc/0000-0002-8442-7970; Gergely, Tamás/0000-0001-7504-3580; Beszédes, Árpád/0000-0002-5421-9302; Balogh, Gergő/0000-0002-6781-5453; Gyimóthy, Tibor/0000-0002-2123-7387"
pages: "79--123"
publisher: "Springer"
unique_id: "3289296"
url: "https://doi.org/10.1007/s11219-017-9389-z"
volume: "27"
abstract_source: "uploaded preprint: HGB17_HGB19.pdf"
---

## Abstract

Many software testing fields, like white-box testing, test case generation, test prioritization and fault localization, depend on code coverage measurement. If used as an overall completeness measure, the minor inaccuracies of coverage data reported by a tool do not matter that much; however, in certain situations they can lead to serious confusion. For example, a code element that is falsely reported as covered can introduce false confidence in the test. This work investigates code coverage measurement issues for the Java programming language. For Java, the prevalent approach to code coverage measurement is using bytecode instrumentation due to its various benefits over source code instrumentation. As we have experienced, bytecode instrumentation-based code coverage tools produce different results than source code instrumentation-based ones in terms of the reported items as covered. We report on an empirical study to compare the code coverage results provided by tools using the different instrumentation types for Java coverage measurement on the method level. In particular, we want to find out how much a bytecode instrumentation approach is inaccurate compared to a source code instrumentation method. The differences are systematically investigated both in quantitative (how much the outputs differ) and in qualitative terms (what the causes for the differences are). In addition, the impact on test prioritization and test suite reduction – a possible application of coverage measurement – is investigated in more detail as well.
