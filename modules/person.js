export class Person {
     #id
     #img
     #name
     #professionalRole
     #famousWork
     #biography
     #birthday
     #from
     #gender
     
     constructor(data){
          this.#id = data.id;
          this.#img = data.profile_path;
          this.#name = data.name;
          this.#professionalRole = data.known_for_department;
          this.#famousWork = this.#famousWork;
          this.#biography = data.biography;
          this.#birthday = data.birthday;
          this.#from = data.place_of_birth;
          this.#gender = data.gender;
     }

     getID(){
          return this.#id;
     }

     getImg(){
          return this.#img;
     }

     getName(){
          return this.#name;
     }

     getProfessionalRole(){
          return this.#professionalRole;
     }

     getFamousWork(){
          return this.#famousWork;
     }

     getBirthday() {
          return this.#birthday;
     }

     getFrom() {
          return this.#from
     }

     getBiography() {
          return this.#biography;
     }

     getGender(){
          return this.#gender;
     }

     setID(newID){
          this.#id = newID;
     }

     setImg(newImg){
          this.#img = newImg;
     }

     setName(newName){
          this.#name = newName;
     }

     setProfessionalRole(newProfessionalRole){
          this.#professionalRole = newProfessionalRole;
     }

     setFamousWork(newRole){
          this.#famousWork = newRole;
     }
}