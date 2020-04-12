//create a new User Interface that will allow users to select a date.



let currentDate = new Date();
    console.log(currentDate);

let dateInfo = {
     year: currentDate.getFullYear(), 
    month: currentDate.getMonth(), // using index numbering
    day: currentDate.getDate(),

    dayInMonths:[31,28,31,30,31,30,31,31,30,31,30,31]
}    
    let monArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    // console.log(currentDate.getDay());
    // console.log(currentDate.getMonth());
    // console.log(currentDate.getFullYear());
    

// Function Calls
createInitial()


function createInitial (){
    let initDiv = createDivElem({id:"initialDiv",class:"div"})
        document.body.appendChild(initDiv);

    initDiv.appendChild(createHeading({id:"titleHeading",text:"I title therefore I am"}))
    initDiv.appendChild(createHeading({id:"titleHeading",text:`Month: ${monArr[currentDate.getMonth()]} / Day:${currentDate.getDate()} / Year:${currentDate.getFullYear()}`}) 
    )
    initDiv.appendChild(createButton({id:"prevMonth",class:"leftArwBtn",onClickFunc:testFunc}))
    initDiv.appendChild(createButton({id:"nextMonth",class:"rightArwBtn",onClickFunc:testFunc}))

    initDiv.appendChild(createButton({id:"prevDay",class:"leftArwBtn",
    onClickFunc:testFunc}))
    initDiv.appendChild(createButton({id:"nextDay",class:"rightArwBtn",
    onClickFunc:testFunc}))

    initDiv.appendChild(createButton({id:"prevYear",class:"leftArwBtn",onClickFunc:testFunc}))
    initDiv.appendChild(createButton({id:"nextYear",class:"rightArwBtn",onClickFunc:testFunc}))
    // createHeading({id:"titleHeading",text:"I title therefore I am"})
    // createHeading({id:"titleHeading",text:`Month: ${monArr[currentDate.getMonth()]} / Day:${currentDate.getDate()} / Year:${currentDate.getFullYear()}`}) 

    createButton({id:"prevMonth",class:"leftArwBtn",onClickFunc:testFunc})

    createButton({id:"nextMonth",class:"rightArwBtn",onClickFunc:testFunc})

    createButton({id:"prevDay",class:"leftArwBtn",
    onClickFunc:testFunc})

    createButton({id:"nextDay",class:"rightArwBtn",
    onClickFunc:testFunc})

    createButton({id:"prevYear",class:"leftArwBtn",onClickFunc:testFunc})

    createButton({id:"nextYear",class:"rightArwBtn",onClickFunc:testFunc})
   
}
function testFunc(){
    console.log("test");
    
    dateInfo.month = "dasd"
}

// HTML ELEMENT CREATION FUNCTIONS 

function createHeading (headingObj){
    // ternary let heading = size >=1 && size <= 5 ? document.createElement("h" + size) : document.createElement("h4");
    let heading = headingObj.size >= 1 && headingObj.size <= 5 ? document.createElement("h" + headingObj.size): document.createElement("h3");
     // let importance = "h" + size,
     //  heading = document.createElement(importance);
 
     heading.innerText = (typeof headingObj.text == "string") ? headingObj.text: "no text";
     // heading.innerText = headingObj.text;
      heading.id = headingObj.id;
      if(headingObj.id != undefined && document.getElementById(headingObj.id) == null){
          heading.id = headingObj.id;
      }
      if (headingObj.class != undefined){
          heading.className = headingObj.class;
      }
      
      if(headingObj.color != undefined) {
          heading.style.color = headingObj.color;
      }
      
      return heading
     
     
 }


 function createButton (buttonObj){
   let button = document.createElement("button");

   if(buttonObj.id != undefined && document.getElementById(buttonObj.id) == null){

    button.id = buttonObj.id;
    }

    if (buttonObj.class != undefined){

    button.className = buttonObj.class;
    }

    if (buttonObj.onClickFunc != undefined){
    
    button.onclick = buttonObj.onClickFunc;

    }
    if (buttonObj.text != undefined){
    
    button.innerText = buttonObj.text;

    }

    return button
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

    return select
    
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

function checkLeapYear (year){
    console.log("test");
    
}