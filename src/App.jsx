import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const socketURL = 'ws://0.0.0.0:3001';

// Render function for NavBar
const NavBar = ({numberOfUsers}) => {
  return (
  <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <span className="navbar-users">{numberOfUsers}</span>
  </nav>);
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      currentUser: {name: 'Anonymous'},
      numberOfUsers: 1
    }
  }

  // Initializes socket
  componentDidMount() {
    this.socket = new WebSocket(socketURL);
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }
    this.socket.onmessage = this._receiveDataFromServer;
  }

  // Callback function for this.socket.onmesage
  // Sets the state of either the number of users or messages
  _receiveDataFromServer = (e) => {
    const serverMessage = JSON.parse(e.data);
    if(serverMessage.type === 'incomingUser'){
      this.setState({
        numberOfUsers: serverMessage.content
      })
    } else {
      const allOldMessages = this.state.messages;
      const allNewMessages = [...allOldMessages, serverMessage];
      let updateObject = {
        messages: allNewMessages
      };

      this.setState(updateObject);
    }
  }

  // Creates the message object coming from our user
  // and sends the object to server
  _addIncomingMessage = (message, username) => {
    const thisUsername = username ? username : this.state.currentUser.name;
    let newMessage = {
      content: message,
      oldUsername: this.state.currentUser.name,
      newUsername: thisUsername
    };

    if (thisUsername === this.state.currentUser.name){
      newMessage.type = 'postMessage';
    } else {
      newMessage.type = 'postNotification';
      this.setState({
        currentUser: { name: thisUsername }
      });
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    const userCount = `${this.state.numberOfUsers} user${(this.state.numberOfUsers > 1) ? 's' : ''} online`
    return (
      <div>
        <NavBar numberOfUsers={userCount}/>
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
