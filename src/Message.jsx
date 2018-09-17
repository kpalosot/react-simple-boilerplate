import React, {Component} from 'react';

// Render function for a message
export default function Message({ message }) {
  // const message = props.message;
  const classType = (message.type === 'incomingNotification') ?
    'message system' : 'message';

  const username = message.username ?
    (<span className="message-username" style={{color: message.color}}>{message.username}</span>) : null;

  return (
    <main className={classType}>
      {username}
      <span className="message-content" dangerouslySetInnerHTML={{
        __html: message.content
      }}/>
    </main>
  );
}