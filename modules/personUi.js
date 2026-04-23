import {personWork} from "./api.js";

//Här är grunden för det visuella för personer
//Alltså hur html är uppbyggd och hur datan från api används

export function displayPersons(persons, type) {
     persons.forEach(person => {
          createPersonCard(person, type);
     })
}

export async function displayPopularPerson(persons) {
     const container = document.querySelector('.person-container');

     container.innerHTML = '';

     const cards = await Promise.all(
        persons.map(p => createPersonCard(p))
    );

     cards.forEach(card => container.append(card));
}

export function displaySearchPersons(persons) {
     const container = document.querySelector('.personContainer');

     persons.forEach(person => {
          container.append(createPersonCard(person));
     })
}

async function createPersonCard(person) {
     const personCard = document.createElement('div');
     const img = document.createElement('img');
     const name = document.createElement('p');
     const professionRole = document.createElement('p');
     const knownFor = document.createElement('ul');
     const famousWork = document.createElement('ul');
     const showMore = document.createElement('a');

     personCard.classList.add('personCard');
     img.src = 'https://image.tmdb.org/t/p/w500' + person.getImg();
     name.innerText = person.getName();
     professionRole.innerText = person.getProfessionalRole();
     knownFor.id = 'knownFor';
     knownFor.innerText = 'Known for: ';
     const work = await personWork(person.getId());
     work.slice(0, 3).forEach(w => {
     const p = document.createElement('li');
     p.innerText = w.title; 
     knownFor.append(p);
     });

     showMore.innerText = 'Show more';
     personCard.append(img, name, professionRole, knownFor, famousWork, showMore);

     showMore.href = `./detail/detail.html?person=` + person.getId();

     return personCard;
}