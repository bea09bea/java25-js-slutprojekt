import { fetchUrl, loadPopularMovies, loadTopMovies, loadPerson, loadMovies, searchAll } from "./modules/api.js";
import { dropdownButton, displayMovies, displaySearchMovies, sortMovies, displayGenres } from "./modules/movieUi.js";
import {displayPersons, displaySearchPersons} from "./modules/personUi.js";
import { Movie } from "./modules/movieClass.js";
import { Person } from "./modules/personClass.js";

//Används för att sortera filmer
let currentMovies = [];

function showError(message) {
    const errorBox = document.querySelector('.error');
    errorBox.textContent = message;
    errorBox.classList.add('show');
}

function viewToggle() {
     const mButton = document.querySelector('.showMovies');
     const pButton = document.querySelector('.showPersons');

     const movieView = document.querySelector('.movie-view');
     const personView = document.querySelector('.person-view');

     mButton.addEventListener('click',() => {
          movieView.classList.remove('no-show');
          personView.classList.add('no-show');
     })

     pButton.addEventListener('click', () => {
          personView.classList.remove('no-show');
          movieView.classList.add('no-show');
     })
}

/* function searchLayout() {
     const searchContent = document.querySelector('.search-content');
     const movieT = document.createElement('h2');
     const personT = document.createElement('h2');
     const movieContainer = document.createElement('div');
     const personContainer = document.createElement('div');
     
     movieContainer.classList.add('movieContainer');
     personContainer.classList.add('personContainer');

     movieT.innerText = 'Movies: ';
     personT.innerText = 'Persons: ';

     searchContent.innerHTML = '';
     searchContent.append(movieT, movieContainer, personT, personContainer);
} */

function searchLayout() {
     const searchContent = document.querySelector('.search-content');

     searchContent.innerHTML = '';

     // --- MOVIES SLIDER ---
     const movieTitle = document.createElement('h2');
     movieTitle.innerText = 'Movies';

     const movieSlider = document.createElement('div');
     movieSlider.classList.add('slider', 'search-movie-slider');

     const moviePrev = document.createElement('button');
     moviePrev.classList.add('slider-btn', 'prev');
     moviePrev.innerText = '‹';

     const movieViewport = document.createElement('div');
     movieViewport.classList.add('slider-viewport');

     const movieTrack = document.createElement('div');
     movieTrack.classList.add('slider-track');

     const movieNext = document.createElement('button');
     movieNext.classList.add('slider-btn', 'next');
     movieNext.innerText = '›';

     movieViewport.appendChild(movieTrack);
     movieSlider.append(moviePrev, movieViewport, movieNext);

     // --- PERSONS SLIDER ---
     const personTitle = document.createElement('h2');
     personTitle.innerText = 'Persons';

     const personSlider = document.createElement('div');
     personSlider.classList.add('slider', 'search-person-slider');

     const personPrev = document.createElement('button');
     personPrev.classList.add('slider-btn', 'prev');
     personPrev.innerText = '‹';

     const personViewport = document.createElement('div');
     personViewport.classList.add('slider-viewport');

     const personTrack = document.createElement('div');
     personTrack.classList.add('slider-track');

     const personNext = document.createElement('button');
     personNext.classList.add('slider-btn', 'next');
     personNext.innerText = '›';

     personViewport.appendChild(personTrack);
     personSlider.append(personPrev, personViewport, personNext);

     // append allt
     searchContent.append(
          movieTitle,
          movieSlider,
          personTitle,
          personSlider
     );
}

async function start() {
     //ladda data från api
     loadPopularMovies();
     loadTopMovies();
     loadPerson();

     viewToggle()

     //Default läge 28 = action
     currentMovies = await loadMovies(28);

     displayGenres(currentMovies);
     
     const form = document.querySelector('#searchForm');
     const input = document.querySelector('#searchBar');

     form.addEventListener('submit',async function(e) {
          
          //stoppar sidan från att laddas om
          e.preventDefault();

          const query = input.value.trim();

          if(query === '') {
               alert("You have to write something first");

               //Default läge 28 = action
               loadMovies(28);
               return;
          }

          //hämta data från api
          const {movies, persons} = await searchAll(query);

          if (movies.length === 0 && persons.length === 0) {
               alert("No results found, try again");
               input.value = '';
               return;
          }


          searchLayout();
          displaySearchMovies(movies, 'search');
          displaySearchPersons(persons, 'search');

          initSlider('.search-movie-slider');
initSlider('.search-person-slider');
          //Scrollas till resultat 
          //setTimeout väntar först tills resultat laddat klart 
          setTimeout(() => {
               const container = document.querySelector('.search-content');
               const firstCard = container.querySelector('.movie-card, .personCard')

               if (firstCard) {
                    container.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                    });
               }
          }, 100);

          input.value = '';
     });
}
start();

export function setCurrentMovies(movies) {
    currentMovies = movies;
}

//Sortera dropdown
const select = document.querySelector('select');

select.addEventListener('change', (e) => {
     const value = e.target.value;

     const sorted = sortMovies([...currentMovies], value);

     currentMovies = sorted;

     if (!document.querySelector('.search-content') || 
         document.querySelector('#search-view').style.display === 'none') {
          displayGenres(sorted);
     }
});

//Välja genre dropdown 
document.querySelector('.dropdown-btn').addEventListener('click', dropdownButton);