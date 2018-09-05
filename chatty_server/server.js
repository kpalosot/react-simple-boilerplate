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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const announceNewUser = {
    id: uuid(),
    content: 'New user entered the chatroom.',
    type: 'incomingNotification'
  };

  ws.username = 'Anonymous';

  sendMessage(announceNewUser);

  ws.on('message', function incoming(data){
    const message = JSON.parse(data);
    ws.username = message.newUsername;

    if(message.oldUsername !== message.newUsername){
      console.log('doing first send');
      const newMessageObj = {
        id: uuid(),
        type: 'incomingNotification',
        content: `${message.oldUsername} has changed their username to ${message.newUsername}`
      };
      sendMessage(newMessageObj);
    }

    if(message.content){
      const newMessageObj = {
        id: uuid(),
        type: 'incomingMessage',
        content: message.content,
        username: message.newUsername
      };
      sendMessage(newMessageObj);
    }

  });

  sendUserCount();

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
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