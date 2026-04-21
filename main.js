import { fetchUrl, loadPopularMovies, loadTopMovies, loadPerson, loadMovies } from "./modules/api.js";
import { dropdownButton } from "./modules/movieUi.js";
import { Movie } from "./modules/movieClass.js";
import { Person } from "./modules/personClass.js";


function start() {
     loadPopularMovies();
     loadTopMovies();
     loadPerson();

     //Default genre = action
     loadMovies(28);

     const searchBar = document.querySelector('#searchBar');
     
     searchBar.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
               e.preventDefault();

               const query = this.value;

               if (query.length > 1) {
                    searchAll(query);

                    //Scrollas till resultat 
                    //setTimeout väntar först tills resultat laddat klart 
                    setTimeout(() => {
                         const container = document.querySelector('.search-content');
                         const firstCard = container.querySelector('.movie-card, .personCard')

                         firstCard.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                         });
                         }, 100);

                    this.value = '';

               } else if(query.length === 0) {
                    //Default genre = action
                    loadMovies(28);
               }
          }
     });
}
start();

document.querySelector('.dropdown-btn').addEventListener('click', dropdownButton());
