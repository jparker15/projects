//a random date from June 16th, 1995 to todays current date should be available as a random date

let date = new Date();

//console.log(date);


//random number from 0 - 9
let random = Math.floor(Math.random() * 10);

console.log(random);

let minYear = 1995;
let maxYear = new Date().getFullYear(); //2020

function randomYear (min, max){

  console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    
       
}

randomYear(minYear,maxYear)