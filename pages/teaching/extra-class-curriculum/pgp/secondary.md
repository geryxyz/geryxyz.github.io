---
title: Python, Gráf, Programozás (fél éves)
---

<p class="audience">középiskola bármelyik osztály</p>
<p class="abstract">Gráf alapú adattárolás és programozási alapismeretek. Az szoftverfejlesztés során fontos készség az elvont adatstruktúrák megértése, tervezése és kezelése. Az egyik ilyen alapvető adatstruktúra a gráf, melyet számtalan rendszer használ információ rövid vagy hosszútávú tárolására és az entitások közötti kapcsolatok jelölésére. 
A szakkör során a tanulók megismerkedhetnek a gráf alapú adatreprezentáció alapjaival. Az elméleti ismeretket gyakorlati példák során szilárdítjuk meg, melyhez az ismert és ipari környezetben is gyakran használt Neo4J gráf alapú adatbázis rendszert használjuk. A rendszer látványos és könnyen érthető grafikus felületén keresztül térképezhetjük fel az adatbázisok tartalmát és szerkezetét. A gyakorlat során bepillantást nyerünk a grafikus felületen túlmutató az ipari felhasználáshoz közeli hozzáférést biztosító programozási felületekhez is. Példaként a közismert szkriptnyelvet fogjuk használni, a Python 3-at. Ez az elegánsan és tisztán strukturált nyelv megkönnyíti a programozással való ismerkedést, miközben valós életben is használható szaktudást ad. A szakkör célja, hogy a fiatalok a saját világukból és életükből vett problémák megoldásán keresztül ismerjék meg a fenn említett technológiákat és eszközöket.</p>

## Függőségek
<pre>
easy_install colorama
easy_install neo4j-driver
</pre>

## Mit csinál egy informatikus (szoftverfejlesztő)?
<p class="overview">A tanulók saját tapasztalatai alpján felsoroljuk és megismerjük az informatika szakterületeit.</p>
<p>Egy szoftverfejlesztő mindig elég lusta ahoz, hogy napokat töltsön egy szoftver elkészítésével ami megold egy 10 perces feladatot helyette.</p>
<p>A szoftverfejlesztés nem csak egy munka: 
<ul>
	<li><a href="https://github.com/geryxyz/bibHygeia">referenciák rendbe rakása</a></li>
	<li><a href="https://gist.github.com/geryxyz/030d5b466a2a9f7409b9776cc98a313a">marógép sebességének állítása</a></li>
	<li><a href="https://gist.github.com/geryxyz/b228d6535f5271aea6684f733d1d4380">algoritmikus nyuszik</a></li>
	<li><a href="https://en.wikipedia.org/wiki/History_of_Linux#The_creation_of_Linux">Linux operációs rendszer</a></li>
</ul>
</p>
<p>
A szofverfejlesztés részei:
<ul>
  <li>folyamat tervezés</li>
  <li>adatszerkezet tervezés</li>
  <li>kódolás</li>
  <li>tesztelés</li>
  <li>hibajavítás</li>
</ul>
</p>

## Mi az a szkript nyelv?
<p>Python alapok: parancssoron keresztül néhány példa a szintaxisról</p>
<p>Eddig elkészült <a href="https://drive.google.com/open?id=1IyTVRu1tDzsGkWwZYpRS65z-izCJq7uC">program</a></p>

## Szépen formázott kiiratás és beolvasás
<p>Parancssorban nézzük át hogyan működnek az egyes részek.</p>
<ol>
  <li>kiíratás/beolvasás</li>
  <li>string műveletek</li>
  <li>csomag behúzása, színezés</li>
</ol>
<p>info, warning, error, question típusú üzenetek</p>
<pre class="code">
[i] this is an info

[w] I warn you something

[!] There is some error!

[?] Can I ask a question?
[:]  
</pre>

<pre class="code"><code class="python">
import pdb

def annotated(text, icon=''):
  return '[%s] %s' % (icon, text)

def info(text):
  print(annotated(text, icon='i'))

def warning(text):
  print(annotated(text, icon='w'))

def error(text):
  print(annotated(text, icon='!'))

def question(text):
  print(annotated(text, icon='?'))
  print(annotated('', icon=':'), end='')
  return input()

if __name__ == '__main__':
  pdb.set_trace()  
</code></pre>

<p>üzenetek szinezése <a href="https://pypi.org/project/colorama/">colorama modullal</a></p>

<pre class="code"><code class="python">
import pdb
import colorama

colorama.init()

def annotated(text, icon=''):
  return '[%s] %s' % (icon, text)

