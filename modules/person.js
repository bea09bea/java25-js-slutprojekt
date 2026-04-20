export class Person {
     #id
     #img
     #name
     #professionalRole
     #famousWork
     
     constructor(data){
          this.#id = data.id;
          this.#img = data.profile_path;
          this.#name = data.name;
          this.#professionalRole = data.known_for_department;
          this.#famousWork = this.#famousWork;
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