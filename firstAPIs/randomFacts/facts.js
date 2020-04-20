document.body.style.backgroundColor = "black";

//4 steps to opening API 


//1. make an instance of XHR

//2. OPEN SEND ONLOAD CALLBACK

let xhr = new XMLHttpRequest();

const endpoint = "";

xhr.open("GET",endpoint,true);
xhr.send();

xhr.onload = () => {

    let stringData = xhr.responseText,

        factsParsed = JSON.parse(stringData)
}




// Creation Methods

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

function createImg (imageObj){
    let image = document.createElement("img");
    image.src = imageObj.src != undefined ? imageObj.src : "./demo.jpg"
    image.alt = imageObj.alt != undefined ? imageObj.alt : "image could not load / brkn" 

    if (imageObj.id != undefined && document.getElementById(imageObj.id) == null){
        image.id = imageObj.id;
    }
    if (imageObj.class != undefined){
        image.className = imageObj.class;
    }
      //console.log(`${image.src},${image.alt},${image.id},`);
    return image    
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

function createHyperLink (linkObject){
    

    //class and id

    const link = document.createElement('a');


    //set my Id in the case that I define that property in my linkObject
    if (linkObject.id != undefined && document.getElementById(linkObject.id) == null) {

        link.id = linkObject.id; 
        
    }

    //set my Id in the case that I define that property in my linkObject
    if (linkObject.class != undefined ) {

        link.className = linkObject.class;

    }

    //property name openNewTab

    if ( linkObject.openNewTab === true ) {

        link.target = '_blank';
        
    }

    link.innerText = linkObject.text != undefined ? linkObject.text : 'Untitled Link';

    link.href = linkObject.hrefLink != undefined ? linkObject.hrefLink : 'No Link';

    // console.log(link);

    return link
    

}