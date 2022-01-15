import React from 'react';
import useLobby from '../hooks/useLobby';
import ChatBox from '../components/communication/ChatBox'
import './ChatRoom.css'


const ChatRoom = () => {
    const lobbyHook = useLobby('http://localhost:5000/main-lobby');
    return ( 
        <div className="chat-room">
            <div className='chat'>
                <ChatBox sendMessage={lobbyHook.sendMessage} chat={lobbyHook.chat}/>
            </div>
            <div className='participants'>

            </div>
        </div>
     );
}
 
export default ChatRoom;