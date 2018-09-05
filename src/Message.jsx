import React, {Component} from 'react';

export default function Message(props) {
  let classType = 'message';
  const message = props.message;
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