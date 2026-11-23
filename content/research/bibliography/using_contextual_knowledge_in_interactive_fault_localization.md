---
title: "Using contextual knowledge in interactive fault localization"
year: 2022
authors:
  - "Horváth, Ferenc"
  - "Beszédes, Árpád"
  - "Vancsics, Béla"
  - "Balogh, Gergő"
  - "Vidács, László"
  - "Gyimóthy, Tibor"
citation_key: "HBV22"
publication_type: "article"
abstract_available: true
abstract_kind: "bibliography"
doi: "10.1007/s10664-022-10190-x"
eid: "150"
eissn: "1573-7616"
issn: "1382-3256"
journal: "EMPIRICAL SOFTWARE ENGINEERING"
journal_iso: "EMPIR SOFTW ENG"
mtmt_url: "https://m2.mtmt.hu/api/publication/33041903"
number: "6"
orcid_numbers: "Horváth, Ferenc/0000-0002-8442-7970; Beszédes, Árpád/0000-0002-5421-9302; Vancsics, Béla/0000-0003-4584-3733; Balogh, Gergő/0000-0002-6781-5453; Vidács, László/0000-0002-0319-3915; Gyimóthy, Tibor/0000-0002-2123-7387"
pagetotal: "69"
publisher: "Springer"
unique_id: "33041903"
url: "https://doi.org/10.1007/s10664-022-10190-x"
volume: "27"
---

## Abstract

Tool support for automated fault localization in program debugging is limited because state-of-the-art algorithms often fail to provide efficient help to the user. They usually offer a ranked list of suspicious code elements, but the fault is not guaranteed to be found among the highest ranks. In Spectrum-Based Fault Localization (SBFL) – which uses code coverage information of test cases and their execution outcomes to calculate the ranks –, the developer has to investigate several locations before finding the faulty code element. Yet, all the knowledge she a priori has or acquires during this process is not reused by the SBFL tool. There are existing approaches in which the developer interacts with the SBFL algorithm by giving feedback on the elements of the prioritized list. We propose a new approach called iFL which extends interactive approaches by exploiting contextual knowledge of the user about the next item in the ranked list (e. g., a statement), with which larger code entities (e. g., a whole function) can be repositioned in their suspiciousness. We implemented a closely related algorithm proposed by Gong et al. , called Talk . First, we evaluated iFL using simulated users, and compared the results to SBFL and Talk . Next, we introduced two types of imperfections in the simulation: user’s knowledge and confidence levels. On SIR and Defects4J, results showed notable improvements in fault localization efficiency, even with strong user imperfections. We then empirically evaluated the effectiveness of the approach with real users in two sets of experiments: a quantitative evaluation of the successfulness of using iFL , and a qualitative evaluation of practical uses of the approach with experienced developers in think-aloud sessions.
