import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLobby from '../../hooks/useLobby';
import ChatBox from '../../components/communication/ChatBox'
import FullAvatarList from '../../components/avatar/FullAvatarList'
import '../../components/buttons/AnimatedPushButton.css';

import './MainLobby.css'

const MainLobby = () => {
    const navigate = useNavigate();
    const clientMethods = [
        {
            name: 'RedirectToLobby',
            method: (url) => { navigate(url);
            console.log("Attempting to join url at: " + url );
            }
        },
    ];
    const lobbyHook = useLobby('http://127.0.0.1:5000/MainLobby', 'HOME', clientMethods);

    const [selectedGame, setSelectedGame] = useState('');
    const [lobbyIdToJoin, setLobbyIdToJoin] = useState('');


    const createLobby = async () => {
        try {
            await lobbyHook.connection.send('CreateLobby', lobbyHook.token, selectedGame);
        }
        catch (e) {
            console.log(e);
        }
    }

    const JoinLobbyWithId = async () => {
        try {
            console.log(`JOINING WITH token: ${lobbyHook.token} id: ${lobbyIdToJoin}`);
            await lobbyHook.connection.send('JoinLobbyWithId', lobbyHook.token, lobbyIdToJoin);
        }
        catch (e) {
            console.log(e);
        }
    }

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
                    <h3>Games</h3>
                    <div className='game-container'>
                        <div className={`love-letter game-logo ${(selectedGame === 'love-letter') ? 'selected' : ''}`}
                            onClick={() => { setSelectedGame('love-letter') }}
                        />
                    </div>
                    <div className='invite-or-start'>
                        <button className='button'>Create Lobby</button>
                        <div className='input-field'>
                            <input type="text"
                                className="input-lobby-id"
                                placeholder="Enter Lobby Code"
                                onChange={(e) => setLobbyIdToJoin(e.target.value)}
                                value={lobbyIdToJoin}
                            />
                            <button className='button' onClick={(e) => {
                                e.preventDefault();
                                JoinLobbyWithId();
                            }}>Join Lobby</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLobby;