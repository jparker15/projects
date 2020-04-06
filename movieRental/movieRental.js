// an object with an array of movie titles to rent and some
// document.body.style.backgroundColor = "khaki";
// let heading = document.createElement("h2")
// heading.innerText = `I went to the store and got me some Vetements
// Some Pradas, Balenci', Balenci', Balenci'
// I spend it all on that lil' bitch
// Balenci', Balenci', Balenci', Balenci', Balenci'
// Balenci', Balenci', Balenci', Balenci', Balenci'
// Balenci', Balenci', Balenci', Balenci', Balenci'`
// document.getElementById("demo").appendChild(heading);
// let btn1 = document.getElementById("btn1")


let movieRental = {
    //properties
    // add in 10 new movies
    availableMovies: ["Jaws","Black Dynamite","Scarface","The Godfather","The Godfather Part II"],

    rentedMovies: ["A New Hope","The Empire Strikes Back","Return of the Jedi","Space Balls","Paid in Full"],



    // display available movies'
    // make similar method for rented movies

    displayAvailable () {
        console.log('_______________________\nMovies Currently Available:\n');
        for(let i = 0;i < this.availableMovies.length; i++){
            console.log(this.availableMovies[i]);
        }
    },
    displayRented () {
        console.log('_______________________\nMovies Currently Rented:\n');
        for(let i = 0; i < this.rentedMovies.length; i++){
            console.log(this.rentedMovies[i]);
            
        }
    },

    // //remove a random movie from avail and place into rented

    // rentMovie() {
    //     //Math is a global object that has properties that can be acessed
    //     //.random returns a decimal between 0 and 1 but always a number lower than 1
    //     //.floor rounds a number downward to nearest integer
    //     //. length is a number higher then the highest element of an array
    //     // randomIndex is a number from 0 - 4
        
        
    //     let randomIndex = Math.floor(Math.random() * this.availableMovies.length);

    //     // push add one or more elements to end of an array and RETURnS NEW LENGTH
    //     let ranMovie = this.availableMovies.splice(randomIndex,1);

    //     this.rentedMovies.push(ranMovie[0]);
    //     //this.rentedMovies.push(...ranMovie); rest parameter 
    //     //this.rentedMovies.push(ranMovie.flat());
        
    //     console.log(`RANDOM RENTAL \n${ranMovie[0]} has been rented`);
        
    //     return this.displayRented();
    // },
    // // remove a random movie from rented and push into avail

    // returnMovie() {
    //     let randomIndex = Math.floor(Math.random() * this.rentedMovies.length);

    //     let ranMovie = this.rentedMovies.splice(randomIndex,1);

    //     this.availableMovies.push(ranMovie[0]);
    //     console.log(`RANDOM RENTAL \n${ranMovie[0]} has been returned`);
        
    //     return this.displayAvailable();
    // },


returnMoviesByTitle(...movieTitles){
    //console.log(movieTitles);
    
    movieTitles.forEach( movieName =>{ //movie name will be equal to each element of the movieTitles array
         //forEach considers -1 as something != to the elements in rentedMovies array
            let elementIndex = this.rentedMovies.indexOf(movieName);
            
            // if (elementIndex != -1){
            // this.availableMovies.push(...this.rentedMovies.splice(elementIndex,1));

            // console.log(`You have returned ${movieName}`);
            // }
            // else {
            // console.log(`${movieName} was not found in our rented movies`);
            // }   
    
        console.log(elementIndex.toLowerCase());  
    });
    
},
rentMoviesByTitle(...movieTitles){
            movieTitles.forEach( movieName =>{
                let elementIndex = this.availableMovies.indexOf(movieName);
    
                if (elementIndex != -1){
                    this.rentedMovies.push(...this.availableMovies.splice(elementIndex,1));
                    console.log(`You have rented ${movieName}`);
                    
                }
                else{
                    console.log(`${movieName} has already been rented`);
                    
                }
            });
        
    
},

// .

    // rentAMovieByTitle(movieTitle) {
    //     // if selectMovie is declared outside of if/else if statements code breaks?
    //     for (let i = 0; i < this.availableMovies.length; i++) {
    //         if (movieTitle === this.availableMovies[i]){
    //             let selectMovie = this.availableMovies.splice(i,1);
    //             console.log(`This is movie is available`, i);
    //             this.rentedMovies.push(selectMovie[0]);

    //             return this.displayRented();
    //         }
    //          else if (movieTitle === this.availableMovies[i].toString().toUpperCase()){
    //             let selectMovie = this.availableMovies.splice(i,1); 
    //             this.rentedMovies.push(...selectMovie)
    //              return this.displayRented();
    //         }
    //         else if (movieTitle === this.availableMovies[i].toString().toLowerCase()){
    //             let selectMovie = this.availableMovies.splice(i,1);
    //             this.rentedMovies.push(...selectMovie)
    //             return this.displayRented();
    //         }
    //     }
    //     console.log("This movie is currently not available");
    // },
    // // rest operator
    // returnAMovieByTitle(...movieTitle) {
        
    //     for (let i = 0; i < this.rentedMovies.length; i++) {
    //         if (movieTitle[i] === this.rentedMovies[i]){
    //             console.log(`${this.rentedMovies[i]} has been returned`,i);
    //             let selectMovie = this.rentedMovies.splice(i,1);
    //             //SPREAD OPERATOR or use index 0
    //             this.availableMovies.push(...selectMovie);
    //             return this.displayAvailable();
    //         }
    //         else if (movieTitle === this.rentedMovies[i].toString().toUpperCase()){
    //             console.log(`${this.rentedMovies[i]} has been returned`, i);
    //             let selectMovie = this.rentedMovies.splice(i,1);
    //             this.availableMovies.push(selectMovie[0]);
    //             return this.displayAvailable();
    //         }
    //         else if (movieTitle === this.rentedMovies[i].toString().toLowerCase()){
    //             console.log(`${this.rentedMovies[i]} has been returned`, i);
    //             let selectMovie = this.rentedMovies.splice(i,1);
    //             this.availableMovies.push(...selectMovie);
    //             return this.displayAvailable();
    //         }
    //     }
    //     console.log(`This movie is not currently available`);
        
    // },
    // returnMovies(...movieTitle){
    //     for (let i = 0; i < this.rentedMovies.length; i++) {
    //         for (let j = 0; j < movieTitle.length; j++) {
    //              if (movieTitle[j] === this.rentedMovies[i]){
    //             console.log(`${movieTitle[i]} has been returned`)
    //             let selectMovie = this.rentedMovies.splice(i,1);
    //             this.availableMovies.push(...selectMovie);
    //             return this.displayAvailable();
    //             }
    //          }   
    //     }
    // }
}

movieRental.createHeadingElem = (param,param2,parma3) => {

};


// if isOrdered is true make an ordered list, otherwise make the list unordered
movieRental.createListElm = (isOrdered, listData, listID) => {
    //Conditional (ternary) operator
    let list = isOrdered === true ? document.createElement("ol") : document.createElement("ul");

    // if (isOrdered) {
    //     list = document.createElement("ol");
    //     console.log("ordered");
        
    // }
    // else{
    //     list = document.createElement("ul");
    //     console.log("unordered");
        
    // }



    if (listID != undefined && document.getElementById(listID) == null){
        list.id = listID;
    }
    for (let i = 0; i < listData.length; i++) {
        let listElem = document.createElement("li");
        listElem.innerText = listData[i];
        list.appendChild(listElem);

        
    }
    console.log(list);
    return list
}
//METHOD CALLS
movieRental.displayRented()
movieRental.returnMoviesByTitle("A New Hope","The Empire Strikes Back","Return of the Jedi")
//movieRental.createListElm(true,movieRental.availableMovies);
//you can access the body element from javascript via document.body

/**as of March 17 add return/rent MULTIPLE MOVIES by title and case insentivve
 * 
 * create displays for avail and rented methods
 * create element methods for heading, paragraph,etc.
 * only have display methods inside movieRental object
 * METHOD CALLS BELOW METHODS MADE and order of the method call is IMPORTANT
 * make methods outside object i.e. line 183
 */
