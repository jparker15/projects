//create a new User Interface that will allow users to select a date.



let currentDate = new Date();
    console.log(currentDate);

let dateInfo = {
     year: currentDate.getFullYear() , 
    month: currentDate.getMonth(), // using index numbering
    day: currentDate.getDate(),
    dayInMonths:[31,28,31,30,31,30,31,31,30,31,30,31],
    monArr:["January","February","March","April","May","June","July","August","September","October","November","December"]
}
//DAYS ARRAY/LOOP    
let count = 1, days = [];

while(count <= dateInfo.dayInMonths[dateInfo.month]){
    days.push(count)

    count++
}

//YEARS ARRAY/LOOP
let startYear = 1920, endYear = currentDate.getFullYear() ,years = [];

while(startYear <= endYear){
    years.unshift(startYear)

    startYear++
}
//console.log(years);




    // console.log(currentDate.getDay());
    // console.log(currentDate.getMonth());
    // console.log(currentDate.getFullYear());
    

// Function Calls
createInitial()
        //function to change dates via buttons or select
function testFunc(){
    //console.log("this:",this,"\nthis.value",this.value);
    
 let id = this.id;
    //console.log("this.id:",id);
        currDay = dateInfo.day,
        currMonth = dateInfo.month,
        currYear = dateInfo.year;

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
        if(dateInfo.day > dateInfo.dayInMonths[dateInfo.month]){
            dateInfo.day = dateInfo.dayInMonths[dateInfo.month]
        }
    
    
    // dateInfo.year = 1995;
    
    // console.log(dateInfo.year)


    // updates front end display onclick
    document.getElementById("dateHeading").innerText = getDateText()

    


    
    //console.log(this[0].value);

    //this.value = this[0].value;
}

//PREV/NEXT  FUNCTIONALITY

function nextDay (currDay,currMonth){
    
    if (currDay < dateInfo.dayInMonths[currMonth]){
        dateInfo.day++
    }

    else if (currDay == dateInfo.dayInMonths[currMonth] && currMonth != 12){
        dateInfo.day = 1;
        dateInfo.month++;
    }

    else if (currDay == dateInfo.dayInMonths[currMonth] && currMonth == 12){
        dateInfo.day = 1;
        dateInfo.month =1;
        dateInfo.year++
    }

}


function prevDay (currDay,currMonth){
    
    if (currDay > 1){
        dateInfo.day--
    }

    else if (currDay == 1 && currMonth != 1){
        dateInfo.day = dateInfo.dayInMonths[currMonth-2];
        dateInfo.month--;
    }

    else if (currDay == 1 && currMonth == 1){
        dateInfo.day = 31;
        dateInfo.month =12;
        dateInfo.year--
    }

}

function nextMonth (currMonth){

    if (currMonth < 11){
        dateInfo.month++
    }
    else if (currMonth == 11){
        
        
        dateInfo.month = 0
        dateInfo.year++
    }
}
function prevMonth (currMonth){

    if (currMonth > 0){
        dateInfo.month--
    }
    else if (currMonth == 0){
        dateInfo.month = 11;
        dateInfo.year--
    }
}
function nextYear (currYear){
    dateInfo.year ++
}
function prevYear (currYear){
    dateInfo.year --
}


