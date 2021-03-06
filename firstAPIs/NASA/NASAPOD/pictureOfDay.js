let dateInfo = {
    year:new Date().getFullYear(),
    month:new Date().getMonth() + 1,
    day:new Date().getDay(),
    dayInMonths:[31,28,31,30,31,30,31,31,30,31,30,31]
},

myKey = "umxMJFucQ3BuorALUJPPW47Zs7osVQ5Pu0tX0TdK";



window.onload = () => {

    let heading = createHeading({
        size: 2,
        text: `Welcome to Nasa's Photo Of The Day`,
        id: 'headingID'
    });

    let mainDiv = createDivElem({id:"mainDiv"}),

        nasaDiv = createDivElem({id:"nasaPOTD"});

        document.body.appendChild(mainDiv);
        document.body.appendChild(nasaDiv);

     // make the first NASA req to get todays picture

     // make the button elm, make the year select elm

     let startSelectBtn = document.createElement("button");
     let randomBtn = document.createElement("button");

     startSelectBtn.id = "startSelBtn";
     randomBtn.id = "randomBtn";

     startSelectBtn.innerText = "Select A Date";
     randomBtn.innerText = "Select A Random Date";

     startSelectBtn.onclick = startSelection;
      randomBtn.onclick = randomDate;

     mainDiv.appendChild(heading);
     mainDiv.appendChild(startSelectBtn);
     mainDiv.appendChild(randomBtn);

     // create year select elem

    let startyear =1995,endyear = 2020, yearArr = [];

    while (startyear <= endyear) {
        yearArr.unshift(startyear)
        startyear++

    }
    console.log(yearArr);
    

    let yearSelect = createSelect({
        defText:"Select a Yaer",
        arr:yearArr,
        id:"yearSelect",
        onchangeFunc:yearSelected
    });

    mainDiv.appendChild(yearSelect);

    yearSelect.style.display = "none";

    reqPicOfDay()

}

//functions for selecting a date

function startSelection (){
    //console.log(this);

    this.style.display = "none"; //hides buttons without deleting it 

    let yearSel = document.getElementById("yearSelect");

        yearSel.style.display = "initial";
    
}

function yearSelected () {
    // extract the year that was selected
    console.log(this.value);
    let year = this.value;
    
    //set the year property of the date object
    dateInfo.year = year;
    // hide the year select
    this.style.display = "none"

    // create the month select
   
    let monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];

    if (year == 1995) {

        monthArr.splice(0,5);

        console.log(monthArr);
    
    }
    else if (year == new Date().getFullYear()){
        let currentMonth = new Date().getMonth() + 1;

        monthArr.splice(currentMonth,12);

        console.log(monthArr);
        
    }

    if(document.getElementById("monthSelect") != null){
        let child = document.getElementById("monthSelect");

        document.getElementById("mainDiv").removeChild(child)
    }

    let monthSelect = createSelect({
        id:"monthSelect",
        defText:"Select A Month",
        onchangeFunc:monthSelected,
        arr:monthArr
    });

    document.getElementById("mainDiv").appendChild(monthSelect);
}

function monthSelected(){
    //extract value from select
    let month = this.value;
    console.log(month);
    

    //set the month property of date obj
    

    dateInfo.month = month;

    this.style.display = "none";

    //creat the day select elm    

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    let daysArr = [],count = 0;
    console.log(new Date().getMonth() +1, month );


    while (daysInMonth[month -1] > count){
        count++
        daysArr.push(count)
    }

    if (dateInfo.year == 1995 && month == 6){
        daysArr.splice(0,15)
    }
    
    
    else if (dateInfo.year == new Date().getFullYear() && month == new Date().getMonth() +1 ){
        console.log(daysArr.splice( new Date().getDate(),daysArr.length - 1));
        
        daysArr.splice( new Date().getDate(), daysArr.length - 1)
    }

    if (document.getElementById("daySelect") != null){
        let child = document.getElementById("daySelect");

        
         document.getElementById("mainDiv").removeChild(child);
    }
    

    let daySelect = createSelect({
        id:"daySelect",
        arr:daysArr,
        defText:"Select A Day",
        onchangeFunc:daySelected

    })

    document.getElementById("mainDiv").appendChild(daySelect);
}

