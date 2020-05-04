let OWApiKey = `1d2c94df8e139aafee899c78388a7063`,
    MSApiKey = `LDlbvkBV`,
    userSelectedDate = false;

//Date selection data
let dateInfo = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() +1,
    day: new Date().getDate(),
}


let yearArr = Array.from({ length: dateInfo.year + 1}, (a,b) => b).slice(dateInfo.year - 25).reverse();
console.log(yearArr);



//setup of initial htmls elems divs, inputs, btns 
window.onload = () => {

    let initDiv = document.createElement("div");
        initDiv.id = "initDiv";
        // hold all user interface based elements 
    let uiDiv = document.createElement("div");
        uiDiv.id = "uiDiv";
    let copyrightDiv = document.createElement("div");
        copyrightDiv.id = "copyrightDiv";
        copyrightDiv.innerHTML =`Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.`;
    let infoDiv = document.createElement("div");
        infoDiv.id = "infoDiv";


    let header = document.createElement("h1");
        header.innerText = "Current/Historical Weather";

    let currentDay = document.createElement("h3");
        currentDay.innerText = "Current Time:" + new Date;

    let userInput = document.createElement("input");
        userInput.id = "userInput";
        userInput.placeholder = "Enter a City or Zip Code";
        
        uiDiv.appendChild(userInput);
    
    let submitBtn = document.createElement("button");
        submitBtn.id = "submitBtn";
        submitBtn.innerText = "Get Current Weather";
        submitBtn.onclick = reqCurrentWeather;

        //input now runs submit button onclick function when Enter key is pressed 
    //    if (submitBtn.style.display == "none"){
    //       userInput.addEventListener("keyup",function(event){
    //         if(event.keyCode === 13){
    //             document.getElementById("submitBtn").click();
    //         }
    //     }) 
    //    }
        


    let histSubBtn = document.createElement("button");
        histSubBtn.id = "histBtn";
        histSubBtn.innerText = "Get Historic Weather"
        histSubBtn.onclick = reqStation
        histSubBtn.style.display = "none";


    let toggleBtn = document.createElement("button");
        toggleBtn.id = "toggle";
        toggleBtn.innerText = "Click Me"
        toggleBtn.onclick = toggle;


        uiDiv.appendChild(submitBtn);
        uiDiv.appendChild(histSubBtn);


    let historySelect = createSelect({
        id:"historySelect",
        onchangeFunc:yearSelected,
        defText:"Select a Year",
        arr:yearArr
    })
    // let historySelect = document.createElement("select");
    //     historySelect.id = "historySelect";
    //     historySelect.onchange = reqStation;
    // let hsDefOpt = document.createElement("option");
    //     hsDefOpt.innerText = "Select a Year"
    //     hsDefOpt.value = "";
        historySelect.style.display = "none";
    //     historySelect.appendChild(hsDefOpt);
        uiDiv.appendChild(historySelect);
        uiDiv.insertBefore(historySelect,userInput);




    initDiv.appendChild(header);
    initDiv.appendChild(currentDay);
    initDiv.appendChild(uiDiv);
    initDiv.appendChild(toggleBtn);
    initDiv.appendChild(infoDiv);
    initDiv.appendChild(copyrightDiv);
    document.body.appendChild(initDiv);
}

// allow users to toggle between current and history user inputs
function toggle (){
    //console.log(this);
    let submitBtn = document.getElementById("submitBtn");

    let histBtn = document.getElementById("histBtn");

    let historySelect = document.getElementById("historySelect");

    let userInput = document.getElementById("userInput");
        //current weather is display select is not 
    if (submitBtn.style.display != "none" && historySelect.style.display === "none"){
        console.log("History UI");
        //this.innerText = "Click to Get History Weather"
         
        submitBtn.style.display = "none";
       histBtn.style.display = "inline-block";
       historySelect.style.display = "initial";
       userInput.placeholder = "Enter a City Name";
        
    }
    else {
        console.log(" Current UI");
       
        
        submitBtn.style.display = "inline-block";
        histBtn.style.display = "none";
        historySelect.style.display = "none";
        userInput.placeholder = "Enter a City or Zip Code"
        
        


    }
    
}

//XHR REQS
//openweather api 
function reqCurrentWeather (){

    const userInput = document.getElementById("userInput").value.trim();
    let infoDiv = document.getElementById("infoDiv");

    let numbers = /[0-9]/g;
    let alphanumeric = /[A-z]/;

    let query;
   
    //console.log(userInput.value);
    //Data sanization 

    if (userInput.length < 3 || userInput.length > 30){
        alert(`Entry must be more then two (2) characters less then thirty (30) characters.`);
        return;
    }
    else if (numbers.test(userInput) && alphanumeric.test(userInput)){
        alert("Entry can not have numbers and letters");
        return;
    }
    else if (!alphanumeric.test(userInput) && userInput.match(numbers).length === 5){
        query = `zip=${userInput}`;

      //zip code is 5 characters  
    }
    else if (alphanumeric.test(userInput)){
        //city name has only letters no special characters
        query = `q=${userInput}`;
    }

    else {// invalid string
        return alert("Entry is not a valid entry try again")
        
    }

    let xhr = new XMLHttpRequest(),
        reqMethod = "GET",
        endpoint = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${OWApiKey}&units=imperial`,
        asyncBool = true;
 
        xhr.open("GET",endpoint,true);


        xhr.onload = () => {
            let parsedData = JSON.parse(xhr.responseText);

                console.log(parsedData);
                //error alert if user input is not found
                if(parsedData.cod == 404){
                    console.log(parsedData.cod, parsedData.message);

                    alert(`${parsedData.cod}\n${parsedData.message}`)
                    
                }
                console.log(infoDiv);
                
            
                

        }

        xhr.send();
    
    
}
// Meteostat
function reqStation () {
   
    let station = document.getElementById("userInput").value.trim(),

        infoDiv = document.getElementById("infoDiv"),
                    //regex to excluded numbers from input
        numbers = /[0-9]/;

        // sanitizes user input before XHR

        if(station.length < 3 || station.length > 40 || numbers.test(station) ){
            alert("City Name Can Not Be Less then 3 Characters or\nMore then 40 Characters\nNo Numbers")
            return
        }



    let xhr = new XMLHttpRequest();


    //https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}
    const endpoint = `https://api.meteostat.net/v1/stations/search?q=${station}&key=${MSApiKey}`;

        xhr.open("GET",endpoint,true);

        xhr.onload = () => {

            let parsedData = JSON.parse(xhr.responseText)
                console.log(parsedData);
            
            if (parsedData.data.length == 0){
                alert(`No stations were found, please try again`)
            }   //case of only one station 2nd xhr to Meteostat API for historic data
            else if (parsedData.data.length == 1){
                
                let stationObj = parsedData.data[0];

                    stationObj.name = `${stationObj.name}, ${stationObj.country}`;

                    reqHistData(stationObj)

            }
            else {  //user must select a station before continuing request

               let select = document.createElement("select");

               let defaultOpt = document.createElement("option");

                    defaultOpt.innerText = "Select A Weather Station";

                    defaultOpt.value = "";
               
               select.appendChild(defaultOpt);

               for (let i = 0; i < parsedData.data.length; i++) {
                   
                let stationOpt = document.createElement("option");
                    stationOpt.innerText = `${parsedData.data[i].country}, ${parsedData.data[i].name}`;
                    stationOpt.value = parsedData.data[i].id;
                
                select.appendChild(stationOpt);}
                select.id = "stationSelect";

                select.onchange = () => {

                    let stationSelect = document.getElementById("stationSelect");

                    let stationObj = {
                        id:stationSelect.value,
                        name: stationSelect.options[stationSelect.selectedIndex].text
                    }
                    reqHistData(stationObj);        
                
            }

                if (document.getElementById("stationSelect")!= null){
                    document.getElementById("stationSelect").remove()
                }
                document.getElementById("uiDiv").appendChild(select)
                document.getElementById("uiDiv").insertBefore(select,userInput)


            }

        };

        xhr.send();
    
}

