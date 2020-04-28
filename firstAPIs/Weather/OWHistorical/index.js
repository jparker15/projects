const apiOWKey = `1d2c94df8e139aafee899c78388a7063`;

//MAIN HTML ELEMENTS CREATION
window.onload = () => {


    let mainTitle = createHeading({text:"Historical Weather Databank", size:1});

    let dateText = createHeading({text:"",size:3, id:"dateText"});

    let uiDiv = createDivElement({id:"uidiv"});

    let weatherDiv = createDivElement({id:"weatherDiv"});

    // creates an array of numbers from 1980-2020
    let yearArr = Array.from({ length: dateInfo.year + 1}, (a,b) => b).slice(dateInfo.year - 40);

    let yearSelect = createSelectElement({array:yearArr,id:"yearSelect",defaultText:"Select A Year", onchangeFunc: yearSelected});

    let userInput = createInput({placeholder:"Enter a City Name", id: "cityInput"});

    let submitBtn = document.createElement("button");
        submitBtn.innerText = "Request Weather Data";
        submitBtn.onclick = requestAPI;
    

    document.body.appendChild(mainTitle);
    document.body.appendChild(uiDiv);
    document.body.appendChild(weatherDiv);

    uiDiv.appendChild(dateText);
    uiDiv.appendChild(submitBtn);
    uiDiv.appendChild(userInput);
    uiDiv.appendChild(yearSelect);

}

function requestAPI(){
        //access UI div
    let weatherDiv = document.getElementById("weatherDiv"),
        // input value with any white spaces before or after it trimmed off
        cityInput = document.getElementById("cityInput").value.trim(),

        numbers = /[0-9]/;


        if(cityInput < 3 || cityInput > 33 ||numbers.test(cityInput) ) {

            alert("Input a City Name \nCan Not Be Shorter Then 3 Characters or\nLonger then 33 Characters\nNo Numbers Please")

        }

        let start = new Date (`${dateInfo.month}, ${dateInfo.day}, ${dateInfo.year}`).getTime(), 
            end = start + (8.64 * Math.pow(10,7));

        console.log(start);
        

        const endpoint = `http://history.openweathermap.org/data/2.5/history/city?q=${cityInput},us&type=hour&start=${start}&end=${end}&appid=${apiOWKey}`;

    let xhr = new XMLHttpRequest();

        xhr.open("GET",endpoint,true);
            //reqMethod,endpoint,asyncBool

        //callback function
        xhr.onload = () =>{

            let parsedData =JSON.parse(xhr.responseText);

                console.log(parsedData);
                

        };

        xhr.send();


}