function daySelected(){
    //extract value
    console.log(this.value);
    let day = this.value;
    //set day property of date Info obj

    dateInfo.day = day;
    // remove day select
    this.style.display = "none";

        //allows program to loop and pick another date
    document.getElementById('startSelBtn').style.display = "initial";
    //fixes bug that allows the default option to be selected on second use
    document.getElementById('yearSelect').value = "";
    // log final date

    console.log(`${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);
    //call API

    reqPicOfDay()
    
}

//RANDOM DAY FUNCTION

  let minYear = 1995;
  let maxYear = new Date().getFullYear();   

  


function randomDate () {
  
 randomYear(minYear,maxYear);
 randomMonth(1,12);
 randomDay (1,dateInfo.dayInMonths[dateInfo.month - 1]);
 console.log(dateInfo);
 reqPicOfDay()
 
}

function randomYear (min, max){

    //date.year = 2016;
    dateInfo.year = (Math.floor(Math.random() * (max - min + 1)) + min);
    //console.log(date);
    
      
         
  }

  function randomMonth (min,max){

    //June 16th, 1995 first day of APOD only months after june set minimum range to 6 
  
    if (dateInfo.year == 1995){
      min = 6;
    }
    // check for leap year 
    //date.month = 2
  
    dateInfo.month = (Math.floor(Math.random() * (max - min + 1)) + min);
    //console.log(date);
    
  }function randomDay (min,max){
    // sets day range from 16th to 31st
    if (dateInfo.year == 1995 && dateInfo.month == 6){
      min = 16;
    }
  
    // set days for each month 
    if (dateInfo.month == dateInfo.dayInMonths[dateInfo.month - 1]){
      max = dateInfo.dayInMonths[dateInfo.month - 1];
      
    }
  
  
    // account for leap years 
  
    
  
    if (leapYear(dateInfo.year) == true && dateInfo.month == 2){
  
      dateInfo.dayInMonths[dateInfo.month -1 ] = 29;
  
    }
    
   // console.log(date.dayInMonths);
    
  
    dateInfo.day = (Math.floor(Math.random() * (max - min + 1)) + min);
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


// XHR FUNCTION
function reqPicOfDay (){

    const day = dateInfo.day < 10 ? "0" + dateInfo.day: dateInfo.day,
          month = dateInfo.month <10 ? "0" + dateInfo.month :dateInfo.month,
          date = `${dateInfo.year}-${month}-${day}`;

    let xhr = new XMLHttpRequest(),
        method = "GET",
        endpoint = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${date}&hd=true`;
    


        xhr.open(method, endpoint ,true);
        

        xhr.onload = () => {

            let response = JSON.parse(xhr.responseText);

            console.log(response);

            displayApod(response);

            
        }

        xhr.send();
}



function displayApod (data){

    let nasaPOTD = document.getElementById('nasaPOTD')

    if (data.code != undefined){

        alert(`Error Code: ${data.code}\nError Message:${data.msg}`)

        console.log(data.code,data.msg);
        
    }
    
    else if(data.media_type == 'video'){

        alert(`The media type was a video check the console log to get a link`)

        console.log(`Video Link ${data.url}`);
        

    }

    else{
        nasaPOTD.innerHTML = '';

        let img = document.createElement("img");

            img.src = data.hdurl;

            img.alt = "loading image";

        let title = createHeading({size:4,text:data.title})

        let div = document.createElement("div");

        let explain = createPtag({text:data.explanation,id:"exp"});

        let copyrightOwner = data.copyright == undefined ? "Public Domain" : "©" + data.copyright;

        let copyrightText = createHeading({size:5,text:copyrightOwner});

        nasaPOTD.appendChild(div);
        nasaPOTD.appendChild(title);
        nasaPOTD.appendChild(copyrightText);

        div.appendChild(img);
        div.appendChild(explain);

        img.onload = () => {
            explain.style = `transform:translate(-50%, ${- img.clientHeight}px );`;
            explain.style.display = "block";
        }
    }

}

// element creation

function createPtag (paraObj){
    let pTag = document.createElement("p")

    if(paraObj.text != undefined){
        pTag.innerText = paraObj.text;
    }
    if (paraObj.align != undefined){
        pTag.align = paraObj.align;
    }

    return pTag
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

    // ONCHANGE

    select.onchange = selObj.onchangeFunc != undefined ? selObj.onchangeFunc : undefined;

    return select
    
}

function createHeading (headObj){

    let  heading = headObj.size >= 1 && headObj.size <= 5 ? document.createElement("h" + headObj.size): document.createElement("h2");

    
    if (headObj.id != undefined && document.getElementById(headObj.id) == null){
        heading.id = headObj.id
    }

    if (headObj.text != undefined){

        heading.innerText = headObj.text;
    }

    return heading
        
}