let currentPage = 1,
    
    maxPages = undefined;


window.onload = () => {


//    console.log(maxPages);

        //initial html elems creation

    let uiDiv = createDivElem({id:"uiDiv"});

    let usersDiv = createDivElem({id:"usersDiv"});

    const prevPage = createButton({id:"prevPage",onClickFunc:prevPageReq,text:"Previous Page\'s Posts"});
    const nextPage = createButton({id:"nextPage",onClickFunc:nextPageReq,text:"Next Page\'s Posts"});

    let newUserForm = document.createElement("form");
        newUserForm.id = "newUserForm";
       

    uiDiv.appendChild(newUserForm);
    uiDiv.appendChild(prevPage);
    uiDiv.appendChild(nextPage);
   
 
    
    
    document.body.appendChild(uiDiv);
    document.body.appendChild(usersDiv);

    //requests a page containing 10 users
    requestUsers(currentPage);
    //ui to create and POST req new users
    uiNewUser();
  
}

function submitUser() {
    console.log(this.parentElement);

    let userForm = this.parentElement;

    let userBody = {};

   // let emailTest = /\S+@\S+\.\S+/;

        for (let i = 0; i < userForm.length; i++) {
            const element = userForm[i];
                                            //
            if (element.type == "text"){
               
                if(element.value.trim() == ""){
                    return alert("Enter a Name");
                }
                userBody[element.name] = element.value.trim();
            }
            else if (element.type == "email" && element.value.trim() != "" ){
                
                // if(!emailTest.test(element.value.trim())){
                //     return alert ("Enter a Valid Email");
                // }
                userBody[element.name] = element.value.trim();
                
            }
            else if (element.type == "radio"){
               // console.log(element);
                // if (element.checked != false){
                //     userBody[element.name] = element.value;
                //     console.log(userBody);
                    
                //     return JSON.stringify(userBody)
                // }

              // console.log(element.value,element.checked);

               if(element.checked == true){
                   userBody[element.name] = element.value;
                   //console.log(userBody);
                   //return userBody
               
               }
               
            }
            
        }

        console.log(userBody.email);
        
        const email = userBody.email,
                        
            atRegEx = /@/g,

            periodtRegEx = /\.\./

            numOfAts = email.match(atRegEx).length;
            //check if there's a dot at 
        if (email[0] == "." || email[email.length - 1] == "." || numOfAts != 1 || periodtRegEx.test(email) ){
            alert("Invalid Email Entry")

            return
        }

        userBody = JSON.stringify(userBody);

        console.log(userBody);
        

       // postNewUser(userBody);
        

    // for (const htmlElems of userForm) {
    //         //console.log(htmlElems,htmlElems.checked);
            

    //     if(htmlElems.type == "text" && htmlElems.value.trim() != "" ){
    //        // console.log(htmlElems.value);

    //         
            
    //     }
    //     else {
    //         return alert("Please Enter a First and Last Name");
    //     }
    //      if (htmlElems.name == "email" && htmlElems.value.trim() != "" && emailTest.test(htmlElems.value.trim())){
    //         userBody[htmlElems.name] = htmlElems.value.trim()
    //     }
    //     else{
    //         console.log(htmlElems.value, emailTest.test(htmlElems.value.trim()));
            
    //         return alert("Enter A Valid Email");
    //     }
        
    //      if (htmlElems.type == "radio" ){
    //          console.log(htmlElems.value);
             
    //      }
        
    // }


    
}

function uiNewUser () {
    //console.log(newUserForm);

  let fNameInput = document.createElement("input"),
        lNameInput = document.createElement("input"),
        emailInput = document.createElement("input"),
        mRadio = document.createElement("input"),
        fRadio = document.createElement("input"),
        submitBtn = document.createElement("button");



        fNameInput.name = "first_name";
        fNameInput.placeholder = "Enter a First Name";
        lNameInput.name = "last_name";
        lNameInput.placeholder = "Enter a Last Name";
        emailInput.name = "email";
        emailInput.placeholder = "Enter a Email";
        mRadio.type = "radio";
        fRadio.type = "radio";
        emailInput.type = "email";
        mRadio.name = "gender";
        mRadio.value = "male";
        fRadio.name = "gender";
        fRadio.value = "female";
        submitBtn.innerText = "Create New User";
        submitBtn.onclick = submitUser;
        submitBtn.type = "button";

        //DEFAULT VALUES FOR TESTING
        fNameInput.value = "Dad";
        lNameInput.value = "*trafficNoise*";
        emailInput.value = "jbezos@amazon.com";
        


        // newUserForm.innerHTML += "First Name:";
        newUserForm.appendChild(fNameInput);
        // newUserForm.innerHTML += "<br>Last Name:";
        newUserForm.appendChild(lNameInput);
        // newUserForm.innerHTML += "<br>Email:";
        newUserForm.appendChild(emailInput);
        // newUserForm.innerHTML += "<br>Male:";
        newUserForm.appendChild(mRadio);
        // newUserForm.innerHTML += " Female:";
        newUserForm.appendChild(fRadio);    
        // newUserForm.innerHTML += "<br>";
        newUserForm.appendChild(submitBtn);   
       

        
}

