import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const socketURL = 'ws://0.0.0.0:3001';

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

  componentDidMount() {
    this.socket = new WebSocket(socketURL);
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }
    this.socket.onmessage = this.receiveDataFromServer;
  }

  receiveDataFromServer = (e) => {
    console.log(this.state);
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
