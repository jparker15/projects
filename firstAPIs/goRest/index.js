let currentPage = 1;


window.onload = () => {


    let uiDiv = createDivElem({id:"uiDiv"});

    let usersDiv = createDivElem({id:"usersDiv"});

    let prevPage = createButton({id:"prevPage",onClickFunc:prevPageReq,text:"Previous Page\'s Posts"});
    let nextPage = createButton({id:"nextPage",onClickFunc:nextPageReq,text:"Next User\'s Posts"});
  

    uiDiv.appendChild(prevPage);
    uiDiv.appendChild(nextPage);
    
    
    
    document.body.appendChild(uiDiv);
    document.body.appendChild(usersDiv);
    
    requestUsers(currentPage);
  
}

function displayUsers(userData){

    //console.log(userData);
        //clear div of HTML
    usersDiv.innerHTML = "";

    let heading = createHeading({size:2,text:`Page #${currentPage}`})
    usersDiv.appendChild(heading);

    userData.forEach(element => {
       // console.log(element);
        
        
        let div = createDivElem({id:element.id});

            let nameHeader = createHeading({size:2,text:`${element.first_name} ${element.last_name}`});

           

            let dobHeader = createHeading({size:3,text:`Date of Birth:${element.dob}`});

            let emailHeader = createHeading({size:4,text:`Email:${element.email}`});

             let editBtn = createButton({text:"Edit This User",onClickFunc:editUser});

             let deleteBtn = createButton({text:"Delete This User",onClickFunc:deleteUser});

                
                div.appendChild(nameHeader);
                div.appendChild(dobHeader);
                div.appendChild(emailHeader);
                div.appendChild(editBtn);
                div.appendChild(deleteBtn);

                usersDiv.appendChild(div);

    });
    
}

function editUser(){

}

function deleteUser(){

//  console.log(this.parentElement.id);

   // console.log(this);
    
    let userID = this.parentElement.id;

    let confirm = prompt("type DELETE");

    if (confirm != null &&confirm.toUpperCase() == "DELETE"){
        this.parentElement.remove();

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

    currentPage = currentPage == 1 ? 104 : currentPage - 1;

    requestUsers(currentPage);

}

function nextPageReq() {
    currentPage = currentPage == 104 ? 1 : currentPage + 1; 

    requestUsers(currentPage);
}