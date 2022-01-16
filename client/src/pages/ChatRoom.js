import React, { useEffect } from 'react';
import useLobby from '../hooks/useLobby';
import ChatBox from '../components/communication/ChatBox'
import FullAvatarGroup from '../components/avatar/FullAvatarGroup'
import './ChatRoom.css'


const ChatRoom = () => {
    const lobbyHook = useLobby('http://127.0.0.1:5000/main-lobby', 'HOME');

    return ( 
        <div className="chat-room">
            <div className='chat'>
                <ChatBox sendMessage={lobbyHook.sendMessage} chat={lobbyHook.chat}/>
            </div>
            <div className='participants'>
                <FullAvatarGroup players={lobbyHook.allPlayers} />
            </div>
        </div>
     );
}
 
export default ChatRoom;