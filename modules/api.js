import {displayMovies, displayPersons} from "./ui.js";
import { Movie } from "./movieClass.js";
import { Person } from "./personClass.js";

export async function fetchUrl(url) {
     const options = {
          method: 'GET',
          headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGExYmQ3NjNhNGJiY2IyODJjMGYyYmE2OGFkOGZhNyIsIm5iZiI6MTc3NjM0Njc4NC44MjQsInN1YiI6IjY5ZTBlNmEwNTBmYzMxYjRiM2FmOWJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tlR1JZIz7Eiijho_rr-8Lg13BOSC3wbl81HrS1S2JiA'
          }
     };

     const response = await fetch(url, options);
     const data = await response.json();
     return data;
}

export async function loadPopularMovies() {
     const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

     const data = await fetchUrl(url);
     const top10Popular = data.results.slice(0,10);
     const movies = top10Popular.map(movie => new Movie(movie));
     displayMovies(movies, 'popular');
}

export async function loadTopMovies() {
     const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

     const data = await fetchUrl(url);

     //10 första
     const top10 = data.results.slice(0,10);
     const movies = top10.map(m => new Movie(m));
     displayMovies(movies, 'top');
}

export async function loadGenres() {
     const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
     const data = await fetchUrl(url);
     return data.genres;
}

export async function loadMovies(genreId) {
     let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1';

     if(genreId) {
          url += `&with_genres=${genreId}`;
     }

     const data = await fetchUrl(url);
     const movies = data.results.map(m => new Movie(m));
     displayMovies(movies, 'search');
}

export async function searchMovies(query) {
     const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

     const data = await fetchUrl(url);
     const movies = data.results.map(m => new Movie(m));

     displayMovies(movies,'search');
}

export async function searchPersons(query) {
     const url = `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`;;

     const data = await fetchUrl(url);
     const persons = data.results.map(p => new Person(p));

     displayPersons(persons, 'search');
}

export async function searchAll(query) {
     document.querySelector('.search-content').innerHTML = ''

     const [movies, persons] = await Promise.all([
          searchMovies(query),
          searchPersons(query)
     ]);

     displayMovies(movies, 'search');
     displayPersons(persons, 'search');
}

export async function loadPerson() {
     /* const url = `https://api.themoviedb.org/3/person/${person_id}`;
 */
     /* const movieCreditUrl = `https://api.themoviedb.org/3/person/${person_id}/movie_credits`;
 */

     const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
     const data = await fetchUrl(url);
     const persons = data.results.map(p => new Person(p));

     displayPersons(persons, 'popular');
}