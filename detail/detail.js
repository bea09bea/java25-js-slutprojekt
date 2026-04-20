import { fetchUrl } from "../modules/api";

const params = new URLSearchParams(window.location.search);
const personId = params.get('person');
const movieId = params.get('movie');

if (movieId) {
     loadMovieDetails(movieId);
} 

if (personId) {
     loadPersonDetails(personId);
} 

async function loadPersonDetails(id) {
     const url = `https://api.themoviedb.org/3/person/${id}`;
     const data = await fetchUrl(url);

     console.log(data);
}