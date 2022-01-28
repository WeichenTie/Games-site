import React from 'react';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

import './styles/Chat.css'

const ChatBox = (props) => {
    return ( 
        <div className='chat-box'>
            <ChatWindow chat={props.chat}/>
            <ChatInput sendMessage={props.sendMessage} />
        </div>
     );
}
 
export default ChatBox;