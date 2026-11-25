---
title: Python, Graphs and Programming (PGP)
status: archived
---

**In brief:** I prepared two-hour, four-hour and semester-long computing lesson plans and practical examples for secondary school pupils. The central task was building a Neo4j-based movie recommender, connecting graph theory, Cypher queries, set theory and Python programming. In the What2Watch example application, I ranked films using Jaccard similarity.

## Programme structure

- **Two-hour version:** graphs, graph databases, queries, movie recommendations and genre-based similarity.
- **Four-hour version:** additionally introduces Python fundamentals, database access and recommender implementation.
- **Semester-long version:** a plan for more extensive programming fundamentals and project work, together with practical recommender materials.

## Main topics

1. Software development: process and data structure design, coding, testing and debugging.
2. Graph theory: nodes, edges, direction, weights and properties.
3. Neo4j and Cypher: pattern matching, filtering, variables, aggregation, ordering and limiting results.
4. Python: text input/output, functions, modules, lists, iteration and database access.
5. Set theory: intersection, union and Jaccard similarity.
6. Refactoring and optimisation: extracting repeated database operations and reducing query counts.
7. Ranking and displaying recommendations through a command-line interface.

## Practical exercise: graph-based recommendations

Movies, users and genres form the graph nodes; ratings and genre classifications form edges. Pupils explore increasingly complex questions about ratings of the Matrix films, common raters of Crimson Tide, genres shared with Inception and genre-based similarity rankings.

For example:

```cypher
MATCH (liked:Movie {title: "Crimson Tide"})<-[:RATED]-(user:User)-[:RATED]->(other:Movie)
RETURN other.title AS recommendation, count(user) AS similarity
ORDER BY similarity DESC LIMIT 10
```

This counts common raters without considering rating polarity or magnitude.

## Practical exercise: set theory and Python

The alternative approach compares movie genre sets using the [Jaccard index](https://en.wikipedia.org/wiki/Jaccard_index), calculated from the sizes of their intersection and union.

```python
def jaccard_similarity(liked_genres, other_genres):
    intersection = liked_genres & other_genres
    union = liked_genres | other_genres
    return len(intersection) / len(union) if union else 0.0
```

In What2Watch, I initially retrieved genres using separate queries, then combined them to reduce database operations. The Python application sorted films by similarity and displayed the top ten recommendations. This exercise illustrates the connection between mathematical models, database queries, programming and performance.
