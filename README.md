Chatty App (React UI with Websocket Server)
=====================

Final Product
!["Chat Room"](https://github.com/kpalosot/react-simple-boilerplate/blob/master/docs/Chatty_App.png?raw=true)

Features:
* Multiple users can connect to the chat room.
* Users can choose their own username.
* Users are assigned colours to their names.
* Users can see whenever a new user enters the chat room.
* Users can see whenever a user leaves the chat room.
* Users can see how many users are in the room.

### Usage

Under chatty_server directory, install dependencies and start the websocket server.
```
npm install
npm start
```

Install the dependencies and start server in the root directory.

```
npm install
npm start
open http://localhost:3000
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Express
* uuid