def info(text):
  print(annotated(colorama.Fore.CYAN + text + colorama.Fore.RESET, icon='i'))

def warning(text):
  print(annotated(colorama.Fore.YELLOW + text + colorama.Fore.RESET, icon='w'))

def error(text):
  print(annotated(colorama.Fore.RED + text + colorama.Fore.RESET, icon='!'))

def question(text):
  print(annotated(colorama.Fore.GREEN + text + colorama.Fore.RESET, icon='?'))
  print(annotated('', icon=':'), end='')
  return input()

if __name__ == '__main__':
  pdb.set_trace()  
</code></pre>

## Mi az a gráf?
<p class="overview">Gráfelméleti alapfogalmak bevezetése.</p>
<ul>
  <li>gráf definíció: pontok és élek</li>
  <li>kapcsolatok leírása gráfként</li>
  <li>irányítás</li>
  <li>él-súlyok</li>
  <li>csomópont-tulajdonságok</li>
  <li>él-tulajdonságok</li>
</ul>

## Bevezetés a gráf adatbázisok világába
<p class="overview">Neo4J gráf adatbázis szerkezete és a <a href="https://neo4j.com/developer/cypher-query-language/">Cypher lekérdező nyelv</a>.
<ul>
  <li>Neo4J gráf modell</li>
  <li>Cypher szintaxis
  	<dl>
  		<dt>Keresés és minta illesztés</dt>
  		<dd><code class="cypher">MATCH (m:Movie)<-[:RATED]-(u:User)</code></dd>
  		<dt>Keresés és minta illesztés</dt>
  		<dd><code class="cypher">MATCH (m:Movie)<-[:RATED]-(u:User)</code></dd>
  		<dt>Szűrés feltétel alapján</dt>
  		<dd><code class="cypher">WHERE m.title CONTAINS "Matrix"</code></dd>
  		<dt>Adatok átadása</dt>
  		<dd><code class="cypher">WITH m.title AS movie, COUNT(*) AS reviews</code></dd>
  		<dt>Eredmények visszadása</dt>
  		<dd><code class="cypher">RETURN movie, reviews</code></dd>
  		<dt>Rendezés</dt>
  		<dd><code class="cypher">ORDER BY reviews DESC</code></dd>
  		<dt>Limitálás</dt>
  		<dd><code class="cypher">LIMIT 5</code></dd>
  	</dl>
    <ul>
      <li><details><summary>Komplex példa</summary><pre class="code">
MATCH (m:Movie)<-[:RATED]-(u:User) <span class="comment">//Search for an existing graph pattern</span>
WHERE m.title CONTAINS "Matrix" <span class="comment">//Filter matching paths to only those matching a predicate</span>
WITH m.title AS movie, COUNT(*) AS reviews <span class="comment">//Count number of paths matched for each movie</span>
RETURN movie, reviews <span class="comment">//Specify columns to be returned by the statement</span>
ORDER BY reviews DESC <span class="comment">//Order by number of reviews, in descending order</span>
LIMIT 5; <span class="comment">//Only return first five records</span>
        </pre></details>
      </li>
      <li><details><summary>Gyakorló feladat</summary><ol>
	      <li>Listázzuk ki hogy melyik felhasználó melyik filmet hányasra osztályozta.</li>
	      <li>Listázzuk ki hogy ki hányasra rangsorolta az Matrix filmeket.</li>
	      <li>Számoljuk össze hogy hány szavazat érkezett filmenként.</li>
	      <li>Rendezzük sorba a filmeket szavazatok száma szerint.</li>
	      <li>Csak a legtöbb szavazatot kapott filmet íratsuk is.</li>
	      <li>Nevezzük el a visszadott mezőket.</li>
	      </ol>
	</li>
    </ul>
  </li>
  <li>minta illesztés</li>
  <li>változók</li>
  <li>feltételek</li>
  <li>rendezés</li>
  <li>limitek</li>
  <li>utasítások: paraméterek és visszatérési érték</li>
  <li>összegző függvények</li>
</ul>

## Gráfadatbázisok a gyakrolatban
<p class="overview">Egy filmajánló rendszer megvalósítása IMDB alapján, egy <a href="https://neo4j.com/sandbox/">példa adatbázison</a> keresztül.<br/>
Online angol nyelvű oktató anyag elérhető a <a href="https://guides.neo4j.com/sandbox/recommendations/index.html">Neo4J Sandboxban</a>
</p>

<img src="/pages/pgp/datamodel_for_open_movie_graph.png" style="width: 300px" />

