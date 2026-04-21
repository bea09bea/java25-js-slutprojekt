//Här är grunden för det visuella för filmer
//Alltså hur html är uppbyggd och hur datan från api används

import {loadGenres, loadMovies} from "./api.js";

const popular = document.createElement('div');
popular.classList.add('popular');
document.querySelector('.popularContainer').append(popular);

const topTen = document.createElement('div');
topTen.classList.add('topTen');
document.querySelector('.topTenContainer').append(topTen);


export function displayMovies(movies, type) {
/*      document.querySelector('.search-content').innerHTML = '';
 */
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
     const showMore = document.createElement('a');
     
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

     showMore.href = `./detail/detail.html?movie=` + movie.getId();
}

function popularMovies(movieCard) {
     popular.append(movieCard);
}

function topTenMovies(movieCard) {
     topTen.append(movieCard);
}

function search(movieCard) {
     const searchContent = document.querySelector('.search-content');
     searchContent.append(movieCard);
}

export function dropdownButton() {
     const dropdown = document.querySelector('.dropdown-content');
     const dropdownBtn = document.querySelector('.dropdown-btn');

     dropdown.classList.toggle('show');
     dropdownBtn.classList.toggle('borderBtn');

     loadGenres().then(genres => {
          genres.forEach(genre => {
               const genreDiv = document.createElement('div');
               genreDiv.innerText = genre.name;

               genreDiv.addEventListener('click', function() {
                    loadMovies(genre.id);
               });
               dropdown.append(genreDiv);
          });
     });
}