function displayUsers(userData){

    //console.log(userData);
       //clear div of HTML

    //    let maxPages = maxPage;
    //         //console.log(maxPages);
            
    usersDiv.innerHTML = "";

    let heading = createHeading({size:2,text:`Page #${currentPage}`})
    usersDiv.appendChild(heading);

    userData.forEach(element => {
       // console.log(element);
        
        
        let div = createDivElem({id:element.id});

            //HEADER

            let nameHeader = createHeading({size:2,text:`${element.first_name} ${element.last_name}`});

            let dobHeader = createHeading({size:3,text:`Date of Birth:${element.dob}`});

            let emailHeader = createHeading({size:4,text:`Email:${element.email}`});

            //INPUTS
            let fNameInput = document.createElement("input");
                fNameInput.placeholder = "Enter a New First Name";
                fNameInput.name = "first_name";

            let lNameInput = document.createElement("input");
                lNameInput.placeholder = "Enter a New Last Name";
                lNameInput.name = "last_name";

            let emailInput = document.createElement("input");
                emailInput.placeholder = "Enter a New Email";
                emailInput.name = "email";

            let dobInput = document.createElement("input");
                dobInput.placeholder = "DOB: YYYY-MM-DD";
                dobInput.name = "dob";

            
                //BUTTONS

             let editBtn = createButton({text:"Edit This User",onClickFunc:editUser});

             let deleteBtn = createButton({text:"Delete This User",onClickFunc:deleteUser});

             //EDIT POST BUTTONS

             let cancelBtn = createButton({text:"Cancel",onClickFunc:cancelEdit});
                //  cancelBtn.style.display = "none";

             let confirmBtn = createButton({text:"Confirm", onClickFunc:confirmEdit});
                //  confirmBtn.style.display = "none";

             let displayDiv = document.createElement("div");
             let editDiv = document.createElement("div");

             div.appendChild(displayDiv);
             div.appendChild(editDiv);

                editDiv.style.display = "none";

                //regular post diplay
                displayDiv.appendChild(nameHeader);
                displayDiv.appendChild(dobHeader);
                displayDiv.appendChild(emailHeader);
                displayDiv.appendChild(editBtn);
                displayDiv.appendChild(deleteBtn);

                //edit post display
                editDiv.innerHTML += `First Name:`;
                editDiv.appendChild(fNameInput);
                editDiv.innerHTML += `<br>Last Name:`;
                editDiv.appendChild(lNameInput);
                editDiv.innerHTML += `<br>Date Of Birth:`;
                editDiv.appendChild(dobInput);
                editDiv.innerHTML += `<br>Email:`;
                editDiv.appendChild(emailInput);
                editDiv.innerHTML += `<br>`;
                editDiv.appendChild(cancelBtn);
                editDiv.appendChild(confirmBtn);

                
                //append subdiv to main div
                usersDiv.appendChild(div);

    });
    
}
function confirmEdit(){
    
   // console.log(this,this.parentElement,this.parentElement.parentElement);
   
//  let editDiv =  this.parentElement;

    let divChildren =  this.parentElement.children,
        userID = this.parentElement.parentElement.id,
        updateReqBody = {};



    for (const htmlElems of divChildren) {
        //console.log(htmlElems,htmlElems.nodeName,htmlElems.name,htmlElems.value,);
        
        if(htmlElems.nodeName == "INPUT" && htmlElems.value.trim() != "" ){
          //console.log(htmlElems.name);
          //empty object [entered key] = input value[entered value]
            updateReqBody[htmlElems.name] = htmlElems.value.trim();
        } 
        
    }

    if (JSON.stringify(updateReqBody) === "{}" || Object.keys(updateReqBody).length === 0){
        console.log("no inputs");
        alert("NO INPUT NO CHANGES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        return
        
    }
    else{
        console.log("Requesting user info update");
        
    }

    
        //stringify of body object
    updateReqBody = JSON.stringify(updateReqBody);

        //xhr PATCH
    updateUserReq(userID,updateReqBody);

    
    //switch display from edit display  to post display
    let displayDiv = this.parentElement.parentElement.firstChild;

    let editDiv = this.parentElement;

    displayDiv.style.display = "inline";

    editDiv.style.display = "none"
    

    
}

function cancelEdit() {
   // console.log(this,this.parentElement,this.parentElement.parentElement);

   // alert("CANCELED");

    let displayDiv = this.parentElement.parentElement.firstChild;

    let editDiv = this.parentElement;

    displayDiv.style.display = "inline";

    editDiv.style.display = "none"

        //if there was more then two childNodes

    // for (let i = 0; i < singleUserDiv.childNodes.length; i++) {
    //     const divElem = singleUserDiv.childNodes[i];

    //    // console.log(divElem);

    //    if(divElem.style.display == "none"){
    //         divElem.style.display = "inline";
    //    }
    //    else{
    //        divElem.style.display = "none";
    //    }
        
        
    // }

    
}

function editUser(){

    //hide  show elements
  //  editDiv.style.display = "initial";

   // this.parentElement.style.display = "none";
    // console.log(this.parentElement.parentElement.lastChild);

    let editDiv = this.parentElement.parentElement.lastChild;

        editDiv.style.display = "inline";
    

    this.parentElement.style.display = "none";
    


}

function deleteUser(){

//  console.log(this.parentElement.id);

   // console.log(this);
   // delete button has been nested one div deeper so use .parentElement twice
    
    let userID = this.parentElement.parentElement.id;

    let confirm = prompt("type DELETE");

    if (confirm != null &&confirm.toUpperCase() == "DELETE"){
        this.parentElement.parentElement.remove();

        deleteUserReq(userID);
    }
    else{
        alert("User Was Not Deleted")
    }
    //deletes from front end
//     this.parentElement.remove();
//     //deletes server side
//    deleteUserReq(userID);

}

function prevPageReq() {

    // if (currentPage == 1){
    //     currentPage = 100;
    // }

    currentPage = currentPage == 1 ? maxPages : currentPage - 1;

    requestUsers(currentPage);

}

function nextPageReq() {
    currentPage = currentPage == maxPages ? 1 : currentPage + 1; 

    requestUsers(currentPage);
}