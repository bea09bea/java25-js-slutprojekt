export class Movie {
     #id
     #img
     #title
     #overview
     #rating
     #releaseDate
     #genre
     #description
     
     constructor(data){
          this.#id = data.id;
          this.#img = data.poster_path;
          this.#title = data.title;
          this.#rating = data.vote_average;
          this.#releaseDate = data.release_date;
          this.#genre = data.genres;
          this.#description = data.description;
          this.#overview = data.overview;
     }

     getId(){
          return this.#id;
     }

     getTitle(){
          return this.#title;
     }

     getImg(){
          return this.#img;
     }

     getOverview(){
          return this.#overview;
     }

     getRating(){
          return this.#rating;
     }

     getReleaseDate(){
          return this.#releaseDate;
     }

     getGenre() {
          return this.#genre;
     }

     getDescription() {
          return this.#description;
     }
}