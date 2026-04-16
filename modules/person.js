export class Person {
     #id
     #img
     #name
     #professionalRole
     #knownFor
     
     constructor(img, name, professionalRole, knownFor){
          this.#id = this.#generateID;
          this.#img = img;
          this.#name = name;
          this.#professionalRole = professionalRole;
          this.#knownFor = knownFor;
     }

     #generateID(){
          return Math.round(Math.random()*1000000);
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

     getKnownFor(){
          return this.#knownFor;
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

     setKnownFor(newRole){
          this.#knownFor = newRole;
     }
}