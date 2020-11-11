# War-Game
War-Game

## Features
* Login using JWT, Auth
* Deployed using AWS EC2 instance
* Authenticated routes using middleware and stored token in users browsers localstorage
* Retreive users score from backend upon logging in and update users score upon winning using get/put requests
* Followed proper rest principles
* Implemented two tests

[Link to website](http://ec2-18-217-213-221.us-east-2.compute.amazonaws.com:5000) <br />
You can login using the following credentials: <br />
username:test <br/>
password:test123


## Details
If I had more time I would add features/improvements such as:<br />
display a nice visual and effect of cards being flipped (map card objects to actual images)<br />
use more OOP methods and keep code more modular and concise (importing and exporting functions within the game component)<br />
add more tests such as to test if the user and comp's cards add up to 52 at each play <br />
sockets to allow users to play amongst one another<br />
log users out when there token expires <br />



## Technologies
postgreSQL,nodeJS,express,react

## Usage
# 
```
    run npm install
    run node index.js
```
