//REMOVE ME
let apiKey = "";


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

                let stationObj = parsedData.data[0];

                    stationObj.name = `${stationObj.name}, ${stationObj.country}`;

                reqHistData(stationObj)
                
                
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
                        id: stationSel.value,
                        name: stationSel.options[stationSel.selectedIndex].text,
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
            // console.log("test");

            let weatherDiv = document.getElementById("weatherDiv");
            
            let parsedData = JSON.parse(xhr.responseText); //return an object w/ an array of objects, each object is a station this api has historicial info on

            console.log(parsedData.data);
            // if parsedData.data is an empty array, the date provided is out side thelimits of that station

            let weatherInfo = parsedData.data[0];

               // console.log(weatherInfo.date);
                

            if(weatherInfo != undefined){

                // display info to the frontend

                //account for the info that may not be available i.e. pressure,wind direction, sunshine, etc

               displayWeatherData(weatherInfo, stationObj)

            }

            else {
                alert(`Weather Data Not Available for this Location at the Date Provided`)
            }

        }

        xhr.send();

}


function displayWeatherData(weather, station){

   // console.log(station);

    let stationDiv = createDivElement({}),
        weatherDiv = document.getElementById("weatherDiv");

    let stationHeading = createHeading({size:3, text:station.name});

        stationDiv.appendChild(stationHeading);


    for (const key in weather) {
        // dot notation is strict will look for .key as a key 
        // bracket notation will use string value to access 
       // console.log(key,weather[key],weather.key);
        // key, value, undefined 

        if (weather[key] != null){

          // console.log(key + ":" + weather[key]);
            // create heading
            let infoType = key.substring(0,1).toUpperCase() + key.substring(1,key.length);

            let convertedData = convertData(key,weather[key]);

            let infoHeading = createHeading({text: `${infoType} |   ${convertedData}`});

            //append to stationDiv

            stationDiv.appendChild(infoHeading); 

        }
        
    }

    let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.onclick = deleteADiv;

        stationDiv.appendChild(deleteBtn);



        //append the stationDiv to weatherDiv
        weatherDiv.appendChild(stationDiv);    

}

function deleteADiv() {
   // console.log(this);

    //deletes div of whatever the button was attached too
    this.parentElement.remove()
    
}

/**
​​
peakgust: null
precipitation: null
pressure: 998.2
snowdepth: null
snowfall: null
sunshine: null
temperature: -16.6
temperature_max: -15.3
temperature_min: -17.9
winddirection: 311
windspeed: 0.8 */

function convertData(key,value){

    

    switch(key){

        case "peakgust":
        case "windspeed":

            return Math.round((value/ 1.609344)*10)/10 + " mph"

            break;
        
        case "precipitation":

            return Math.round((value / 25.4)*100)/100 + " in."

            break;

        case "pressure":
            return value + ` hPa`

            break;
        
        case "snowdepth":
        case "snowfall":
            return (value/ 2.54 )+ " in."
        
            break;

        case "temperature":
        case "temperature_max":
        case "temperature_min":
            return Math.round((value * (9/5) + 32)*10)/10 + "°F" 

        case "winddirection":
            return value + "°"

            break;
        case "date":
            return value

            break;

    }

}


/**(c * 9 / 5) + 32 = F

kmh / 1.609344 = mph

precip / 25.4 = inch

snow / 2.54 = inch

(c * 9 / 5) + 32 = F all temps
kmh / 1.609344 = mph wind / gust
precip / 25.4 = inch
snow / 2.54 = inch snowfall and depth */

/**let temperature = weatherInfo.temperature,
                    tempHeading = createHeading({text:`Temp: ${temperature}°C`});

                    weatherDiv.appendChild(tempHeading);

                    if (weatherInfo.temperature_max != null && weatherInfo.temperature_min != null){
                        let tempRange = createHeading({text:`Temp Max: ${weatherInfo.temperature_max}°C \nTemp Min: ${weatherInfo.temperature_min}°C`, size:5});
                            weatherDiv.appendChild(tempRange)
                    }

                    if (weatherInfo.precipitation != null){
                        let precipitation = createHeading({text:`Precipitation: ${weatherInfo.precipitation} mm`})

                        weatherDiv.appendChild(precipitation);
                    }

                    if (weatherInfo.pressure != null){
                        let airPressure = createHeading({text:`Air Pressure: ${weatherInfo.pressure} hPa`})

                       weatherDiv.appendChild(airPressure);
                    }

                    if (weatherInfo.windspeed != null){
                        let windspeed = createHeading({text:`Wind Speed: ${weatherInfo.windspeed} km/h`})

                        weatherDiv.appendChild(windspeed)
                            if(weatherInfo.peakgust != null){

                                let peakGust = createHeading({text:`PEAK GUST: ${weatherInfo.peakGust} KM/H`,size:5});
                                weatherDiv.appendChild(peakgust);

                            }
                    }
 */