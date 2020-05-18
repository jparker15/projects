const restKey = "S6M5p6JU9O0GOXmXy4yExjWNoDCUedJL5cfU";

//requestUsers(1)

//deleteUser(1121)

function postNewUser (body) {
    const endpoint = `https://gorest.co.in/public-api/users`;

    let xhr = new XMLHttpRequest();

        xhr.open ("POST",endpoint,true)

        xhr.onload = () =>{

            let parsedData = JSON.parse(xhr.responseText);

            console.log(parsedData._meta);

            //if(parsedData)
            

        }

        xhr.setRequestHeader("Content-Type","application/json");
        xhr.setRequestHeader("Authorization",`Bearer ${restKey}`);

        xhr.send(body);
    
}

function requestUsers (pageNum,maxPage) {

    const endpoint = `https://gorest.co.in/public-api/users?access-token=${restKey}&page=${pageNum}`;


    let xhr = new XMLHttpRequest();

    xhr.open("GET",endpoint,true);

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText);

        maxPages = parsedData._meta.pageCount;

        let allUsers = parsedData.result;

        console.log(allUsers);
      // let maxPage = parsedData._meta.pageCount;

        displayUsers(allUsers);
        
        
    }

    xhr.send();


}

function deleteUserReq (userID){
    const endpoint = `https://gorest.co.in/public-api/users/${userID}?access-token=${restKey}`;

    let xhr = new XMLHttpRequest();

    xhr.open("DELETE",endpoint,true);

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText);
        
        console.log(parsedData);
    }

    xhr.send();

}

//updateUser(1149)

function updateUserReq (userID,body){

    // let firstName = prompt("First Name","Kelly");
    // let lastName = prompt("Last Name","Clarkson");
    // let email = prompt("EMaiL?", "agentkc@aol.com")
    // const body = JSON.stringify({

    //     first_name: firstName,
    //     last_name: lastName,
    //     email: email,
        

    // });


    const endpoint = `https://gorest.co.in/public-api/users/${userID}?access-token=${restKey}`;

    let xhr = new XMLHttpRequest();
            //PUT can't change entire JSON of this API 
        xhr.open("PATCH", endpoint, true);

        xhr.onload = () => {

            let parsedData = JSON.parse(xhr.responseText);

            console.log(parsedData);
            

        }

        xhr.setRequestHeader("Content-Type","application/json");

        xhr.send(body);
}