function createInitial (){
    let initDiv = createDivElem({id:"initialDiv",class:"initDiv"}),
        
        monthDiv = createDivElem({id:"monthDiv",class:"dateDiv"}),
        dayDiv = createDivElem({id:"dayDiv",class:"dateDiv"}),
        yearDiv = createDivElem({id:"yearDiv",class:"dateDiv"});

    //initDiv.appendChild(createHeading({id:"demoHeading",text:"I title therefore I am"}))
    initDiv.appendChild(createHeading({id:"dateHeading",text:getDateText()}))

        document.body.appendChild(initDiv),

        initDiv.appendChild(monthDiv),
        initDiv.appendChild(dayDiv),
        initDiv.appendChild(yearDiv);

    monthDiv.appendChild(createButton({id:"prevMonth",class:"leftArwBtn",onClickFunc:testFunc}))
    monthDiv.appendChild(createButton({id:"nextMonth",class:"rightArwBtn",onClickFunc:testFunc}))
    let monthSelect =createSelect({id:"monthSelect",class:"dateSelect",defText:"Select a Month",arr:dateInfo.monArr})
        monthSelect.onchange = testFunc    
    monthDiv.appendChild(monthSelect);

    dayDiv.appendChild(createButton({id:"prevDay",class:"leftArwBtn",
    onClickFunc:testFunc}))
    dayDiv.appendChild(createButton({id:"nextDay",class:"rightArwBtn",
    onClickFunc:testFunc}))
    let daySelect = createSelect({id:"daySelect",class:"dateSelect",defText:"Select a Day",arr:days})
        daySelect.onchange = testFunc
    dayDiv.appendChild(daySelect);

    yearDiv.appendChild(createButton({id:"prevYear",class:"leftArwBtn",onClickFunc:testFunc}))
    yearDiv.appendChild(createButton({id:"nextYear",class:"rightArwBtn",onClickFunc:testFunc}))
    let yearSelect = createSelect({id:"yearSelect",class:"dateSelect",defText:"Select a Year",arr:years})
        yearSelect.onchange = testFunc
    yearDiv.appendChild(yearSelect)    
    // createHeading({id:"titleHeading",text:"I title therefore I am"})
    // createHeading({id:"titleHeading",text:`Month: ${monArr[currentDate.getMonth()]} / Day:${currentDate.getDate()} / Year:${currentDate.getFullYear()}`}) 

    createButton({id:"prevMonth",class:"leftArwBtn",onClickFunc:testFunc})

    createButton({id:"nextMonth",class:"rightArwBtn",onClickFunc:testFunc})

    createButton({id:"prevDay",class:"leftArwBtn",
    onClickFunc:testFunc})

    createButton({id:"nextDay",class:"rightArwBtn",
    onClickFunc:testFunc})

    createButton({id:"prevYear",class:"leftArwBtn",onClickFunc:testFunc})

    createButton({id:"nextYear",class:"rightArwBtn",onClickFunc:testFunc})
   
}

// returns a string from global JS Date object
function getDateText (){

    let dateText = dateInfo,
    
    day = dateInfo.day > 9 ? dateInfo.day : "0" + dateInfo.day,

    // month = dateInfo.monArr[dateInfo.month] > 9 ? dateInfo.month : "0" + dateInfo.month;
    month = dateInfo.monArr[dateInfo.month]

    console.log(dateInfo.monArr[dateInfo.month]);
    
    string = month + "/" + day + "/" + dateInfo.year;

    return string

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
      
      return heading
     
     
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

    return button
}

 function createSelect (selObj){
    let select = document.createElement("select");

    if(selObj.id != undefined && document.getElementById(selObj.id) == null){
        select.id = selObj.id;
    }
    if(selObj.class != undefined){
        select.className = selObj.class;
    }
    
    let defaultOpt = document.createElement("option")

    defaultOpt.innerText = selObj.defText == undefined ? "Select a Option": selObj.defText;
    defaultOpt.value = "";
    //displays nothing onchange
    defaultOpt.style.display = "none";

    //displays greyed out not selectable option
    //defaultOpt.disabled = true;

    select.appendChild(defaultOpt)

    if(selObj.arr != undefined){
        for(let i = 0; i < selObj.arr.length; i++){
        //console.log(i);
        
        const option = document.createElement("option");

        option.innerText = selObj.arr[i];

        option.value = selObj.arr[i];

        select.appendChild(option);

        }
    }

    if(selObj.onChangeFunc != undefined){
        selObj.onChangeFunc = select.onchange
    }

    return select
    
}

function createDivElem (divObj) {
    let div = document.createElement("div");

    if (divObj.id != undefined && document.getElementById(divObj.id) == null){
        div.id = divObj.id;
    }

    if (divObj.class != undefined){
        div.className = divObj.class;
    }

    return div
    
}

function checkLeapYear (year){
    console.log("test");
    
}