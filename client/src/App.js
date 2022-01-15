import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CharacterCreation from './pages/CharacterCreation';
import LobbyMain from './pages/LobbyMain'
import './App.css';
import TicTacToe from './pages/TicTacToe';
import ChatRoom from './pages/ChatRoom';

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<CharacterCreation/>}/>
                <Route path="/Lobby" element={<LobbyMain/>}/>
                <Route path="/TicTacToe" element={<TicTacToe/>}/>
                <Route path="/Chat" element={<ChatRoom/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
