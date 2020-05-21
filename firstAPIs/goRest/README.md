# API to respond to Go Rest API


## Technology Used :

# GO Rest 

**24/7 online fake REST API service for quick testing and prototyping of web and android applications. Supports authentication, rate limiting, response format negotiation.**

## CRUD

**Create, Read, Update, and Delete: the four basic types of functionality when building APIs**

## XHR (XMLHttpRequest) 

**Objects are used to interact with servers. Can retrieve data from a URL without having to do a full page refresh.**

### new XMLHttpRequest() - initializes a new instance of XHR 

### xhr.open(request method, endpoint(url), async boolean) - initializes a newly-created request)

* request methods (GET", "POST", "PUT", "DELETE") - indicate the desired action to be performed 

* endpoint or url - a string representing the URL to send the request to

* async boolean - An optional Boolean parameter, defaulting to true, indicating whether or not to perform the operation asynchronously. If this value is false, the send() method does not return until the response is received.


### xhr.onload - the function(callback) called when a XHR completes successfully

### xhr.send - sends the request to the server also accepts an optional param that let's you specify the request body. 

* body is sent with PUT, POST, or PATCH requests. If req method is GET the param is ignored