function reqHistData (stationObj){
    
    let xhr = new XMLHttpRequest(); 

    let month = dateInfo.month > 9 ? dateInfo.month : "0" + dateInfo.month,
    day = dateInfo.day > 9 ? dateInfo.day : "0" + dateInfo.day,

    start = `${dateInfo.year}-${month}-${day}`,
    end = start;

let endpoint = `https://api.meteostat.net/v1/history/daily?station=${stationObj.id}&start=${start}&end=${end}&key=${MSApiKey}`;

        xhr.open("GET",endpoint,true);

        xhr.onload = () => {
            let parsedData = JSON.parse(xhr.responseText)

            console.log(parsedData.data);

            let weatherInfo = parsedData.data[0];

            if(weatherInfo != undefined){
                // display info to frontend 
                console.log(`display some info to frontend plez`);
                
            }
            else {
                alert(`Weather is Not Available for this Location at Date Provided`)
            }
        
        }

        xhr.send();
    
}




//HISTORIC SELECT FUNCTIONS//

function yearSelected (){

        //selected Year value
    let year = this.value;
   // console.log(year);
    // set global Date object to selected year
    dateInfo.year = year;
    // stop displaying year select after use
    this.style.display = "none"
    // month select array
    let months = [1,2,3,4,5,6,7,8,9,10,11,12];
    // only allow current months if current year
    if (year == new Date().getFullYear()){
        let currentMonth = dateInfo.month;

        months.splice(currentMonth,12)
    }

    if (document.getElementById("monthSelect") != null) {
        let child = document.getElementById("monthSelect").remove();
    }

    let monthSelect = createSelect({
        defText: 'Select A Month', 
        id: 'monthSelect',
        onchangeFunc: monthSelected,
        arr: months

    });

    document.getElementById("uiDiv").appendChild(monthSelect);
    document.getElementById("uiDiv").insertBefore(monthSelect,userInput);
}

function monthSelected (){
    let month = this.value;

    dateInfo.month = month;
   // console.log(month);

    this.style.display = "none"

    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    let days = [];

    let count = 1;
    
    // for loop to make days arr depending on which month was previously selected
    for (let i =1; i <= daysInMonths[month-1]; i++) {

        days.push(i)
    
    }

    if (dateInfo.year == new Date().getFullYear() && month == new Date().getMonth() + 1) {

        console.log(new Date().getDate(), days.length-1);

        days.splice( new Date().getDate(), days.length-1);
   }
   // prevent multiple instances of same select elem
   if (document.getElementById('daySelect') != null ) {

    let child = document.getElementById('daySelect').remove()
    
}

let daySelect = createSelect({
    defText: 'Select A Day',
    id: 'daySelect',
    onchangeFunc: daySelected,
    arr: days
})
    //append to DOM
    document.getElementById("uiDiv").appendChild(daySelect)
    document.getElementById("uiDiv").insertBefore(daySelect,userInput)

    
}


function daySelected() {
    userSelectedDate = true
    
    this.style.display = "none";
    let day = this.value;

    dateInfo.day = day;

    document.getElementById("historySelect").style.display = "inline";
    document.getElementById("historySelect").value = "";

    console.log(`${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);

    
    
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

    if(selObj.arr !=undefined) {
        for(let i = 0; i < selObj.arr.length; i++){
        //console.log(i);
        
        const option = document.createElement("option");

        option.innerText = selObj.arr[i];

        option.value = selObj.arr[i];

        select.appendChild(option);
    
    }}
    // ONCHANGE

    select.onchange = selObj.onchangeFunc != undefined ? selObj.onchangeFunc : undefined;

    return select
    
}


