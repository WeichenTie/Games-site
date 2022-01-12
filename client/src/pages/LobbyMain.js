import './LobbyMain.css'
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";


class LobbyMain extends Component {
    componentWillMount() {
        console.log(this.props);
    }
    componentWillUnmount() {
        console.log("BYE BYE");
    }
    render () {
        return ( 
            <div className="lobby-create-join">
                <div className='options-section'>

                </div>
                <div className='join-lobby'>
                    <button className=''></button>
                </div>
                <div className='players-in-lobby'>
    
                </div>
                <div className=''>

                </div>
            </div>
        );
    }
}
 
export default LobbyMain;