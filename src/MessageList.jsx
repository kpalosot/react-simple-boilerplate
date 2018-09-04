import React, {Component} from 'react';
import Message from './Message.jsx';

function Loading(){
  return (
    <h1>Loading messages...</h1>
  );
}

export default class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    this.setState({
      loading: false
    })
  }

  render(){
    const messageItems = this.state.loading ? <Loading /> :
      this.props.messages.map((thisMessage, index) => {
        return <Message key={index} message={thisMessage}/>
      });
    return (
      <div className="messages">
        {messageItems}
      </div>
    );
  }
}