import React, {Component} from 'react';

const InputArea = props => {
  let inputAreaSettings = {
    onKeyPress: props.keyPressHandler,
    onChange: props.onChangeHandler
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

const FooterBar = ({currentUser, keyPressHandler, onChangeHandler}) => {
  return (
    <div className="chatbar">
      <InputArea
        currentUser={currentUser}
        keyPressHandler={keyPressHandler}
        onChangeHandler={onChangeHandler}/>
      <InputArea
        keyPressHandler={keyPressHandler}
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
      const conditionUser = this.state.username.length > 0;
      const conditionText = this.state.inputTextValue.length > 0;
      if(conditionUser && conditionText){
        this.props.addMessage(this.state.inputTextValue, this.state.username);
      } else if(conditionUser && !(conditionText)){
        this.props.addMessage(null, this.state.username);
      } else if(!(conditionUser) && conditionText){
        this.props.addMessage(this.state.inputTextValue, null);
      }
      if(e.target.name === 'content'){
        e.target.value = '';
        this.setState({
          inputTextValue: ''
        })
      }
    }
  }

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
    // const username = this.props.currentUser ? this.props.currentUser : "Anonymous2.0";
    return (
      <FooterBar currentUser={this.props.currentUser} keyPressHandler={this._handleKeyPress} onChangeHandler={this._onTextChange}/>
    );
  }
}
