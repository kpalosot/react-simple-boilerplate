import React, {Component} from 'react';

export default class ChatBar extends Component {
  _handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        if(e.target.name === 'content'){
          this.props.addMessage(e.target.value);
          e.target.value = '';
        } else {
          this.props.updateUsername(e.target.value);
        }
      }
  }

  render(){
    const username = this.props.currentUser ? this.props.currentUser : "Anonymous2.0";
    return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        name="username"
        placeholder="Your username (optional)"
        defaultValue={username}
        onKeyDown={this._handleKeyPress}/>
      <input
        className="chatbar-message"
        name="content"
        placeholder="Type a message and hit ENTER"
        onKeyDown={this._handleKeyPress}/>
    </footer>);
  }
}