import './LobbyMain.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import TetrisTitle from '../images/tetrisLogo.png'
import ExplodingKittensTitle from '../images/explodingKittensLogo.png'
import NotsAndCrossesTitle from '../images/NotsAndCrosses.png' 



class LobbyMain extends Component {
    test() {
        return <img src = {TetrisTitle} alt = 'bruh'/>;
    }

    render () {
        return ( 
            <div className="lobby-create-join">
                
                <div className='title'>
                    <strong>Lobby</strong>
                </div>
                
                <div className='Lobby'>
                    <div className="dropdown">
                        <button className="dropbtn">Games</button>
                        <div className="dropdown-content">

                            <a href="#"></a>
                            <button>
                                <img src = {TetrisTitle} alt = 'bruh' width='100'/>
                            </button>

                            <a href="#"></a>
                            <button>
                                <img src = {ExplodingKittensTitle} alt = 'bruh' width='100'/>
                            </button>

                            <a href="#"></a>
                            <button>
                                <img src = {NotsAndCrossesTitle} alt = 'bruh' width='100'/>
                            </button>
                            
                        </div>
                    </div>
                </div>
                
                
               
            </div>
        );
    }
}
 
export default LobbyMain;