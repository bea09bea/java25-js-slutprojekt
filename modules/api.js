// Här hämtas data från API med GET-förfrågan och returnerar JSON-svar
// datan görs om till objekt för att sedan användas i movieUi.js & personUi.js 

import {
    displayMovies,
    displayPopularMovies,
    displayTopMovies,
    displayGenres
} from "./movieUi.js";

import {
    displayPersons,
    displayPopularPerson
} from "./personUi.js";

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

     try {
          const response = await fetch(url, options);

          if (!response.ok) {
               throw new Error(getErrorMessage(response.status));
          }

          const data = await response.json();
          return data;
     } catch(error) {
          throw error;
     }
}

function getErrorMessage(status) {
    switch (status) {
        case 200:
            return "Everything is OK.";
        case 401:
            return "Invalid API key. Please check your credentials.";
        case 404:
            return "The requested data could not be found (wrong URL or missing resource).";
        case 500:
            return "Server error. Please try again later.";
        default:
            return "Something went wrong. Please try again.";
    }
}

async function safeLoad(fn) {
     try {
          return await fn();
     } catch(error) {
          showError(error.message);
          return null;
     }
}

function showError(message) {
     alert(message);
}

export async function loadPopularMovies() {
    try {
          const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

          const data = await safeLoad(() => fetchUrl(url));
          if (!data) return;

          const top10Popular = data.results.slice(0,10);
          const movies = top10Popular.map(movie => new Movie(movie));
          displayPopularMovies(movies);
    } catch (error) {
          throw new Error(error.message);

    }    
}

export async function loadTopMovies() {
     try {
          const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

          const data = await fetchUrl(url);

          //10 första
          const top10 = data.results.slice(0,10);
          const movies = top10.map(m => new Movie(m));
          displayTopMovies(movies);
     } catch (error) {
               throw new Error(error.message);

     }
}

export async function loadGenres() {
    try {
          const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
          const data = await fetchUrl(url);
          return data.genres;
     } catch (error) {
          throw new Error(error.message);
     }
}

export async function loadMovies(genreId) {
     try {
          let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1';

               if(genreId) {
                    url += `&with_genres=${genreId}`;
               }

               const data = await fetchUrl(url);
               const movies = data.results.map(m => new Movie(m));

               return movies;
     } catch (error) {
          throw new Error(error.message);
     }
}

export async function searchMovies(query) {
    try {
          const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

          const data = await fetchUrl(url);
          const movies = data.results.map(m => new Movie(m));

          displayMovies(movies,'search');

          return movies;
    } catch (error) {
          throw new Error(error.message);
    }     
}

export async function searchPersons(query) {
    try {
          const url = `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`;;

          const data = await fetchUrl(url);
          const persons = data.results.map(p => new Person(p));

          displayPersons(persons, 'search');

          return persons;
    } catch (error) {
          throw new Error(error.message);
    }     
}

export async function searchAll(query) {     
     const [movies, persons] = await Promise.all([
          searchMovies(query),
          searchPersons(query)
     ]);

     return { movies, persons };
}

export async function loadPerson() {
    try {
          const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
          const data = await fetchUrl(url);
          const persons = data.results.map(p => new Person(p));

          displayPopularPerson(persons);
    } catch (error) {
          throw new Error(error.message);
    }     
}

export async function personWork(id) {
    try {
        const url = `https://api.themoviedb.org/3/person/${id}/combined_credits`;
        const data = await fetchUrl(url);

        const top5 = data.cast
            .filter(m => m.media_type === "movie")
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5);

        return top5;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function loadPersonDetails(id) {
    try {
        const url = `https://api.themoviedb.org/3/person/${id}`;
        const data = await fetchUrl(url);

        const person = new Person(data);
        const top5 = await personWork(person.getId());

        return { person, top5 };

    } catch (error) {
        throw new Error(error.message);
    }
}

    export async function loadMovieDetails(id) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}`;
        const data = await fetchUrl(url);

        const movie = new Movie(data);

        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
}