import { fetchUrl } from "./modules/api.js";
import { Movie } from "./modules/movie.js";
import { Person } from "./modules/person.js";


const popular = document.createElement('div');
popular.classList.add('popular');
document.querySelector('.popularContainer').append(popular);

const topTen = document.createElement('div');
topTen.classList.add('topTen');
document.querySelector('.topTenContainer').append(topTen);

async function loadPopularMovies() {
     const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

     const data = await fetchUrl(url);
     const top10Popular = data.results.slice(0,10);
     const movies = top10Popular.map(movie => new Movie(movie));
     displayMovies(movies, 'popular');
}

async function loadGenres() {
     const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
     const data = await fetchUrl(url);
     const genres = data.genres.map(g => g.name);
     return genres;
}

async function loadMovies() {
     const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1';
     const data = await fetchUrl(url);
     const movies = data.results.map(m => new Movie(m));
     displayMovies(movies, 'search');
}

async function loadTopMovies() {
     const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

     const data = await fetchUrl(url);

     //10 första
     const top10 = data.results.slice(0,10);
     const movies = top10.map(m => new Movie(m));
     displayMovies(movies, 'top');
}

function displayMovies(movies, type) {
     movies.forEach(movie => {
          createMovieCard(movie, type);
     });
}

function createMovieCard(movie, type) {
     const movieCard = document.createElement('div');
     const img = document.createElement('img');
     const starContainer = document.createElement('div');
     const star = document.createElement('p');
     const title = document.createElement('p');
     const showMore = document.createElement('p');
     
     img.src = 'https://image.tmdb.org/t/p/w500' + movie.getImg();
     star.innerText = '\u2606 ' + movie.getRating();
     showMore.innerText = 'Show more';
     movieCard.classList.add('movie-card');
     title.innerText = movie.getTitle();

     starContainer.append(star);
     movieCard.append(img, starContainer, title, showMore);
     
     if (type === 'popular') {
          popularMovies(movieCard);
     } else if(type === 'top') {
          topTenMovies(movieCard);
     } else if(type === 'search') {
          search(movieCard);
     }
}

function popularMovies(movieCard) {
     popular.append(movieCard);
}

function topTenMovies(movieCard) {
     topTen.append(movieCard);
}

function search(movieCard) {
     document.querySelector('.search-content').append(movieCard);
}

function start() {
     loadPopularMovies();
     loadTopMovies();
     loadMovies();
}
start();

const dropdown = document.querySelector('.dropdown-content');
const dropdownBtn = document.querySelector('.dropdown-btn');
dropdownBtn.addEventListener('click', function(){
     dropdown.classList.toggle('show');
     dropdownBtn.classList.toggle('borderBtn');

     loadGenres().then(genres => {
     genres.forEach(genreName => {
               const genreDiv = document.createElement('div');
               genreDiv.innerText = genreName;
               dropdown.append(genreDiv);
          }); 
     });
});

function filterGenre(params) {
     
}