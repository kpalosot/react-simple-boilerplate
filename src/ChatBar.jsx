import React, {Component} from 'react';

// Render function for input
const InputAreaText = props => {
  let inputAreaSettings = {
    onChange: props.onChangeHandler,
    className: 'chatbar-message',
    name: 'content',
    placeholder: 'Type a message and hit ENTER'
  };

  return <input {...inputAreaSettings}/>;

}

const InputAreaUserName = props => {
  let inputAreaSettings = {
    onChange: props.onChangeHandler,
    className: 'chatbar-username',
    name: 'username',
    placeholder: 'Your username (optional)',
    defaultValue: props.currentUser
  };

  return <input {...inputAreaSettings} />;

}

// Render function for FooterBar
const FooterBar = ({currentUser, keyPressHandler, onChangeHandler}) => {
  return (
    <div className="chatbar" onKeyPress={keyPressHandler}>
      <InputAreaUserName
        currentUser={currentUser}
        onChangeHandler={onChangeHandler}/>
      <InputAreaText
        onChangeHandler={onChangeHandler}/>
    </div>
  );
}

export default class ChatBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.currentUser,
      inputTextValue: ''
    }
  }
  // Handles event when user presses 'ENTER'
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Make sure that the current states have actual value to be sent
      // Prohibits user to send an empty string as their username
      // Prohibits user to send an empty string as message
      const newUser = this.state.username.length > 0 ? this.state.username : null;
      const newText = this.state.inputTextValue.length > 0 ? this.state.inputTextValue : null;
      this.props.addMessage(newText, newUser);


      // resets the text box and the text state to an empty string
      if(e.target.name === 'content'){
        e.target.value = '';
        this.setState({
          inputTextValue: ''
        });
      }
    }
  }

    // Updates the states on change in the input text boxes
  _onTextChange = (e) => {
    if(e.target.name === 'content'){
      this.setState({
        inputTextValue: e.target.value
      });
    } else if(e.target.name === 'username'){
      this.setState({
        username: e.target.value
      })
    }
  }

  render(){
    return (
      <FooterBar currentUser={this.state.username} keyPressHandler={this._handleKeyPress} onChangeHandler={this._onTextChange}/>
    );
  }
}
