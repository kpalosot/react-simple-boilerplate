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
      messages: messages
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar />
      </div>
    );
  }
}
export default App;
