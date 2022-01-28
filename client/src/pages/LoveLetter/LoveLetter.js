import React, { useEffect, useState } from 'react';
import useLobby from '../../hooks/useLobby';
import ChatBox from '../../components/communication/ChatBox'
import FullAvatarList from '../../components/avatar/FullAvatarList'
import '../../components/buttons/AnimatedPushButton.css';

import './LoveLetter.css'

const LoveLetter = () => {
    const lobbyHook = useLobby('http://127.0.0.1:5000/love-letter', 'HOME');

    const [lobbyCode, setLobbyCode] = useState('');
    const [selectedGame, setSelectedGame] = useState('');
    const [displayedGameImg, setDisplayedGameImg] = useState(null);


    return (
        <div className='main-lobby-page-container'>
            <div className='main-content'>
                <div className='left-container'>
                    <div className="left-sub-container">
                        <h3>PLAYERS</h3>
                        <div className='active-players'></div>
                        <FullAvatarList players={lobbyHook.allPlayers} avatarSize={45} maxPlayers={10} />
                    </div>
                    <ChatBox sendMessage={lobbyHook.sendMessage} chat={lobbyHook.chat} />
                </div>
                <div className='right-container'>
                    <h3>LoveLetter</h3>
                    <div className='game-container'>
                        <div className={`love-letter game-logo ${(selectedGame === 'love-letter') ? 'selected' : ''}`} onClick={() => { setSelectedGame('love-letter') }} />
                    </div>
                    <div className='invite-or-start'>
                        <button className='button'>Create Lobby</button>
                        <div className='input-field'>
                            <input type="text" className="input-lobby-id" placeholder="Enter Lobby Code" />
                            <button className='button'>Join Lobby</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoveLetter;