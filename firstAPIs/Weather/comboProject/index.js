let OWApiKey = `1d2c94df8e139aafee899c78388a7063`,
    MSApikey = `LDlbvkBV`;


//setup of initial htmls elems divs, inputs, btns 
window.onload = () => {

    let initDiv = document.createElement("div");
        initDiv.id = "initDiv";
        // hold all user interface based elements 
    let uiDiv = document.createElement("div");
        uiDiv.id = "uiDiv";
    let copyrightDiv = document.createElement("div");
        copyrightDiv.id = "copyrightDiv";
    let infoDiv = document.createElement("div");
        infoDiv.id = "infoDiv";


    let header = document.createElement("h1");
        header.innerText = "Current/Historical Weather";

    let currentDay = document.createElement("h3");
        currentDay.innerText = "Current Time:" + new Date;

    let userInput = document.createElement("input");
        userInput.id = "userInput";
        userInput.placeholder = "Enter A City or Zip Code";
        //input now runs submit button onclick function when Enter key is pressed 
        userInput.addEventListener("keyup",function(event){
            if(event.keyCode === 13){
                document.getElementById("submitBtn").click();
            }
        })

        uiDiv.appendChild(userInput);
    
    let submitBtn = document.createElement("button");
        submitBtn.id = "submitBtn";
        submitBtn.innerText = "Get Current Weather";
        submitBtn.onclick = reqCurrentWeather;
        uiDiv.appendChild(submitBtn);

    let historySelect = document.createElement("select");
        historySelect.id = "historySelect";
        historySelect.onchange = reqStation;
    let hsDefOpt = document.createElement("option");
        hsDefOpt.innerText = "Select a Year"
        hsDefOpt.value = "";
        historySelect.appendChild(hsDefOpt);
        uiDiv.appendChild(historySelect);
        uiDiv.insertBefore(historySelect,userInput);




    initDiv.appendChild(header);
    initDiv.appendChild(currentDay)
    initDiv.appendChild(uiDiv);
    initDiv.appendChild(infoDiv);
    initDiv.appendChild(copyrightDiv);
    document.body.appendChild(initDiv);
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

function reqStation () {
   
    console.log("test");
    



    // let station = document.getElementById("userInput").value.trim();

    // let xhr = new XMLHttpRequest();


    // //https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}
    // const endpoint = `https://api.meteostat.net/v1/histor/daily?${station}&start=${start}&end=${end}&key=${MSApikey}`;

    //     xhr.open("GET",endpoint,true);

    //     xhr.onload = () => {

    //         let parsedData = JSON.parse(xhr.responseText)

    //     };

    //     xhr.send();
    
}


//meteostat and openweather END

//HISTORIC SELECT FUNCTIONS//
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


