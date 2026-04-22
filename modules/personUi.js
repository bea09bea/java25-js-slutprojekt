//Här är grunden för det visuella för personer
//Alltså hur html är uppbyggd och hur datan från api används

export function displayPersons(persons, type) {
     persons.forEach(person => {
          createPersonCard(person, type);
     })
}

export function displayPopularPerson(person) {
     const container = document.querySelector('.person-container');

     person.forEach(p => {
          container.append(createPersonCard(p));
     })
}

export function displaySearchPersons(persons) {
     const container = document.querySelector('.personContainer');

     persons.forEach(person => {
          container.append(createPersonCard(person));
     })
}

function createPersonCard(person) {
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

     showMore.href = `./detail/detail.html?person=` + person.getId();

     return personCard;
}