# express-crud

For testing the app through postman:

For authentication send a POST request to:
- https://obscure-lake-37942.herokuapp.com/api/login
- with the request body as raw and JSON(application/json) option 
- { "username": "testUser99", "password": "password99" }
- you may also login using the frontend using the same credential for username and password


Base URL / Login page:
https://obscure-lake-37942.herokuapp.com/api/

Endpoints (All requests require login except for registration):
GET
https://obscure-lake-37942.herokuapp.com/api/users
https://obscure-lake-37942.herokuapp.com/api/users/:userId

For the user id, the objectIds from the collection are to be used:

- 5baa9d0f4cbd871a85467d41
- 5baa9ed2337aa61b13f114c2
- 5baaf6fa44502e4a67a5f046
- 5baaf8ac538cac4bef896cee
- 5bab021df18e4e514ba3cc3e
- 5baa96b7d8ce0117a0787ac7

Ex. https://obscure-lake-37942.herokuapp.com/api/users/5baa96b7d8ce0117a0787ac7

POST (Creating new entries for the collection)
- https://obscure-lake-37942.herokuapp.com/api/users    -- create new user
send request through postman with the following request body: 
{
  "username": "testUser100",
  "email": "anotherMail@gmail.com",
  "password": "secretPassword"
}

POST (logout) --- sets the "auth" key to false
 - https://obscure-lake-37942.herokuapp.com/api/logout


PUT (updating a record, requires login)
 - https://obscure-lake-37942.herokuapp.com/api/users/:userId
 
 send post request through post man to the following endpoint and request body as:
 {"username": "value", "email": "another@mail.com", "password": "anothervalue"}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
