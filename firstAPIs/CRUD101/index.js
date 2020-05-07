

window.onload = () => {

    //req all post -> arr of 100 posts object
    
    //https://jsonplaceholder.typicode.com/posts/

    // itterate through first 10-20 elements

    // create a display with each object's info

   
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

                 console.log(input);      

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
    