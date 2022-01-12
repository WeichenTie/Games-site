import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CharacterCreation from './pages/CharacterCreation';
import LobbyMain from './pages/LobbyMain'
import './App.css';
const client = new W3CWebSocket('ws://127.0.0.1:8000');
class App extends Component {
    componentWillMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            console.log(message);
        };
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<CharacterCreation/>}/>
                    <Route path="/Lobby" element={<LobbyMain name="Alex" squiggly="uwu"/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
