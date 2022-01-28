import React, { useState, useRef} from 'react';



import './styles/Chat.css'

const ChatInput = (props) => {
    const [message, setMessage] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault(); // prevent page refresh
        const isMessageProvided = message && message !== ''; // check for valid message
        if (isMessageProvided) {
            props.sendMessage(message);
            setMessage('');
        }
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" className='chat-input' autoComplete='off' name="message" value={message} onChange={onMessageUpdate} />
        </form>
    );
}
 
export default ChatInput
