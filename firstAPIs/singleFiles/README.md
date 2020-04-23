firstXHR.html -
    XMLHttpReq:an API (application programming interface) in the form of an object
whose methods transfer data between a web browser and a web server. How to make a XHR: 1. Create a new instance of XHR (let xhr = new XMLHttpRequest()) 2. Open the channel for the req (xhr.open(reqMethod,endpoint(API URL),asyncbool) PARAMS REQUIRED) 3. Callback xhr.onload = () =>{} function called when a XHR transcation completes successfully 4. Finalize the "open" method and send data alone with req when needed: xhr.send() PARAMS REQUIRED

request an array of Objects containing  usernames info and logs it to console



2XHR.html - 
    Second use of XHR appends username, GITHUB link, & a button with onclick (console log more User info) to DOM for each user object in array