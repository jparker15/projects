window.onload = () =>{
 
    reqAllUsers()   

}

function reqAllUsers (){
    let xhr = new XMLHttpRequest();
    //PARAMS for xhr.open methods REQUIRED
    let reqMethod = "GET"
        endpoint = "https://jsonplaceholder.typicode.com/users", //API URL 
        asyncbool = true;

    xhr.open(reqMethod,endpoint,asyncbool)

    xhr.onload = () => {
        let stringResponseData = xhr.responseText;
            //JSON.parse converts string data into an object
        let parsedData = JSON.parse(stringResponseData)

        for (let i = 0; i < parsedData.length; i++) {

            console.log(parsedData[i]);

            let userObj = parsedData[i];

            displayUsers(userObj)
            
            
        }
    }

    xhr.send()
}

function displayUsers (userInfo){

    //create div to store each user
    let div = createDivElem({class:"userDiv"}),

        profilepic = createImg({src:"https://i.ytimg.com/vi/QFx-RHt_8b0/maxresdefault.jpg",alt:`${userInfo.username} profile pic`})
        heading = createHeading({text: `${userInfo.name}\n`}),
        subHeading = createHeading({size:5,text:`Email: ${userInfo.email}\n Phone Number: ${userInfo.phone} \n Website:${userInfo.website}`}),
        addressBtn = createButton({text:"Address"}),
        companyBtn = createButton({text:"Company"});
        


    div.appendChild(heading)
    div.appendChild(profilepic)
    div.appendChild(subHeading)
    div.appendChild(addressBtn)
    div.appendChild(companyBtn)


    document.getElementById("allUsers").appendChild(div);
}


//ELEMENT CREATION FUNCTIONS
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
