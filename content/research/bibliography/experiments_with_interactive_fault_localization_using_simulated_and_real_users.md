---
title: "Experiments with Interactive Fault Localization Using Simulated and Real Users"
year: 2020
authors:
  - "Horváth, Ferenc"
  - "Beszédes, Árpád"
  - "Vancsics, Béla"
  - "Balogh, Gergő"
  - "Vidács, László"
  - "Gyimóthy, Tibor"
citation_key: "HBV20"
publication_type: "inproceedings"
abstract_available: true
booktitle: "2020 IEEE International Conference on Software Maintenance and Evolution (ICSME)"
doi: "10.1109/ICSME46990.2020.00036"
location: "Adelaide, Australia (virtual event)"
month: "September"
mtmt_url: "https://m2.mtmt.hu/api/publication/31665067"
orcid_numbers: "Horváth, Ferenc/0000-0002-8442-7970; Beszédes, Árpád/0000-0002-5421-9302; Vancsics, Béla/0000-0003-4584-3733; Balogh, Gergő/0000-0002-6781-5453; Vidács, László/0000-0002-0319-3915; Gyimóthy, Tibor/0000-0002-2123-7387"
pages: "290--300"
publisher: "IEEE"
unique_id: "31665067"
url: "https://doi.org/10.1109/ICSME46990.2020.00036"
---

## Abstract

Fault localization is considered a difficult and time consuming activity. However, tool support for automated fault localization is still limited because state-of-the-art algorithms often fail to provide efficient help to the user. They usually offer a ranked list of suspicious code elements, but the fault is not guaranteed to be found among the highest ranks. In Spectrum-Based Fault Localization (SBFL) - which uses code coverage information of test cases and their execution outcomes to calculate the ranks -, the developer has to investigate several locations before finding the faulty code element. Yet, all the knowledge she a priori has or acquires during this process is not reused by the SBFL tool. We propose an approach in which the developer interacts with the SBFL algorithm by giving feedback on the elements of the prioritized list. We exploit contextual knowledge of the user about the next item in the ranked list (e. g., a statement), with which larger code entities (e. g., a whole function) can be repositioned in their suspiciousness. First, we evaluated the approach using simulated users incorporating two types of imperfections, their knowledge and confidence levels. On SIR and Defects4J, results showed notable improvements in fault localization efficiency, even with strong user imperfections. We then empirically evaluated the effectiveness of the approach with real users, which also showed promising results.
