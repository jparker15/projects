const restKey = "S6M5p6JU9O0GOXmXy4yExjWNoDCUedJL5cfU";

//requestUsers(1)

//deleteUser(1121)

function postNewUser (body) {
    const endpoint = `https://gorest.co.in/public-api/users?access-token=${restKey}`;

    let xhr = new XMLHttpRequest();

        xhr.open ("POST",endpoint,true)

        xhr.onload = () =>{

            let parsedData = JSON.parse(xhr.responseText);

            console.log(parsedData);
            

        }

        xhr.setRequestHeader("Content-Type","json/application")

        xhr.send(body)
    
}

function requestUsers (pageNum) {

    const endpoint = `https://gorest.co.in/public-api/users?access-token=${restKey}&page=${pageNum}`;


    let xhr = new XMLHttpRequest();

    xhr.open("GET",endpoint,true);

    xhr.onload = () => {

        let parsedData = JSON.parse(xhr.responseText);

       // console.log(parsedData);

        let allUsers = parsedData.result;

       // console.log(allUsers);

        displayUsers(allUsers, parsedData._meta.currentPage);
        
        
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