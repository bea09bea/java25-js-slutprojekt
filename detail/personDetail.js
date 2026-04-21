import { fetchUrl, personWork, loadPersonDetails } from "../modules/api.js";
import { Person } from "../modules/personClass.js";

const params = new URLSearchParams(window.location.search);
const personId = params.get('person');

if (personId) {
     loadPersonDetails(personId);
} 

/* export async function personWork(id) {
     const url = `https://api.themoviedb.org/3/person/${id}/combined_credits`
     const data = await fetchUrl(url);

     const top5 = data.cast
          .filter(m => m.media_type === 'movie')
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0,5);

          return top5;
}

export async function loadPersonDetails(id) {
     const url = `https://api.themoviedb.org/3/person/${id}`;
     const data = await fetchUrl(url);
     const person = new Person(data);

     const top5 = await personWork(person.getId());

     displayPersonsDetail(person, top5);
} */

function gender(value) {
     if (value === 3) {
          return 'Non-binary';
     } else if (value === 1) {
          return 'Female';
     } else if( value === 2) {
          return 'Male';
     } else {
          return 'Not set';
     }
}

export function displayPersonsDetail(person, top5) {

     //PartOne (IMG & basic information)
     const img = document.createElement('img');
     const info = document.createElement('div');
     const name = document.createElement('h1');
     const role = document.createElement('p');
     const birthday = document.createElement('p');
     const from = document.createElement('p');
     let genderP = document.createElement('p');
     let genderNumber = person.getGender();

     img.src = 'https://image.tmdb.org/t/p/w500' + person.getImg();
     info.classList.add('info');
     name.innerText = person.getName();
     role.innerText = person.getProfessionalRole();
     birthday.innerText = 'Birthday: ' + person.getBirthday();
     from.innerText = 'From: ' + person.getFrom();
     genderP.innerText = 'Gender: ' + gender(genderNumber);

     info.append(name, role, birthday, from, genderP);
     document.querySelector('.partOne').append(img, info);

     //PartTwo (Vilka filmer personen är känd för)
     const knownForText = document.createElement('h2');
     const workContainer = document.createElement('div');

     workContainer.classList.add('work');
     knownForText.innerText = 'Known for';
     document.querySelector('.partTwo').append(knownForText, workContainer);

     top5.forEach(movie => {
          const movieImg = document.createElement('img');
          const movieTitle = document.createElement('p');
          const card = document.createElement('div');
          movieImg.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
          movieTitle.innerText = movie.title;
          card.classList.add('card');

          card.append(movieImg, movieTitle);
          workContainer.append(card);
     });

     //PartThree (Biografi text)
     const biographyText = document.createElement('h2');
     const biography = document.createElement('p');
     biography.innerText = person.getBiography();
     biographyText.innerText = 'Biography';

     document.querySelector('.partThree').append(biographyText, biography);
}
