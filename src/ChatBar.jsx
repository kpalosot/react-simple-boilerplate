import React, {Component} from 'react';

const InputArea = props => {
  let inputAreaSettings = {
    onKeyDown: props.keyPressHandler
  };
  if(props.currentUser){
    inputAreaSettings.className = 'chatbar-username';
    inputAreaSettings.name = 'username';
    inputAreaSettings.placeholder = 'Your username (optional)';
    inputAreaSettings.defaultValue=props.currentUser;
  } else {
    inputAreaSettings.className = 'chatbar-message';
    inputAreaSettings.name = 'content';
    inputAreaSettings.placeholder = 'Type a message and hit ENTER';
  }

  return <input {...inputAreaSettings}/>;

}

const FooterBar = ({currentUser, keyPressHandler}) => {
  return (
    <div className="chatbar">
      <InputArea
        currentUser={currentUser}
        keyPressHandler={keyPressHandler}/>
      <InputArea
        keyPressHandler={keyPressHandler}/>
    </div>
  );
}

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
      <FooterBar currentUser={username} keyPressHandler={this._handleKeyPress}/>
    );
  }
}
