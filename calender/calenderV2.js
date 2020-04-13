let dateRightNow = new Date();

    console.log(dateRightNow);
    

let dateInfo = {

    year: dateRightNow.getFullYear(), 
    month: dateRightNow.getMonth(), // using index numbering
    day: dateRightNow.getDate(),

    dayInMonths:[31,28,31,30,31,30,31,31,30,31,30,31]
};
    //now a global var
let monArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]

// console.log(dateInfo.dayInMonths);

createInitial()

function createInitial (){
    //create heading elem, btn, selects (year,month)
    // date heading elem

    createHeading({id:"dateHeading", text:"", size:1})
    //create heading & button append to body create select returns select

    //start button

    createButton({id:"startSelect", text:"Select A Date", onClickFunc: startSelect})
    // selects (years 1920-2020/ month 1 -12)

    let startYear = 1920, endYear = 2020,
        yearArr = [];
        // monArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        while (startYear <= endYear){
            yearArr.unshift(startYear)
            startYear ++
        }
        //select YEARS
    let select = createSelect({id:"yearSelect",arr:yearArr,defText:"Select a Year"});
        select.onchange = selectYear;

        select.style.display = "none"

        document.body.appendChild(select);
        //select MONTHS    
    let selectMon = createSelect({id:"monthSelect",arr:monArr,defText:"Select a Month"});
        selectMon.onchange = selectMonth;

        selectMon.style.display = "none"

        document.body.appendChild(selectMon);

}

    //onClick for startSelection button
function startSelect(){

    document.getElementById("yearSelect").style.display = "inline";

    document.getElementById("startSelect").style.display ="none";
    
}
    //onChange for year Select
function selectYear(){
    console.log(this.value);

    dateInfo.year = this.value
    //console.log(dateInfo.year);

    this.value = this[0].value;
    console.log(this.value);
    
    

    document.getElementById("yearSelect").style.display = "none"

    document.getElementById("monthSelect").style.display = "inline"

    
}
    //when month is selected by user
function selectMonth(){
    console.log(this.value);

    // this.value = this[0].value;

    dateInfo.month = monArr.indexOf(this.value);
    //prevents Month select default option from being selectable breaking the days select
    this.value = this[0].value

    let count = 1, days = [];

    while(count <= dateInfo.dayInMonths[dateInfo.month]){
        days.push(count)

        count++
    }

    //console.log(days); create day select elem

    let daySelect = createSelect({id:"daySelect",arr:days,defText:"Select a Day"})

        daySelect.onchange = selectDay;

        document.body.appendChild(daySelect);
    

    document.getElementById("monthSelect").style.display = "none"

    document.getElementById("daySelect").style.display - "inline"

    
    
}

function selectDay(){
    console.log(this.value);
    
    dateInfo.day = this.value

    this.style.display = "none";

    document.getElementById("dateHeading").innerText = `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}`

    document.getElementById("startSelect").style.display = "initial"
    document.getElementById("startSelect").innerText = "Select Another Date"

    if(document.getElementById("daySelect") != null){
        document.body.removeChild(daySelect)
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

    select.appendChild(defaultOpt)

    for(let i = 0; i < selObj.arr.length; i++){
        //console.log(i);
        
        const option = document.createElement("option");

        option.innerText = selObj.arr[i];

        option.value = selObj.arr[i];

        select.appendChild(option);
     
        
    }

    return select
    
}