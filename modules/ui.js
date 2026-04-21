import {loadGenres, loadMovies} from "./api.js";

//Movies
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


//Persons

export function displayPersons(persons, type) {
     persons.forEach(person => {
          createPersonCard(person, type);
     })
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

     showMore.href = `/detail/detail.html?person=` + person.getID();
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