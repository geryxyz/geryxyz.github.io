---
title: "Analysis of Static and Dynamic Test-to-code Traceability Information"
year: 2018
authors:
  - "Gergely, Tamás"
  - "Balogh, Gergő"
  - "Horváth, Ferenc"
  - "Vancsics, Béla"
  - "Beszédes, Árpád"
  - "Gyimóthy, Tibor"
citation_key: "GBH18a"
publication_type: "article"
abstract_available: true
doi: "10.14232/actacyb.23.3.2018.11"
eissn: "2676-993X"
issn: "0324-721X"
journal: "ACTA CYBERNETICA"
journal_iso: "ACTA CYBERN-SZEGED"
mtmt_url: "https://m2.mtmt.hu/api/publication/3396881"
number: "3"
orcid_numbers: "Gergely, Tamás/0000-0001-7504-3580; Balogh, Gergő/0000-0002-6781-5453; Horváth, Ferenc/0000-0002-8442-7970; Vancsics, Béla/0000-0003-4584-3733; Beszédes, Árpád/0000-0002-5421-9302; Gyimóthy, Tibor/0000-0002-2123-7387"
pages: "903--919"
publisher: "University of Szeged"
unique_id: "3396881"
url: "https://doi.org/10.14232/actacyb.23.3.2018.11"
volume: "23"
---

## Abstract

Unit test development has some widely accepted guidelines. Two of them concern the test and code relationship, namely isolation (unit tests should examine only a single unit) and separation (they should be placed next to this unit). These guidelines are not always kept by the developers. They can however be checked by investigating the relationship between tests and the source code, which is described by test-to-code traceability links. Still, these links perhaps cannot be inferred unambiguously from the test and production code. We developed a method that is based on the computation of traceability links for different aspects and report Structural Unit Test Smells where the traceability links for the different aspects do not match. The two aspects are the static structure of the code that reflects the intentions of the developers and testers and the dynamic coverage which reveals the actual behavior of the code during test execution. In this study, we investigated this method on real programs. We manually checked the reported Structural Unit Test Smells to find out whether they are real violations of the unit testing rules. Furthermore, the smells were analyzed to determine their root causes and possible ways of correction.
