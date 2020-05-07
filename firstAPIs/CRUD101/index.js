

window.onload = () => {
    let div = document.createElement("div");
    div.id = "initDiv";
        document.body.appendChild(div);
    //req all post -> arr of 100 posts object
    //https://jsonplaceholder.typicode.com/posts/
    reqPosts()

    // itterate through first 10-20 elements

    // create a display with each object's info

   
}

function displayPosts(postObj){
    //console.log(postObj[0]); postObj is an array of 100 objects with key/values for each post
    
    console.log(postObj)
  
    for (let i = 0; i < 10; i++) {
       // console.log(postObj[i]);
        let id = postObj[i].id,
            userID = postObj[i].userId
            title = postObj[i].title,
            body = postObj[i].body;


        
        let postHeading = createHeading({size:5,text:`User ID:${userID} Post:${id}\nTitle:${title}\nBody:${body}`})
        let postDiv = document.createElement("div");
        postDiv.appendChild(postHeading);
        initDiv.appendChild(postDiv);
        
    }

    // for (const key in postObj[count]) {
    //     console.log(postObj[0][key]);// loops through entire array of objects

        // console.log(postObj[key].userId); gives value of userId key
        // return
        
        // console.log(Object.keys(postObj[key])); give key of postObj objects

        
        

    
    

}

function reqPosts (){
    let xhr = new XMLHttpRequest();

    const endpoint = "https://jsonplaceholder.typicode.com/posts/";

        xhr.open("GET",endpoint,true);

        xhr.onload = () => {
            let parsedData = JSON.parse(xhr.responseText);
               // console.log(parsedData);

                displayPosts(parsedData)
                
        }

        xhr.send()

}

function compileFormData() {

    //   //  let form = document.getElementById("formID");
    //     let form = formID;
        //console.log(form);

        let postBody = {}, postIDInput = formID.postID.value.trim()
        // empty input or spaces , Not a Number true, postID is a number between 1 and 100
        if (postIDInput == "" || isNaN(postIDInput) || postIDInput < 1 || postIDInput > 100 ) {
            alert("Provide a Post ID (a number between 1 and 100)");

            return
        }

        for (const input of formID) {
            //conditionals if request is going to be made

                 //console.log(input);      

                // don't include button, postID, and input can't be empty string or spaces
                if(input.type != "button" && input.name != "postID" && input.value.trim() != ""){

                    // empty Obj[key] =  
                    postBody[input.name] = input.value;
                
                }
        }
        // 
        let pBKeysArr = Object.keys(postBody).length    
                            // exclude two inputs (postID and button)
        if (pBKeysArr!= 0 && pBKeysArr < formID.length-2){  //PATCH Method

            updateRequest(postBody,"PATCH", postIDInput)

        }
        else if (pBKeysArr == formID.length-2){ //PUT METHOD

            updateRequest(postBody,"PUT",postIDInput)

        }
        else { //all inputs were left blank, do not req API

            alert("There were no inputs entered, please input at least one")

        }
        
       // console.log(formID.length);
        


    }
    
    function updateRequest (requestBody, method, postID){
        let xhr = new XMLHttpRequest();
                                            // access post 10 and updating it with a PUT Req
    let endpoint = `https://jsonplaceholder.typicode.com/posts/${postID}`;

        xhr.open(method,endpoint,true)
        // PUT request will completely replace the response object with it's requstBody object

        // PATCH request will update properties and add new properties to the response object

        xhr.onload = () => {
            
            //    let parsedData = JSON.parse(xhr.responseText)

            //console.log(parsedData);
            
        }
        /*sets the value of an HTTP request header.*/
        xhr.setRequestHeader("Content-Type", "application/json");
        /*
        HTTP Body Data is the data bytes
        transmitted in an HTTP transaction message*/ 
        // let requestBody = {
        //     title: "this is a updatred post",
        //     body:"new stuff",
        //     firstName :"Jane",
        //     lastName : "Barker",
          

        // },
        let jsonBody = JSON.stringify(requestBody);

        xhr.send(jsonBody);
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