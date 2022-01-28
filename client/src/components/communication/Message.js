import React from 'react';
import './styles/Chat.css'

const Message = (props) => (
    <div className='message'>
        <span className="message-username" style={{color:"orange"}}>{props.user}: </span>
        <span className="message-content" style={{color:"white"}}>{props.message}</span>
    </div>
);

export default Message;