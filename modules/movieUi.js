//Här är grunden för det visuella för filmer
//Alltså hur html är uppbyggd och hur datan från api används

import {loadGenres, loadMovies} from "./api.js";



export function displayMovies(movies, type) {

     movies.forEach(movie => {
          createMovieCard(movie, type);
     });
}

export function displayPopularMovies(movies) {
     const popular = document.createElement('div');
     popular.classList.add('popular');
     const container = document.querySelector('.popularContainer');
     container.append(popular);

     movies.forEach(m => {
          popular.append(createMovieCard(m));
     })
}

export function displayTopMovies(movies) {
     const topTen = document.createElement('div');
     topTen.classList.add('topTen');

     const container = document.querySelector('.topTenContainer');
     container.append(topTen);

     movies.forEach(m => {
          topTen.append(createMovieCard(m));
     })
}

export function displayGenres(movies) {
   const searchContent = document.querySelector('.search-content');

   //skapa container OM den inte finns
   let movieContainer = searchContent.querySelector('.movieContainer');

   if (!movieContainer) {
      movieContainer = document.createElement('div');
      movieContainer.classList.add('movieContainer');
      searchContent.appendChild(movieContainer);
   }

   movieContainer.innerHTML = '';

   movies.forEach(m => {
      movieContainer.appendChild(createMovieCard(m));
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
     
   /*   if (type === 'popular') {
          popularMovies(movieCard);
     } else if(type === 'top') {
          topTenMovies(movieCard);
     } else if(type === 'search') {
          search(movieCard);
     } */

     showMore.href = `./detail/detail.html?movie=` + movie.getId();

     return movieCard;
}

function search(card) {
     const searchContent = document.querySelector('.search-content');
     
     searchContent.append(card);
}

let genresCache = null;
async function getGenre() {
     if (genresCache) {
          return genresCache;
     }

     genresCache = await loadGenres();
     return genresCache;
}

export async function dropdownButton() {
     const dropdown = document.querySelector('.dropdown-content');
     const dropdownBtn = document.querySelector('.dropdown-btn');

     dropdown.classList.toggle('show');
     dropdownBtn.classList.toggle('borderBtn');

     const genres = await getGenre();

     if (dropdown.dataset.loaded === 'true') return;

     genres.forEach(genre => {
               const genreDiv = document.createElement('div');
               genreDiv.innerText = genre.name;

               genreDiv.addEventListener('click', function() {
                    loadMovies(genre.id);
               });
               dropdown.append(genreDiv);
          });
     dropdown.dataset.loaded = 'true';
}

export function displaySearchMovies(movies) {
     const container = document.querySelector('.movieContainer');

     movies.forEach(m => {
          container.append(createMovieCard(m));
     })
}