### Keressünk egy példa filmet

<pre class="code">
match (m:Movie) return m.title
</pre>

### Érdekes filmek lekérdezése felhasználónkként

<p>Ki szeretti még a Crimson Tide-ot?</p>

<pre class="code">
match (liked:Movie {title: "Crimson Tide"})<-[:RATED]-(user:User)
return *
</pre>

<p>Milyen más filmeket szeret aki szereti a Crimson Tide-ot?</p>

<pre class="code">
match (liked:Movie {title: "Crimson Tide"})<-[:RATED]-(user:User)
with liked, user limit 5
match (user)-[:RATED]->(other:Movie)
return * limit 35
</pre>

<p>Melyik filmet nézzem ha szeretem a Crimson Tide-ot?</p>

<pre class="code">
match (liked:Movie {title: "Crimson Tide"})<-[:RATED]-(user:User)-[:RATED]->(other:Movie)
return other.title as recommendation, collect(user.name) as usersWhoAlsoWatched, liked.title
limit 10
</pre>

<pre class="code">
match (liked:Movie {title: "Crimson Tide"})<-[:RATED]-(user:User)-[:RATED]->(other:Movie)
return other.title as recommendation, count(user) as similarity, liked.title as liked
order by similarity desc limit 10
</pre>

## Műfaj alapú filmajánló program készítése Python-ban

<p>Milyen műfajokba sorolták be az Inception-t?</p>

<pre class="code">
match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)
return liked, genre limit 20
</pre>

<p>Python megvalósítás:</p>
<pre class="code"><code class="python">
def get_liked_genre():
  query = '''
  match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(likedGenre:Genre)
  return likedGenre.name as name
  '''
  names = []
  for record in session.run(query):
    names.append(record['name'])
  return names
</code></pre>

<pre class="code"><code class="python">
def get_movies():
  query = '''
  match (m:Movie)
  return m.title as title
  '''
  titles = []
  for record in session.run(query):
    titles.append(record['title'])
  return titles

def get_genre_of(title):
  query = '''
  match (liked:Movie {title: $title})-[:IN_GENRE]->(likedGenre:Genre)
  return likedGenre.name as name
  '''
  names = []
  for record in session.run(query, parameters={'title': title}):
    names.append(record['name'])
  return names
</code></pre>

<img src="/pages/pgp/paramter-python-cyper.png"/>

## Halmazelméleti alapok

<p>Közös műfajok megkeresése</p>

<pre class="code">
match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)<-[:IN_GENRE]-(other:Movie)
return liked.title, other.title, collect(genre.name) as intersection limit 20
</pre>

<p>Melyek csak az Inception és a másik film műfajai?</p>

<pre class="code">
match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)<-[:IN_GENRE]-(other:Movie)
with liked, other, collect(genre.name) as intersection
match (liked)-[:IN_GENRE]->(likedGenre:Genre)
with liked, other, collect(likedGenre.name) as likedGenres, intersection
match (other)-[:IN_GENRE]->(otherGenre:Genre)
return liked.title as liked, other.title as other, likedGenres, intersection, collect(otherGenre.name) as otherGenres
</pre>

## Refactoring - egyszerűsítsük a kódot

<pre class="code"><code class="python">
def getAll(query, property, parameters={}):
  values = []
  for record in session.run(query, parameters=parameters):
    values.append(record[property])
  return values

def get_liked_genre():
  return get_genre_of('Inception')

def get_movies():
  query = '''
  match (m:Movie)
  return m.title as title
  '''
  return getAll(query, 'title')

def get_genre_of(title):
  query = '''
  match (liked:Movie {title: $title})-[:IN_GENRE]->(likedGenre:Genre)
  return likedGenre.name as name
  '''
  return getAll(query, 'name', parameters={'title': title})
</code></pre>

## Hasonlóság kiszámítása

<p><a href="https://en.wikipedia.org/wiki/Jaccard_index">Jaccard-féle hasonlóság</a> fogalma és kiszámítása</p>

<p>A műfajok uniója</p>

<pre class="code">
match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)<-[:IN_GENRE]-(other:Movie)
with liked, other, collect(genre.name) as intersection
match (liked)-[:IN_GENRE]->(likedGenre:Genre)
with liked, other, collect(likedGenre.name) as likedGenres, intersection
match (other)-[:IN_GENRE]->(otherGenre:Genre)
with liked.title as liked, other.title as other, likedGenres, intersection, collect(otherGenre.name) as otherGenres
return liked, other, likedGenres, otherGenres, intersection, likedGenres+filter(genre in otherGenres where not genre in likedGenres) as both
</pre>

