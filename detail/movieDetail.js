const params = new URLSearchParams(window.location.search);
const movieId = params.get('movie');

if (movieId) {
     loadMovieDetails(movieId);
} 

function displayMovie(movie) {
     const img = document.createElement('img');
     const info = document.createElement('div');
     const title = document.createElement('h1');

     const genre = document.createElement('p');
     const rating = document.createElement('p');
     const releaseDate = document.createElement('p');
}