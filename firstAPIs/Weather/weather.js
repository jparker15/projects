window.onload = () => {
    
    let div = document.createElement("div");
    let header = document.createElement("h1");
        header.innerText = "Open Weather Map API";

    document.body.appendChild(div);


    let button = document.createElement("button");

    button.onclick = reqAPI;
    button.innerText = "Get Current Weather";

    button.id = "defBtn";

    let cityNameInput = document.createElement("input");
       // console.log(cityNameInput);
        

        cityNameInput.placeholder = "Enter A City Name OR Zip Code";
        cityNameInput.spellcheck = true;
        cityNameInput.id = "cityInput";


        //EventListener for Enter Key  //executes function when user releases a key
        cityNameInput.addEventListener("keyup", function(event){
            // 13 = "enter" key
            if(event.keyCode === 13){
                //trigger the button elem with a click
                document.getElementById("defBtn").click();
            }
        });

    div.appendChild(header);
    div.appendChild(cityNameInput);
    div.appendChild(button);
    //reqAPI()

   // console.log("tests");
    
}



function reqAPI() {

    const userInput = document.getElementById("cityInput").value.trim();

    // console.log(userInput.value.trim());


    //regrex lowercase g means global
    let numbers = /[0-9]/g;
    let alphanumeric = /[A-z]/;

    let query;
    

    if (userInput.length < 3 || userInput.length > 30){
        alert("That is not a valid entry, entry must be more then two characters.")
        return
    }
    else if (numbers.test(userInput) && alphanumeric.test(userInput)) {
            //if numbers and alpha are true there's numbers & letters in the search

        alert("Entry can not have numbers and letters in search")
        return
    }
    else if (!alphanumeric.test(userInput) && userInput.match(numbers).length === 5 ){ //valid zip in an array length of 5
        
        query = `zip=${userInput}`
    }
    else if(alphanumeric.test(userInput)){ // valid string
        query = `q=${userInput}`
    }

    else {// invalid string
        console.log(userInput.match(numbers));
        
        alert("The numbers you entered is not a valid zipcode")
    }

    // check for valid zipcode format only 5 numbers
    // check for city name, length < 30 (longest city name);

    let cityName = userInput;

    const apiKey = `1d2c94df8e139aafee899c78388a7063`;

    const xhr = new XMLHttpRequest();

    let method = "GET";
        // include https when using URL not local to computer
    // let endpoint = "https://api.openweathermap.org/data/2.5/weather?q=Providence&appid=1d2c94df8e139aafee899c78388a7063";
    let endPoint = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=imperial`;
        
    let asyncBool = true;


    xhr.open("GET",endPoint,true);

    xhr.onload = () => {
        let stringData = xhr.responseText;

       // console.log(stringData);
        

       let response = JSON.parse(stringData);

        console.log(response)

        displayInfo(response)

    }

    xhr.send();
}
   

function displayInfo (data){
    
    let inputName = createPtag({id:"cityName",text:`City:${data.name}`}),
  //  console.log(this);
        temptures = createPtag({id:"temps",text:`Feels Like: ${data.main.feels_like}°F \n Actual Temp: ${data.main.temp}°F\n Humidity: ${data.main.humidity}`}),

        weatherWind = createPtag({id:"weatherWind", text:`Weather: ${data.weather.main}\n Description: ${data.weather.description}\n Wind Speed: ${data.wind.speed}`})

    const userInput = document.getElementById("cityInput")

   // console.log(userInput.value);

   let infoDiv = document.createElement("div");
        infoDiv.id = "info";

  
        


    
    
    document.body.appendChild(infoDiv);
    infoDiv.appendChild(inputName); 
    infoDiv.appendChild(temptures);
    infoDiv.appendChild(weatherWind);
}

function createPtag(pTagObj){
    let pTag = document.createElement("p");

       if (pTagObj.id != undefined && document.getElementById(pTagObj.id) == null) {
           pTag.id = pTagObj.id;
       }
       pTag.innerText = pTagObj.text != undefined ? pTagObj.text : "Lorem Ipsum Salt";

       return pTag
}