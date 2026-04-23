////Här skapas element med tillhörande data från api för film utifrån id i url

import {fetchUrl, loadMovieDetails} from "../modules/api.js";
import { Movie } from "../modules/movieClass.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get('movie');

if (movieId) {
     loadMovieDetails(movieId);
} 

export function displayMoviesDetail(movie) {
     const img = document.createElement('img');
     const info = document.createElement('div');
     const title = document.createElement('h1');
     const genre = document.createElement('p');
     const rating = document.createElement('p');
     const releaseDate = document.createElement('p');
     const description = document.createElement('p');


     img.src = 'https://image.tmdb.org/t/p/w500' + movie.getImg();
     info.classList.add('info');
     title.innerText = movie.getTitle();

     const genres = movie.getGenre();
     genre.innerText = 'Genre: ' + genres.map(g => g.name).join(', ');
     rating.innerText = '\u2606 ' + movie.getRating();
     releaseDate.innerText = 'Release Date: ' + movie.getReleaseDate();
     description.innerText = 'Description: ' + movie.getOverview();
     console.log(movie)

     info.append(title, genre, rating, releaseDate, description);
     document.querySelector('.partOne').append(img, info);
}