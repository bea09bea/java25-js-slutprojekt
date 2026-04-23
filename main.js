import { fetchUrl, loadPopularMovies, loadTopMovies, loadPerson, loadMovies, searchAll } from "./modules/api.js";
import { dropdownButton, displayMovies, displaySearchMovies, sortMovies, displayGenres } from "./modules/movieUi.js";
import {displayPersons, displaySearchPersons} from "./modules/personUi.js";
import { Movie } from "./modules/movieClass.js";
import { Person } from "./modules/personClass.js";

let currentMovies = [];

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

async function start() {

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

const select = document.querySelector('select');
select.addEventListener('change', (e) => {
     const value = e.target.value;
     const sorted = sortMovies(currentMovies, value);

     displayGenres(sorted);
});

document.querySelector('.dropdown-btn').addEventListener('click', dropdownButton);

function searchLayout() {
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
}