firstXHR.html -
    XMLHttpReq:an API (application programming interface) in the form of an object
whose methods transfer data between a web browser and a web server. How to make a XHR: 1. Create a new instance of XHR (let xhr = new XMLHttpRequest()) 2. Open the channel for the req (xhr.open(reqMethod,endpoint(API URL),asyncbool) PARAMS REQUIRED) 3. Callback xhr.onload = () =>{} function called when a XHR transcation completes successfully 4. Finalize the "open" method and send data alone with req when needed: xhr.send() PARAMS REQUIRED

request an array of Objects containing  usernames info and logs it to console



2XHR.html - 
    Second use of XHR appends username, GITHUB link, & a button with onclick (console log more User info) to DOM for each user object in array

firstPostReq -
    first user of XHR "POST" request method 
    POST is used to send data to a server to create/update a resource.



        xhr.setRequestHeader('Content-Type', 'application/JSON')

        //objects must be stringified to pass through HTTP/ the internet

            let postObj = JSON.stringify(object made from user input of form)

        xhr.send(request body)

firstPUT-PATCH-REQ - 
    first use of "PUT" & "PATCH" request methods

    Idempotence - property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application

    The difference between POST and PUT is that PUT requests are idempotent. That is, calling the same PUT request multiple times will always produce the same result. In contrast, calling a POST request repeatedly have side effects of creating the same resource multiple times.

    PUT is a method of modifying resource where the client sends data that updates the entire resource. It is used to set an entity’s information completely.PUT overwrites the entire entity if it already exists, and creates a new resource if it doesn’t exist.

    PATCH applies a partial update to the resource.Only required to send the data that you want to update, and it won’t affect or change anything else

    isNaN() Method

    Object.keys()

    bracknet notation vs dot notation accessing object properties
