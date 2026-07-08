//Här är grunden för det visuella för filmer
//Alltså hur html är uppbyggd och hur datan från api används

import {loadGenres, loadMovies} from "./api.js";
import { setCurrentMovies } from '../main.js';


export function displayMovies(movies, type) {

     movies.forEach(movie => {
          createMovieCard(movie, type);
     });
}

export function initSlider(containerSelector, movies) {
    const container = document.querySelector(containerSelector);

    const track = container.querySelector('.slider-track');
    const next = container.querySelector('.next');
    const prev = container.querySelector('.prev');

    let index = 0;
    const visibleCards = 3;

    track.innerHTML = '';

    movies.forEach(m => {
        const card = createMovieCard(m);
        card.classList.add('slider-card');
        track.append(card);
    });

    const total = movies.length;

    function update() {
        const cardWidth = track.children[0].offsetWidth + 20;
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    next.onclick = () => {
        if (index < total - visibleCards) {
            index++;
            update();
        }
    };

    prev.onclick = () => {
        if (index > 0) {
            index--;
            update();
        }
    };

    window.addEventListener('resize', update);

    update();
}


export function displayPopularMovies(movies) {
    initSlider('.popular-slider', movies);
}

export function displayTopMovies(movies) {
    initSlider('.top-slider', movies);
}

/* export function displayTopMovies(movies) {

     const topTen = document.createElement('div');
     topTen.classList.add('topTen');

     const container = document.querySelector('.topTenContainer');
     container.append(topTen);

     movies.forEach(m => {
          topTen.append(createMovieCard(m));
     })
         initSlider(movies);

}
 */
/* export function displayPopularMovies(movies) {
     const popular = document.createElement('div');
     popular.classList.add('popular');
     const container = document.querySelector('.popularContainer');
     container.append(popular);

     const slide = document.querySelector('.card-wrapper');
     

     movies.forEach(m => {
          const card = createMovieCard(m);
          card.classList.add('swiper-slide'); 
          slide.append(createMovieCard(m))


          popular.append(createMovieCard(m));
          
     });
     new Swiper(".slide-container", {
    slidesPerView: 3,
    spaceBetween: 25,
});
} */


export function sortMovies(movies, type) {
     let sorted = [...movies];

     console.log(movies[0])

     switch(type) {
          case 'alpha-asc':
               sorted.sort((a,b) => a.getTitle() > b.getTitle() ? 1 : -1);
               break;
          case 'alpha-desc':
               sorted.sort((a,b) => a.getTitle() < b.getTitle() ? 1 : -1);
               break;
          case 'score-asc':
               sorted.sort((a,b) => a.getRating() - b.getRating());
               break;
          case 'score-desc':
               sorted.sort((a,b) => b.getRating() - a.getRating());
               break;
     }

     return sorted;
}

export function displayGenres(movies) {
   initSlider('.genre-slider', movies, createMovieCard);
}

/* export function displayGenres(movies) {
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
 */
function createMovieCard(movie, type) {
     const movieCard = document.createElement('div');
     const img = document.createElement('img');
     const starContainer = document.createElement('div');
     const star = document.createElement('p');
     const title = document.createElement('p');
     const date = document.createElement('p');
     const showMore = document.createElement('a');
     
     img.src = 'https://image.tmdb.org/t/p/w500' + movie.getImg();
     star.innerText = '\u2606 ' + movie.getRating();
     showMore.innerText = 'Show more';
     movieCard.classList.add('movie-card');
     title.innerText = movie.getTitle();
     date.innerText = 'Release date: ' + movie.getReleaseDate();
     date.id = 'date';

     starContainer.append(star);
     movieCard.append(img, starContainer, title,date, showMore);

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

/* export async function dropdownButton() {
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
} */

export async function dropdownButton() {
     const dropdown = document.querySelector('.dropdown-content');
     const dropdownBtn = document.querySelector('.dropdown-btn');

     dropdown.classList.toggle('show');
     dropdownBtn.classList.toggle('borderBtn');

     // stoppa dubbel-loading
     if (dropdown.dataset.loaded === 'true') return;

     try {
          const genres = await getGenre();

          genres.forEach(genre => {
               const genreDiv = document.createElement('div');
               genreDiv.classList.add('genre-item');
               genreDiv.innerText = genre.name;

               genreDiv.addEventListener('click', async () => {
                              const movies = await loadMovies(genre.id);

                              setCurrentMovies(movies);   // 🔥 uppdaterar main state

                              displayGenres(movies);      // render UI
                         });

               dropdown.append(genreDiv);
          });

          dropdown.dataset.loaded = 'true';

     } catch (err) {
          console.error("Genre fetch failed:", err);
     }
}

export function displaySearchMovies(movies) {
     /* const container = document.querySelector('.movieContainer');

     movies.forEach(m => {
          container.append(createMovieCard(m));
     }) */
      const track = document.querySelector('.search-movie-slider .slider-track');

     track.innerHTML = '';

     movies.forEach(m => {
          track.append(createMovieCard(m));
     });
}

