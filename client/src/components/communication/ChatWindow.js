import React, { useEffect } from 'react';
import './styles/Chat.css'
import Message from './Message';

const ChatWindow = (props) => {
    // Loads all the chat
    const chat = props.chat
        .map(m => <Message 
            key={Math.random()}
            user={m.token}
            message={m.message}/>);
    
    // Auto scroll feature activates when there is a change to the chat
    useEffect(() => {
        const div = document.getElementById("chat-window-component");
        const isScrolledToBottom = div.scrollHeight - div.clientHeight <= div.scrollTop + 100;
        // Auto scroll if scroll bar is at bottom of chat box
        if (isScrolledToBottom) {
            div.scrollTop = div.scrollHeight - div.clientHeight
        }
    }, [chat])

    return(
        <div className='chat-window' id='chat-window-component'>
            {chat}
        </div>
    )
};

export default ChatWindow;