<p>Jaccard kiszámítása</p>

<pre class="code">
match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)<-[:IN_GENRE]-(other:Movie)
with liked, other, collect(genre.name) as intersection
match (liked)-[:IN_GENRE]->(likedGenre:Genre)
with liked, other, collect(likedGenre.name) as likedGenres, intersection
match (other)-[:IN_GENRE]->(otherGenre:Genre)
with liked.title as liked, other.title as other, likedGenres, intersection, collect(otherGenre.name) as otherGenres
with liked, other, likedGenres, otherGenres, intersection, likedGenres+filter(genre in otherGenres where not genre in likedGenres) as both
return liked, other, intersection, both, (size(intersection)*1.0)/(size(both)*1.0) as jaccard limit 10
</pre>

<p>Python megvalósítás:</p>
<pre class="code"><code class="python">
def jaccard():
  likedGenres = set(get_liked_genre())
  similarMovies = []
  for title in get_movies()[:10]:
    otherGenres = set(get_genre_of(title))
    intersection = likedGenres & otherGenres
    union = likedGenres | otherGenres
    similarity = len(intersection) / len(union)
    entry = (title, similarity)
    similarMovies.append(entry)
  return similarMovies
</code></pre>

## Optimalizálás - gyorsítsuk fel a kódot

<pre class="code"><code class="python">
def jaccard_slow():
  likedGenres = set(get_liked_genre())
  similarMovies = []
  for title in get_movies()[:50]:
    otherGenres = set(get_genre_of(title))
    intersection = likedGenres & otherGenres
    union = likedGenres | otherGenres
    similarity = len(intersection) / len(union)
    entry = (title, similarity)
    info("similarity of %s is %f" % entry)
    similarMovies.append(entry)
  return similarMovies

def get_sets():
	query = '''
	match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)<-[:IN_GENRE]-(other:Movie)
	with liked, other, collect(genre.name) as intersection
	match (liked)-[:IN_GENRE]->(likedGenre:Genre)
	with liked, other, collect(likedGenre.name) as likedGenres, intersection
	match (other)-[:IN_GENRE]->(otherGenre:Genre)
	return liked.title as liked, other.title as other, likedGenres, intersection, collect(otherGenre.name) as otherGenres

	'''
	return session.run(query)

def jaccard():
  similarMovies = []
  for db_entry in list(get_sets())[:50]:
    likedGenres = set(db_entry['likedGenres'])
    otherGenres = set(db_entry['otherGenres'])
    otherTitle = db_entry['other']
    intersection = likedGenres & otherGenres
    union = likedGenres | otherGenres
    similarity = len(intersection) / len(union)
    item = (otherTitle, similarity)
    info("similarity of %s is %f" % item)
    similarMovies.append(item)
  return similarMovies
</code></pre>

## Melyik hasonló műfajú filmet nézzem meg?

<pre class="code">
match (liked:Movie {title: "Inception"})-[:IN_GENRE]->(genre:Genre)<-[:IN_GENRE]-(other:Movie)
with liked, other, collect(genre.name) as intersection
match (liked)-[:IN_GENRE]->(likedGenre:Genre)
with liked, other, collect(likedGenre.name) as likedGenres, intersection
match (other)-[:IN_GENRE]->(otherGenre:Genre)
with liked.title as liked, other.title as other, likedGenres, intersection, collect(otherGenre.name) as otherGenres
with liked, other, likedGenres, otherGenres, intersection, likedGenres+filter(genre in otherGenres where not genre in likedGenres) as both
return liked, other, intersection, both, (size(intersection)*1.0)/(size(both)*1.0) as jaccard
order by jaccard desc limit 10
</pre>

<pre class="code"><code class="python">
def jaccard():
  similarMovies = []
  for db_entry in get_sets():
    likedGenres = set(db_entry['likedGenres'])
    otherGenres = set(db_entry['otherGenres'])
    otherTitle = db_entry['other']
    intersection = likedGenres & otherGenres
    union = likedGenres | otherGenres
    similarity = len(intersection) / len(union)
    item = (otherTitle, similarity)
    #info("similarity of %s is %f" % item)
    similarMovies.append(item)
  return similarMovies

def recommend():
  similarMovies = jaccard()
  similarMovies.sort(key=lambda entry: entry[1], reverse=True)
  return similarMovies[:10]

if __name__ == '__main__':
  info("The top 10 movies you should watch:")
  for i, entry in enumerate(recommend()):
    info("   %dth %s" % (i+1, entry[0]))
</code></pre>
