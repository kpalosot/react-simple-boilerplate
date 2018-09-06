// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const getColor = () => {
  const colors = ['#ff0000', '#0000ff', '#00ff00', '#000000'];
  let index = (wss.clients.size > 3) ? (wss.clients.size % 3) : wss.clients.size;
  return colors[index];
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Create a message to everyone in chate that a new user has entered the chatroom
  const announceNewUser = {
    id: uuid(),
    content: 'New user entered the chatroom.',
    type: 'incomingNotification'
  };
  sendMessage(announceNewUser);

  // Placeholder for username of connected user
  ws.username = 'Anonymous';
  ws.color = getColor();
  console.log(ws.color);


  ws.on('message', function incoming(data){
    const message = JSON.parse(data);

    // Sets the username to the newUsername
    ws.username = message.newUsername;

    // Checks if the user has changed their username
    // Sends a notification to all clients if true
    if(message.oldUsername !== message.newUsername){
      const newMessageObj = {
        id: uuid(),
        type: 'incomingNotification',
        content: `${message.oldUsername} has changed their username to ${message.newUsername}`
      };
      sendMessage(newMessageObj);
    }

    // Sends a message to all clients if there is a message passed bu the client
    if(message.content){
      const newMessageObj = {
        id: uuid(),
        type: 'incomingMessage',
        content: message.content,
        username: message.newUsername,
        color: ws.color
      };
      sendMessage(newMessageObj);
    }
  });

  // Sends the new user count to all clients whenever a new user enters the chat
  sendUserCount();

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    // Updates all users to
    sendUserCount();
    const newMessageObj = {
      type: 'incomingNotification',
      content: `${ws.username} has left the chatroom.`,
      id: uuid()
    };
    sendMessage(newMessageObj);
  });
});

function sendUserCount(){
  const numberOfUsers = wss.clients.size;
  const newUserMessage = {
    type: 'incomingUser',
    content: numberOfUsers
  };
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newUserMessage));
    }
  });
}

function sendMessage(message){
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}