import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const socketURL = 'ws://0.0.0.0:3001';

function NavBar(){
  return (
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
  </nav>);
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [], //messages
      currentUser: {name: 'Anonymous'}
    }
  }

  componentDidMount() {
    this.socket = new WebSocket(socketURL);
    this.socket.onopen = (event) => {
      console.log('Connected to server.')
    }
  }

  sendToServer(newMessage, username){
    this.socket.send(JSON.stringify(newMessage));
    this.socket.onmessage = (e) => {
      const allOldMessages = this.state.messages;
      const serverMessage = JSON.parse(e.data);
      const allNewMessages = [...allOldMessages, serverMessage];
      let updateObject = {
        messages: allNewMessages
      };
      if (username){
        updateObject.currentUser = {name: username};
      }
      this.setState(updateObject);
    }
  }

  _addIncomingMessage = message => {
    const username = this.state.currentUser.name;
    const newMessage = {
      content: message,
      type: 'incomingMessage',
      username
    };
    this.sendToServer(newMessage);
  }

  _updateUsername = username => {
    const newContent = `${this.state.currentUser.name} has changed their username to ${username}`;
    const newMessage = {
      content: newContent,
      type: 'incomingNotification'
    };
    this.sendToServer(newMessage, username);
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser.name}
          addMessage={this._addIncomingMessage}
          updateUsername={this._updateUsername}/>
      </div>
    );
  }
}
export default App;
