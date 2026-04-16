import { fetchUrl } from "./modules/api.js";
import { Movie } from "./modules/movie.js";
import { Person } from "./modules/person.js";

async function loadTopMovies() {
     const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

     const data = await fetchUrl(url);

     //10 första
     const top10 = data.results.slice(0,10);

     const movies = top10.map(m => new Movie(m));

     displayMovies(movies);

}
loadTopMovies();


function displayMovies(movies) {
     movies.forEach(movie => {
          createMovieCard(movie);
     });
}

function createMovieCard(movie) {
     
}