let OWApiKey = `1d2c94df8e139aafee899c78388a7063`;


//setup of initial htmls elems divs, inputs, btns 
window.onload = () => {

    let initDiv = document.createElement("div");
        initDiv.id = "initDiv";
        // hold all user interface based elements 
    let uiDiv = document.createElement("div");
        uiDiv.id = "uiDiv";
    let copyrightDiv = document.createElement("div");
        copyrightDiv.id = "copyrightDiv";

    let header = document.createElement("h1");
        header.innerText = "Current/Historical Weather";

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
        submitBtn.innerText = "Submit";
        submitBtn.onclick = reqCurrentWeather;
        uiDiv.appendChild(submitBtn);


    initDiv.appendChild(header);
    initDiv.appendChild(uiDiv);
    initDiv.appendChild(copyrightDiv);
    document.body.appendChild(initDiv);
}

//XHR REQS
//openweather api
function reqCurrentWeather (){

    const userInput = document.getElementById("userInput").value.trim();

    let numbers = /[0-9]/g;
    let alphanumeric = /[A-z]/;
   
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
      //zip code is 5 characters  
    }
    else if (alphanumeric.test(userInput)){
        //city name has only letters no special characters
    }

    else {// invalid string
        return alert("Entry is not a valid entry try again")
        
    }

    let xhr = new XMLHttpRequest(),
        reqMethod = "GET",
        endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${OWApiKey}&units=imperial`,
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
                

        }

        xhr.send();
    
    
}

function reqHistWeather () {
    console.log(this.value);
    
}


//meteostat and openweather