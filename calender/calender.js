/*
 [] create buttons and heading elements

 [] set event listners -> create functions

    one function per button,
     update the date variable(s), 
      update the heading to reflect date var

 [] set heading textt to current date, store the current date in a variable

 [] track number of days in a month, how many months, what year

 [] 

 days in each month
    31,28,31,30,31,30,31,31,30,31,30,31
/*

[*] create my buttons along with on heading elm

[*] set my event listeners ->

     create function/s (one function for each button OR a function that can distiguish what button called the function)

    [] update the date variable/s 

        when it is determined what button was pressed..
        change the properties of the date object to reflect the request given by the client

    [] update the heading to reflect the date var

        after the date object is changed, the front-end should show the changes, 
        one may create a new function that is used to refresh the frontend 


[] set the heading text to the current date, store the current date in a variable

    [] create a function that will convert the object properties into a string formate,
       optional parameters would be the date formatting and the spacers between unit

[] track numbers of days in a month, and months in a year

[] when changing a time unit, other units should change accordingly
    *when the going forward a day on the last day of the month OR when going back a day on the first day of the month, the month and day should shift in accordance.
    *what if the date is March 31st and the user goes back one month? make sure there is never an impossible date showing to the client ie. Febuary 31st
    *when an impossible date occurs, the day should be set to the nearest 'real' date
        *** for example, if the current day is set to 3/31 and the user goes back one month, there are two possible ways to solve this correctly, one the date should go to 2/28 or 2/29 depending on the leap year, or consider if it were 2/31, what day would that be in march? well on a leap-year it would be march 2nd but on a non leap year it would be 3rd. If you want the challenge try to make it work the second way ***

days in each month
    31,28,31,30,31,30,31,31,30,31,30,31

*/


// GLOBAL VARIABLES

//let currentDate = "2020-04-06";
// let currentDate = {year:2020,month:04,day:06};
document.body.style.backgroundColor = "khaki";

let dateInfo = {

    year: 2020, 
    month: 5,
    day: 31,

    dayInMonths:[31,28,31,30,31,30,31,31,30,31,30,31]
};

// FUNCTION CALLS
createInitalElems()


// FUNCTIONS
function createInitalElems(){
    // create head elem
    //set properties
   

    createHeading({text:createTextFromDateObj(), id:"dateHead", size:1,color:"maroon"})

    //append to body
   // document.body.appendChild(dateHeading);

    // create all needed button elems
    // next-day, prev-day, next-month, prev-month, next-year

    // createButton({id:"nextDay",class:"navBtns",text:"Next Day", onClickFunc: modifyDate});
    // createButton({id:"prevDay",class:"navBtns",text:"Previous Day", onClickFunc: modifyDate}),
    // createButton({id:"nextMonth",class:"navBtns",text:"Next Month", onClickFunc: modifyDate}),
    // createButton({id:"prevMonth",class:"navBtns",text:"Previous Month", onClickFunc: modifyDate}),
    // createButton({id:"nextYear",class:"navBtns",text:"Next Year", onClickFunc: modifyDate}),
    // createButton({id:"prevYear",class:"navBtns",text:"Previous Year", onClickFunc: modifyDate});

    createButton({id: 'prevDay',   class: 'navBtns', text: 'Previous Day',   onClickFunc: modifyDate}),
    createButton({id: 'nextDay',   class: 'navBtns', text: 'Next Day',       onClickFunc: modifyDate}),
    
    createButton({id: 'prevMonth', class: 'navBtns', text: 'Previous Month', onClickFunc: modifyDate}),
    createButton({id: 'nextMonth', class: 'navBtns', text: 'Next Month',     onClickFunc: modifyDate}),
    
    createButton({id: 'prevYear',  class: 'navBtns', text: 'Previous Year',  onClickFunc: modifyDate}),
    createButton({id: 'nextYear',  class: 'navBtns', text: 'Next Year',      onClickFunc: modifyDate});
    //document.body.appendChild(nextDay);
}


//returns a string from the global 'dateInfo' js object
function createTextFromDateObj(separator) {

    let sep = separator != undefined ? separator : '-',

        dateObj = dateInfo,

        day = dateInfo.day > 9 ? dateInfo.day : '0' + dateInfo.day,

        month = dateInfo.month > 9 ? dateInfo.month : '0' + dateInfo.month,

        string = month + sep + day + sep + dateInfo.year;

        return string

}


// modify the date variable depending on which button was clicked 

