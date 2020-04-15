


window.onload = () => {

    requestAllUsers()


}

function displayUser(user){

    //console.log(user);

    //create a div to store users elem
    let div = createDivElem({class:"userDiv"})

    //heading for the login
    let heading = createHeading({text:`${user.login}`})

    //img for profile pice
   let img = createImg({src: user.avatar_url, alt: `${user.login} Profile Pic`})

    //link to their github
    let link = createHyperLink({hrefLink: user.html_url ,text:` ${user.login} GitHub Profile`, openNewTab:true})

    //button that show more info (append more info to div)

    let button = createButton({text:`See more info on ${user.login}`,onClickFunc:displayInfo})

    div.appendChild(heading)
    div.appendChild(img)
    div.appendChild(link)
    div.appendChild(button)

    document.getElementById("allUsers").appendChild(div)

 
    
}

function displayInfo(){
    //make the request for a specific user to get more detailed info on their account

    console.log(this);
    
    let username = this.innerText.replace(/See more info on /,''),

        userDiv = this.parentElement;

    console.log(userDiv);
    

    let xhr = new XMLHttpRequest(),
        endpoint = `http://api.github.com/users/${username}`;

        xhr.open("GET",endpoint);

        xhr.onload = () => {
            //access the users div
            //add more detail element to the users div

            let rawRes = xhr.responseText,
                parsedRes = JSON.parse(rawRes),

                followersHead = createHeading({size:5,text: parsedRes["followers"]});

                userDiv.appendChild(followersHead);

                console.log(parsedRes);
                
        }

        xhr.send();
        

    
}

function requestAllUsers() {let xhr = new XMLHttpRequest(); 
    //requestMethods there's a variety of them
let reqMethod = "GET",
    //API URL not accessed by enduser
    endpoint = "https://api.github.com/users", 
    //?????????
    asyncBool = true;


    xhr.open(reqMethod,endpoint) //init api request


    xhr.onload = () => {  //the function called when an XMLHttpRequest transaction completes successfully.

        //returns the text received from a server following a request being sent.
        let xhrResponse = xhr.responseText;

        /*When receiving data from a web server, the data is always a string.
        Parse the data with JSON.parse(), and the data becomes a JavaScript object.*/
        let parsedResponse = JSON.parse(xhrResponse);


        //console.log(parsedResponse);

        for (let i = 0; i < parsedResponse.length; i++) {
            
            let userInfo = parsedResponse[i]; // objects with user properties

            // console.log(user);

            displayUser(userInfo)


        }

    }
    
    xhr.send()

}


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

