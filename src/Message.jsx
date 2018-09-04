import React, {Component} from 'react';

export default class Message extends Component {
  render(){
    let classType = 'message';
    const message = this.props.message;
    if(message.type === 'incomingNotification'){
      classType += ' system';
    }

    const username = message.username ?
      (<span className="message-username">{message.username}</span>) :
      null;

    return (
      <main className={classType}>
        {username}
        <span className="message-content">{message.content}</span>
      </main>
    );
  }
}