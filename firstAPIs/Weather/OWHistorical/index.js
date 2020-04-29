

//MAIN HTML ELEMENTS CREATION
window.onload = () => {

    

    let mainTitle = createHeading({text:"Historical Weather Databank", size:1});

    let dateText = createHeading({text:"",size:3, id:"dateText"});

    let uiDiv = createDivElement({id:"uidiv"});

    let weatherDiv = createDivElement({id:"weatherDiv"});

    let copyrightDiv = createDivElement({id:"crDiv"});
        copyrightDiv.innerHTML = `Data provided by <a href="https://www.meteostat.net" title="meteostat" target="_blank">meteostat</a>. Meteorological data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" title="meteostat Sources" target="_blank">sources</a>.`;

    // creates an array of numbers from 1980-2020
    let yearArr = Array.from({ length: dateInfo.year + 1}, (a,b) => b).slice(dateInfo.year - 40).reverse();

    let yearSelect = createSelectElement({array:yearArr,id:"yearSelect",defaultText:"Select A Year", onchangeFunc: yearSelected});

    let userInput = createInput({placeholder:"Enter a City Name", id: "cityInput"});
        userInput.onkeyup = testUserSubmit;

    let submitBtn = document.createElement("button");
        submitBtn.innerText = "Request Weather Data";
        submitBtn.onclick = searchStationReq;
        submitBtn.id = "submitBtn";
    // button does not appear if user has not input a city && date
        submitBtn.style.display = "none";
    

    document.body.appendChild(mainTitle);
    document.body.appendChild(uiDiv);
    document.body.appendChild(weatherDiv);
    document.body.appendChild(copyrightDiv);

    uiDiv.appendChild(dateText);
    uiDiv.appendChild(submitBtn);
    uiDiv.appendChild(userInput);
    uiDiv.appendChild(yearSelect);

}

function testUserSubmit(){

   // console.log(this.value);
    //if user submittion passes test display submit button

    let cityInput = document.getElementById("cityInput").value.trim(),// same as this.value
    //let cityInput = this.value.trim(),

        submitBtn = document.getElementById("submitBtn");

        numbers = /[0-9]/;

      //  console.log(cityInput);
        


    if (cityInput.length < 3 || cityInput.length >= 58 || numbers.test(cityInput) || !userProvidedData) {

        submitBtn.style.display = "none";

    }

    else {
        submitBtn.style.display = "inline";
    }
    
}

function searchStationReq(){
        //access UI div
    let weatherDiv = document.getElementById("weatherDiv"),
        // input value with any white spaces before or after it trimmed off
        cityInput = document.getElementById("cityInput").value.trim(),

        numbers = /[0-9]/,
        
        qCountry = cityInput;


        if(cityInput < 3 || cityInput > 33 ||numbers.test(cityInput) ) {

            alert("Input a City Name \nCan Not Be Shorter Then 3 Characters or\nLonger then 33 Characters\nNo Numbers Please")

        }


        // meteostat api
        
       // https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}
       
       // https://api.meteostat.net/v1/stations/search?q=toronto&key=XXXXXXXX
        // const endpoint = `http://history.openweathermap.org/data/2.5/history/city?q=${cityInput},us&type=hour&start=${start}&end=${end}&appid=${apiOWKey}`;

        const endpoint = `https://api.meteostat.net/v1/stations/search?q=${qCountry}&key=${apiKey}`;

    let xhr = new XMLHttpRequest();

        xhr.open("GET",endpoint,true);
            //reqMethod,endpoint,asyncBool

        //callback function
        xhr.onload = () =>{

            let parsedData =JSON.parse(xhr.responseText);

               // console.log(parsedData);  return an object w/ an array of objects, each object is a station this api has historicial info on

                //console.log(parsedData.data);
            if (parsedData.data.length == 0 ){

                alert(`No stations were found, please try a different city name`)
            }
            else if (parsedData.data.length == 1){
                // request historical info for station found

                reqHistData(parsedData.data[0])
                
                
            }

            else{
                //have user select a station;

                //make select elems
                // let stationArray = parsedData.data.map( )
              
                // let stationSel = createSelectElement({
                //     id:"stationSel",
                //     defaultText:"Select a Weather Station",
                //     array:stationArray,
                // })
                let selectElem = document.createElement("select");
                
                let defaultOpt = document.createElement("option");

                    defaultOpt.innerText = "Select A Weather Station";

                    defaultOpt.value = "";
                    
                    selectElem.appendChild(defaultOpt);


                for (let i = 0; i < parsedData.data.length; i++) {
                   
                    let stationOpt = document.createElement("option");
                        stationOpt.innerText = `${parsedData.data[i].country}, ${parsedData.data[i].name}`;
                        stationOpt.value = parsedData.data[i].id;
                    
                    selectElem.appendChild(stationOpt);
                    
                }


                selectElem.onchange = () =>{

                   // console.log(this);
                    
                    let stationSel = document.getElementById("stationSelect");

                    let stationObj = {
                        id: this.value,
                    }

                    reqHistData(stationObj);

                }
                selectElem.id = "stationSelect";

                    if (document.getElementById("stationSelect") != null){

                        document.getElementById("stationSelect").remove()
                    }

                document.getElementById("weatherDiv").appendChild(selectElem);

                alert("Select a station to complete your Submission")

                //create onchange func

                //request hist info

                //provide historyinfo for selected station
            }


                
                

        };

        xhr.send();


}

function reqHistData(stationObj){

    let xhr = new XMLHttpRequest();

        /**
         * endpoint  // https://api.meteostat.net/{VERSION}/{PACKAGE}/{METHOD}?{PARAMETERS}
         *  stationcode parsed data .id 
         *   start date
         *   end date
         */
            let month = dateInfo.month > 9 ? dateInfo.month : "0" + dateInfo.month,
             day = dateInfo.day > 9 ? dateInfo.day : "0" + dateInfo.day,

             start = `${dateInfo.year}-${month}-${day}`,
             end = start;

    let endpoint = `https://api.meteostat.net/v1/history/daily?station=${stationObj.id}&start=${start}&end=${end}&key=${apiKey}`;

        xhr.open ("GET",endpoint,true);

        xhr.onload = () =>{

            let parsedData = JSON.parse(xhr.responseText); //return an object w/ an array of objects, each object is a station this api has historicial info on

            //console.log(parsedData.data);
            // if parsedData.data is an empty array, the date provided is out side thelimits of that station

            let weatherInfo = parsedData.data[0];

            if(weatherInfo != undefined){

                // display info to the frontend

                //account for the info that may not be available i.e. pressure,wind direction, sunshine, etc
            }

            else {
                alert(`Weather Data Not Available for this Location at the Date Provided`)
            }

        }

        xhr.send();

}