function modifyDate(){
  // find out what button was clicked
    //console.log(this); // expect: html from which the function was called
    

    let id = this.id,
        currDay = dateInfo.day,
        currMonth = dateInfo.month,
        currYear = dateInfo.year;

    checkLeapYear(currYear);


    //preform a change on dateInfo based on the button pressed
    switch (id){
        case "nextDay": 
                nextDay(currDay,currMonth)
            
            break;
        case "prevDay":
                prevDay(currDay,currMonth)

            break;
        case "nextMonth":
                nextMonth(currMonth)

            break;
        case "prevMonth":
                prevMonth(currMonth)

            break;
        case "nextYear":
                nextYear(currYear)

            break;
        case "prevYear":
                prevYear(currYear)

            break;

    }


    //check for impossible dates
    if(dateInfo.day > dateInfo.dayInMonths[dateInfo.month-1]){
        dateInfo.day = dateInfo.dayInMonths[dateInfo.month-1]
    }


    document.getElementById('dateHead').innerText = createTextFromDateObj("-")
    // update the client/ front-end display
    
}

function nextDay (currDay,currMonth){
    //check what month it is, last day of that month
    //if on last day of month, if so go to nex month
    // is it Dec? if so go to next year 
    // if not on last day of month, increment by one day number
   // console.log(dateInfo);
   
                    //
    if (currDay < dateInfo.dayInMonths[currMonth-1] ){
        dateInfo.day++
    }
    else if (currDay == dateInfo.dayInMonths[currMonth-1] && currMonth != 12){ //at end of the month, but not end of the year
        dateInfo.day = 1;
        dateInfo.month++;

    }
    else if (currDay == dateInfo.dayInMonths[currMonth-1] && currMonth == 12){ // at the end of the month of december

        //jan 1st of the next year
        dateInfo.day = 1;
        dateInfo.month = 1;
        dateInfo.year++;

    }
//console.log(dateInfo);


    //if all is normal
    //dateInfo.day++
}

function prevDay (currDay,currMonth){
    // let currDay = dateInfo.day,
    //     currMonth = dateInfo.month;

    if (currDay > 1 ){

        dateInfo.day --
    }

    else if (currDay == 1 && currMonth != 1){
        dateInfo.day = dateInfo.dayInMonths[currMonth-2];
        dateInfo.month--
    }
    else if (currDay == 1 && currMonth == 1){
        dateInfo.day = 31;
        dateInfo.month = 12;
        dateInfo.year--
    }
}

function nextMonth (currMonth){
    //let currMonth = dateInfo.month;

    if (currMonth < 12){
        dateInfo.month++
    }
    else if(currMonth == 12){
        dateInfo.month = 1
        dateInfo.year++

    }
    else{
        console.log(`something has gone wrong ${dateInfo}`);
        
    }
}

function prevMonth (currMonth){
   // let currMonth = dateInfo.month;

    if (currMonth > 1){
        dateInfo.month--
    }
    else if(currMonth == 1){
        dateInfo.month = 12;
        dateInfo.year--

    }
    else{
        console.log(`something has gone wrong ${dateInfo}`);
        
    }
}

function nextYear (currYear){

    dateInfo.year++

}


function prevYear (currYear){

    dateInfo.year--

}

//??
function checkLeapYear (year){

    if(year % 4 == 0 && year % 100 != 0 ||year % 400 == 0 ){

        dateInfo.dayInMonths[1] = 29

    }
    else {
        dateInfo.dayInMonths[1] = 28
    }

}


// HTML ELEMENT CREATION FUNCTIONS 

function createHeading (headingObj){
    // ternary let heading = size >=1 && size <= 5 ? document.createElement("h" + size) : document.createElement("h4");
    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement("h" + headingObj.size): document.createElement("h3");
     // let importance = "h" + size,
     //  heading = document.createElement(importance);
 
     heading.innerText = (typeof headingObj.text == "string") ? headingObj.text: "no text";
     // heading.innerText = headingObj.text;
      heading.id = headingObj.id;
      if(headingObj.id != undefined && document.getElementById(headingObj.id) == null){
          heading.id = headingObj.id;
      }
      if (headingObj.class != undefined){
          heading.className = headingObj.class;
      }
      
      if(headingObj.color != undefined) {
          heading.style.color = headingObj.color;
      }
      
      document.body.appendChild(heading);
     
     
 }


 function createButton (buttonObj){
   let button = document.createElement("button");

   if(buttonObj.id != undefined && document.getElementById(buttonObj.id) == null){

    button.id = buttonObj.id;
    }

    if (buttonObj.class != undefined){

    button.className = buttonObj.class;
    }

    if (buttonObj.onClickFunc != undefined){
    
    button.onclick = buttonObj.onClickFunc;

    }
    if (buttonObj.text != undefined){
    
    button.innerText = buttonObj.text;

    }

    document.body.appendChild(button);
 }