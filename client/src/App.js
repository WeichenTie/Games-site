import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CharacterCreation from './pages/CharacterCreation/CharacterCreation';
import './styles/app.css';
import MainLobby from './pages/MainLobby/MainLobby';
import LoveLetter from './pages/LoveLetter/LoveLetter'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CharacterCreation />} />
        <Route path="/MainLobby" element={<MainLobby />} />
        <Route path="/LoveLetter" element={<LoveLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
