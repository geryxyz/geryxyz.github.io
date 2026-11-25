---
title: Python, Gráf, Programozás (PGP)
status: archived
---

**Röviden:** Középiskolásoknak kétórás, négyórás és féléves informatikai foglalkozási terveket és gyakorlati példákat készítettem. A központi feladat egy Neo4j-alapú filmajánló rendszer megalkotása volt. A feladat a gráfelméletet, a Cypher lekérdezéseket, a halmazelméletet és a Python-programozást kapcsolta össze; az elkészült What2Watch mintaprogramban a Jaccard-hasonlóság alapján rangsoroltam a filmeket.

## A program felépítése

- **Kétórás változat:** a gráfok és a gráfadatbázisok megismerése, lekérdezések, filmajánlás és műfajok alapján számított hasonlóság.
- **Négyórás változat:** az előzőek kiegészítése Python-alapokkal, adatbázis-hozzáféréssel és a filmajánló program megvalósításával.
- **Féléves változat:** a programozási alapok és a projektmunka részletesebb feldolgozására készült terv, valamint a filmajánlóhoz kidolgozott gyakorlati tananyag.

## A tananyag főbb elemei

1. A szoftverfejlesztés részei: folyamat- és adatszerkezet-tervezés, kódolás, tesztelés, hibajavítás.
2. Gráfelmélet: csomópontok, élek, irányítás, súlyok és tulajdonságok.
3. Neo4j és Cypher: mintakeresés, szűrés, változók, aggregálás, rendezés és eredmények korlátozása.
4. Python: szöveges bemenet és kimenet, függvények, modulok, listák, iteráció és adatbázis-hozzáférés.
5. Halmazelmélet: metszet, unió, Jaccard-hasonlóság.
6. Refaktorálás és optimalizálás: ismétlődő adatbázis-műveletek kiemelése, majd a lekérdezések számának csökkentése.
7. Ajánlások rangsorolása és megjelenítése parancssori felületen.

## Gyakorlati feladat: filmajánlás gráfokkal

A feladatban filmek, felhasználók és műfajok alkotják a gráf csomópontjait. A filmértékelések és a műfaji besorolások az élek.

A tanulók fokozatosan összetettebb kérdésekre keresnek választ:

- Kik értékelték a Matrix-filmeket, és hány szavazat érkezett filmenként?
- Milyen más filmeket értékeltek azok, akik a Crimson Tide-ot is értékelték?
- Milyen műfajokba tartozik az Inception, és mely filmeknek vannak vele közös műfajaik?
- Hogyan rangsorolhatók a filmek a műfajok hasonlósága alapján?

Példa a közös felhasználók alapján történő ajánlásra:

```cypher
MATCH (liked:Movie {title: "Crimson Tide"})<-[:RATED]-(user:User)-[:RATED]->(other:Movie)
RETURN other.title AS recommendation, count(user) AS similarity
ORDER BY similarity DESC LIMIT 10
```

Ez a példa a közös értékelők számát használja; nem vizsgálja az értékelések előjelét vagy nagyságát.

## Gyakorlati feladat: halmazelmélet és Python

A másik megközelítés a filmek műfajhalmazait hasonlítja össze. A [Jaccard-index](https://en.wikipedia.org/wiki/Jaccard_index) a két halmaz metszetének és uniójának elemszámából számítható.

A mintaprogram egyszerűsített részlete:

```python
def jaccard_similarity(liked_genres, other_genres):
    intersection = liked_genres & other_genres
    union = liked_genres | other_genres
    return len(intersection) / len(union) if union else 0.0
```

A What2Watch programban először külön lekérdezésekkel gyűjtöttem össze a filmek műfajait, majd egy közös lekérdezéssel csökkentettem az adatbázis-műveletek számát. A Python-program a kiszámított hasonlóság szerint rendezte az eredményeket, és megjelenítette a tíz legjobb ajánlást. Ezzel ugyanazon a feladaton keresztül lehetett szemléltetni a matematikai modell, az adatbázis-lekérdezés, a programozás és a teljesítmény közötti kapcsolatot.
