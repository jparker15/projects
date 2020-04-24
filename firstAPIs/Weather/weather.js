window.onload = () => {
    
    let div = document.createElement("div");

    document.body.appendChild(div);


    let button = document.createElement("button");

    button.onclick = reqAPI;
    button.innerText = "Get Current Weather";

    button.id = "defBtn";

    let cityNameInput = document.createElement("input");
        console.log(cityNameInput);
        

        cityNameInput.placeholder = "Enter A City Name OR Zip Code";
        cityNameInput.spellcheck = true;
        cityNameInput.id = "cityInput";

    div.appendChild(cityNameInput);
    div.appendChild(button);
    //reqAPI()

    console.log("tests");
    
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

        console.log(stringData);
        

       let response = JSON.parse(stringData);

        console.log(response)

       // displayInfo(response)

    }

    xhr.send();
}
   

function displayInfo (data){
    
    let pTag = document.createElement("p");
    console.log(this);

    const userInput = document.getElementById("cityInput")

    console.log(userInput.value);

    
    

  //  document.body.appendChild(pTag);
}