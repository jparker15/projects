let allPost;

let viewingUser = 1;

window.onload = () => {


    let uiDiv = createDivElem({id:"uiDiv"});

    let postsDiv = createDivElem({id:"postsDiv"});

    let prevUser = createButton({id:"prevBtn",onClickFunc:prevUsrPost,text:"Previous User\'s Posts"});
    let nextUser = createButton({id:"nextBtn",onClickFunc:nextUsrPost,text:"Next User\'s Posts"});
    //console.log(formID); form made in html
    uiDiv.appendChild(formID);
    uiDiv.appendChild(prevUser);
    uiDiv.appendChild(nextUser);
    
    
    
    document.body.appendChild(uiDiv);
    document.body.appendChild(postsDiv);
    reqAllPosts()
    
    
    
  
}
function displayPosts(){
    //clears div containing posts of HTML elements
    postsDiv.innerHTML = "";

    let userNameHeading = createHeading({
        size:1,
        text:`Users #${viewingUser}'s Posts`
    })

    postsDiv.appendChild(userNameHeading);
    

    for (let i = 0; i < allPost.length; i++) {
       
       // console.log(allPost[i].userId);

        if(allPost[i].userId == viewingUser){
            //console.log(allPost[i]); 

            //display userinfo  in a div
            let div = createDivElem({id:allPost[i].id});

            let title = createHeading({size:2,text:allPost[i].title});

            let body = createHeading({size:4,text:allPost[i].body});

            let editBtn = createButton({text:"Edit This Post",onClickFunc:editPost});

            let deleteBtn = createButton({text:"Delete This Post",onClickFunc:deletePost});

                
                div.appendChild(title);
                div.appendChild(body);
                div.appendChild(editBtn);
                div.appendChild(deleteBtn);

                postsDiv.appendChild(div);

           
        }
        
    }

}

function reqAllPosts(){
    let xhr = new XMLHttpRequest();

        const endpoint = "https://jsonplaceholder.typicode.com/posts";

        xhr.open("GET",endpoint,true);
        
        xhr.onload = () =>{
            let parsedData = JSON.parse(xhr.responseText)
            // allPost is a global array containing all user post
            allPost = parsedData;

            displayPosts()

            console.log(allPost);
        }

        xhr.send();
}

function editPost(){

    
    

}

function deletePost(){
                //button . div the button is appened to. id property
    let postID = this.parentElement.id,

    

    endpoint = `https://jsonplaceholder.typicode.com/posts/${postID}`;
    console.log(postID);
   // console.log(allPost[postID-1]);
   let deletedPosts = [];
   
   
    for(let i = 0;i< allPost.length;i++){

        if(postID == allPost[i].id){

            console.log(`delete ${postID}/${allPost[i].id}`);
        
            let postIndex = allPost[i].id - 1;
        
        

            // let test = allPost.splice(postIndex,1);

            // console.log(test);
            // deletedPosts.push(test);
        }       
    }

    console.log(deletedPosts);
    
    
    

    let xhr = new XMLHttpRequest();

        xhr.open("DELETE",endpoint,true)

        xhr.onload = () => {
            
            let parsedData = JSON.parse(xhr.responseText);

            console.log(parsedData);

            
            
            
            
        }

        xhr.send();

        this.parentElement.remove();
       // postsDiv.removeChild(this.parentElement)

}

function prevUsrPost(){
    //ternary ?
    viewingUser = viewingUser == 1 ? 10 : viewingUser - 1;

    // console.log(viewingUser);
    
    displayPosts()
}

function nextUsrPost(){

    if(viewingUser < 10){
        viewingUser++;
    }
    else{
        viewingUser = 1;
    }

    // console.log(viewingUser);

    displayPosts()
    

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