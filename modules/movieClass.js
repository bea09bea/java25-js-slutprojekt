export class Movie {
     #id
     #img
     #title
     #description
     #rating
     #releaseDate
     #genre
     
     constructor(data){
          this.#id = data.id;
          this.#img = data.poster_path;
          this.#title = data.title;
          this.#description = data.overview;
          this.#rating = data.vote_average;
          this.#releaseDate = data.release_date;
          this.#genre = data.genre;
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

     getDescription(){
          return this.#description;
     }

     getRating(){
          return this.#rating;
     }

     getReleaseDate(){
          return this.#releaseDate;
     }
}