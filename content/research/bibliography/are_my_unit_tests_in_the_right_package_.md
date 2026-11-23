---
title: "Are My Unit Tests in the Right Package?"
year: 2016
authors:
  - "Balogh, Gergő"
  - "Gergely, Tamás"
  - "Beszédes, Árpád"
  - "Gyimóthy, Tibor"
citation_key: "BGB16b"
publication_type: "inproceedings"
abstract_available: true
abstract_kind: "original_preprint"
booktitle: "IEEE International Working Conference on Source Code Analysis and Manipulation (SCAM 2016)"
doi: "10.1109/SCAM.2016.10"
location: "Raleigh, NC, U.S.A."
month: "October"
mtmt_url: "https://m2.mtmt.hu/api/publication/3109520"
orcid_numbers: "Balogh, Gergő/0000-0002-6781-5453; Gergely, Tamás/0000-0001-7504-3580; Beszédes, Árpád/0000-0002-5421-9302; Gyimóthy, Tibor/0000-0002-2123-7387"
pages: "137--146"
publisher: "IEEE"
unique_id: "3109520"
url: "https://doi.org/10.1109/SCAM.2016.10"
abstract_source: "uploaded preprint: BGB16b.pdf"
---

## Abstract

The software development industry has adopted written and de facto standards for creating effective and maintainable unit tests. Unfortunately, like any other source code artifact, they are often written without conforming to these guidelines, or they may evolve into such a state. In this work, we address a specific type of issues related to unit tests. We seek to automatically uncover violations of two fundamental rules: 1) unit tests should exercise only the unit they were designed for, and 2) they should follow a clear packaging convention. Our approach is to use code coverage to investigate the dynamic behaviour of the tests with respect to the code elements of the program, and use this information to identify highly correlated groups of tests and code elements (using community detection algorithm). This grouping is then compared to the trivial grouping determined by package structure, and any discrepancies found are treated as “bad smells.” We report on our related measurements on a set of large open source systems with notable unit test suites, and provide guidelines through examples for refactoring the problematic tests.
