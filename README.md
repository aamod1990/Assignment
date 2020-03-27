# Assignment
This is HCL assignment

## Version ###

`0.0.1`

Getting started:
* [Prerequisites](./README.md#markdown-header-prerequisites)
* [Installation](./README.md#markdown-header-installation)
* [Run](./README.md#markdown-header-run)
* [Input](./README.md#markdown-header-input)
* [Output](./README.md#markdown-header-output)
* [TestCases](./README.md#markdown-header-testcaces)
* [Problem Statement](./README.md#markdown-header-problem-statement)

## Prerequisites


Ensure local installation of following softwares/tools:

* NodeJS (v6.9 or higher)
* NPM (v3.10.9 or higher)
* Angular CLI: (v6.2.9 or higher)
* git (v2.17 or higher)

## Installation
Open your command/shell terminal

~~~ sh
# clone project
git clone https://github.com/aamod1990/Assignment.git

# navigate to 
cd Assignment
cd server
npm install
npm start

# Open your other command/shell terminal
cd Assignment
cd client
npm install
ng serve

~~~

## Run

~~~ sh
# Fire-up the engine
http://localhost:4200
~~~


## Problem Statement

~~~sh
Create 2 users in the database with default username/password combination. 

Users should land onto the login page on website load. User should feed in his username and password to get to his personalized page
Users should be presented with his exercise logs on the homepage. “No details found” shall be shown in case no logs are saved by the user.
Users should be able to create a new exercise log by feeding the name of the exercise, count and date. 
Users should also be able to delete/update their exercise log.
Use your creativity to design the application as you want it to be.
You can use React/Angular(any) for frontend. Mongo, express and node shall be used as a backend technology stack.
~~~
