import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';
import messages from './messages.json'

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
      messages: messages,
      currentUser: 'Anonymous'
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { username: "Michelle", content: "Hello there!", type:"incomingMessage" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  _addIncomingMessage = message => {
    const username = this.state.currentUser;
    const newMessage = {
      content: message,
      type: 'incomingMessage',
      username
    };
    const allOldMessages = this.state.messages;
    const allNewMessages = [...allOldMessages, newMessage];
    this.setState({
      messages: allNewMessages
    });
  }

  // _addNotificationMessage = () => {

  // }

  _updateUsername = username => {
    const newContent = `${this.state.currentUser} has changed their username to ${username}`;
    const newMessage = {
      content: newContent,
      type: 'incomingNotification'
    };
    const allOldMessages = this.state.messages;
    const allNewMessages = [...allOldMessages, newMessage];
    this.setState({
      currentUser: username,
      messages: allNewMessages
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this._addIncomingMessage}
          updateUsername={this._updateUsername}/>
      </div>
    );
  }
}
export default App;
