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
function reqCurrentWeather (){

    let userInput = document.getElementById("userInput");
    console.log("texst");
    console.log(userInput.value);
    
    
}


//meteostat and openweather