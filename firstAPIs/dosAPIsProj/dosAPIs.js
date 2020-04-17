/*"dane": [
    "great"
],*/


window.onload = () => {

    let mainDiv = createDivElem({id:"mainContainer"});

    document.body.appendChild(mainDiv)

    reqDogPics()
}


function reqDogPics (){

    

    //xhr

    let count = 0,
        numOfImgs = 10,
        dogPics = [];

    while (count < numOfImgs) {
        let xhr = new XMLHttpRequest() ;

        const endpoint = "https://dog.ceo/api/breed/pitbull/images/random";
        
        xhr.open("GET",endpoint,true);
        
        xhr.send();
        
        xhr.onload = () => {
            
            let rawData = xhr.responseText,
                parsedData = JSON.parse(rawData);

               // console.log(parsedData);
                

                dogPics.push(parsedData.message);
                
            if (dogPics.length == numOfImgs){

                // console.log(dogPics);

                requestUserData(dogPics)
                
            }



        };

        

        count++
    }

    //console.log(parsedData);
    
    
    //get some pics

    //store them somewhere
}

function requestUserData(picsArray){

    console.log(picsArray);
    
    let xhr = new XMLHttpRequest(),

        endpoint = "https://jsonplaceholder.typicode.com/users";

    xhr.open("GET",endpoint,true);
    xhr.send();

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText);

        for (let i = 0; i < parsedData.length; i++) {
            
           displayUser(parsedData[i],picsArray[i]);
            //console.log(user);   

        }
    }

    //xhr jsonplace endpoint

    // onlaod create a frontend display for each user, itergrate dog pics for each user
}

function displayUser (userObj, imgUrl){

    const profilePic = createImg({src:imgUrl}),
          userName = createHeading({text:userObj.name, size: 2}),

                                    // need to add http:// when using someone else's api
          userWebsite = createHyperLink({hrefLink:`https://${userObj.website}`, text:`${userObj.name}'s Website`,openNewTab:true});
        
        div = createDivElem({})
        mainDiv = document.getElementById("mainContainer");

        mainDiv.appendChild(div);

        div.appendChild(profilePic);
        div.appendChild(userName);
        div.appendChild(userWebsite);

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