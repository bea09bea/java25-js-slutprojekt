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
     return data.genres;
}

async function loadMovies(genreId) {
     let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1';

     if(genreId) {
          url += `&with_genres=${genreId}`;
     }

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

async function searchMovies(query) {
     const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

     const data = await fetchUrl(url);
     const movies = data.results.map(m => new Movie(m));

     displayMovies(movies,'search');
}

async function searchPersons(query) {
     const url = `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`;;

     const data = await fetchUrl(url);
     const persons = data.results.map(p => new Person(p));

     displayPersons(persons, 'search');
}

async function searchAll(query) {
     document.querySelector('.search-content').innerHTML = ''

     const [movies, persons] = await Promise.all([
          searchMovies(query),
          searchPersons(query)
     ]);

     displayMovies(movies, 'search');
     displayPersons(persons, 'search');
}

async function loadPerson() {
     /* const url = `https://api.themoviedb.org/3/person/${person_id}`;
 */
     /* const movieCreditUrl = `https://api.themoviedb.org/3/person/${person_id}/movie_credits`;
 */

     const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
     const data = await fetchUrl(url);
     const persons = data.results.map(p => new Person(p));

     displayPersons(persons, 'popular');
}

function displayMovies(movies, type) {
/*      document.querySelector('.search-content').innerHTML = '';
 */
     movies.forEach(movie => {
          createMovieCard(movie, type);
     });
}

function displayPersons(persons, type) {
     persons.forEach(person => {
          createPersonCard(person, type);
     })
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

function createPersonCard(person, type) {
     const personCard = document.createElement('div');
     const img = document.createElement('img');
     const name = document.createElement('p');
     const professionRole = document.createElement('p');
     const knownFor = document.createElement('p');
     const famousWork = document.createElement('ul');
     const showMore = document.createElement('a');

     personCard.classList.add('personCard');
     img.src = 'https://image.tmdb.org/t/p/w500' + person.getImg();
     name.innerText = person.getName();
     professionRole.innerText = person.getProfessionalRole();
     knownFor.id = 'knownFor';
     knownFor.innerText = 'Known for: ';
     showMore.innerText = 'Show more';
     personCard.append(img, name, professionRole, knownFor, famousWork, showMore);

     if (type === 'popular') {
          document.querySelector('.person-container').append(personCard);
     } else if(type === 'search') {
          document.querySelector('.search-content').append(personCard);
     }

     showMore.href = `/datail/detail.html?person=` + person.getID();
/*      showMore.href = '../detail/detail.html';
 */}

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

const dropdown = document.querySelector('.dropdown-content');
const dropdownBtn = document.querySelector('.dropdown-btn');

dropdownBtn.addEventListener('click', function(){
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
});
