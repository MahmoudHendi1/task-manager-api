# Task-Manager-API
Task-Manager-API is a simple API allowing users to create, read, edit and delete tasks to do.

## Installation
Task-Manager-API requires [Node.js](https://nodejs.org/) v4+ to run.
Install the dependencies and devDependencies and start the server.
```sh
$ cd task-manager-api
$ npm install -d
$ node app
```
You need to have a config folder with dev.env file to set some environment variable we are going to use.
So, in the project folder create a folder called `config` , in this folder create a file `dev.env`. In this file you have ro provide values for: 
`PORT` : The port used to run the server
`JWT_SECRET` : Is used to hash the passwords
`SENDGRID_API_KEY` : The API for sendgrid email service
`MONGODB_URL` : MongooDB url
 
You have to set the same variable into production environment.

# Built With 
* NodeJS
* Express.js
* MongooDB

It also uses `jest` for testing.

## Test it Yourself!
You can test the API by running deffrient requests, here is some examples:
`host[https://hendi-task-manager.herokuapp.com/]`

#### To create a new user 
* The email should be unique
* The password should be longer than 6 characters

Method used: `POST '/users'`
```
+ Request  (application/json) 
    body{
        "name":"example",
        "email" : "example@gmail.com",
        "password" : "example123"
    }
```
Success!
```
+ Response 201 (application/json)
    {
    "user": {
        "age": 0,
        "_id": "600988c5f2291a0015f7920a",
        "name": "example",
        "email": "example@gmail.com",
        "createdAt": "2021-01-21T13:59:33.727Z",
        "updatedAt": "2021-01-21T13:59:33.862Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA5ODhjNWYyMjkxYTAwMTVmNzkyMGEiLCJpYXQiOjE2MTEyMzc1NzN9.sa9-Cz2RNI_0gZdvVbQc2sXo-ri0xFWAu5aJku7hKv8"
}
```
If the email is already used
```
+ Response 400 (application/json)
    {
    "driver": true,
    "name": "MongoError",
    "index": 0,
    "code": 11000,
    "keyPattern": {
        "email": 1
    },
    "keyValue": {
        "email": "example@gmail.com"
    }
    }
```
#### To Login 
* You must have an account first

Method used: `POST '/users/login'`
```
+ Request  (application/json) 
    body{
    "email":"example@gmail.com",
    "password":"example123"
    }
```
Success!
```
+ Response 200 (application/json)
    {
        "user": {
            "age": 0,
            "_id": "600988c5f2291a0015f7920a",
            "name": "example",
            "email": "example@gmail.com",
            "createdAt": "2021-01-21T13:59:33.727Z",
            "updatedAt": "2021-01-21T14:17:43.698Z",
            "__v": 2
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA5ODhjNWYyMjkxYTAwMTVmNzkyMGEiLCJpYXQiOjE2MTEyMzg2NjN9.aLlMb8vHZpfk-2dHdfVvg7lvhHDTmlOpt-dNm5a2XxE"
    }
```
or
```
+ Response 400 (application/json)
```
**There is more and more requests you can make like, create a edit user information, or you can add,read,edit and delets tasks. Test them all out**

## Developer Notes
This was an interesting project where I learned new things and it introduced to me new techniques. What I learned during this project: 
- Mongoos DB
- REST API Authentication
- NodeJS testing using Jest and SuperTest
- App Deployment
.. and more.

I really enjoyed it.
