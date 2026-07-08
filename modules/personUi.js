import {personWork} from "./api.js";

//Här är grunden för det visuella för personer
//Alltså hur html är uppbyggd och hur datan från api används

export async function initSlider(containerSelector, items, createCardFn) {
    const container = document.querySelector(containerSelector);

    const track = container.querySelector('.slider-track');
    const next = container.querySelector('.slider-btn.next');
    const prev = container.querySelector('.slider-btn.prev');

    let index = 0;
    const visibleCards = 3;

    track.innerHTML = '';

    const cards = await Promise.all(
        items.map(item => createCardFn(item))
    );

    cards.forEach(card => {
        card.classList.add('slider-card');
        track.append(card);
    });

    const total = cards.length;

    function update() {
        const first = track.children[0];
        if (!first) return;

        const cardWidth = first.offsetWidth + 20;
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


export function displayPersons(persons) {
     initSlider('.popularPerson-slider', persons, createPersonCard);
}

/* export function displayPersons(persons, type) {
     persons.forEach(person => {
          createPersonCard(person, type);
     })
} */

export async function displayPopularPerson(persons) {
 /*     const container = document.querySelector('.person-container');

     container.innerHTML = '';

     const cards = await Promise.all(
        persons.map(p => createPersonCard(p))
    );

     cards.forEach(card => container.append(card)); */
          initSlider('.popularPerson-slider', persons, createPersonCard);

}

export function displaySearchPersons(persons) {
     /* const container = document.querySelector('.personContainer');

     persons.forEach(person => {
          container.append(createPersonCard(person));
     }) */

     const track = document.querySelector('.search-person-slider .slider-track');

     track.innerHTML = '';

     persons.forEach(p => {
          track.append(createPersonCard(p));
     });
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