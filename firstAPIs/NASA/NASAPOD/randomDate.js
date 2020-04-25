//a random date from June 16th, 1995 to todays current date should be available as a random date

let date = {
  fullDate:new Date(),
  year:new Date().getFullYear(),
  month:new Date().getMonth() + 1, //zero based numbering
  day:new Date().getDate(),
  dayInMonths:[31,28,31,30,31,30,31,31,30,31,30,31]

}

//console.log(date);

//random number from 0 - 9
let random = Math.floor(Math.random() * 10);

// console.log(random);

let minYear = 1995;
let maxYear = new Date().getFullYear(); //2020


//FUNCTION CALLS

//  randomYear(minYear,maxYear);
// randomMonth(1,12);
// randomDay (1,date.dayInMonths[date.month - 1]);

randomDate();
console.log(date);


function randomDate () {
  
 randomYear(minYear,maxYear);
 randomMonth(1,12);
 randomDay (1,date.dayInMonths[date.month - 1]);
}


// random year between 1995 & 2020
function randomYear (min, max){

  //date.year = 2016;
  date.year = (Math.floor(Math.random() * (max - min + 1)) + min);
  //console.log(date);
  
    
       
}



//random month between 1 - 12

function randomMonth (min,max){

  //June 16th, 1995 first day of APOD only months after june set minimum range to 6 

  if (date.year == 1995){
    min = 6;
  }
  // check for leap year 
  //date.month = 2

  date.month = (Math.floor(Math.random() * (max - min + 1)) + min);
  //console.log(date);
  
}

//console.log(date.dayInMonths[date.month - 1]);


//random day between 1 - 31
function randomDay (min,max){
  // sets day range from 16th to 31st
  if (date.year == 1995 && date.month == 6){
    min = 16;
  }

  // set days for each month 
  if (date.month == date.dayInMonths[date.month - 1]){
    max = date.dayInMonths[date.month - 1];
    
  }


  // account for leap years 

  

  if (leapYear(date.year) == true && date.month == 2){

    date.dayInMonths[date.month -1 ] = 29;

  }
  
 // console.log(date.dayInMonths);
  

  date.day = (Math.floor(Math.random() * (max - min + 1)) + min);
  //console.log(date);
  
}


function leapYear(year){

 if ( ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ){

  return true;
 }

 else {

   return false;
 
 }
   
}