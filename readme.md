Webbsidan CineRate är en förenklad version av IMDB och utgår från The Movie Database API.
API: https://developer.themoviedb.org/reference/getting-started

Struktur för projekt filer & mappar:
- index.html: html grund
- main.js: laddar data som visas på framsida, hanterar eventlistener & visar error meddelande
- style.css: css för index.html

module
     - api.js: hämtar data från api med GET-förfrågan & hanterar error (statuskoder, nätverksfel, fetch-fel)
     - movieClass.js: objektorienterad klass som omvandlar rå API-data till Movie-objekt
     - personClass.js: objektorienterad klass som omvandlar rå API-data till Person-objekt
     - movieUi.js: skapar element för funktioner som hämtar data för filmer
     - personUi.js: skapar element för funktioner som hämtar data för person 

detail
     - detail.html: htlm grund för detalj vy för både person & film
     - style.css: css för bara detail.html
     - movieDetail.js: använder data från api och visar på webbsidan
     - personDetail.js: använder data från api och visar på webbsidan


Funktionaliteter
     - söka film & person
     - se lista med populära filmer & personer
     - se lista med top 10 rankade filmer
     - välja att se bara filmer eller bara personer
     - se mer information om person & film
     - sortera filmer efter alfabetisk ordning & rankning
     - filtrera efter genre
     - error meddelande


Webbsida skapad av Bea Thanyalak Phulonkaew