export class Movie {
     #id
     #img
     #title
     #description
     #rating
     #releaseDate
     
     constructor(data){
          this.#id = this.#generateID;
          this.#img = data.poster_path;
          this.#title = data.title;
          this.#description = data.overview;
          this.#rating = data.vote_average;
          this.#releaseDate = data.release_date;
     }

     #generateID(){
          return Math.round(Math.random()*1000000);
     }

     getID(){
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


     setID(newID){
          this.#id = newID;
     }

     setTitle(newTitle){
          this.#title = newTitle;
     }

     setImg(newImg){
          this.#img = newImg;
     }

     setDescription(newDescription){
          this.#description = newDescription;
     }

     setRating(newRating){
          this.#rating = newRating;
     }

     setReleaseDate(newReleaseDate){
          this.#releaseDate = newReleaseDate;
     }

}