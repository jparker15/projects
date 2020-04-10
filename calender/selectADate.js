//After completion work on creating a program that can be ran AT LEAST once to select a date.
/*The program will start with a single button on the dom that reads 'Select A Date'
once clicked it will ask the user to select a year (1920-2020), via select element, 
the button will disappear after clicked
after the year is selected, the element will disapear and a month select element will appear,
 then the same steps will follow for the day selection,
Finally display the date that was selected with a text element
If you can get this completed there are two additional challenges I encourage you to try:
1. try to make it a looping system, where once the user is done selecting a date, they have the option to try again 
2. then try to make it possible for the user to go back to the previous selection, try to make it as user friendly and unbreakable as possible.
*  try changing the code we created together if you think there is possibly a different way to accomplish the same thing!
*/

/**
 * Year select dosen't disappear onChange
 * Month select doesn't appear or disappear
 * Day select doesn't appear or disappear
 * Final date doesn't display with text Element
 * 
 * Februaray doesn't account for leap year selection
 * Days don't account for Month selection
 * Month selection in string instead of integers
 */
document.body.style.backgroundColor = "maroon"
document.body.appendChild(createButton({id:"selBtn",class:"button",text:"Select A Date",onClickFunc:initialElem}));

date = [];



//created onclick of Select a Datet btn 

    
//document.body.appendChild(createSelect(yearSel));


//HTML ELEMS CREATION
function createButton (btnObj) {

    let button = document.createElement("button");

    if(btnObj.id != undefined && document.getElementById(btnObj.id) == null){

        button.id = btnObj.id;

    }

    if(btnObj.class != undefined){

        button.className = btnObj.class;

    }

    if(btnObj.text != undefined){

        button.innerText = btnObj.text;

    }
    if(btnObj.onClickFunc != undefined){

        button.onclick = btnObj.onClickFunc;

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

function createHeading (headObj){

    let  heading = headObj.size >= 1 && headObj.size <= 5 ? document.createElement("h" + headObj.size): document.createElement("h2");

    
    if (headObj.id != undefined && document.getElementById(headObj.id) == null){
        heading.id = headObj.id
    }

    if (headObj.text != undefined){

        heading.innerText = headObj.text;
    }

    return heading
        
}

function removeElement(elementId) {
    // Removes an element from the document
    let element = document.getElementById(elementId);

    element.parentNode.removeChild(element);

}

function initialElem (){
  //  console.log(Math.floor(Math.random() *10)+1);

    removeElement("selBtn")
    let yearSel = createSelect({id:"yearSel",class:"select",defText:"Select a Year",arr:yearsAry()})
    yearSel.onchange = selectADate
    document.body.appendChild(yearSel);

    let monthSel = createSelect({id:"monthSel",class:"select",defText:"Select a Month",arr:monthsAry()})
    document.body.appendChild(monthSel)
    monthSel.onchange = selectADate

    let daySel = createSelect({id:"daySel",class:"select",defText:"Select a Day",arr:daysAry()})
        daySel.onchange = selectADate
    document.body.appendChild(daySel)
   
}

function selectADate (){
    //console.log(this);
    
    let selectElem = this,
    optionVal = selectElem.value;

    //push selected Year into date array
   if(date.length < 3){
       date.push(optionVal);
      // console.log(date);
       

   }

    //console.log(optionVal);
  //  date.push(optionVal)
    
    //remove year select elem
    //removeElement("yearSel")
    //create month sel
    
   // document.body.appendChild(document.getElementById("monthSel"))
    console.log(optionVal);
    console.log(date);
    return date
    
    // if(date.length == 3){
    //     // for (let i = 0; i < date.length; i++) {
            
            
    //     // }
    //     console.log(...date);
        
        
         
    //     document.body.appendChild(createHeading({id:"dateHeading",size:1, innerText:"ssa"}));
    // }

}





//DATE ARRAY CREATION
function yearsAry (startYear) {
    let currentYear = 2020,
        years = [];

        startYear = startYear || 1920;
        
        for (let i = startYear; i <= currentYear; i++) {
           //console.log(i);
           
            years.push(i);
        }
        //console.log(years);
        
        return years
}

function monthsAry (){
    
        months = [];

        for(let i = 1; i <= 12; i++){

            months.push(i)

        }
       // console.log(months);

        return months
}

function daysAry(startMonth){

    let monthMax = [31,28,31,30,31,30,31,31,30,31,30,31],
        days  = []

    

    startMonth = startMonth || 0
//console.log("sadas");


    for(let i = 1; i <= monthMax[startMonth]; i++){
        days.push(i);
        //console.log(i)
    }
    //console.log(days);
    return days
    
 
}


