/*
 [] create buttons and heading elements

 [] set event listners -> create functions

    one function per button,
     update the date variable(s), 
      update the heading to reflect date var

 [] set heading textt to current date, store the current date in a variable

 [] track number of days in a month, how many months, what year

 [] 

*/

// GLOBAL VARIABLES

//let currentDate = "2020-04-06";
let currentDate = {year:2020,month:04,day:06};

// FUNCTION CALLS
createInitalElems()


// FUNCTIONS
function createInitalElems(){
    // create head elem
    //set properties

    createHeading({text:"just a string of the date APRIL 06 2020", id:"dateHead", size:1})

    //append to body
   // document.body.appendChild(dateHeading);

    // create all needed button elems
    // next-day, prev-day, next-month, prev-month, next-year

    createButton({id:"nextDay",class:"navBtns",text:"Next Day", onClickFunc: modifyDate});
    createButton({id:"prevDay",class:"navBtns",text:"Previous Day", onClickFunc: modifyDate}),
    createButton({id:"nextMonth",class:"navBtns",text:"Next Month", onClickFunc: modifyDate}),
    createButton({id:"prevMonth",class:"navBtns",text:"Previous Month", onClickFunc: modifyDate}),
    createButton({id:"nextYear",class:"navBtns",text:"Next Year", onClickFunc: modifyDate}),
    createButton({id:"prevYear",class:"navBtns",text:"Previous Year", onClickFunc: modifyDate});
    //document.body.appendChild(nextDay);
}

// modify the date variable depending on which button was clicked 

function modifyDate(){
    console.log(this);
    
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