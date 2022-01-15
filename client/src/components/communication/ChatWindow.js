import React, { useState, useEffect, useRef} from 'react';
import './Chat.css'
import Message from './Message';

const ChatWindow = (props) => {
    const messageEl = useRef(null);
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.token}
            message={m.message}/>);
    
    useEffect(() => {
        const div = document.getElementById("chat-window-component");
        console.log(`st: ${div.scrollTop}, sh: ${div.scrollHeight}, ch: ${div.clientHeight}`);
        const isScrolledToBottom = div.scrollHeight - div.clientHeight <= div.scrollTop + 100;
        if (isScrolledToBottom) {
            div.scrollTop = div.scrollHeight - div.clientHeight
        }
    }, [chat])

    return(
        <div className='chat-window' id='chat-window-component' ref={messageEl}>
            {chat}
        </div>
    )
};

export default ChatWindow;